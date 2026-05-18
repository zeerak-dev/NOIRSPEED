import { Reveal } from "./Reveal";

/**
 * SectionHeader
 * Consistent section heading used across pages.
 * Pattern: tiny eyebrow text · large display headline · optional sub.
 */
type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  sub?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-3xl ${alignClass} ${className}`}>
      {eyebrow && (
        <p className="text-noir-gold text-[10px] tracking-[0.4em] uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl md:text-5xl font-light tracking-[0.05em] text-noir-text">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-noir-muted text-sm md:text-base max-w-2xl leading-relaxed">
          {sub}
        </p>
      )}
      <div
        className={`mt-6 h-px bg-gradient-to-r from-noir-gold/40 via-noir-red/40 to-transparent ${
          align === "center" ? "mx-auto w-24" : "w-24"
        }`}
      />
    </Reveal>
  );
}
