import Link from "next/link";
import { cars } from "@/data/cars";
import { HeroFeatureCard } from "@/components/HeroFeatureCard";
import { SupportCarCard } from "@/components/SupportCarCard";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Reveal } from "@/components/Reveal";
import { StatsCounter } from "@/components/StatsCounter";
import { Marquee } from "@/components/Marquee";
import { HeroStage } from "@/components/HeroStage";

// Curated homepage editorial: 1 hero panel + 2 supporting cards.
// Hero = first car in data/cars.ts (Jesko Absolut).
// Supports = next two (Chiron Super Sport 300+, Bolide).
const featuredHero = cars[0];
const supportingCars = cars.slice(1, 3);

// Per-car landscape slideshow shots for the curated section.
// Keys are car slugs. When a card has an entry here, its image area
// becomes a Ken Burns crossfade instead of a single still.
const SLIDESHOWS: Record<string, string[]> = {
  "koenigsegg-jesko-absolut": [
    "/cars/koenigsegg-jesko-absolut/jesko-hero.jpg",
    "/cars/koenigsegg-jesko-absolut/jesko-side.jpg",
    "/cars/koenigsegg-jesko-absolut/jesko-rear.jpg",
  ],
  "bugatti-chiron-super-sport-300": [
    "/cars/bugatti-chiron-super-sport-300/chiron-ss-hero.jpg",
    "/cars/bugatti-chiron-super-sport-300/chiron-ss-front.jpg",
    "/cars/bugatti-chiron-super-sport-300/chiron-ss-back.jpg",
  ],
  "bugatti-bolide": [
    "/cars/bugatti-bolide/bolide-hero.jpg",
    "/cars/bugatti-bolide/bolide-front.jpg",
    "/cars/bugatti-bolide/bolide-side.jpg",
  ],
};

// Combined horsepower across the full roster — recomputed automatically.
const totalHorsepower = cars.reduce((sum, c) => {
  const match = c.horsepower.match(/[\d,]+/);
  return sum + (match ? parseInt(match[0].replace(/,/g, ""), 10) : 0);
}, 0);

// Unique brand count, derived from the cars data (used in the stats block).
const uniqueBrandCount = new Set(cars.map((c) => c.brand)).size;

