/**
 * NoirSpeed — Brand Metadata
 * --------------------------------------------------------------
 * Used by the /brands page and brand badges across the site.
 * logo paths are PLACEHOLDERS — real logos go in /public/brands/.
 * See ASSET_GUIDE.md section 5 for naming.
 * --------------------------------------------------------------
 */

import { cars } from "./cars";

export type Brand = {
  slug: string;
  name: string;
  country: string;
  founded: number;
  tagline: string;
  signature: string;
  logo: string;
};

export const brandData: Brand[] = [
  {
    slug: "koenigsegg",
    name: "Koenigsegg",
    country: "Sweden",
    founded: 1994,
    tagline: "Engineering without compromise.",
    signature: "Top-speed pursuit, in-house everything.",
    logo: "/brands/koenigsegg.webp",
  },
  {
    slug: "bugatti",
    name: "Bugatti",
    country: "France",
    founded: 1909,
    tagline: "Pour l'éternité.",
    signature: "Quad-turbo W16 luxury hypercars.",
    logo: "/brands/bugatti.webp",
  },
  {
    slug: "rimac",
    name: "Rimac",
    country: "Croatia",
    founded: 2009,
    tagline: "Electric, redefined.",
    signature: "Quad-motor electric hypercars from Zagreb.",
    logo: "/brands/rimac.webp",
  },
  {
    slug: "ferrari",
    name: "Ferrari",
    country: "Italy",
    founded: 1939,
    tagline: "Il Cavallino Rampante.",
    signature: "Maranello's racing heritage on the road.",
    logo: "/brands/ferrari.webp",
  },
  {
    slug: "lamborghini",
    name: "Lamborghini",
    country: "Italy",
    founded: 1963,
    tagline: "Expect the unexpected.",
    signature: "Naturally aspirated V12 theatre, hybridized.",
    logo: "/brands/lamborghini.webp",
  },
  {
    slug: "mclaren",
    name: "McLaren",
    country: "United Kingdom",
    founded: 1985,
    tagline: "Built for the road, born for the track.",
    signature: "F1 engineering DNA in every road car.",
    logo: "/brands/mclaren.webp",
  },
  {
    slug: "aston-martin",
    name: "Aston Martin",
    country: "United Kingdom",
    founded: 1913,
    tagline: "Power, Beauty, Soul.",
    signature: "Gentleman GTs to F1-inspired hypercars.",
    logo: "/brands/aston-martin.webp",
  },
];

/** Returns cars matching a given brand name (case-insensitive). */
export const carsByBrand = (brandName: string) =>
  cars.filter((c) => c.brand.toLowerCase() === brandName.toLowerCase());

/** Look up brand metadata by display name (e.g. "Mercedes-AMG"). */
export const findBrand = (name: string) =>
  brandData.find((b) => b.name.toLowerCase() === name.toLowerCase());
