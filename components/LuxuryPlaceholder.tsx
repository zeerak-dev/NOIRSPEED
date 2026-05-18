/**
 * LuxuryPlaceholder — shown when a car's hero image hasn't been provided yet.
 *
 * Pure CSS + inline SVG (no external assets). Used by both HeroFeatureCard
 * and SupportCarCard on the homepage so the curated section never looks
 * broken while assets are still being collected.
 *
 *  - Dark carbon-weave base (two layers of diagonal hairlines)
 *  - Red corner glow (top-left) + gold corner glow (bottom-right)
 *  - Faint pure-SVG car silhouette in the corner
 *  - Minimal centered label: brand · model · gold divider · status
 *  - `compact` variant hides brand/model (used when the card already
 *    shows them right next to the image)
 */

export function LuxuryPlaceholder({
  brand,
  model,
  compact = false,
}: {
  brand?: string;
  model?: string;
  compact?: boolean;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-noir-alt overflow-hidden">
      {/* Carbon-weave: two diagonal hairline layers */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0,transparent_6px,rgba(255,255,255,0.025)_6px,rgba(255,255,255,0.025)_7px)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0,transparent_6px,rgba(255,255,255,0.015)_6px,rgba(255,255,255,0.015)_7px)]" />

      {/* Red + gold corner glows */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-noir-red/20 blur-[110px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-noir-gold/15 blur-[110px] rounded-full" />

      {/* Faint car silhouette behind the text */}
      <svg
        viewBox="0 0 200 70"
        className="absolute bottom-4 right-4 w-2/3 opacity-[0.07]"
        fill="none"
        aria-hidden
      >
        <path
          d="M10 55 L24 55 Q28 38 44 32 L72 22 Q92 14 124 14 L158 17 Q182 22 192 38 L196 50 L190 50 Q190 60 182 60 Q174 60 174 50 L52 50 Q52 60 44 60 Q36 60 36 50 Z"
          stroke="#F5F5F5"
          strokeWidth="0.8"
        />
        <circle cx="44" cy="55" r="7" stroke="#F5F5F5" strokeWidth="0.8" />
        <circle cx="174" cy="55" r="7" stroke="#F5F5F5" strokeWidth="0.8" />
      </svg>

      {/* Centered label */}
      <div className="relative z-10 text-center px-6">
        {!compact && brand && (
          <p className="text-noir-gold text-[10px] tracking-[0.4em] uppercase">
            {brand}
          </p>
        )}
        {!compact && model && (
          <p className="mt-2 text-noir-text text-lg md:text-xl font-light tracking-wide">
            {model}
          </p>
        )}
        {!compact && (
          <div className="mt-4 mx-auto h-px w-12 bg-gradient-to-r from-transparent via-noir-gold to-transparent" />
        )}
        <p
          className={`${
            compact ? "" : "mt-4"
          } text-noir-muted text-[9px] tracking-[0.35em] uppercase`}
        >
          Visual Asset Coming Soon
        </p>
      </div>
    </div>
  );
}
