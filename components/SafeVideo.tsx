"use client";

/**
 * SafeVideo
 * --------------------------------------------------------------
 * Renders a <video> element. If the file is missing or fails to
 * load, falls back to a premium animated dark background so the
 * loading screen / hero area still feels cinematic.
 *
 * IMPORTANT
 *  - Real video is added later by dropping a file at the path
 *    referenced by `src` (e.g. /videos/loading-car.webm).
 *  - DO NOT replace `src` with random internet URLs.
 *  - DO NOT embed copyrighted media.
 *  - The fallback uses CSS-only animations (no extra assets).
 * --------------------------------------------------------------
 */

import { useEffect, useState } from "react";

type SafeVideoProps = {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  /** Optional poster (image path). If missing, no poster is shown. */
  poster?: string;
  /**
   * How aggressively the browser should preload the video.
   *  - "auto" (default): start downloading immediately. Best for large hero
   *    videos so the first frame appears as fast as possible.
   *  - "metadata": only fetch headers + dimensions.
   *  - "none": don't fetch anything until play() is called.
   */
  preload?: "auto" | "metadata" | "none";
};

export function SafeVideo({
  src,
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  poster,
  preload = "auto",
}: SafeVideoProps) {
  const [missing, setMissing] = useState(false);

  // Preflight HEAD request — if the file isn't there yet, show the fallback
  // immediately rather than waiting for a broken <video> error event.
  useEffect(() => {
    let cancelled = false;
    fetch(src, { method: "HEAD" })
      .then((r) => {
        if (!cancelled && !r.ok) setMissing(true);
      })
      .catch(() => {
        if (!cancelled) setMissing(true);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (missing) {
    return <VideoPlaceholder className={className} />;
  }

  return (
    <video
      src={src}
      poster={poster}
      preload={preload}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      onError={() => setMissing(true)}
      className={`w-full h-full object-cover ${className}`.trim()}
    />
  );
}

/**
 * Premium animated dark fallback — used when the loading video is missing.
 * Pure CSS, lightweight, ~1KB of style. Looks cinematic on its own.
 */
export function VideoPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-noir-bg ${className}`.trim()}>
      {/* Drifting red + gold light pools */}
      <div className="absolute inset-0 animate-noir-drift">
        <div className="absolute top-0 left-1/4 w-[60%] h-[60%] bg-noir-red/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[55%] h-[55%] bg-noir-gold/10 blur-[120px] rounded-full" />
      </div>
      {/* Speed lines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_64px,rgba(255,255,255,0.025)_64px,rgba(255,255,255,0.025)_65px)]" />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
