"use client";

/**
 * HeroStage — luxury full-bleed VIDEO hero. No text. Just the car.
 *
 * Layout:
 *  - Full viewport-height edge-to-edge video reel
 *  - Negative top margin pulls it under the transparent navbar
 *  - Top + bottom letterbox bars with hairline gold accents
 *  - Soft side + bottom-fade vignettes blend into the page
 *  - Four gold corner brackets frame the "monitor"
 *  - Bouncing gold scroll chevron (icon only, no text)
 *
 * Video source: /public/videos/hero-vedio.mp4
 * If the file is missing, SafeVideo renders the animated dark fallback.
 */

import Image from "next/image";
import { SafeVideo } from "./SafeVideo";

const HERO_VIDEO = "/videos/hero-vedio.mp4";
// Portrait Jesko shot used only on small screens. iOS Safari blocks autoplay
// for the 50+ MB hero video, and the landscape video gets ugly-cropped in a
// portrait viewport anyway — a sharp portrait still does both jobs better.
const HERO_MOBILE_IMAGE = "/cars/koenigsegg-jesko-absolut/jesko-front.jpg";

export function HeroStage() {
  return (
    <section
      aria-label="Hero"
      className="relative w-full h-[calc(100svh+4rem)] md:h-[calc(100svh+72px)] min-h-[600px] overflow-hidden -mt-16 md:-mt-[72px] bg-noir-bg"
    >
      {/* Mobile (< 768 px): portrait Jesko still. No autoplay restrictions,
          no awkward landscape-in-portrait cropping. The video below uses
          `hidden md:block` so mobile browsers never download those 50+ MB. */}
      <div className="md:hidden absolute inset-0">
        <Image
          src={HERO_MOBILE_IMAGE}
          alt="Koenigsegg Jesko Absolut"
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Desktop (≥ 768 px): full cinematic video. autoplays, loops, muted,
          plays inline. preload="auto" starts the download immediately. */}
      <div className="hidden md:block absolute inset-0">
        <SafeVideo
          src={HERO_VIDEO}
          preload="auto"
          className="absolute inset-0 w-full h-full"
        />
      </div>

      {/* Whisper-light radial vignette — only the extreme corners darken,
          so the high-resolution detail in the middle stays untouched. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_68%,rgba(0,0,0,0.28)_100%)] pointer-events-none z-10" />

      {/* Bottom page fade — keeps the cinematic transition into the slider
          below but starts later so most of the video stays sharp. */}
      <div className="absolute bottom-0 inset-x-0 h-[14vh] md:h-[16vh] z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-noir-bg via-noir-bg/70 to-transparent" />
      </div>

      {/* Side fades removed — a sharp source doesn't need edge softening. */}

    </section>
  );
}

