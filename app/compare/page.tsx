import type { Metadata } from "next";
import { cars } from "@/data/cars";
import { CompareClient } from "@/components/CompareClient";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Compare · NoirSpeed",
  description: "Compare hypercars side-by-side: specs, performance, pricing.",
};

export default function ComparePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <SectionHeader
        eyebrow="Side-by-Side"
        title="Compare Hypercars"
        sub="Pick two or three machines and pit them against each other — engine, power, torque, top speed, and price, all in one table."
      />
      <div className="mt-12">
        <CompareClient cars={cars} />
      </div>
    </main>
  );
}
