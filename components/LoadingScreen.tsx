"use client";

/**
 * LoadingScreen — full-screen cinematic intro for the homepage.
 *
 * Behaviour:
 *  - Shows on first visit per browser tab (sessionStorage flag).
 *  - Plays /videos/loading-car.mp4 if present, otherwise the
 *    SafeVideo fallback gives an animated dark background.
 *  - Holds for 5 seconds, then fades out and unmounts.
 *  - The source video is 8s; we cut it short at 5s for snappier UX.
 *
 * IMPORTANT
 *  - Real loading video lives at /public/videos/loading-car.mp4
 *    (see ASSET_GUIDE.md section 3 for the AI prompt + specs).
 *  - DO NOT embed random internet videos here.
 */

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SafeVideo } from "./SafeVideo";

const TAGLINES = [
  "Initializing Hyper Performance",
  "Loading The Future of Speed",
  "Entering The World of Luxury Racing",
];

export function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [tagline] = useState(
    () => TAGLINES[Math.floor(Math.random() * TAGLINES.length)]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("noir-loaded");
    if (seen) return;
    setVisible(true);
    sessionStorage.setItem("noir-loaded", "1");

    // Hold for 5s (the source video is 8s — we cut early for pacing).
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-noir-bg overflow-hidden"
        >
          {/* Background video / fallback */}
          <SafeVideo
            src="/videos/loading-car.mp4"
            className="absolute inset-0 w-full h-full"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-noir-bg/60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.85)_100%)]" />

          {/* Centered content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-noir-gold text-[10px] tracking-[0.5em] uppercase"
            >
              NoirSpeed
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.25em" }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="mt-4 text-3xl md:text-6xl font-light uppercase text-noir-text"
            >
              Luxury Racing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-6 text-noir-muted text-xs md:text-sm tracking-[0.3em] uppercase"
            >
              {tagline}
            </motion.p>

            {/* Progress bar */}
            <div className="mt-10 w-64 md:w-80 h-px bg-noir-border overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 4.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-noir-red via-noir-gold to-noir-red"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
