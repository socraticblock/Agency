# Genezisi V2 — current implementation audit

**Date:** 4 October 2026  
**Repository:** `socraticblock/Agency`  
**Purpose:** establish what can be reused before the V2 hero prototype.  
**Status:** implementation audit only; no production redesign yet.

## Executive finding

**Keep the existing Next.js repository. Do not rewrite the site into another framework.**

The repo already contains almost every technical primitive needed for V2: Next.js, React, Tailwind, Framer Motion, Three/R3F/Drei, reduced-motion handling, locale routing, WhatsApp constants, SEO helpers and existing portfolio assets. V2 should be developed as a controlled evolution/prototype inside this repo.

## Current production homepage

The locale homepage is:

`src/app/[locale]/page.tsx` → `HomeLandingPage`

The visible homepage is the card/grid-heavy version represented in the supplied screenshot. It currently contains:

- website-only positioning;
- “Book a website call” / “Discuss my website” CTAs;
- booking/service/store service cards;
- selected work cards;
- a four-step process;
- three package cards at ₾999 / ₾1,999 / ₾3,999;
- founder/trust content;
- direct WhatsApp contact.

This is useful as a stable production baseline while V2 is prototyped separately.

## Existing motion work

There is already an experimental `KineticHero.tsx` in the repo.

Important: it is **not currently wired into the production locale homepage**.

It includes:

- Framer Motion;
- mouse parallax;
- scroll-linked opacity/scale;
- typewriter copy;
- a magnetic WhatsApp CTA;
- Mux/HLS background video;
- reduced-motion/coarse-pointer checks.

This is useful reference code, but it should not be treated as the V2 design. The V2 hero needs a new composition around **The Signal** and the Impress → Prove → Contact objective.

## Existing stack

From `package.json`:

- Next.js 16.2.x
- React 19.2.x
- Tailwind CSS 4
- Framer Motion 11
- Lenis
- Three.js
- React Three Fiber
- Drei
- Supabase
- Zod

No framework migration is justified at this stage.

## Motion / accessibility foundations already present

- `MotionPreferences.tsx` configures Framer Motion with `reducedMotion="user"`.
- Global CSS contains a `prefers-reduced-motion` fallback.
- Focus-visible styles already exist.
- viewport-safe-area handling already exists.
- the root layout contains a skip-to-content link.
- the existing hero code already disables mouse parallax for coarse pointers / reduced motion.

These are good foundations to preserve.

## Smooth scrolling

`LenisProvider.tsx` exists, but it is not mounted in the current root layout.

Recommendation: **do not enable it by default just because it exists.** First prototype the Signal hero with native scrolling. Add Lenis only if it produces a clear improvement on real desktop and mobile devices without harming input feel or accessibility.

## WebGL / 3D

Three.js, React Three Fiber and Drei are already installed.

Recommendation: start the V2 hero with **DOM + SVG + CSS/Framer/GSAP-style transforms**. Use WebGL only if a prototype proves that the visual gain is worth the extra complexity and mobile performance cost.

## Video / asset warning

`public/hero-bg-animation.mp4` is approximately **22.5 MB**.

The unused/experimental kinetic hero also depends on Mux/HLS background video.

For V2, hero video must not be required for first paint. A 22.5 MB local hero asset is not an acceptable mobile baseline for the new flagship homepage.

## Contact

The WhatsApp intake number and default message are already centralized in:

`src/constants/content.ts`

This means V2 can preserve the existing real contact destination while changing the visible CTA language from website-specific wording to something like **Message me**.

The default WhatsApp message should later be updated so it does not assume the visitor wants only a website.

## Languages

The app already supports locale routing for English and Georgian (`en` / `ka`).

V2 should preserve this architecture. English and Georgian layouts need independent line-break/typography QA rather than literal visual duplication.

## Metadata / SEO

Current homepage metadata is explicitly website-only (“Premium website design and development…”).

Before V2 launch, metadata, structured data, OG copy and service routes need to reflect the broader offer: websites, AI systems/assistants and automation.

Do not change this during the isolated visual prototype unless required for a preview route.

## Current information architecture to reconsider for V2

The current primary nav contains:

- Work
- Packages
- Process
- FAQ
- Digital Card

For the V2 homepage, the target is much simpler:

- Work
- What I Build
- About
- Message me

Existing SEO/service/pricing routes can remain available during transition even if they are no longer dominant homepage navigation.

## Recommended implementation approach

### 1. Protect production

Do not replace `HomeLandingPage` yet.

Create a separate V2 prototype route/component and use a preview deployment.

### 2. Build static Signal frames first

Create the six required states:

1. first paint;
2. enquiry received;
3. surface → system reveal;
4. routing / useful action;
5. human-review branch;
6. final settled composition.

Build desktop and mobile as separate compositions.

### 3. Animate only after static frames work

The first screen and final settled frame must look premium without animation.

Then add the bounded scroll sequence.

### 4. Mobile at the same time

Do not port the desktop animation afterward.

Desktop: layered spatial reveal.  
Mobile: vertical Signal story with one main panel at a time.

### 5. Use a preview route

Recommended temporary route:

`/[locale]/v2-prototype`

This lets us compare the existing production site against V2 without risking the live homepage.

### 6. Prototype technology

Use the current Next.js stack.

First choice:

- React/Next components;
- SVG path for the Signal;
- CSS transforms;
- Framer Motion initially, because it is already installed and used.

If the scroll choreography outgrows Framer Motion, add GSAP/ScrollTrigger deliberately for the signature scene rather than globally.

### 7. Performance gate before full redesign

Test the isolated hero on:

- desktop Chrome/Safari/Firefox;
- real iPhone Safari;
- real Android Chrome, including a mid-range device;
- reduced motion;
- fast scroll;
- reverse scroll;
- resize/orientation change.

Only after it reaches the intended visual quality **and** passes mobile/performance checks should the production homepage be rebuilt around it.

## Next concrete deliverable

**Static V2 hero keyframes + isolated `v2-prototype` route.**

The rest of the homepage should wait until that hero establishes the quality bar.
