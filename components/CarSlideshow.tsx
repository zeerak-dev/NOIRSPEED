"use client";

/**
 * CarSlideshow — slow crossfade between a list of landscape car images
 * with a subtle Ken Burns zoom on the active frame. Shared between the
 * homepage hero panel (Jesko) and the support cards (Chiron SS, Bolide)
 * so every featured car animates the same premium way.
 *
 * All images are mounted up-front so crossfades are smooth (no layout
 * flash). Defaults: 5.5 s per slide · 1.4 s fade · 1.0 → 1.06 zoom.
 */

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

type CarSlideshowProps = {
  images: string[];
  alt: string;
  /** Next.js Image `sizes` prop — tune per usage so the right res is served. */
  sizes: string;
  /** Mark the first image as priority (LCP). Default false. */
  priority?: boolean;
  /** Milliseconds between slide switches. */
  intervalMs?: number;
  /** Crossfade duration in ms. */
  fadeMs?: number;
  /** Ken Burns zoom duration in ms (matches/exceeds intervalMs). */
  zoomMs?: number;
  /** Final zoom scale. 1.0 = no zoom. */
  zoomTo?: number;
};

export function CarSlideshow({
  images,
  alt,
  sizes,
  priority = false,
  intervalMs = 5500,
  fadeMs = 1400,
  zoomMs = 6800,
  zoomTo = 1.06,
}: CarSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      intervalMs
    );
    return () => clearInterval(t);
  }, [images.length, intervalMs]);

  return (
    <>
      {images.map((src, i) => {
        const active = i === index;
        return (
          <motion.div
            key={src}
            initial={false}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: fadeMs / 1000, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <motion.div
              animate={{ scale: active ? zoomTo : 1 }}
              transition={{ duration: zoomMs / 1000, ease: "linear" }}
              className="absolute inset-0"
            >
              <Image
                src={src}
                alt={alt}
                fill
                priority={priority && i === 0}
                quality={92}
                sizes={sizes}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}
