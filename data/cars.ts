/**
 * NoirSpeed — Car Roster Data
 * --------------------------------------------------------------
 * Source of truth for every car shown on the site.
 *
 * IMPORTANT
 *  - heroImage, gallery[], and model3d paths are PLACEHOLDERS.
 *  - Real assets are added later by dropping files into the
 *    matching /public/cars/<slug>/ folder using the naming
 *    convention documented in ASSET_GUIDE.md.
 *  - DO NOT change these paths to random internet URLs.
 *  - DO NOT embed copyrighted media.
 *  - If a file is missing on disk, the SafeImage / SafeVideo /
 *    Safe3DPlaceholder components show a luxury fallback so the
 *    layout never breaks.
 *
 * Naming convention (per car folder):
 *   /public/cars/<slug>/<short>-hero.webp       (wide cinematic)
 *   /public/cars/<slug>/<short>-front.webp
 *   /public/cars/<slug>/<short>-side.webp
 *   /public/cars/<slug>/<short>-rear.webp
 *   /public/cars/<slug>/<short>-interior.webp
 *   /public/cars/<slug>/<short>-gallery-1.webp  (optional extras)
 * --------------------------------------------------------------
 */

export type Car = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  category: string;
  tagline: string;
  engine: string;
  horsepower: string;
  torque: string;
  topSpeed: string;
  acceleration: string;
  transmission: string;
  drivetrain: string;
  price: string;
  description: string;
  heroImage: string;
  gallery: string[];
  /** Path to a .glb 3D model. Empty string = no 3D yet; hero falls back to Safe3DPlaceholder. */
  model3d: string;
  /** Official / reference URLs for spec verification — NOT image links. */
  sourceLinks: string[];
};

