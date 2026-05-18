"use client";

import type { Car } from "@/data/cars";
import { SafeImage } from "./SafeImage";

/**
 * CompareTable — side-by-side comparison of 2 or 3 cars.
 * Keeps a fixed left-most label column; each car gets its own animated column.
 */
export function CompareTable({ cars }: { cars: (Car | null)[] }) {
  const rows: { label: string; key: (c: Car) => string }[] = [
    { label: "Brand", key: (c) => c.brand },
    { label: "Model", key: (c) => c.model },
    { label: "Category", key: (c) => c.category },
    { label: "Engine", key: (c) => c.engine },
    { label: "Horsepower", key: (c) => c.horsepower },
    { label: "Torque", key: (c) => c.torque },
    { label: "Top Speed", key: (c) => c.topSpeed },
    { label: "0–100 km/h", key: (c) => c.acceleration.replace("0–100 km/h in ", "") },
    { label: "Transmission", key: (c) => c.transmission },
    { label: "Drivetrain", key: (c) => c.drivetrain },
    { label: "Price", key: (c) => c.price },
  ];

  return (
    <div className="overflow-x-auto border border-noir-border rounded-xl bg-noir-card">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="border-b border-noir-border">
            <th className="px-6 py-5 text-left text-noir-gold text-[10px] tracking-[0.3em] uppercase w-[22%]">
              Specification
            </th>
            {cars.map((car, idx) => (
              <th
                key={idx}
                className="px-4 py-5 text-left align-top border-l border-noir-border"
              >
                {car ? (
                  <>
                    <div className="relative h-28 w-full rounded-md overflow-hidden mb-3 border border-noir-border">
                      <SafeImage
                        src={car.heroImage}
                        alt={`${car.brand} ${car.model}`}
                        label={car.model}
                      />
                    </div>
                    <p className="text-noir-gold text-[9px] tracking-[0.3em] uppercase">
                      {car.brand}
                    </p>
                    <p className="text-noir-text text-base mt-1">{car.model}</p>
                  </>
                ) : (
                  <div className="h-28 w-full rounded-md border border-dashed border-noir-border flex items-center justify-center text-noir-muted text-[10px] tracking-[0.3em] uppercase">
                    Select Car
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={i % 2 === 0 ? "bg-noir-alt/40" : "bg-noir-card"}
            >
              <td className="px-6 py-4 text-noir-muted text-[10px] tracking-[0.3em] uppercase">
                {row.label}
              </td>
              {cars.map((car, idx) => (
                <td
                  key={idx}
                  className="px-4 py-4 text-noir-text border-l border-noir-border"
                >
                  {car ? row.key(car) : <span className="text-noir-muted">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
