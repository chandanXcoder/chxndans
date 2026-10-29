"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import SectionHeading from "./ui/SectionHeading";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-surface/40 py-24 md:py-40">
      <div className="container-x grid gap-4 md:grid-cols-[1fr_1.4fr] md:gap-20">
        <div className="md:sticky md:top-28 md:self-start">
        <SectionHeading
          label="FAQ"
          layout="stack"
          title={
            <>
              Good
              <br />
              <span className="text-muted">questions.</span>
            </>
          }
        />
        </div>

        <div className="border-b border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-t border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-7 text-left"
                >
                  <span className="font-display text-xl font-medium tracking-tight md:text-2xl">{f.q}</span>
                  <span
                    className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                      isOpen ? "border-accent bg-accent text-accent-ink" : "border-line"
                    }`}
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span
                      className={`absolute h-3.5 w-px bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`}
                    />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-8 leading-relaxed text-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
