"use client";

/**
 * Safe3DPlaceholder
 * --------------------------------------------------------------
 * Premium 3D-style placeholder for the hero section.
 * Used until /models/jesko.glb (or any .glb model) is provided.
 *
 * IMPORTANT
 *  - DO NOT embed random third-party 3D models or Sketchfab links.
 *  - When a real model is provided, swap this component for the
 *    Spline / React Three Fiber viewer in the hero section.
 *  - Pure CSS — zero runtime 3D cost. Safe to ship in production
 *    while the .glb is still being prepared.
 * --------------------------------------------------------------
 */

type Safe3DPlaceholderProps = {
  label?: string;
  className?: string;
};

export function Safe3DPlaceholder({
  label = "3D View Coming Soon",
  className = "",
}: Safe3DPlaceholderProps) {
  return (
    <div
      className={`relative w-full h-full min-h-[320px] flex items-center justify-center ${className}`.trim()}
    >
      {/* Light pools */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full bg-noir-red/15 blur-[100px] animate-pulse-soft" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] aspect-square rounded-full bg-noir-gold/10 blur-[80px]" />
      </div>

      {/* Concentric rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[78%] aspect-square rounded-full border border-noir-border" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[58%] aspect-square rounded-full border border-noir-gold/20 animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38%] aspect-square rounded-full border border-noir-red/20" />

      {/* Center card */}
      <div className="relative z-10 px-8 py-6 bg-noir-alt/70 border border-noir-border rounded-xl backdrop-blur-sm text-center">
        <p className="text-noir-gold text-[10px] tracking-[0.4em] uppercase">
          NoirSpeed
        </p>
        <p className="mt-2 text-noir-text text-sm tracking-[0.2em] uppercase">
          {label}
        </p>
        <div className="mt-3 mx-auto w-12 h-px bg-gradient-to-r from-transparent via-noir-red to-transparent" />
      </div>
    </div>
  );
}
