# System Upgrades — Compounding Improvements Log

> Per CLAUDE.md Rule 6, every completed task adds one concrete, actionable improvement.

---

## 2026-05-16 — NoirSpeed foundation: asset + data structure setup

**Suggestion:** Add a tiny `scripts/check-assets.mjs` script (and wire it to `npm run check:assets`) that walks `data/cars.ts`, resolves every `heroImage` / `gallery` / `model3d` path under `public/`, and prints a missing-vs-present matrix to the terminal — colored red for missing, green for present.

**Why:** Right now, the only way to know which of the ~72 expected car images you still need to provide is to open every car folder one at a time. A single command would print the entire status at a glance.

**Impact:** Cuts asset-tracking time from "open 12 folders + count files" to "run one command and read a table." Lets you batch-collect images by priority (e.g. "hero images first"). Becomes invaluable once you start uploading real assets — you'll catch missing files before a 404 ships to production.

---

## 2026-05-17 — Editorial homepage: hero panel + 2 supports + cleaner type

**Suggestion:** Extract `getDisplaySpecs(car: Car)` into `data/cars.ts` returning `{ power, topSpeed, acceleration }` already stripped to display form. Right now every card component does its own `car.horsepower.split(' ')[0]` and `car.acceleration.replace('0–100 km/h in ', '')` parsing inline — duplicated across HeroFeatureCard, SupportCarCard, CarCard, the homepage `MiniStat` helper, and the car detail page's headline stats.

**Why:** If you ever change the spec format in `data/cars.ts` (e.g. switch to mph, drop the "≈", add metric-only mode), today you have to hunt down ~5 call sites and update each one's parsing. One helper means one edit.

**Impact:** Eliminates a class of "looks fine in card A, breaks in card B" regressions before they happen. Also unlocks niceties like a `getDisplaySpecs(car, { unit: 'mph' })` overload for future i18n / unit-switching without touching any component.

---

## 2026-05-17 — Homepage curated trio + roster trim (12 → 8 cars)

**Suggestion:** Move the "featured 3" car list from `cars.slice(0, 3)` in `app/page.tsx` to a typed `featuredSlugs: string[]` constant in `data/cars.ts` (or a tiny `data/curation.ts`) that the homepage looks up by slug.

**Why:** Right now changing the homepage trio means either (a) reordering the master `cars` array — which also reshuffles the listing/compare/detail pages — or (b) editing the page itself. Decoupling "what's curated" from "what's in the catalog" lets you swap the hero trio (e.g. for a seasonal Bugatti spotlight, an EV month, etc.) without touching `app/page.tsx` or the order on `/cars`.

**Impact:** Turns the homepage's most editorial decision into a one-line edit. Same pattern unlocks future curated lists ("Editor's pick of the month", "Quickest under $1M") trivially.

---

## 2026-05-16 — Hero video + intro slider + custom car cursor

**Suggestion:** Add a global `prefers-reduced-motion` honoring layer — wrap motion components (`Reveal`, `StatsCounter`, `WebsiteIntroSlider`, `CarCursor`) so they collapse to instant/no-motion variants when the user has reduced-motion turned on at the OS level, and fall back to the system cursor in that case.

**Why:** This phase added a cursor replacement, an auto-advancing slider, scroll reveals, and count-up numbers — all animation-heavy. For users with vestibular disorders or motion sensitivity (or anyone who set "reduce motion" in Windows/macOS), this currently still animates. It's both an accessibility miss and a minor SEO/Lighthouse hit.

**Impact:** Brings the site to AA accessibility standards before launch, prevents one-star reviews from motion-sensitive users, and bumps Lighthouse a11y score. Tiny implementation: a `useReducedMotion()` hook from `motion/react` short-circuits transitions to `{ duration: 0 }` and `CarCursor` early-returns null.

---

## 2026-05-16 — NoirSpeed pages, components, animations

**Suggestion:** Add a Lighthouse + bundle-size budget check to a `npm run audit:perf` script (using `lighthouse` CLI + `@next/bundle-analyzer`) and run it before each major commit.

**Why:** This phase pulled in three.js, @react-three/fiber, drei, and motion — easily ~600KB of JS if everything ends up in the homepage bundle. Dynamic imports + `ssr:false` on `Hero3DCanvas` keep that out of the initial payload, but as more pages get built (especially the gallery and detail pages), bundle bloat is the silent killer of "premium feel" — first paint slows, animations stutter on mid-tier laptops, mobile suffers most.

**Impact:** Catches regressions early (e.g. accidentally importing three from a server component, or a heavy date library landing on a marketing page). Keeps the cinematic feel actually fast — a luxury site that takes 4 seconds to draw the hero is no longer luxury.

---

## 2026-05-19 — Hero / Marquee spacing fix

**Suggestion:** Define a single `--nav-h` CSS variable in `globals.css` (e.g. `:root { --nav-h: 4rem; } @media (min-width: 768px) { :root { --nav-h: 72px; } }`) and reuse it everywhere the navbar height is referenced — currently the navbar height (64px / 72px) is hard-coded in at least two spots (`HeroStage.tsx` negative margin + height calc), and any future tweak to the navbar means hunting them down.

**Why:** Today's bug — the marquee feeling glued to the hero — was caused by the hero's `-mt-16 md:-mt-[72px]` pulling it under the navbar without compensating its `h-[100svh]`, so the hero ended 64-72px above viewport bottom. The fix used `h-[calc(100svh+4rem)] md:h-[calc(100svh+72px)]`, but those magic numbers now live in two places that MUST stay in sync.

**Impact:** One source of truth for navbar height. Resize the navbar once, every full-bleed hero/section automatically follows. Prevents the exact class of "two numbers drift apart" bug we just fixed.

---
