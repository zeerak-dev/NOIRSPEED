import type { Metadata } from "next";
import { cars } from "@/data/cars";
import { CarsList } from "@/components/CarsList";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Cars · NoirSpeed",
  description: "Explore the full NoirSpeed roster of elite hypercars.",
};

type SearchParams = Promise<{ brand?: string }>;

export default async function CarsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { brand } = await searchParams;

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <SectionHeader
        eyebrow="The Roster"
        title="All Hypercars"
        sub={`Filter, sort, and explore every car in the NoirSpeed collection — ${cars.length} machines and counting.`}
      />
      <div className="mt-12">
        <CarsList cars={cars} initialBrand={brand} />
      </div>
    </main>
  );
}
