"use client";

/**
 * CarsList — client-side filter + sort + search over the full roster.
 * Used by /cars (server page passes the static list in).
 *
 * Parses leading numerics from the spec strings (e.g. "1,914 hp" → 1914)
 * so we don't need to change the human-readable display format.
 */

import { useMemo, useState } from "react";
import type { Car } from "@/data/cars";
import { CarCard } from "./CarCard";

const parseNum = (s: string): number => {
  const m = s.replace(/[, ]/g, "").match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : 0;
};
const parsePrice = (s: string): number => {
  const m = s.match(/(\d+(\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
};

type SortMode = "fastest" | "powerful" | "expensive" | "default";

export function CarsList({
  cars,
  initialBrand,
}: {
  cars: Car[];
  initialBrand?: string;
}) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string>(initialBrand ?? "All");
  const [minHP, setMinHP] = useState<number>(0);
  const [minTopSpeed, setMinTopSpeed] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0); // millions; 0 = no cap
  const [sort, setSort] = useState<SortMode>("default");

  const brands = useMemo(
    () => ["All", ...Array.from(new Set(cars.map((c) => c.brand)))],
    [cars]
  );

  const visible = useMemo(() => {
    let list = cars.slice();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.brand.toLowerCase().includes(q) ||
          c.model.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q)
      );
    }
    if (brand !== "All") {
      list = list.filter((c) => c.brand === brand);
    }
    if (minHP > 0) {
      list = list.filter((c) => parseNum(c.horsepower) >= minHP);
    }
    if (minTopSpeed > 0) {
      list = list.filter((c) => parseNum(c.topSpeed) >= minTopSpeed);
    }
    if (maxPrice > 0) {
      list = list.filter((c) => parsePrice(c.price) <= maxPrice);
    }
    switch (sort) {
      case "fastest":
        list.sort((a, b) => parseNum(b.topSpeed) - parseNum(a.topSpeed));
        break;
      case "powerful":
        list.sort((a, b) => parseNum(b.horsepower) - parseNum(a.horsepower));
        break;
      case "expensive":
        list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
    }
    return list;
  }, [cars, query, brand, minHP, minTopSpeed, maxPrice, sort]);

  return (
    <>
      {/* Filter bar */}
      <div className="border border-noir-border rounded-2xl bg-noir-card p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <Label>Search</Label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Brand, model, category…"
            className="mt-1.5 w-full bg-noir-alt border border-noir-border rounded-md px-3 py-2.5 text-sm text-noir-text placeholder:text-noir-muted/60 focus:outline-none focus:border-noir-gold/50 transition-colors"
          />
        </div>

        <div className="md:col-span-3">
          <Label>Brand</Label>
          <Select value={brand} onChange={setBrand} options={brands} />
        </div>

        <div className="md:col-span-2">
          <Label>Min HP</Label>
          <Select
            value={String(minHP)}
            onChange={(v) => setMinHP(Number(v))}
            options={["0", "500", "800", "1000", "1500", "1800"]}
            format={(v) => (v === "0" ? "Any" : `${v}+`)}
          />
        </div>

        <div className="md:col-span-2">
          <Label>Min Top Speed</Label>
          <Select
            value={String(minTopSpeed)}
            onChange={(v) => setMinTopSpeed(Number(v))}
            options={["0", "300", "350", "400", "450", "490"]}
            format={(v) => (v === "0" ? "Any" : `${v}+ km/h`)}
          />
        </div>

        <div className="md:col-span-1">
          <Label>Max $M</Label>
          <Select
            value={String(maxPrice)}
            onChange={(v) => setMaxPrice(Number(v))}
            options={["0", "0.5", "1", "2", "3", "5"]}
            format={(v) => (v === "0" ? "Any" : `${v}M`)}
          />
        </div>
      </div>

      {/* Sort + count */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-noir-muted text-[10px] tracking-[0.3em] uppercase">
          {visible.length} of {cars.length} hypercars
        </p>
        <div className="flex items-center gap-2">
          <span className="text-noir-muted text-[10px] tracking-[0.3em] uppercase">
            Sort
          </span>
          {(
            [
              { v: "default", label: "Default" },
              { v: "fastest", label: "Fastest" },
              { v: "powerful", label: "Most Powerful" },
              { v: "expensive", label: "Most Expensive" },
            ] as { v: SortMode; label: string }[]
          ).map((opt) => (
            <button
              key={opt.v}
              onClick={() => setSort(opt.v)}
              className={`px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase rounded-full border transition-all ${
                sort === opt.v
                  ? "bg-noir-gold/10 border-noir-gold/50 text-noir-gold"
                  : "border-noir-border text-noir-muted hover:text-noir-text"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results grid */}
      {visible.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-12 py-20 text-center border border-noir-border rounded-2xl bg-noir-card">
          <p className="text-noir-gold text-[10px] tracking-[0.4em] uppercase">
            No Match
          </p>
          <p className="mt-3 text-noir-text text-lg">
            No cars match the current filters.
          </p>
          <p className="mt-2 text-noir-muted text-sm">
            Try widening the search, dropping the brand, or relaxing the
            performance filters.
          </p>
        </div>
      )}
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-noir-muted text-[10px] tracking-[0.3em] uppercase">
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
  format,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  format?: (v: string) => string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1.5 w-full bg-noir-alt border border-noir-border rounded-md px-3 py-2.5 text-sm text-noir-text focus:outline-none focus:border-noir-gold/50 transition-colors"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-noir-alt">
          {format ? format(o) : o}
        </option>
      ))}
    </select>
  );
}
