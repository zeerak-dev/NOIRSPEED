import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CarCursor } from "@/components/CarCursor";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Luxury display serif — used for the hero wordmark and large
// magazine-style headings. High-contrast strokes pair beautifully with
// the dark + red + gold palette.
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NoirSpeed — The Peak of Luxury Racing",
  description:
    "Explore elite hypercars built for speed, power, precision, and pure performance.",
  metadataBase: new URL("https://noirspeed.example"),
  openGraph: {
    title: "NoirSpeed",
    description: "Elite hypercars. Built for speed, power, precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <body className="bg-noir-bg text-noir-text font-sans antialiased min-h-screen flex flex-col">
        {/* Custom hypercar cursor (auto-disables on touch devices). */}
        <CarCursor />
        <Navbar />
        <div className="flex-1 pt-16 md:pt-[72px]">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
