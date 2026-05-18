/**
 * Marquee — slim luxury performance ticker placed directly under the
 * homepage hero. Text-only (no logos, no images). Two identical tracks
 * sit side-by-side and translate together so the loop is seamless.
 *
 *  - 70px mobile / 80px desktop strip
 *  - Glass background (semi-transparent + backdrop-blur)
 *  - Hairline gold borders top + bottom
 *  - Subtle red + gold ambient glow inside
 *  - Left + right edge fade masks so items appear to dissolve at the edges
 *  - Pause-on-hover via CSS (`group-hover:[animation-play-state:paused]`)
 *  - Alternating colour: car names in soft white, stats / keywords in
 *    champagne gold, separator diamonds in faint gold
 */

import { Fragment } from "react";

type Item = { label: string; accent?: boolean };

// Pattern: brand statement → car name → stat → car name → stat …
// `accent: true` items render in champagne gold; the rest render white.
const ITEMS: Item[] = [
  { label: "NoirSpeed Collection", accent: true },
  { label: "Koenigsegg Jesko Absolut" },
  { label: "500+ km/h", accent: true },
  { label: "Bugatti Chiron Super Sport 300+" },
  { label: "300+ mph Legend", accent: true },
  { label: "Bugatti Bolide" },
  { label: "Track Hypercar", accent: true },
  { label: "Rimac Nevera" },
  { label: "Electric Hypercar", accent: true },
  { label: "Ferrari SF90 Stradale" },
  { label: "Hybrid Flagship", accent: true },
  { label: "Lamborghini Revuelto" },
  { label: "V12 Hybrid", accent: true },
  { label: "McLaren Speedtail" },
  { label: "Luxury Speedtail", accent: true },
  { label: "Aston Martin Valkyrie" },
  { label: "F1-Derived", accent: true },
];

export function Marquee() {
  return (
    <section
      aria-label="NoirSpeed performance ticker"
      className="group relative w-full h-[70px] md:h-[80px] overflow-hidden border-y border-noir-gold/15 bg-gradient-to-b from-noir-bg via-noir-alt/40 to-noir-bg backdrop-blur-md"
    >
      {/* Subtle red + gold ambient glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 left-1/4 w-72 h-24 bg-noir-red/8 blur-[80px]" />
        <div className="absolute -bottom-10 right-1/4 w-72 h-24 bg-noir-gold/6 blur-[80px]" />
      </div>

      {/* Edge dissolves so items fade in/out at the strip's edges */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-noir-bg via-noir-bg/85 to-transparent z-10 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-noir-bg via-noir-bg/85 to-transparent z-10 pointer-events-none"
      />

      {/* The marquee track. Two identical halves sit side-by-side and
          translate together so the loop is seamless. Pause on hover. */}
      <div className="absolute inset-0 flex items-center">
        <Track />
        <Track ariaHidden />
      </div>
    </section>
  );
}

function Track({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex shrink-0 items-center gap-10 md:gap-14 px-5 md:px-7 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]"
    >
      {ITEMS.map((item, i) => (
        <Fragment key={i}>
          <span
            className={`text-[12px] md:text-[14px] tracking-[0.22em] uppercase ${
              item.accent ? "text-noir-gold" : "text-noir-text/90"
            }`}
          >
            {item.label}
          </span>
          <span
            aria-hidden
            className="text-noir-gold/45 text-[10px] md:text-xs leading-none"
          >
            ◆
          </span>
        </Fragment>
      ))}
    </div>
  );
}
