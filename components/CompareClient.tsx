"use client";

/**
 * CompareClient — interactive selectors for the /compare page.
 * Lets the user pick 2 or 3 cars, swap them, and see the CompareTable.
 */

import { useState } from "react";
import type { Car } from "@/data/cars";
import { CompareTable } from "./CompareTable";

export function CompareClient({ cars }: { cars: Car[] }) {
  const [slots, setSlots] = useState<(string | null)[]>([
    cars[0]?.slug ?? null,
    cars[3]?.slug ?? null,
    null,
  ]);

  const setSlot = (i: number, slug: string | null) => {
    setSlots((prev) => {
      const next = prev.slice();
      next[i] = slug;
      return next;
    });
  };

  const selected = slots.map((s) => cars.find((c) => c.slug === s) ?? null);

  return (
    <div>
      {/* Slot selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {slots.map((slug, i) => (
          <div
            key={i}
            className="bg-noir-card border border-noir-border rounded-xl p-4"
          >
            <p className="text-noir-gold text-[10px] tracking-[0.3em] uppercase">
              Slot {i + 1}
              {i === 2 && (
                <span className="text-noir-muted normal-case tracking-normal text-[10px]">
                  {" "}
                  · optional
                </span>
              )}
            </p>
            <select
              value={slug ?? ""}
              onChange={(e) => setSlot(i, e.target.value || null)}
              className="mt-2 w-full bg-noir-alt border border-noir-border rounded-md px-3 py-2.5 text-sm text-noir-text focus:outline-none focus:border-noir-gold/50 transition-colors"
            >
              <option value="" className="bg-noir-alt">
                — Select a car —
              </option>
              {cars.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-noir-alt">
                  {c.brand} · {c.model}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison table */}
      <div className="mt-10">
        <CompareTable cars={selected} />
      </div>
    </div>
  );
}