export const cars: Car[] = [
  {
    id: "01",
    slug: "koenigsegg-jesko-absolut",
    brand: "Koenigsegg",
    model: "Jesko Absolut",
    category: "Top-Speed Hypercar",
    tagline: "Engineered to chase 500 km/h.",
    engine: "5.0L Twin-Turbo V8",
    horsepower: "1,600 hp (on E85)",
    torque: "1,500 Nm",
    topSpeed: "500+ km/h (est.)",
    acceleration: "0–100 km/h in 2.5s",
    transmission: "9-speed Light Speed Transmission",
    drivetrain: "RWD",
    price: "≈ $3.0M USD",
    description:
      "The Jesko Absolut is Koenigsegg's pursuit of the absolute terminal velocity — a machine sculpted for the longest stretches of asphalt on Earth. Reduced drag, locked-out aerodynamics, and an aluminum twin-turbo V8 redlining at 8,500 rpm make this the fastest Koenigsegg ever to leave Ängelholm.",
    heroImage: "/cars/koenigsegg-jesko-absolut/jesko-hero.jpg",
    gallery: [
      "/cars/koenigsegg-jesko-absolut/jesko-front.jpg",
      "/cars/koenigsegg-jesko-absolut/jesko-side.jpg",
      "/cars/koenigsegg-jesko-absolut/jesko-rear.jpg",
      "/cars/koenigsegg-jesko-absolut/jesko-interior.jpg",
    ],
    // Hero 3D car — the only model loaded on the homepage.
    model3d: "/models/jesko.glb",
    sourceLinks: ["https://www.koenigsegg.com/jesko"],
  },
  {
    id: "02",
    slug: "bugatti-chiron-super-sport-300",
    brand: "Bugatti",
    model: "Chiron Super Sport 300+",
    category: "Luxury Hypercar",
    tagline: "The first production car past 300 mph.",
    engine: "8.0L Quad-Turbo W16",
    horsepower: "1,578 hp",
    torque: "1,600 Nm",
    topSpeed: "490 km/h (304 mph)",
    acceleration: "0–100 km/h in 2.4s",
    transmission: "7-speed Dual-Clutch",
    drivetrain: "AWD",
    price: "≈ $3.9M USD",
    description:
      "An elongated, aerodynamically refined Chiron built to break the 300-mph barrier — and it did. The Super Sport 300+ blends couture-grade luxury with brute, sustained, almost unreal velocity.",
    heroImage: "/cars/bugatti-chiron-super-sport-300/chiron-ss-hero.jpg",
    gallery: [
      "/cars/bugatti-chiron-super-sport-300/chiron-ss-front.jpg",
      "/cars/bugatti-chiron-super-sport-300/Left.jpg",
      "/cars/bugatti-chiron-super-sport-300/chiron-ss-back.jpg",
      "/cars/bugatti-chiron-super-sport-300/chiron-ss-interior.jpg",
    ],
    model3d: "",
    sourceLinks: ["https://www.bugatti.com/chiron/chiron-super-sport-300/"],
  },
  {
    id: "03",
    slug: "bugatti-bolide",
    brand: "Bugatti",
    model: "Bolide",
    category: "Track Hypercar",
    tagline: "Pure performance, unfiltered.",
    engine: "8.0L Quad-Turbo W16",
    horsepower: "1,825 hp",
    torque: "1,850 Nm",
    topSpeed: "500+ km/h (est.)",
    acceleration: "0–100 km/h in 2.17s",
    transmission: "7-speed Dual-Clutch",
    drivetrain: "AWD",
    price: "≈ $4.7M USD",
    description:
      "Track-only and skeletally light, the Bolide channels the full W16 with almost no body to slow it down. Designed as the closest thing to a Le Mans Hypercar that wears the Bugatti badge.",
    heroImage: "/cars/bugatti-bolide/bolide-hero.jpg",
    gallery: [
      "/cars/bugatti-bolide/bolide-front.jpg",
      "/cars/bugatti-bolide/bolide-side.jpg",
      "/cars/bugatti-bolide/bolide-back.jpg",
      "/cars/bugatti-bolide/bolide-uniq.jpg",
    ],
    model3d: "",
    sourceLinks: ["https://www.bugatti.com/bolide/"],
  },
  {
    id: "04",
    slug: "rimac-nevera",
    brand: "Rimac",
    model: "Nevera",
    category: "Electric Hypercar",
    tagline: "The world's fastest accelerating production car.",
    engine: "Quad Permanent-Magnet Electric Motors",
    horsepower: "1,914 hp",
    torque: "2,360 Nm",
    topSpeed: "412 km/h (258 mph)",
    acceleration: "0–100 km/h in 1.74s",
    transmission: "Single-speed (front) · Dual 2-speed (rear)",
    drivetrain: "AWD (Torque Vectoring)",
    price: "≈ $2.4M USD",
    description:
      "Croatia's halo machine. The Nevera redefined what electric performance means — four motors, all-wheel torque vectoring, and acceleration that rewrites the rulebook in absolute silence.",
    heroImage: "/cars/rimac-nevera/nevera-hero.webp",
    gallery: [
      "/cars/rimac-nevera/nevera-front.webp",
      "/cars/rimac-nevera/nevera-side.webp",
      "/cars/rimac-nevera/nevera-rear.webp",
      "/cars/rimac-nevera/nevera-interior.webp",
      "/cars/rimac-nevera/nevera-gallery-1.webp",
    ],
    model3d: "",
    sourceLinks: ["https://www.rimac-automobili.com/nevera/"],
  },
  {
    id: "05",
    slug: "ferrari-sf90-stradale",
    brand: "Ferrari",
    model: "SF90 Stradale",
    category: "Plug-In Hybrid Supercar",
    tagline: "The first Ferrari hybrid flagship.",
    engine: "4.0L Twin-Turbo V8 + 3 Electric Motors",
    horsepower: "986 hp (combined)",
    torque: "800 Nm",
    topSpeed: "340 km/h (211 mph)",
    acceleration: "0–100 km/h in 2.5s",
    transmission: "8-speed Dual-Clutch",
    drivetrain: "AWD",
    price: "≈ $625K USD",
    description:
      "Named for Scuderia Ferrari's 90th anniversary, the SF90 Stradale fuses a twin-turbo V8 with three electric motors. The first prancing-horse road car to offer all-wheel drive through electrification.",
    heroImage: "/cars/ferrari-sf90-stradale/sf90-hero.webp",
    gallery: [
      "/cars/ferrari-sf90-stradale/sf90-front.webp",
      "/cars/ferrari-sf90-stradale/sf90-side.webp",
      "/cars/ferrari-sf90-stradale/sf90-rear.webp",
      "/cars/ferrari-sf90-stradale/sf90-interior.webp",
      "/cars/ferrari-sf90-stradale/sf90-gallery-1.webp",
    ],
    model3d: "",
    sourceLinks: ["https://www.ferrari.com/en-EN/auto/sf90-stradale"],
  },
  {
    id: "06",
    slug: "lamborghini-revuelto",
    brand: "Lamborghini",
    model: "Revuelto",
    category: "Hybrid Hypercar",
    tagline: "A V12 reborn with electric fury.",
    engine: "6.5L V12 + 3 Electric Motors",
    horsepower: "1,001 hp (combined)",
    torque: "725 Nm (V12 alone)",
    topSpeed: "350+ km/h (217+ mph)",
    acceleration: "0–100 km/h in 2.5s",
    transmission: "8-speed Dual-Clutch",
    drivetrain: "AWD",
    price: "≈ $608K USD",
    description:
      "Lamborghini's first true plug-in hybrid flagship. The Revuelto retains the screaming naturally aspirated V12 and pairs it with three electric motors for a four-figure horsepower number — and a future-proof Lambo silhouette.",
    heroImage: "/cars/lamborghini-revuelto/revuelto-hero.webp",
    gallery: [
      "/cars/lamborghini-revuelto/revuelto-front.webp",
      "/cars/lamborghini-revuelto/revuelto-side.webp",
      "/cars/lamborghini-revuelto/revuelto-rear.webp",
      "/cars/lamborghini-revuelto/revuelto-interior.webp",
      "/cars/lamborghini-revuelto/revuelto-gallery-1.webp",
    ],
    model3d: "",
    sourceLinks: ["https://www.lamborghini.com/en-en/models/revuelto"],
  },
  {
    id: "07",
    slug: "mclaren-speedtail",
    brand: "McLaren",
    model: "Speedtail",
    category: "Hyper-GT",
    tagline: "Three seats. 250 mph. Infinite presence.",
    engine: "4.0L Twin-Turbo V8 Hybrid",
    horsepower: "1,035 hp (combined)",
    torque: "1,150 Nm",
    topSpeed: "403 km/h (250 mph)",
    acceleration: "0–300 km/h in 12.8s",
    transmission: "7-speed Seamless-Shift",
    drivetrain: "RWD",
    price: "≈ $2.25M USD",
    description:
      "A 21st-century reimagining of the McLaren F1 — same central-driver layout, an elongated teardrop body, and a hybrid powertrain that pushes it to a quarter-of-a-thousand miles per hour.",
    heroImage: "/cars/mclaren-speedtail/speedtail-hero.webp",
    gallery: [
      "/cars/mclaren-speedtail/speedtail-front.webp",
      "/cars/mclaren-speedtail/speedtail-side.webp",
      "/cars/mclaren-speedtail/speedtail-rear.webp",
      "/cars/mclaren-speedtail/speedtail-interior.webp",
      "/cars/mclaren-speedtail/speedtail-gallery-1.webp",
    ],
    model3d: "",
    sourceLinks: ["https://cars.mclaren.com/ultimate/speedtail"],
  },
  {
    id: "08",
    slug: "aston-martin-valkyrie",
    brand: "Aston Martin",
    model: "Valkyrie",
    category: "F1-Inspired Hypercar",
    tagline: "A Formula 1 car for the public road.",
    engine: "6.5L Naturally Aspirated V12 Hybrid (Cosworth)",
    horsepower: "1,160 hp (combined)",
    torque: "900 Nm",
    topSpeed: "402 km/h (250 mph)",
    acceleration: "0–100 km/h in 2.5s",
    transmission: "7-speed Automated Manual",
    drivetrain: "RWD",
    price: "≈ $3.0M USD",
    description:
      "Born from a collaboration between Aston Martin, Red Bull Racing, and Adrian Newey — the Valkyrie's ground-effect aero, screaming 11,100-rpm V12, and skeletal carbon body are unapologetic Formula 1 transplanted to the road.",
    heroImage: "/cars/aston-martin-valkyrie/valkyrie-hero.webp",
    gallery: [
      "/cars/aston-martin-valkyrie/valkyrie-front.webp",
      "/cars/aston-martin-valkyrie/valkyrie-side.webp",
      "/cars/aston-martin-valkyrie/valkyrie-rear.webp",
      "/cars/aston-martin-valkyrie/valkyrie-interior.webp",
      "/cars/aston-martin-valkyrie/valkyrie-gallery-1.webp",
    ],
    model3d: "",
    sourceLinks: ["https://www.astonmartin.com/en/models/valkyrie"],
  },
];

/** Convenience: look up a car by its URL slug. */
export const getCarBySlug = (slug: string): Car | undefined =>
  cars.find((c) => c.slug === slug);

/** Convenience: every unique brand. */
export const brands: string[] = Array.from(new Set(cars.map((c) => c.brand)));
