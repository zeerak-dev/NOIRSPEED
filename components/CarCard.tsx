"use client";

/**
 * CarCard — animated premium card for cars listing.
 * Image area uses SafeImage so it never breaks while assets are placeholders.
 */

import Link from "next/link";
import { motion } from "motion/react";
import type { Car } from "@/data/cars";
import { SafeImage } from "./SafeImage";

export function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: (index % 6) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/cars/${car.slug}`}
        className="group relative block bg-noir-card border border-noir-border rounded-xl overflow-hidden transition-all duration-500 hover:border-noir-gold/40 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(193,18,31,0.35)]"
      >
        <div className="relative">
          <SafeImage
            src={car.heroImage}
            alt={`${car.brand} ${car.model}`}
            label={`${car.brand} ${car.model}`}
            aspect="video"
          />
          <div className="absolute top-3 left-3 px-3 py-1 bg-noir-bg/70 backdrop-blur-md border border-noir-border rounded-full">
            <span className="text-noir-gold text-[9px] tracking-[0.3em] uppercase">
              {car.category}
            </span>
          </div>
        </div>

        <div className="p-5 border-t border-noir-border">
          <p className="text-noir-gold text-[10px] tracking-[0.3em] uppercase">
            {car.brand}
          </p>
          <h3 className="mt-1 text-noir-text text-lg tracking-wide">
            {car.model}
          </h3>
          <p className="mt-2 text-noir-muted text-xs leading-relaxed line-clamp-2">
            {car.tagline}
          </p>

          <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
            <Stat label="Power" value={car.horsepower.split(" ")[0]} />
            <Stat label="Top Speed" value={car.topSpeed.split(" ")[0]} />
            <Stat label="0–100" value={car.acceleration.replace("0–100 km/h in ", "")} />
          </dl>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-noir-muted text-xs tracking-[0.2em] uppercase">
              {car.price}
            </span>
            <span className="text-noir-text text-[10px] tracking-[0.3em] uppercase border-b border-transparent group-hover:border-noir-gold/60 group-hover:text-noir-gold transition-all">
              View →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-noir-alt/60 border border-noir-border rounded-md py-2">
      <p className="text-noir-text text-xs tracking-wide">{value}</p>
      <p className="mt-0.5 text-noir-muted text-[8px] tracking-[0.25em] uppercase">
        {label}
      </p>
    </div>
  );
}
