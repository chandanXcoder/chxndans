"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { about, site } from "@/lib/content";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const words = about.statement.split(" ");

  // Words light up one by one as the statement scrolls through the viewport.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".about-word",
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: {
              trigger: ".about-statement",
              start: "top 80%",
              end: "bottom 45%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="about" className="py-24 md:py-40">
      <div className="container-x">
        <p className="mb-10 flex items-center gap-3 text-lg text-fg">
          <span className="h-2 w-2 rounded-full bg-fg" />
          {about.label}
        </p>

        <p className="about-statement font-display text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl md:text-6xl">
          {words.map((w, i) => (
            <span key={i} className="about-word">
              {w}{" "}
            </span>
          ))}
        </p>

        {compact ? (
          <div className="mt-14">
            <Button href="/about" variant="ghost">
              More about me
            </Button>
          </div>
        ) : (
          <div className="mt-20 grid gap-12 md:mt-28 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-20">
            <Reveal>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface">
                <Image
                  src={site.photo}
                  alt={site.fullName}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-[50%_20%] transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/30 bg-white/70 px-4 py-3 text-sm backdrop-blur-md">
                  <span>Chandan Verma</span>
                  <span className="text-muted">Full-Stack Developer</span>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-col justify-between gap-12">
              <Reveal
                stagger={0.12}
                className="space-y-6 text-lg leading-relaxed text-muted"
              >
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Reveal>
              <Reveal
                stagger={0.08}
                className="grid grid-cols-2 border-t border-line"
              >
                {about.facts.map((f) => (
                  <div key={f.k} className="border-b border-line py-5 pr-4">
                    <p className="mb-1 text-xs uppercase tracking-[0.16em] text-muted">
                      {f.k}
                    </p>
                    <p className="text-fg">{f.v}</p>
                  </div>
                ))}
              </Reveal>
              <div>
                <Button href="/about/experience" variant="ghost">
                  My journey
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
