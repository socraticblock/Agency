# `/nl` device & browser acceptance checklist

Owner-run gate. This is the one thing that cannot be done from the build environment (no browser
automation available or permitted there), so it is written as a single sitting you can work
through top to bottom.

**Candidate under test:** `feat/genezisi-nl-be-roadmap-final` @
`2da19d812b9ab22540d80c917a67619c129b12df`
Test `/nl` against `/en` side by side — several checks are "does Dutch behave the same as English".

Record for each: **PASS / FAIL / not checked**, and for a FAIL the viewport + what you saw.

---

## 1. Phone — Samsung Galaxy S25, Brave (primary)

### Header (the tightest constraint)
- [ ] At 320 px wide (Brave → DevTools device toolbar → 320×568): wordmark, `EN · KA · NL` and the
      contact CTA are all **visible, not overlapping**.
- [ ] Each of `EN`, `KA`, `NL` is tappable — no mis-taps between them; the current language reads
      as current (brighter / underlined).
- [ ] Tapping `NL` from `/en` lands on `/nl` with the address bar showing `/nl`.
- [ ] The header stays fixed and does not cover the hero heading when you scroll to the top.

### Hero
- [ ] `/nl` hero reads *"Je website is nog maar het begin."* — **no clipped or cut-off line**, no
      horizontal scroll, no text smaller than the English equivalent.
- [ ] Both hero buttons (WhatsApp + "Bekijk mijn werk") are fully visible at 360×800 and 390×844.
- [ ] "Bekijk mijn werk" scrolls to the work section.

### Selected work
- [ ] Three cards in order: TK Counsel, Frankencoin Desk, Her House Pilates.
- [ ] Status labels read `Live website`, `Live product`, `Prototype` — the third must **not** read
      as a launched client site.
- [ ] No project name or status is obscured by the image.

### System in Action — the highest-risk area
- [ ] Scroll slowly from the first card to the fifth: **every one of the five Dutch step titles is
      fully readable** — none is truncated with an ellipsis, none is buried under the next card.
- [ ] All five steps: 1 *De aanvraag ontvangen* · 2 *De vraag begrijpen* · 3 *De nuttige stap
      zetten* · 4 *Uitzonderingen naar een persoon* · 5 *Een duidelijke volgende stap*.
- [ ] Rotate to landscape on a short screen (e.g. 667×375): the cards fall into normal flow and
      remain readable (the ≤700 px-tall fallback).
- [ ] Flick down fast, then scroll back up: earlier steps remain reachable; nothing traps the
      scroll under the fixed header.
- [ ] You can always scroll past the fifth card down to the founder section.

### Founder / footer
- [ ] Founder heading *"Je werkt met de persoon die het zelf bouwt."* fits without clipping.
- [ ] Footer shows `EN · KA · NL`; all three are tappable.
- [ ] The footer WhatsApp button opens WhatsApp with the Dutch message pre-filled:
      *"Hallo Genezisi, ik wil graag een project bespreken. Kunnen we even overleggen?"*
      **Check the text only — do not send it.**
- [ ] The same Dutch message appears from the header CTA and the hero CTA (all three identical).

---

## 2. Desktop — cross-browser

One pass each in **Chrome, Firefox, Edge**, and **Safari on macOS** if you have it.

- [ ] `/nl` renders identically in structure to `/en`; no layout shift on load.
- [ ] 1366×768 (short laptop) and 1440×900: hero and the sticky demo panel are not cropped.
- [ ] 1024×768: the demo is in **desktop** mode (step list + one persistent panel), and resizing
      back and forth across the breakpoint does not leave a stuck or blank panel.
- [ ] Desktop demo: click each of steps 1–5 → the panel changes to the matching Dutch content.
- [ ] Scroll slowly past the steps → the active step tracks; scroll **backwards** → it does not
      freeze on a previous step.
- [ ] No horizontal scrollbar at any of the above widths.

---

## 3. Keyboard and assistive tech (one desktop browser)

- [ ] `Tab` from the top: skip link → wordmark → (desktop nav) → language links → CTA → work cards
      → demo step buttons → founder CTA → footer links. Nothing is skipped, nothing is unreachable.
- [ ] Every focused element shows a **visible** focus ring against its background.
- [ ] `Enter`/`Space` on a demo step button activates it.
- [ ] A screen reader announces the current language as current (not just "brighter").
- [ ] A screen reader announces Dutch content with a Dutch voice/language (page language is
      `nl-BE`).
- [ ] Screen reader does not read all five demo panels at once as if they were simultaneously
      visible.

## 4. Zoom, motion, no-JS

- [ ] Browser zoom **200%** at 390 px wide: no clipped headings, no horizontal scroll, controls
      still reachable.
- [ ] OS "reduce motion" on: the page is calm and complete — nothing is hidden behind an animation.
- [ ] JavaScript **disabled**: `/nl` still shows the hero, the work section, the five demo steps,
      the founder text and the contact link (it is server-rendered).

---

## 5. Truth / contact checks (quick)

- [ ] No claim anywhere of a Belgian office, Belgian clients, Dutch-language calls, or prices.
- [ ] The demo block is clearly labelled as an internal demonstration (*"Interne demonstratie"*).
- [ ] The demo sender shows `sarah@example.com` (a reserved example address, not a real domain).
- [ ] Portfolio links open the right destinations: tkcounsel.com, frankencoindesk.com,
      her-house-pilates.vercel.app — and each still loads.
- [ ] WhatsApp opens the intended account (verify the number on the send screen, then cancel).

---

## Known documented limitations (not failures)

- `/nl/unknown` returns a real 404 rendered with the site's **English** not-found shell. The spec
  only requires a real 404; a translated not-found page is a separate improvement.
- The `[locale]` wrapper is `lang="ka"` for Georgian while `<html>` and `<main>` are `ka-GE`;
  both denote Georgian.
- Dutch copy is the brief's candidate plus light polish — **not** certified by a native speaker.
