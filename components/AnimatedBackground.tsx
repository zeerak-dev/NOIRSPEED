/**
 * AnimatedBackground — subtle, slow, luxury layer that sits behind every
 * page. Pure CSS — no JS runtime cost, no listeners, no layout work.
 *
 * Layers, back to front:
 *  1. Red glow orb that drifts horizontally (~28 s, alternating)
 *  2. Gold glow orb that drifts diagonally (~36 s, alternating)
 *  3. Faint diagonal racing-line "carbon weave" overlay (static)
 *  4. Soft radial edge vignette (static)
 *
 * Notes
 *  - `fixed inset-0 -z-10 pointer-events-none` puts it above the body
 *    background-color but below every section in document flow.
 *  - Sections with their own `bg-*` (e.g. HeroStage) naturally cover it.
 *    Transparent sections (Curated Hypercars, Performance Stats, …)
 *    let the animated layer show through.
 *  - Mobile gets smaller orbs, less blur, lower opacity — the same
 *    visual idea at ~1/3 the GPU cost.
 *  - `motion-safe:animate-*` means animations stop automatically for
 *    users with prefers-reduced-motion. The static layers stay.
 *  - `will-change-transform` hints the GPU to compose the orbs on their
 *    own layers so the drift is buttery on mid-range hardware.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
    >
      {/* Red glow — horizontal drift */}
      <div
        className="absolute top-1/4 -left-[20vw] w-[80vw] h-[80vw] md:w-[45vw] md:h-[45vw] rounded-full bg-noir-red/[0.05] md:bg-noir-red/[0.09] blur-[80px] md:blur-[160px] will-change-transform motion-safe:animate-bg-drift-x"
      />

      {/* Gold glow — diagonal drift in the opposite direction */}
      <div
        className="absolute bottom-1/4 -right-[20vw] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] rounded-full bg-noir-gold/[0.04] md:bg-noir-gold/[0.07] blur-[80px] md:blur-[150px] will-change-transform motion-safe:animate-bg-drift-y"
      />

      {/* Faint diagonal racing-line carbon weave (static) */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0,transparent_40px,rgba(245,245,245,0.012)_40px,rgba(245,245,245,0.012)_41px)]" />

      {/* Soft edge vignette (static) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
