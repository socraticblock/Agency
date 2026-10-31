# Screen 01 — Digital Passage (31 October 2026)

**Status:** Integrated prototype code committed for real-browser visual review; not founder-approved, merged or deployed.

## Creative intent
The click on the **real** Option D "Explore our work" anchor passes through an original digital architectural vault, then lands on the original Gate 1b \`#work\` DOM. The visual experience is a forward camera journey rather than page peeling, and the architecture is actual world-space geometry (instanced decagonal ribs, asymmetric plated strata, transport filaments and spatial light signals). No fake portfolio screenshots, cloned hero lettering, code rain or scrolling alterations.

## Branch and containment
Branch: \`feature/screen01-digital-passage-threejs-2026-10-31\`.
Base: Option D \`b6f7f827683d4df10ba17e28b71e034a8f999239\`. This is **not** based on Codex's potentially unpushed 31-Oct local CTA changes. Preserve those changes independently. No production integration assumed.

Files added: \`digital-passage-nav.js\` (intent-load + anchor continuity), \`digital-passage-scene.js\` (3D), \`digital-passage.css\` (presentation). \`index.html\` swaps only the clicked-CTA script/CSS reference. Older \`work-nav.js\`, \`work-dive.css\`, \`motion.js\`, Work markup and Screens 02–04 remain untouched.

## Serving and review
Serve the checked-out branch with the existing app/dev tunnel. Open:
\`/flagship-journey/infinite-bc/index.html\`

1. Check that the original Option D intro is unchanged before click.
2. Click **Explore our work** using desktop Chrome/Edge. A geometric aperture should expand from the CTA, revealing a deep forest-green 3D vault. The camera moves through real ribs/plates while optical filaments and light packets trace the architecture.
3. Verify that the **actual** Work markup is behind the scene, with no fake screenshot and no sudden scroll jump as the world dissolves.
4. Repeat at 390×844 and 320×568; inspect 10/25/50/75/90% frames, normal-speed playback and the exact arrival.
5. Browser DevTools: GPU/WebGL errors, network requests and frame performance. No browser performance or WebGL success is asserted by this commit.
6. Open with \`?passageDebug=1\`, click CTA, then in the console use \`window.__genezisiPassage.seek(.50)\` to pause at 50%, \`.seek(.75)\` to inspect 75%, and \`.resume()\` to continue. This is a debugging aid, not a visitor control.
7. Verify modified Ctrl/Meta-click, keyboard, native #work hash/history, Back/Forward, direct skip, resize/orientation, reduced-motion, WebGL-disabled and CDN-blocked navigation fallback.
8. Ensure no altered B→C scroll behavior and no impact on any other service routes.

## Rendering and dependency
This static HTML proof uses a dynamic ES-module import of **Three.js 0.186.1**, pinned to a known patch level at \`cdn.jsdelivr.net\`. It only loads on hover/focus or CTA click. If the import is blocked or slow (2.2-second load guard), it falls back to the original Work anchor. No GSAP, R3F or site-wide runtime was added. Later production integration should bundle/vendor its own Three.js dependency and re-verify security policy, GPU budgets, and SSR boundaries.

Visual design choices: ACES tone mapping, instanced matte-metal vault pieces, physically positioned point lights, asymmetric spatial plates, Catmull–Rom transport fibers, a custom spectral haze shader, additive data packets, and controlled fog and depth. Material details and pacing are subject to founder footage.

## Limits and acceptance
Source-level syntax/structure checks alone do not verify Three.js module resolution, GPU/shader compilation, rendering quality, keyboard semantics in an actual browser, iOS compatibility, 30/60 FPS, real production SelectedWork integration or release suitability.

The Work section in this **Gate 1b static prototype is a mirror** of the genuine website Work; this update deliberately leaves it untouched. When integrating into the Next.js site later, use actual \`SelectedWork\` rather than treating the mirror as the final production component.

**Founder must visually approve the served recording before any merge/deployment or work on other screens.**
