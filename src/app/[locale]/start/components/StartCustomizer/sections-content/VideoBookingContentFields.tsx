import type { Lane1CustomizerState } from "../../../lib/types";
import { fieldClass, labelClass } from "../types";

export function VideoBookingContentFields({
  state,
  patch,
}: {
  state: Lane1CustomizerState;
  patch: (p: Partial<Lane1CustomizerState>) => void;
}) {
  return (
    <fieldset className="space-y-3 border-t border-black/10 pt-4">
      <legend className="start-label font-semibold text-[#1e293b]">Video & booking</legend>
      <label className={labelClass}>
        Video URL (YouTube or Vimeo)
        <input
          className={fieldClass}
          value={state.videoUrl}
          onChange={(e) => patch({ videoUrl: e.target.value })}
          placeholder="https://…"
          onFocus={(e) => e.target.select()}
        />
      </label>
      <label className={labelClass}>
        Booking link
        <input
          className={fieldClass}
          value={state.bookingUrl}
          onChange={(e) => patch({ bookingUrl: e.target.value })}
          placeholder="https://cal.com/… or similar"
          onFocus={(e) => e.target.select()}
        />
      </label>
      <label className={labelClass}>
        Booking button label
        <input
          className={fieldClass}
          value={state.bookingLabel}
          onChange={(e) => patch({ bookingLabel: e.target.value })}
          onFocus={(e) => e.target.select()}
        />
      </label>
    </fieldset>
  );
}
