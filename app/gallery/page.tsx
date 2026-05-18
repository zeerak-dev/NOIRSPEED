import type { Metadata } from "next";
import Link from "next/link";
import { cars } from "@/data/cars";
import { SafeImage } from "@/components/SafeImage";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Gallery · NoirSpeed",
  description: "A cinematic visual archive of the NoirSpeed roster.",
};

// Pre-defined aspect rotation for an asymmetric, magazine-style layout.
const aspects = ["wide", "video", "portrait", "square", "video", "wide", "portrait", "square"] as const;

export default function GalleryPage() {
  // Flatten every gallery image across every car.
  const tiles = cars.flatMap((c, ci) =>
    c.gallery.map((src, gi) => ({
      src,
      car: c,
      label: c.model,
      aspect: aspects[(ci * 7 + gi) % aspects.length],
    }))
  );

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <SectionHeader
        eyebrow="Visual Archive"
        title="Gallery"
        sub="Drop real .webp images into /public/cars/<slug>/ to populate this gallery automatically. Until then, every tile shows a premium placeholder."
      />

      <Reveal className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {tiles.map((tile, i) => (
          <Link
            key={`${tile.src}-${i}`}
            href={`/cars/${tile.car.slug}`}
            className="block mb-4 break-inside-avoid group"
          >
            <SafeImage
              src={tile.src}
              alt={`${tile.car.brand} ${tile.car.model}`}
              label={tile.label}
              aspect={tile.aspect}
              className="rounded-xl border border-noir-border transition-all duration-500 group-hover:border-noir-gold/40"
            />
          </Link>
        ))}
      </Reveal>
    </main>
  );
}
