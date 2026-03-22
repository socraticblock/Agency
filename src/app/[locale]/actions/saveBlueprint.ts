"use server";

import {
  mergeBlueprintLead,
  persistBlueprintPayload,
} from "@/lib/blueprint/blueprintStore";

/** Thin server-action wrappers (optional); client uses `/api/architect-blueprint` to avoid Flight encoder issues. */
export async function saveBlueprint(payload: unknown) {
  return persistBlueprintPayload(payload);
}

export async function updateBlueprintLead(
  id: string,
  lead: { name: string; company: string; email: string }
) {
  return mergeBlueprintLead(id, lead);
}
