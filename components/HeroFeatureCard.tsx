"use client";

/**
 * HeroFeatureCard — large editorial panel for the headline car on the
 * homepage curated section.
 *
 * Desktop (lg+): image left (~58%), content right (~42%).
 * Mobile/tablet: image on top, content below.
 *
 * Typography is intentionally cleaner than the previous cards:
 *  - Inter sans-serif throughout (no Playfair display)
 *  - No italics
 *  - Tight tracking on the model name
 *  - Gold is used only for the tiny brand label and the accent line
 */

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import type { Car } from "@/data/cars";
import { LuxuryPlaceholder } from "./LuxuryPlaceholder";
import { CarSlideshow } from "./CarSlideshow";

/**
 * HeroFeatureCard — when `slideshowImages` is provided (e.g. for the Jesko
 * panel with multiple landscape shots), the image area becomes a slow
 * crossfading slideshow with a subtle Ken Burns zoom. Otherwise it shows
 * `car.heroImage` as a single image with the standard SafeImage fallback.
 */
export function HeroFeatureCard({
  car,
  slideshowImages,
}: {
  car: Car;
  slideshowImages?: string[];
}) {
  const [errored, setErrored] = useState(false);
  const useSlideshow = !!slideshowImages && slideshowImages.length > 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* Soft red ambient bloom behind the panel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-8 -inset-y-4 -z-10 bg-gradient-to-br from-noir-red/10 via-transparent to-noir-gold/6 blur-[80px]"
      />

      <Link
        href={`/cars/${car.slug}`}
        className="relative grid grid-cols-1 lg:grid-cols-12 bg-noir-card border border-noir-gold/25 rounded-2xl overflow-hidden transition-all duration-700 ease-out hover:border-noir-gold/55 hover:shadow-[0_60px_120px_-60px_rgba(193,18,31,0.45)]"
      >
        {/* Image area — slideshow when multiple images provided */}
        <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[460px] overflow-hidden">
          {useSlideshow ? (
            <CarSlideshow
              images={slideshowImages!}
              alt={`${car.brand} ${car.model}`}
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          ) : errored ? (
            <LuxuryPlaceholder brand={car.brand} model={car.model} />
          ) : (
            <Image
              src={car.heroImage}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              quality={92}
              priority
              onError={() => setErrored(true)}
              className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.05]"
            />
          )}
          {/* Soft gradient blend toward the content side on desktop */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-noir-card/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-noir-card/30 pointer-events-none z-10"
          />
        </div>

        {/* Content area */}
        <div className="relative lg:col-span-5 flex flex-col justify-center p-8 md:p-10 lg:p-12">
          <span className="text-noir-gold text-[10px] tracking-[0.4em] uppercase">
            {car.brand}
          </span>

          <h3 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-normal text-noir-text leading-[1.05] tracking-tight">
            {car.model}
          </h3>

          <p className="mt-4 text-noir-muted text-base md:text-lg leading-relaxed max-w-md">
            {car.tagline}
          </p>

          {/* Specs */}
          <div className="mt-7 grid grid-cols-3 gap-3 max-w-md">
            <Spec
              value={car.horsepower.split(" ")[0]}
              label="Power"
            />
            <Spec
              value={car.topSpeed.split(" ")[0]}
              label="Top Speed"
            />
            <Spec
              value={car.acceleration.replace("0–100 km/h in ", "")}
              label="0–100"
            />
          </div>

          {/* Price + button */}
          <div className="mt-8 pt-6 border-t border-noir-border flex items-center justify-between gap-3">
            <span className="text-noir-muted text-sm">{car.price}</span>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-noir-gold/40 text-noir-text text-[11px] tracking-[0.3em] uppercase rounded-full transition-all duration-500 group-hover:border-noir-gold group-hover:bg-noir-gold/8 group-hover:text-noir-gold">
              View Details
              <span className="transition-transform duration-500 group-hover:translate-x-0.5">
                →
              </span>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function Spec({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-noir-alt/70 border border-noir-border rounded-lg py-3 px-2 text-center">
      <p className="text-noir-text text-base md:text-lg font-medium">{value}</p>
      <p className="mt-1 text-noir-muted text-[9px] tracking-[0.28em] uppercase">
        {label}
      </p>
    </div>
  );
}
