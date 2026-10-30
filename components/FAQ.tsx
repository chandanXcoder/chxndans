"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import SectionHeading from "./ui/SectionHeading";
import FaqScene from "./illustrations/FaqScene";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="card py-20 md:py-28">
      <div className="container-x grid gap-4 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
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
          <div className="mb-10 max-w-[300px] sm:max-w-[380px] lg:mb-0">
            <FaqScene />
          </div>
        </div>

        <div className="border-b border-line">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-t border-line">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-7 text-left md:gap-8"
                >
                  <span className="w-8 shrink-0 text-muted md:w-10">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-display text-xl font-medium tracking-tight md:text-2xl">{f.q}</span>
                  <span
                    className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full transition-colors duration-300 md:h-14 md:w-14 ${
                      isOpen ? "bg-accent text-accent-ink" : "bg-soft hover:bg-glow"
                    }`}
                  >
                    <span className="absolute h-[1.5px] w-4 bg-current" />
                    <span
                      className={`absolute h-4 w-[1.5px] bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`}
                    />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-8 pl-12 leading-relaxed text-muted md:pl-18">{f.a}</p>
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
