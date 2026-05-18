import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact · NoirSpeed",
  description:
    "Reach out for press, collaborations, partnerships, and confidential inquiries.",
};

export default function ContactPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <SectionHeader
        eyebrow="Get In Touch"
        title="Let's Talk"
        sub="For press, collaborations, partnerships, and confidential inquiries — we read everything."
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Reveal className="lg:col-span-2">
          <ContactForm />
        </Reveal>

        <Reveal delay={0.15} className="space-y-6">
          <InfoCard
            label="Business"
            title="Partnerships & Press"
            body="For brand partnerships, press kits, embargoed launches, and editorial collaborations."
          />
          <InfoCard
            label="Collectors"
            title="Featured Listings"
            body="If you own a hypercar that fits the NoirSpeed roster, we'd love to feature it. Confidentiality guaranteed."
          />
          <InfoCard
            label="Engineering"
            title="3D & Visual Assets"
            body="Independent 3D artists and automotive photographers — we always have an open door."
          />
        </Reveal>
      </div>
    </main>
  );
}

function InfoCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="bg-noir-card border border-noir-border rounded-xl p-6">
      <p className="text-noir-gold text-[10px] tracking-[0.3em] uppercase">
        {label}
      </p>
      <h3 className="mt-3 text-noir-text text-lg tracking-wide">{title}</h3>
      <p className="mt-3 text-noir-muted text-sm leading-relaxed">{body}</p>
    </div>
  );
}
