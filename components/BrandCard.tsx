"use client";

/**
 * BrandCard — premium card for the /brands page.
 * Uses SafeImage for the logo so missing logos show a clean placeholder.
 */

import { motion } from "motion/react";
import Link from "next/link";
import type { Brand } from "@/data/brands";
import { SafeImage } from "./SafeImage";

export function BrandCard({
  brand,
  carCount,
  index = 0,
}: {
  brand: Brand;
  carCount: number;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: (index % 5) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative bg-noir-card border border-noir-border rounded-xl overflow-hidden group transition-all duration-500 hover:border-noir-gold/40"
    >
      <div className="p-8 flex flex-col items-center text-center">
        <div className="w-32 h-20 relative flex items-center justify-center">
          <SafeImage
            src={brand.logo}
            alt={`${brand.name} logo`}
            label={brand.name}
            className="!h-full !w-full"
          />
        </div>
        <h3 className="mt-6 text-noir-text text-lg tracking-[0.2em] uppercase">
          {brand.name}
        </h3>
        <p className="mt-1 text-noir-muted text-[10px] tracking-[0.3em] uppercase">
          {brand.country} · {brand.founded}
        </p>
        <p className="mt-4 text-noir-muted text-xs italic leading-relaxed">
          “{brand.tagline}”
        </p>
        <p className="mt-3 text-noir-muted text-xs leading-relaxed">
          {brand.signature}
        </p>
        <div className="mt-6 pt-6 border-t border-noir-border w-full flex items-center justify-between">
          <span className="text-noir-gold text-[10px] tracking-[0.3em] uppercase">
            {carCount} {carCount === 1 ? "Model" : "Models"}
          </span>
          <Link
            href={`/cars?brand=${encodeURIComponent(brand.name)}`}
            className="text-noir-text text-[10px] tracking-[0.3em] uppercase border-b border-transparent hover:border-noir-gold/60 hover:text-noir-gold transition-all"
          >
            Explore →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
