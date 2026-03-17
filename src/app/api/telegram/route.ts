import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const SYSTEM_INSTRUCTION = `You are an Elite Sales Strategist for Kvali Framework, speaking as a consultative peer to business owners.

Core Philosophy:
1. Social Media is Rented Land.
2. Standalone Services are Emergency Repairs.
3. Core Digital Infrastructure (Packages) is the Permanent Home.

Service Knowledge Base:
--- STANDALONE (Emergency Repairs) ---
- Local Dominance (800₾): GMB/Maps local trust and visibility setup.
- Native Payment (1,200₾ - 2,500₾): Standardized DM-to-transfer Frictionless Commerce flows.
- Midnight Bleed Rescue (2,500₾): Solution for losing prospective sales during off-hours or sleeper mode.

--- CORE PACKAGES (Permanent Home) ---
- Foundation (1,500₾): Digital authority anchor.
- Digital Storefront (3,500₾): Popular choice for fully autonomous commerce.
- Autonomous Business (7,500₾+): Maximum operational freedom; the elite tier.

Interaction Protocol:
1. Be Agreeable: Always start by validating and acknowledging the user's current business model effort with respect.
2. Short & Sharp: Aim for 3 succinct sentences or less per response to keep things focused. No bolding (**text**). No AI fluff.
3. The Pivot: If they ask for a standalone fix (e.g., payments), tactfully frame and mention how that standalone repair fits into a larger Core Package (like Digital Storefront) for better long-term ROI.
4. Completeness: Always complete your thought. If you are validating the user, finish the sentence before asking your discovery question.
5. Absolute Completion: Never, under any condition, output a grammatically incomplete response. All sentences must end with appropriate punctuation (. / ?). Finish your paragraph before triggering prompt limits.`;

const HISTORY_FILE = path.join(process.cwd(), "telegram_history.json");

interface ChatState {
  step: number;
  answers: string[];
}

function getLocalState(chatId: number): ChatState {
  if (!fs.existsSync(HISTORY_FILE)) return { step: 0, answers: [] };
  try {
    const data = fs.readFileSync(HISTORY_FILE, "utf-8");
    const historyJson = JSON.parse(data);
    return historyJson[chatId] || { step: 0, answers: [] };
  } catch (e) {
    return { step: 0, answers: [] };
  }
}

function saveLocalState(chatId: number, state: ChatState) {
  let data: Record<number, ChatState> = {};
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      data = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
    }
    data[chatId] = state;
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Failed to save state", e);
  }
}

async function sendTelegramMessage(chatId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("TELEGRAM_BOT_TOKEN is missing");
    return;
  }

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

export async function POST(request: Request) {
  console.log("--- BOT WEBHOOK ACTIVATED ---");
  try {
    const body = await request.json();
    const message = body.message;

    if (!message || !message.chat?.id) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const text = message.text || "";

    const QUESTIONS = [
      "What is your name?",
      "What platforms do you currently use for your business? (Instagram, Facebook, YouTube, TikTok, etc.)",
      "Do you currently have your own website, or is your business hosted entirely on these platforms?",
      "How are your orders or payments currently processed? (Manual DMs, bank transfers, or automated?)",
      "On a scale of 1-10, how much of your daily energy is consumed by manual admin or repetitive questions?",
      "Which path is your priority right now?\n\n- Authority: Looking elite to build trust and charge more.\n\n- Sales: Capturing every lead and automating the checkout.\n\n- Freedom: Removing yourself from the manual workflow so the business runs while you sleep.",
      "Are there any thoughts you'd like to share considering your own website?",
      "Can I share this summary with our Lead Architect? And do you prefer to continue via WhatsApp, Telegram, or Email?"
    ];

    // Command Handler
    if (text === "/start") {
      try {
        if (fs.existsSync(HISTORY_FILE)) {
          const data = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
          delete data[chatId];
          fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
        }
      } catch (e) {}

      const welcome = `🚀 Welcome to the Kvali Strategist Network.\n\nLet's get started. ${QUESTIONS[0]}`;
      await sendTelegramMessage(chatId, welcome);
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY");
      return NextResponse.json({ ok: false });
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "You are an elite sales consultant. Always validate the user brief and agreeable first without general chat buffers. DO NOT USE BOLDING (**).",
    });

    let state = getLocalState(chatId);

    try {
      if (state.step < QUESTIONS.length) {
        state.answers.push(text);
        state.step += 1;
        saveLocalState(chatId, state);

        if (state.step < QUESTIONS.length) {
          // Normal Validation + Append Next Q
          const prompt = `Validate this response to the question "${QUESTIONS[state.step - 1]}": "${text}". 
Generate exactly ONE agreeable, consultative sentence respecting their focus. No bolding (**). No AI fluff. 
Then append EXACTLY this next question on a new line: "${QUESTIONS[state.step]}"`;

          const result = await model.generateContent(prompt);
          const responseText = result.response.text();

          await sendTelegramMessage(chatId, responseText);
        } else {
          // Post-Sequence Logic (All questions answered)
          const summaryPrompt = `Based on these user interview data layers:
- Name: ${state.answers[0]}
- Platforms: ${state.answers[1]}
- Own Website: ${state.answers[2]}
- Ops Friction: ${state.answers[3]}
- Task Friction (1-10): ${state.answers[4]}
- Top Path Priority: ${state.answers[5]}
- Add-on Thoughts: ${state.answers[6]}
- Preferred Contact: ${state.answers[7]}

Acknowledge the handover for ${state.answers[7]}. Provide a concise 2-sentence summary recommending the best tier out of: Foundation (1,500₾), Storefront (3,500₾), or Autonomous (7,500₾). 
NO bolding (**). NO AI fluff. Do not lecture, pitch smoothly. If WhatsApp chosen generate short contact note placeholder.`;

          const result = await model.generateContent(summaryPrompt);
          const responseText = result.response.text();

          // Standardized Payload string for logging
          const payload = `[${state.answers[0]}] | Priority: [${state.answers[5].split('\n')[0]}] | Pain: [${state.answers[4]}/10] | Platforms: [${state.answers[1]}] | Contact: [${state.answers[7]}]`;
          console.log("LEAD PAYLOAD:", payload);

          const finalMessage = `${responseText}\n\nThe Architect will review your data and respond within 24 hours.`;
          await sendTelegramMessage(chatId, finalMessage);
        }
      }

      return NextResponse.json({ ok: true });
    } catch (err: any) {
      console.error("Gemini Error during sequence:", err);
      await sendTelegramMessage(chatId, `⚠️ Strategist error: ${err.message}`);
      return NextResponse.json({ ok: false });
    }
  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ ok: false });
  }
}