export default function HomePage() {
  return (
    <>
      <LoadingScreen />

      {/* HERO — luxury full-bleed VIDEO hero. No text. Just the car.
          Letterbox + corner brackets + scroll cue framing.
          Video source: /public/videos/hero-vedio.mp4 */}
      <HeroStage />

      {/* Slim luxury performance marquee — sits between hero and the
          curated section with generous breathing room so it never feels
          glued to the hero. The hero already fills the full viewport,
          so this margin only kicks in once the user scrolls past it. */}
      <div className="mt-20 md:mt-28">
        <Marquee />
      </div>

      {/* CURATED HYPERCARS — editorial showcase.
          1 large hero panel (Jesko, with image slideshow) + 2 supporting
          cards (Chiron SS, Bolide). Wider container (1440px) to feel
          expansive and less boxed-in. Top padding ~80-96px gives the
          marquee enough room to breathe before the heading appears. */}
      <section className="relative pt-20 md:pt-24 pb-20 md:pb-28 overflow-hidden">
        {/* Soft dark gradient backdrop — gives the section a distinct mood */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[55vh] bg-noir-red/[0.04] blur-[140px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[45vh] bg-noir-gold/[0.03] blur-[140px]" />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12">
          {/* Section header — short, professional, no decorative copy */}
          <Reveal className="text-center max-w-3xl mx-auto">
            <p className="text-noir-gold text-[10px] tracking-[0.45em] uppercase">
              Curated Hypercars
            </p>
            <h2 className="mt-4 text-3xl md:text-5xl font-normal tracking-tight text-noir-text leading-[1.1]">
              Machines Built Beyond Limits
            </h2>
            <p className="mt-4 text-noir-muted text-sm md:text-base leading-relaxed max-w-md mx-auto">
              A focused showcase of extreme luxury performance.
            </p>
            <div className="mt-6 mx-auto h-px w-20 bg-gradient-to-r from-transparent via-noir-gold/60 to-transparent" />
          </Reveal>

          {/* Main hero feature panel — slideshow of 3 landscape Jesko shots */}
          <div className="mt-14 md:mt-16">
            <HeroFeatureCard
              car={featuredHero}
              slideshowImages={SLIDESHOWS[featuredHero.slug]}
            />
          </div>

          {/* Two supporting cars — side by side on desktop, stacked on mobile.
              Each card uses the same Ken Burns slideshow as the Jesko hero. */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {supportingCars.map((car, i) => (
              <SupportCarCard
                key={car.id}
                car={car}
                index={i}
                slideshowImages={SLIDESHOWS[car.slug]}
              />
            ))}
          </div>

          {/* Explore All Cars button — centered, gold border + gold-glow hover */}
          <Reveal delay={0.3} className="mt-12 md:mt-16 text-center">
            <Link
              href="/cars"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-noir-card border border-noir-gold/40 text-noir-text text-[11px] tracking-[0.3em] uppercase rounded-full overflow-hidden transition-all duration-500 hover:border-noir-gold hover:text-noir-gold hover:shadow-[0_0_42px_-8px_rgba(212,175,55,0.55)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-noir-gold/0 via-noir-gold/8 to-noir-gold/0"
              />
              <span className="relative">Explore All Cars</span>
              <span className="relative transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* PERFORMANCE STATS */}
      <section className="relative mt-32 py-20 border-y border-noir-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[60%] h-[60%] bg-noir-red/5 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[60%] h-[60%] bg-noir-gold/5 blur-[140px] rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <Reveal className="text-center">
            <p className="text-noir-gold text-[10px] tracking-[0.4em] uppercase">
              By The Numbers
            </p>
            <h2 className="mt-3 text-3xl md:text-5xl font-light tracking-[0.05em] text-noir-text">
              Performance, Defined
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
            <BigStat label="Top Speed" value={500} suffix=" km/h" />
            <BigStat label="Combined HP" value={totalHorsepower} suffix="" />
            <BigStat label="Brands" value={uniqueBrandCount} suffix="" />
            <BigStat label="Hypercars" value={cars.length} suffix="" />
          </div>
        </div>
      </section>

      {/* COMPARE CTA */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-32">
        <Reveal>
          <div className="relative overflow-hidden bg-noir-card border border-noir-border rounded-2xl p-10 md:p-16 text-center">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-noir-red/10 blur-[120px] rounded-full" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-noir-gold/10 blur-[120px] rounded-full" />
            </div>
            <p className="relative z-10 text-noir-gold text-[10px] tracking-[0.4em] uppercase">
              Side-by-Side
            </p>
            <h2 className="relative z-10 mt-3 text-3xl md:text-5xl font-light tracking-[0.05em] text-noir-text max-w-2xl mx-auto">
              Compare The Finest
            </h2>
            <p className="relative z-10 mt-4 text-noir-muted text-sm md:text-base max-w-xl mx-auto">
              Pit hypercar against hypercar. Specs, performance, and pricing — all
              in one cinematic table.
            </p>
            <Link
              href="/compare"
              className="relative z-10 mt-8 inline-flex items-center gap-3 px-7 py-4 border border-noir-border text-noir-text text-[11px] tracking-[0.3em] uppercase rounded-full hover:border-noir-gold/60 hover:bg-noir-gold/5 transition-all"
            >
              Start Compare →
            </Link>
          </div>
        </Reveal>
      </section>

    </>
  );
}

function BigStat({
  label,
  value,
  suffix,
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  return (
    <div className="text-center">
      <p className="text-noir-text text-4xl md:text-5xl font-light tracking-tight">
        <StatsCounter value={value} suffix={suffix} />
      </p>
      <p className="mt-2 text-noir-muted text-[10px] tracking-[0.3em] uppercase">
        {label}
      </p>
    </div>
  );
}

