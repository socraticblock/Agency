"use server";

import { z } from "zod";
import { supabaseServer } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const captureLeadSchema = z.object({
  email: z.string().max(320),
  phone: z.string().max(48),
  painPoint: z.string().max(5000),
  toolName: z.string().max(128),
});

const bookStrategySchema = z.object({
  name: z.string().max(200),
  email: z.string().max(320),
  whatsapp: z.string().max(40),
  time: z.string().max(500),
  leadData: z.string().max(100_000),
});

function field(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v : "";
}

function zodFormError(error: z.ZodError): string {
  return error.issues[0]?.message ?? "Invalid input.";
}

export type LeadCaptureState =
  | { success: true; email?: string; phone?: string }
  | { error: string }
  | null;

export type BookStrategyFormState =
  | { success: true }
  | { error: string }
  | null;

export async function captureLeadAction(
  _prevState: LeadCaptureState,
  formData: FormData
): Promise<LeadCaptureState> {
  const parsed = captureLeadSchema.safeParse({
    email: field(formData, "email").trim(),
    phone: field(formData, "phone").trim(),
    painPoint: field(formData, "painPoint").trim(),
    toolName: field(formData, "toolName").trim(),
  });

  if (!parsed.success) {
    return { error: zodFormError(parsed.error) };
  }

  const { email, phone, painPoint, toolName } = parsed.data;

  if (!email && !phone) {
    return { error: "Please provide either an email or phone number." };
  }

  if (email && !EMAIL_RE.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    if (supabaseServer) {
      const { error } = await supabaseServer.from("leads").insert({
        email: email || null,
        phone: phone || null,
        pain_point: painPoint || null,
        tool_name: toolName || null,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Supabase insert error:", error);
        return { error: "Failed to save lead." };
      }
    } else {
      console.log("Mock lead capture:", { email, phone, painPoint, toolName });
    }

    return {
      success: true,
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
    };
  } catch (error) {
    console.error("Lead capture error:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function bookStrategyAction(
  _prevState: BookStrategyFormState,
  formData: FormData
): Promise<BookStrategyFormState> {
  const parsed = bookStrategySchema.safeParse({
    name: field(formData, "name").trim(),
    email: field(formData, "email").trim(),
    whatsapp: field(formData, "whatsapp").trim(),
    time: field(formData, "time").trim(),
    leadData: field(formData, "leadData"),
  });

  if (!parsed.success) {
    return { error: zodFormError(parsed.error) };
  }

  const { name, email, whatsapp, time, leadData } = parsed.data;

  if (!name) {
    return { error: "Please provide your name." };
  }

  if (!email && !whatsapp) {
    return { error: "Please provide either an email or WhatsApp number." };
  }

  if (email && !EMAIL_RE.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    if (supabaseServer) {
      const { error } = await supabaseServer.from("strategy_calls").insert({
        name,
        email: email || null,
        whatsapp: whatsapp || null,
        preferred_time: time || null,
        lead_data: leadData || null,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Supabase insert error:", error);
        return { error: "Failed to save booking." };
      }
    } else {
      console.log("Mock strategy call booking:", { name, email, whatsapp, time, leadData });
    }

    return { success: true };
  } catch (error) {
    console.error("Strategy call booking error:", error);
    return { error: "An unexpected error occurred." };
  }
}
