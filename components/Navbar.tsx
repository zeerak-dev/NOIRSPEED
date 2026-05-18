"use client";

/**
 * Navbar — Koenigsegg-inspired minimalist top bar.
 *
 * Top row: brand wordmark left · hamburger right.
 * Click the hamburger → full-screen luxury menu overlay with large
 * numbered links, staggered reveal, and a footer line.
 *
 * - Transparent over the hero, blurs + borders after scroll.
 * - Hamburger morphs into an X when the menu is open.
 * - Locks page scroll while the overlay is open.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { href: "/", label: "Home", sub: "The peak of luxury racing" },
  { href: "/cars", label: "Cars", sub: "Eight elite hypercars" },
  { href: "/compare", label: "Compare", sub: "Side-by-side combat" },
  { href: "/gallery", label: "Gallery", sub: "The visual archive" },
  { href: "/contact", label: "Contact", sub: "Press · collaborations" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll while overlay is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50">
        {/* Layer 1: persistent soft top gradient (black → transparent).
            Blends the navbar into the hero image instead of cutting it. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[140px] bg-gradient-to-b from-noir-bg/80 via-noir-bg/30 to-transparent pointer-events-none"
        />

        {/* Layer 2: glass blur — fades in only when scrolled or when the
            drawer is open. Subtle, no hard border underneath. */}
        <div
          aria-hidden
          className={`absolute inset-0 transition-all duration-500 pointer-events-none ${
            scrolled || open
              ? "bg-noir-bg/55 backdrop-blur-md"
              : "bg-transparent backdrop-blur-0"
          }`}
        />

        <nav className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 h-16 md:h-[72px] flex items-center justify-between">
          {/* Brand wordmark (left) */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-2.5"
          >
            <BrandMark />
            <span className="text-noir-text text-sm md:text-base font-light tracking-[0.22em] uppercase">
              Noir<span className="text-noir-gold">Speed</span>
            </span>
          </Link>

          {/* Minimal 2-line hamburger. Lines:
                - default: 24×1.5 px, 7 px gap, white
                - hover: turn champagne gold, gap subtly expands to 10 px
                  (premium "breathing" feel)
                - open: rotate into a clean X (each line translates to the
                  center and rotates ±45°)
              Transitions: 300 ms with a luxurious ease curve. */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`group relative w-11 h-11 md:w-12 md:h-12 flex flex-col items-center justify-center rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-noir-text/[0.06] hover:backdrop-blur-md ${
              open ? "gap-[7px]" : "gap-[7px] hover:gap-[10px]"
            }`}
          >
            <span
              aria-hidden
              className={`block h-[1.5px] w-6 bg-noir-text transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-noir-gold ${
                open ? "translate-y-[4.25px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden
              className={`block h-[1.5px] w-6 bg-noir-text transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-noir-gold ${
                open ? "-translate-y-[4.25px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Side-drawer menu (right ~1/4 of the screen on desktop) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Click-to-close backdrop — light dim so the hero stays visible */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30 bg-noir-bg/30 backdrop-blur-[2px]"
            />

            {/* The drawer — glass overlay floating on the hero */}
            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 bottom-0 z-40 w-full sm:w-[400px] md:w-[420px] lg:w-[440px] bg-noir-bg/55 backdrop-blur-xl border-l border-noir-gold/25 flex flex-col"
            >
              {/* Champagne-gold edge accent (extra visible on the very left edge) */}
              <div
                aria-hidden
                className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-noir-gold/45 to-transparent pointer-events-none"
              />

              {/* Ambient brand glow — softer now that the bg is glassy */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-32 -right-32 w-72 h-72 bg-noir-red/12 blur-[120px] rounded-full" />
                <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-noir-gold/8 blur-[120px] rounded-full" />
              </div>

              {/* Top eyebrow — sits below the navbar */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative px-8 pt-24 md:pt-28"
              >
                <p className="text-noir-gold/80 text-[10px] tracking-[0.4em] uppercase">
                  Navigation
                </p>
                <div className="mt-3 h-px w-12 bg-gradient-to-r from-noir-gold to-transparent" />
              </motion.div>

              {/* Links — clean modern sans, sharp tracking, no decorative serif */}
              <nav className="relative flex-1 px-8 pt-8 overflow-y-auto">
                <ul className="space-y-0">
                  {links.map((l, i) => (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.22 + i * 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="group"
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="relative block py-4 border-b border-noir-border/30 overflow-hidden"
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="text-noir-gold/75 text-[11px] tracking-[0.3em] font-mono w-7 shrink-0 transition-colors duration-500 group-hover:text-noir-gold">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-2xl md:text-[26px] font-medium tracking-tight uppercase text-noir-text transition-all duration-500 ease-out group-hover:translate-x-1.5 group-hover:text-noir-gold">
                            {l.label}
                          </span>
                          <span className="ml-auto text-noir-gold opacity-0 -translate-x-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 text-sm">
                            →
                          </span>
                        </div>
                        <p className="mt-1 ml-[2.75rem] text-noir-muted text-[12px] tracking-normal transition-colors duration-500 group-hover:text-noir-text/85">
                          {l.sub}
                        </p>

                        {/* Gold underline draws in on hover */}
                        <span
                          aria-hidden
                          className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-noir-gold via-noir-red to-transparent transition-transform duration-600 ease-out group-hover:scale-x-100"
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Footer — clean sans, no italic */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="relative px-8 py-6 border-t border-noir-border/40"
              >
                <p className="text-noir-gold/85 text-[11px] tracking-[0.2em]">
                  The peak of luxury racing
                </p>
                <p className="mt-1 text-noir-muted text-[10px] tracking-[0.3em] uppercase">
                  NoirSpeed · MMXXVI
                </p>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Small geometric brand-mark — a stylized hexagonal shield with a gold
 * speed line. Pure SVG; sits next to the wordmark like the Koenigsegg
 * shield in the reference.
 */
function BrandMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M16 2 L28 9 L28 23 L16 30 L4 23 L4 9 Z"
        stroke="#D4AF37"
        strokeWidth="1.4"
      />
      <path
        d="M10 16 L22 16"
        stroke="#C1121F"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M13 12 L19 12"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M13 20 L19 20"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
