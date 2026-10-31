# GENEZISI — Screen 01 Digital Passage: LOCKED CREATIVE DIRECTION

**Decision date:** 31 October 2026  
**Approval level:** Founder **locks the core creative concept** after reviewing the recorded V2 passage. The implementation, timing, rendering, mobile composition, usability and final visual quality remain subject to refinement and acceptance. Concept approval is **not** production/deployment approval.  
**Historical iteration at concept lock:** `feature/screen01-digital-passage-locked-v3-2026-10-31` (not the active foundation).  
**Later acceptance update (31 October):** Founder accepted the final isolated V6.5 Digital Passage prototype as a sufficient foundation and stopped further visual iteration. Canonical SHA `ce8eae22f1d3500674265d529cdcb793d23b538b`; see [V6.5 acceptance record](SCREEN_01_DIGITAL_PASSAGE_V6_5_WORK_ARRIVAL_REVIEW_2026-10-31.md). This updates **implementation status only**, not the originally locked concept, and confers no merge/deploy or integrated-site approval.  
**Source recording:** founder-uploaded `20261031-0523-30.9419563.mp4` (4.23-second clip, multiple review states; do not infer a single uninterrupted 4.23-second travel).

## The non-negotiable concept — frozen
**The real cream website leads us into the real `Explore our work` CTA. The CTA itself becomes the threshold into a sophisticated evergreen digital/architectural passage. We travel through that 3D world. We already see the real Work destination ahead, approaching and growing naturally as the camera moves. The architectural environment parts, and we emerge invisibly into the actual interactive Work section.**

**Locked five-beat journey**
1. **Intact source:** exact Option D hero, real CTA and typography. No content redesign.
2. **Camera into the CTA:** use the clicked CTA's measured button rectangle as the initial aperture. Avoid a generic full-screen page curl or oversized hero clone.
3. **Digital Passage:** maintain the founder-liked deep evergreen architectural world, monumental threshold, varying structural nave, precise mint/ivory light, kinetic filaments and physically grounded forward camera movement.
4. **Work visible ahead:** show Work *inside the passage* well before the exit. Its optics should enlarge continuously with the camera. Source content only from real Work DOM, with an inert visual preview where technically necessary. No fictitious screenshots or project claims.
5. **Seamless landing:** world geometry withdraws; camera and Work framing settle; transient copies and WebGL context disappear; real `#work` with ordinary history/interaction remains.

**Do not** revisit two hinged doors, peel/wipe as main effect, flat screenshot zoom, arbitrary new portal concept, giant text, repetitive rectangular frames, literal Matrix code rain, neon cyberpunk or redesign of the Work section.

## Approved refinement axes — not changes in concept
- **Smoothness:** continuous camera position and velocity without artificial pauses at intermediate chapter boundaries; eliminate visual flashes, stutters and seam mismatch.
- **Speed:** make the experience a little faster than the recorded V2 candidate; ~2.14-second on-click sequence in V3 is an initial parameter, not a final timing lock. Module load delays are separate and must be monitored.
- **Entrance:** better camera-to-CTA continuity and a convincing button-origin portal, without huge typography scaling.
- **Destination:** Work recognizable earlier through the passage, with perspective growth and exact full-resolution real DOM on arrival.
- **Lighting, material and structure:** polish quality within the same world, no new conceptual direction.
- **Responsiveness, accessibility, performance:** desktop and portrait are independently reviewed; reduced motion and failure paths navigate directly to Work.

## Engineering implementation snapshot
The **V2 branch remains preserved**: `feature/screen01-digital-passage-directed-v2-2026-10-31`. V3 copies V2's world while concentrating on the three requested refinements.

- New `digital-passage-scene-v3.js` uses measured CTA bounds as a rounded rectangular aperture into the same Three.js architecture.
- The canvas uses alpha transparency and draws geometry over a real-content **inert clone** of the existing Work markup. This is a transient DOM visual bridge, not a fabricated screenshot or the actual interactive Work. The original actual Work is scrolled underneath and revealed via the final aperture.
- Work's apparent scale is tied to the 3D camera depth and approaches full size before the real DOM handoff.
- The camera track is made continuous rather than restarting easing at each architectural chapter.
- Visual sequence target shortened from ~2.52s to ~2.14s.
- The previous scene versions remain as frozen recoverable checkpoints, not overwritten.

## Acceptance checks for the next recording
- Before click: Screen 01 remains unchanged.
- First 0–25%: CTA visibly transforms into the entrance; no headline zoom or blank wait.
- Middle 25–75%: camera passes real near geometry; Work can be seen through the structure and grows as we advance. No ghosted copied text or detached miniature framed card.
- Final 75–100%: foreground geometry parts, Work fills actual viewport, no hole/fringe/seam, double text or layout jump.
- Normal clicks and fallbacks, touch and keyboard, Back/Forward, interrupted motion, reduced-motion/no-WebGL and native scroll all work.
- Inspect desktop 1440x900, portrait 390x844, narrow 320x568. Use normal-speed recordings plus paused frames at 10/25/50/75/90/100%. Performance must be measured on representative hardware; do not equate 30fps video capture with real runtime FPS.

**Preservation boundaries:** Screen 02–04, `motion.js`, existing Work content, production Next.js integration, `main`, preview branches and deployed site are NOT authorized for modification, merge or release by this decision.

## Change control
The **concept is frozen**. Subsequent contributors should only implement/polish the above journey. If a technical tradeoff cannot preserve it, report the conflict rather than invent a replacement creative direction. Final visual acceptance belongs to founder; no branch merge or deployment without separate explicit authorization.
