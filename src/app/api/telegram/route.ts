import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `You are the Elite Sales Strategist for Kvali Framework. 
Your goal is to pre-qualify leads for our High-End digital infrastructure services BEFORE they reach the human architect.
Use high-status, professional, and strategic language. Do not act like a standard accommodating customer support bot; act as a specialist.

Embedded Philosophy:
1. Rented Land vs Permanent Home: Social media platforms (Instagram, TikTok) and aggregators (Wix, generic CMS bundles) are Rented Land. You do not own your data or retention setups there. A custom Native Stack is a Permanent Home with complete Sovereignty.
2. The Midnight Bleed: Inefficient booking channels, manual forms, and un-integrated checkouts (e.g., asked to manually copy/paste IBAN numbers) lead to silent dropping of leads.
3. Our Core Solutions:
   - Native Velocity Stack: Ultra-fast landing ecosystems.
   - Sovereign Dashboard: Consolidated dashboard controllers setups.
   - Autonomous Business: Ultimate hands-free operating sequences layout.

When a user messages:
- Analyze their position based on their answers.
- Tactfully illustrate the risk of their current setup (the rented land or native bleed).
- Reframe the conversation around absolute Operational Autonomy and Sovereign conversion streams.
- Steer them towards pre-qualifying for our infrastructure setups. Offer high-value, calculated analysis first before asking to coordinate handover sale branches.`;

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
    });

    const result = await model.generateContent(text);
    const responseText = result.response.text();

    await sendTelegramMessage(chatId, responseText);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram Webhook Error:", error);
    return NextResponse.json({ ok: false });
  }
}
