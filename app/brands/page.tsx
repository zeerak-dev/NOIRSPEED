import type { Metadata } from "next";
import { brandData, carsByBrand } from "@/data/brands";
import { BrandCard } from "@/components/BrandCard";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Brands · NoirSpeed",
  description:
    "Explore the prestigious manufacturers behind every NoirSpeed hypercar.",
};

export default function BrandsPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <SectionHeader
        eyebrow="Manufacturers"
        title="The Houses"
        sub="Ten of the most uncompromising automotive houses in the world — each with a different definition of 'fast'."
      />
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandData.map((b, i) => (
          <BrandCard
            key={b.slug}
            brand={b}
            carCount={carsByBrand(b.name).length}
            index={i}
          />
        ))}
      </div>
    </main>
  );
}
