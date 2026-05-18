import Link from "next/link";

/**
 * Footer — minimalist dark footer with brand line + columns.
 */
export function Footer() {
  return (
    <footer className="mt-32 border-t border-noir-border bg-noir-alt/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-2">
          <p className="text-noir-text text-base tracking-[0.35em] uppercase">
            Noir<span className="text-noir-gold">Speed</span>
          </p>
          <p className="mt-4 text-noir-muted text-sm max-w-sm leading-relaxed">
            A curated showcase of the world's elite hypercars — built for speed,
            power, precision, and pure performance.
          </p>
        </div>

        <div>
          <p className="text-noir-gold text-[10px] tracking-[0.3em] uppercase">
            Explore
          </p>
          <ul className="mt-4 space-y-2 text-noir-muted text-sm">
            <li>
              <Link href="/cars" className="hover:text-noir-text transition-colors">
                Cars
              </Link>
            </li>
            <li>
              <Link href="/compare" className="hover:text-noir-text transition-colors">
                Compare
              </Link>
            </li>
            <li>
              <Link href="/brands" className="hover:text-noir-text transition-colors">
                Brands
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="hover:text-noir-text transition-colors">
                Gallery
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-noir-gold text-[10px] tracking-[0.3em] uppercase">
            Connect
          </p>
          <ul className="mt-4 space-y-2 text-noir-muted text-sm">
            <li>
              <Link href="/contact" className="hover:text-noir-text transition-colors">
                Contact
              </Link>
            </li>
            <li className="hover:text-noir-text transition-colors cursor-default">
              Press
            </li>
            <li className="hover:text-noir-text transition-colors cursor-default">
              Collaborations
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-noir-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-noir-muted text-[10px] tracking-[0.3em] uppercase">
          <span>© {new Date().getFullYear()} NoirSpeed</span>
          <span>Curated · Cinematic · Confidential</span>
        </div>
      </div>
    </footer>
  );
}
