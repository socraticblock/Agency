import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
        maxOutputTokens: 1000, // Increased to rule out token cutoff
        temperature: 0.7,
      },
    });

    const result = await model.generateContent(text);
    const response = await result.response;
    const responseText = response.text();

    await sendTelegramMessage(chatId, responseText);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ ok: false });
  }
}
