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
