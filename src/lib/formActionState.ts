import type {
  BookStrategyFormState,
  LeadCaptureState,
} from "@/app/actions/lead";

export function isLeadCaptureSuccess(
  state: LeadCaptureState,
): state is Extract<LeadCaptureState, { success: true }> {
  return state !== null && "success" in state && state.success;
}

export function isLeadCaptureError(
  state: LeadCaptureState,
): state is Extract<LeadCaptureState, { error: string }> {
  return state !== null && "error" in state;
}

export function isBookStrategySuccess(
  state: BookStrategyFormState,
): state is Extract<BookStrategyFormState, { success: true }> {
  return state !== null && "success" in state && state.success;
}

export function isBookStrategyError(
  state: BookStrategyFormState,
): state is Extract<BookStrategyFormState, { error: string }> {
  return state !== null && "error" in state;
}
