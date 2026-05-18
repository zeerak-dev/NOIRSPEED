"use client";

/**
 * SupportCarCard — compact vertical card used for the two supporting cars
 * below the homepage hero panel. Visually lighter than the hero card and
 * the previous FeaturedCarCard: fewer borders, less type, more breathing
 * room. Two of these sit side-by-side on desktop.
 */

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "motion/react";
import type { Car } from "@/data/cars";
import { LuxuryPlaceholder } from "./LuxuryPlaceholder";
import { CarSlideshow } from "./CarSlideshow";

export function SupportCarCard({
  car,
  index = 0,
  slideshowImages,
}: {
  car: Car;
  index?: number;
  /** When provided (e.g. for the two Bugattis on the homepage), the image
   *  area becomes a slow crossfading slideshow — same Ken Burns treatment
   *  as the Jesko hero panel. Without it, falls back to car.heroImage. */
  slideshowImages?: string[];
}) {
  const [errored, setErrored] = useState(false);
  const useSlideshow = !!slideshowImages && slideshowImages.length > 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: 0.15 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group"
    >
      <Link
        href={`/cars/${car.slug}`}
        className="block bg-noir-card border border-noir-border rounded-2xl overflow-hidden transition-all duration-600 ease-out hover:border-noir-gold/45 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-40px_rgba(193,18,31,0.4)]"
      >
        {/* Image — slideshow when multiple images provided, single otherwise */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {useSlideshow ? (
            <CarSlideshow
              images={slideshowImages!}
              alt={`${car.brand} ${car.model}`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : errored ? (
            <LuxuryPlaceholder brand={car.brand} model={car.model} />
          ) : (
            <Image
              src={car.heroImage}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={88}
              onError={() => setErrored(true)}
              className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
            />
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:p-7">
          <span className="text-noir-gold text-[10px] tracking-[0.35em] uppercase">
            {car.brand}
          </span>

          <h3 className="mt-2 text-xl md:text-2xl font-normal text-noir-text leading-tight tracking-tight">
            {car.model}
          </h3>

          <p className="mt-2 text-noir-muted text-sm leading-relaxed">
            {car.tagline}
          </p>

          {/* Mini specs */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            <MiniSpec value={car.horsepower.split(" ")[0]} label="Power" />
            <MiniSpec value={car.topSpeed.split(" ")[0]} label="Top" />
            <MiniSpec
              value={car.acceleration.replace("0–100 km/h in ", "")}
              label="0–100"
            />
          </div>

          {/* Price + View link */}
          <div className="mt-6 pt-5 border-t border-noir-border/60 flex items-center justify-between">
            <span className="text-noir-muted text-xs">{car.price}</span>
            <span className="inline-flex items-center gap-1.5 text-noir-text text-[10px] tracking-[0.3em] uppercase transition-colors duration-500 group-hover:text-noir-gold">
              View
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

function MiniSpec({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center py-2 bg-noir-alt/50 border border-noir-border rounded-md">
      <p className="text-noir-text text-sm font-medium">{value}</p>
      <p className="mt-0.5 text-noir-muted text-[8.5px] tracking-[0.25em] uppercase">
        {label}
      </p>
    </div>
  );
}
