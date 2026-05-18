"use client";

/**
 * SafeImage
 * --------------------------------------------------------------
 * Renders an optimized Next.js image. If the file is missing or
 * fails to load (404), it transparently swaps in a premium dark
 * "Image coming soon" placeholder so the layout never breaks.
 *
 * IMPORTANT
 *  - Real assets are added later by dropping files into
 *    /public/cars/<slug>/<filename>.webp
 *  - DO NOT replace `src` with random internet URLs.
 *  - DO NOT embed copyrighted media.
 *  - The placeholder is intentionally luxury-styled so the page
 *    still feels premium during the asset-collection phase.
 * --------------------------------------------------------------
 */

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type Aspect = "video" | "square" | "portrait" | "wide" | "tall";

const aspectClass: Record<Aspect, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
  tall: "aspect-[9/16]",
};

type SafeImageProps = Omit<ImageProps, "alt" | "src"> & {
  src: string;
  alt: string;
  /** Text shown inside the placeholder (defaults to alt). */
  label?: string;
  /** Aspect-ratio wrapper. If omitted, parent must size the container. */
  aspect?: Aspect;
  className?: string;
};

export function SafeImage({
  src,
  alt,
  label,
  aspect,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  ...rest
}: SafeImageProps) {
  const [errored, setErrored] = useState(false);
  const wrapperBase = aspect ? aspectClass[aspect] : "";

  if (errored) {
    return (
      <ImagePlaceholder
        label={label ?? alt}
        className={`${wrapperBase} ${className}`.trim()}
      />
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${wrapperBase} ${className}`.trim()}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        onError={() => setErrored(true)}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        {...rest}
      />
    </div>
  );
}

/**
 * Premium dark placeholder card.
 * Re-usable as a standalone block if a component knows there's no asset yet.
 */
export function ImagePlaceholder({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center bg-noir-alt border border-noir-border overflow-hidden ${className}`.trim()}
    >
      {/* Soft red + gold glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-noir-red/15 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-noir-gold/10 blur-3xl rounded-full" />
      </div>
      {/* Subtle diagonal weave */}
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_48%,rgba(255,255,255,0.025)_50%,transparent_52%)] bg-[length:28px_28px]" />
      <div className="relative z-10 text-center px-6">
        {label && (
          <p className="text-noir-text text-sm md:text-base font-light tracking-[0.2em] uppercase">
            {label}
          </p>
        )}
        <p className="mt-2 text-noir-muted text-[10px] tracking-[0.3em] uppercase">
          Image coming soon
        </p>
        <div className="mt-4 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-noir-gold to-transparent" />
      </div>
    </div>
  );
}
