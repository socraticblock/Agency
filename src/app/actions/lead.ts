"use server";

import { supabaseServer } from "@/lib/supabase/server";

export async function captureLeadAction(
  prevState: any,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const painPoint = formData.get("painPoint") as string;
  const toolName = formData.get("toolName") as string;

  if (!email && !phone) {
    return { error: "Please provide either an email or phone number." };
  }

  try {
    if (supabaseServer) {
      const { error } = await supabaseServer.from("leads").insert({
        email,
        phone,
        pain_point: painPoint,
        tool_name: toolName,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Supabase insert error:", error);
        return { error: "Failed to save lead." };
      }
    } else {
      console.log("Mock lead capture:", { email, phone, painPoint, toolName });
    }

    return { success: true };
  } catch (error) {
    console.error("Lead capture error:", error);
    return { error: "An unexpected error occurred." };
  }
}

export async function bookStrategyAction(
  prevState: any,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const whatsapp = formData.get("whatsapp") as string;
  const time = formData.get("time") as string;
  const leadData = formData.get("leadData") as string;

  if (!name || (!email && !whatsapp)) {
    return { error: "Please provide a name and either an email or WhatsApp number." };
  }

  try {
    if (supabaseServer) {
      const { error } = await supabaseServer.from("strategy_calls").insert({
        name,
        email,
        whatsapp,
        preferred_time: time,
        lead_data: leadData,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Supabase insert error:", error);
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
