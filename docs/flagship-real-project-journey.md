# Genezisi — The Real-Project Journey (v1)

**Status: isolated implementation candidate; not production-approved.**

GitHub: `socraticblock/Agency`, branch `feat/genezisi-real-project-journey`.

Production homepage, current Genezisi V2, and Vercel deployment rules are preserved. The proof-of-concept route is `/flagship-journey/index.html`; `/[locale]/flagship-preview` redirects to it. `index.html` is explicitly `noindex,nofollow` and remains English-first.

## What is implemented

- Prototype 05 headline, positioning and core brand palette retained.
- Native-scroll guided three-chapter journey through TK Counsel (client-facing legal/professional practice), Socraticblock (founder engineering portfolio), and Fornward (original early-test RPG landing artwork).
- Actual project screenshots from `/public/work-previews/`, verified to exist in the Agency repository. Their preview resolution is limited and they are not full-page captures.
- The Fornward stone gate uses verified original files in `socraticblock/broken-chapel-prototype/assets/landing/gate/`. These original assets are copied into `public/flagship-journey/fornward/` on the isolated feature branch so the deployed experience does not depend on GitHub Raw.
- Three real-project explanations with progress-driven focal points and a direct link to each original website.
- Intentional, modal project exploration. TK Counsel attempts a **sandboxed, read-only** live iframe and has a separate open-original link. Socraticblock deliberately uses a screenshot because its existing CSP/X-Frame-Options prevent ordinary embedding. Fornward shows legitimate landing artwork and opens the original (never autostarts gameplay).
- Five-step local, non-networked automation and AI-agent demos with separate states, authorized tool reads, restricted sends, example owner approval and truthful outcome.
- Three independently purchasable service descriptions, direct contact CTA, keyboard focus return, skip link, motion-reduction fallback and narrow-screen layout.
- Optional `scripts/capture-flagship-journey.mjs` captures full-page public websites after explicit local execution in a network-enabled browser. When `public/flagship-journey/captures/*-full.png` exist, guided chapters use them for authentic in-frame scrolling; without them, the current verified hero screenshot remains. **Do not represent a hero preview as an entire website walkthrough.**

## Local review

Open `index.html` in a browser (standalone files `journey.css` and `journey.js` in the same folder). The local QA script `qa.py` uses offline Chromium `page.set_content()` because the current test environment blocks navigation to file/localhost through administrator policy. This checks the DOM, layout, scroll state, Lab interactions, viewer, device toggle, Escape and basic errors; it cannot verify network images or a real iframe session.

Preview screen sizes: 1440×900, 1080×740, 768×1024, 390×844 and 320×740. All five had no JS page errors or horizontal document overflow in the offline test. Visual checks found and corrected chapter heading selectors, overlap and broken-image alt-text. Screenshots remain in `qa/` of the review pack; not committed to the repo.

## Production gates, still outstanding

1. Run Next.js build/lint/typecheck in a network-capable checkout of the feature branch. No such run was possible in the current isolated environment.
2. Generate, inspect and commit genuine **full-page** TK Counsel and Socraticblock captures (avoid private/protected content). Compress/resample if too large, then visually test that scroll pan works with each capture. Verify production image URLs and Fornward asset loading.
3. Test TK Counsel's actual iframe response headers. If embedding fails, do **not** bypass frame-ancestors/X-Frame-Options; use a screenshot and original-site link, or explicitly create a narrowly authorized public-only showcase route on TK Counsel.
4. Complete language-native English, Georgian and Belgian-Dutch copy and verify line breaks. Current candidate is explicitly English-first, and locale wrapper redirects to the same English experience.
5. Test touch scroll, iOS Safari, Android performance, reduced motion and keyboard focus on real devices. Capture evidence at all three project transitions and the contact section.
6. Improve static art direction and graphical transitions based on owner feedback; this is not automatically a $50k-quality visual sign-off.
7. Maintain Genezisi's Vercel quota policy: never push `main` or `preview-*` during development except for an explicit controlled visual preview. Do not merge without owner acceptance.

## Deployment boundary

All changes are on a non-deploying feature branch. No outgoing form posts, simulated messages or AI calls. The site links to existing external websites and the configured Genezisi WhatsApp intake.