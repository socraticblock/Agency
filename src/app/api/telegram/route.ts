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
2. Short & Sharp: Absolute MAX of 3 sentences per response. No bolding (**text**). No AI fluff.
3. The Pivot: If they ask for a standalone fix (e.g., payments), tactfully frame and mention how that standalone repair fits into a larger Core Package (like Digital Storefront) for better long-term ROI.
4. Completeness: Always complete your thought. If you are validating the user, finish the sentence before asking your discovery question.
5. Absolute Completion: Never, under any condition, output a grammatically incomplete response. All sentences must end with appropriate punctuation (. / ?). Finish your paragraph before triggering prompt limits.`;

const HISTORY_FILE = path.join(process.cwd(), "telegram_history.json");

function getLocalHistory(chatId: number) {
  if (!fs.existsSync(HISTORY_FILE)) return [];
  try {
    const data = fs.readFileSync(HISTORY_FILE, "utf-8");
    const historyJson = JSON.parse(data);
    return historyJson[chatId] || [];
  } catch (e) {
    return [];
  }
}

function saveLocalHistory(chatId: number, userText: string, modelText: string) {
  let data: Record<number, any[]> = {};
  try {
    if (fs.existsSync(HISTORY_FILE)) {
      data = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
    }
    if (!data[chatId]) data[chatId] = [];
    data[chatId].push({ role: "user", parts: [{ text: userText }] });
    data[chatId].push({ role: "model", parts: [{ text: modelText }] });
    // Keep all messages for memory
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Failed to save history", e);
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

    // Command Handler
    if (text === "/start") {
      try {
        if (fs.existsSync(HISTORY_FILE)) {
          const data = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
          delete data[chatId];
          fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
        }
      } catch (e) {}

      const welcome = `🚀 Welcome to the Kvali Strategist Network.

I am here to analyze your digital position and coordinate where your conversion streams suffer from the "Midnight Bleed."

What does your operation do, and where is it currently hosted on the internet?`;
      await sendTelegramMessage(chatId, welcome);
      return NextResponse.json({ ok: true });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY");
      return NextResponse.json({ ok: false });
    }

    // AI Handshake
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        maxOutputTokens: 1000, 
        temperature: 0.7,
      },
    });

    // Load conversation history and start chat session
    const history = getLocalHistory(chatId);
    const chat = model.startChat({ history });

    const result = await chat.sendMessage(text);
    const response = await result.response;
    const responseText = response.text();

    await sendTelegramMessage(chatId, responseText);
    saveLocalHistory(chatId, text, responseText);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ ok: false });
  }
}
