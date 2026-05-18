import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cars, getCarBySlug } from "@/data/cars";
import { SafeImage } from "@/components/SafeImage";
import { SpecsTable } from "@/components/SpecsTable";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CarCard } from "@/components/CarCard";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return { title: "Not Found · NoirSpeed" };
  return {
    title: `${car.brand} ${car.model} · NoirSpeed`,
    description: car.tagline,
  };
}

export default async function CarDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const similar = cars
    .filter((c) => c.id !== car.id)
    .filter((c) => c.brand === car.brand || c.category === car.category)
    .slice(0, 3);
  const fallback = cars.filter((c) => c.id !== car.id).slice(0, 3);
  const similarCars = similar.length >= 3 ? similar : fallback;

  return (
    <main>
      {/* Cinematic hero. sizes="100vw" + quality 92 + priority so Next.js
          serves the full-resolution image right away on every device. */}
      <section className="relative">
        <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
          <SafeImage
            src={car.heroImage}
            alt={`${car.brand} ${car.model}`}
            label={`${car.brand} ${car.model}`}
            sizes="100vw"
            quality={92}
            priority
            className="!h-full !w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-bg/40 via-noir-bg/30 to-noir-bg" />
        </div>
        <div className="absolute inset-x-0 bottom-0">
          <div className="max-w-7xl mx-auto px-6 md:px-12 pb-10 md:pb-16">
            <Reveal>
              <Link
                href="/cars"
                className="text-noir-muted text-[10px] tracking-[0.3em] uppercase hover:text-noir-text transition-colors"
              >
                ← Back to Cars
              </Link>
              <p className="mt-4 text-noir-gold text-[10px] tracking-[0.5em] uppercase">
                {car.category}
              </p>
              <h1 className="mt-3 text-4xl md:text-7xl font-light tracking-[0.02em] leading-[1.05] text-noir-text">
                {car.brand}
                <br />
                <span className="text-noir-gold">{car.model}</span>
              </h1>
              <p className="mt-4 text-noir-muted text-base md:text-lg italic">
                “{car.tagline}”
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Headline stats */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: "Top Speed", v: car.topSpeed },
          { l: "Power", v: car.horsepower },
          {
            l: "0–100 km/h",
            v: car.acceleration.replace("0–100 km/h in ", ""),
          },
          { l: "Price", v: car.price },
        ].map((s, i) => (
          <Reveal key={s.l} delay={i * 0.05}>
            <div className="bg-noir-card border border-noir-border rounded-xl p-5">
              <p className="text-noir-muted text-[10px] tracking-[0.3em] uppercase">
                {s.l}
              </p>
              <p className="mt-2 text-noir-text text-xl md:text-2xl font-light">
                {s.v}
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Overview + Specs */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-20 grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <Reveal>
            <p className="text-noir-gold text-[10px] tracking-[0.4em] uppercase">
              Overview
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-light tracking-[0.05em] text-noir-text">
              The {car.model} in detail
            </h2>
            <p className="mt-6 text-noir-muted text-base leading-relaxed">
              {car.description}
            </p>
          </Reveal>

          <Reveal className="mt-12">
            <p className="text-noir-gold text-[10px] tracking-[0.4em] uppercase">
              Performance
            </p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <PerfRow
                label="Powertrain"
                value={car.engine}
              />
              <PerfRow label="Transmission" value={car.transmission} />
              <PerfRow label="Drivetrain" value={car.drivetrain} />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-2">
          <Reveal delay={0.1}>
            <p className="text-noir-gold text-[10px] tracking-[0.4em] uppercase">
              Specifications
            </p>
            <div className="mt-4">
              <SpecsTable car={car} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery — masonry columns so portrait + landscape photos all
          render at their natural aspect with no ugly cropping. */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <SectionHeader
          eyebrow="Gallery"
          title={`${car.model} — Visual`}
          sub="Drop real images into the matching folder under /public/cars/ to populate this gallery automatically."
        />
        <Reveal className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {car.gallery.map((src, i) => {
            // Front/interior shots are typically portrait, side/rear are
            // landscape. This rotation matches that convention; switch the
            // aspect on a per-car basis later if a particular set differs.
            const aspect = i % 2 === 0 ? "portrait" : "video";
            return (
              <div
                key={src}
                className="mb-4 break-inside-avoid rounded-xl overflow-hidden border border-noir-border"
              >
                <SafeImage
                  src={src}
                  alt={`${car.model} — view ${i + 1}`}
                  label={car.model}
                  aspect={aspect}
                  quality={90}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            );
          })}
        </Reveal>
      </section>

      {/* Similar cars */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mt-24">
        <SectionHeader
          eyebrow="Continue"
          title="Similar Hypercars"
          sub={`More from ${car.brand} or the ${car.category} class.`}
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarCars.map((c, i) => (
            <CarCard key={c.id} car={c} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

function PerfRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-noir-card border border-noir-border rounded-xl p-4">
      <p className="text-noir-muted text-[10px] tracking-[0.3em] uppercase">
        {label}
      </p>
      <p className="mt-2 text-noir-text text-sm leading-snug">{value}</p>
    </div>
  );
}
