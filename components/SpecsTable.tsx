import type { Car } from "@/data/cars";

/**
 * SpecsTable — clean two-column spec listing for the car detail page.
 */
export function SpecsTable({ car }: { car: Car }) {
  const rows: [string, string][] = [
    ["Engine", car.engine],
    ["Horsepower", car.horsepower],
    ["Torque", car.torque],
    ["Top Speed", car.topSpeed],
    ["0–100 km/h", car.acceleration.replace("0–100 km/h in ", "")],
    ["Transmission", car.transmission],
    ["Drivetrain", car.drivetrain],
    ["Category", car.category],
    ["Price", car.price],
  ];

  return (
    <div className="border border-noir-border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([label, value], i) => (
            <tr
              key={label}
              className={
                i % 2 === 0 ? "bg-noir-card" : "bg-noir-alt/60"
              }
            >
              <td className="px-6 py-4 text-noir-muted text-[10px] tracking-[0.3em] uppercase whitespace-nowrap w-1/3">
                {label}
              </td>
              <td className="px-6 py-4 text-noir-text">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
