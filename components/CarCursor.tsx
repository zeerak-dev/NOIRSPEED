"use client";

/**
 * CarCursor — replaces the system pointer with a sleek hypercar silhouette
 * that smoothly trails the mouse.
 *
 * Behaviour:
 *  - Spring-eased follow (motion.useSpring) so the car drifts behind the
 *    cursor with a luxury "weight" rather than snapping.
 *  - Tilts toward the movement direction for personality.
 *  - Grows + glows when hovering over interactive elements (a, button, etc).
 *  - Mouse-press squashes the car slightly for tactile feedback.
 *  - Auto-disables on touch devices (no pointer to replace).
 *  - System cursor is hidden via globals.css using a `@media (hover:hover)`
 *    rule — keyboard users still get focus rings.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const CAR_WIDTH = 56;
const CAR_HEIGHT = 22;

export function CarCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // Smooth, spring-eased follow. Two springs at slightly different stiffness
  // give the car a tiny trailing motion.
  const sx = useSpring(x, { damping: 26, stiffness: 320, mass: 0.45 });
  const sy = useSpring(y, { damping: 26, stiffness: 320, mass: 0.45 });

  // Tilt toward direction of motion. We track delta x via a ref so it doesn't
  // re-render on every move.
  const lastX = useRef(0);
  const tilt = useMotionValue(0);
  const rotate = useSpring(tilt, { damping: 18, stiffness: 200 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX.current;
      lastX.current = e.clientX;
      // Clamp tilt for subtlety. Max ~12deg.
      tilt.set(Math.max(-12, Math.min(12, dx * 1.6)));
      x.set(e.clientX - CAR_WIDTH / 2);
      y.set(e.clientY - CAR_HEIGHT / 2);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        'a, button, [role="button"], input, select, textarea, label, [data-cursor="hover"]'
      );
      setHovering(!!interactive);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      x.set(-200);
      y.set(-200);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y, tilt]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 z-[200] pointer-events-none mix-blend-normal"
      style={{
        x: sx,
        y: sy,
        width: CAR_WIDTH,
        height: CAR_HEIGHT,
        rotate,
      }}
    >
      <motion.div
        animate={{
          scale: pressed ? 0.85 : hovering ? 1.35 : 1,
          opacity: hovering ? 1 : 0.95,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 320 }}
        className="relative w-full h-full"
        style={{ filter: "drop-shadow(0 6px 14px rgba(193,18,31,0.45))" }}
      >
        {/* Hypercar side-profile silhouette */}
        <svg
          viewBox="0 0 64 24"
          width={CAR_WIDTH}
          height={CAR_HEIGHT}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="carBody" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#E73B4A" />
              <stop offset="100%" stopColor="#9A0E18" />
            </linearGradient>
            <linearGradient id="carGlass" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#181818" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#050505" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          {/* Body */}
          <path
            d="M2 18 L6 18 Q7 12 13 10 L20 7 Q26 4 36 4 L46 5 Q54 7 58 12 L62 14 L62 18 L58 18 Q58 21 55 21 Q52 21 52 18 L17 18 Q17 21 14 21 Q11 21 11 18 Z"
            fill="url(#carBody)"
            stroke="#D4AF37"
            strokeWidth="0.4"
          />
          {/* Glass */}
          <path
            d="M22 9 L27 5.2 L40 5.2 L46 9 L46 11 L22 11 Z"
            fill="url(#carGlass)"
            stroke="#D4AF37"
            strokeWidth="0.2"
            opacity="0.95"
          />
          {/* Side accent line */}
          <path
            d="M11 14 L52 14"
            stroke="#D4AF37"
            strokeWidth="0.35"
            opacity="0.85"
          />
          {/* Headlight */}
          <circle cx="59" cy="13" r="0.8" fill="#FFE082" />
          {/* Wheels */}
          <circle
            cx="14"
            cy="19"
            r="2.6"
            fill="#0A0A0A"
            stroke="#D4AF37"
            strokeWidth="0.35"
          />
          <circle cx="14" cy="19" r="1.1" fill="#1A1A1A" />
          <circle
            cx="55"
            cy="19"
            r="2.6"
            fill="#0A0A0A"
            stroke="#D4AF37"
            strokeWidth="0.35"
          />
          <circle cx="55" cy="19" r="1.1" fill="#1A1A1A" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
