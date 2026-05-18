"use client";

/**
 * ContactForm — premium dark contact form.
 * Fully client-side (state-only). Wire to a real endpoint by replacing
 * the handleSubmit body with an actual fetch.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const inquiryTypes = [
  "General",
  "Press",
  "Collaboration",
  "Test Drive",
  "Other",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiry, setInquiry] = useState(inquiryTypes[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Replace this with a real submit (e.g. Resend, Formspree, /api/contact).
    setSent(true);
    setTimeout(() => setSent(false), 4500);
    setName("");
    setEmail("");
    setMessage("");
    setInquiry(inquiryTypes[0]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-noir-card border border-noir-border rounded-2xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <Field label="Name" required>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          placeholder="Your full name"
        />
      </Field>

      <Field label="Email" required>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          placeholder="you@domain.com"
        />
      </Field>

      <Field label="Inquiry Type">
        <select
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value)}
          className="input"
        >
          {inquiryTypes.map((t) => (
            <option key={t} value={t} className="bg-noir-alt">
              {t}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Subject">
        <input type="text" className="input" placeholder="Briefly…" />
      </Field>

      <div className="md:col-span-2">
        <Field label="Message" required>
          <textarea
            required
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input resize-none"
            placeholder="Tell us what you're working on, in as much detail as you'd like."
          />
        </Field>
      </div>

      <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-noir-muted text-xs leading-relaxed max-w-md">
          Submissions are confidential. We respond to genuine business and
          collaboration inquiries within 48 hours.
        </p>
        <button
          type="submit"
          className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-noir-red text-noir-text text-[11px] tracking-[0.3em] uppercase rounded-full transition-all hover:shadow-[0_0_40px_rgba(193,18,31,0.55)]"
        >
          <span>Send Message</span>
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      {/* Tailwind utility for the inputs (keeps markup tidy) */}
      <style>{`
        .input {
          width: 100%;
          background-color: var(--noir-alt);
          border: 1px solid var(--noir-border);
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          color: var(--noir-text);
          font-size: 0.875rem;
          transition: border-color 0.2s;
        }
        .input::placeholder { color: rgba(163,163,163,0.6); }
        .input:focus { outline: none; border-color: rgba(212,175,55,0.5); }
      `}</style>

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="md:col-span-2 mt-2 px-5 py-4 bg-noir-gold/10 border border-noir-gold/40 rounded-xl text-noir-gold text-xs tracking-[0.2em] uppercase"
          >
            Message received — we'll be in touch.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-noir-muted text-[10px] tracking-[0.3em] uppercase">
        {label}
        {required && <span className="text-noir-red ml-1">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
