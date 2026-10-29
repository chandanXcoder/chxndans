"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { hero, site } from "@/lib/content";
import Button from "./ui/Button";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
        tl.from(".hero-line > span", {
          yPercent: 110,
          duration: 1.3,
          stagger: 0.12,
        })
          .from(
            ".hero-fade",
            { y: 24, opacity: 0, duration: 1, stagger: 0.1 },
            "-=0.8",
          )
          .from(
            ".hero-orb",
            { scale: 0.6, opacity: 0, duration: 2, ease: "power2.out" },
            0,
          )
          .from(
            ".hero-photo",
            { clipPath: "inset(100% 0% 0% 0%)", duration: 1.4 },
            0.2,
          )
          .from(
            ".hero-photo img",
            { scale: 1.2, duration: 1.8, ease: "power3.out" },
            0.2,
          );
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-36 pb-16 md:pt-48 md:pb-24"
    >
      {/* glow */}
      <div
        aria-hidden
        className="hero-orb pointer-events-none absolute -top-40 right-[-20%] h-[640px] w-[640px] rounded-full bg-glow/60 blur-[140px] md:right-[-5%]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] bg-size-[80px_80px] mask-[radial-gradient(ellipse_at_top,black,transparent_70%)] opacity-40"
      />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
        <div>
          <div className="hero-fade mb-10 flex flex-wrap items-center gap-3">
            {site.available && (
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for freelance & internships
              </span>
            )}
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="font-display text-[13vw] font-medium leading-[0.92] tracking-[-0.04em] sm:text-[10vw] lg:text-[5.6rem] xl:text-[6.6rem]">
            {hero.lines.map((line, i) => (
              <span
                key={line}
                className="hero-line block overflow-hidden pb-[0.08em]"
              >
                <span className={`block ${i > 0 ? "text-muted" : ""}`}>
                  {line}
                  {i === hero.lines.length - 1 && (
                    <span className="text-accent"> {hero.accent}</span>
                  )}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-10 max-w-xl text-lg leading-relaxed text-muted md:mt-12 md:text-xl">
            {hero.sub}
          </p>
          <div className="hero-fade mt-10 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* portrait */}
        <div className="hero-photo relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface sm:aspect-[4/3] lg:aspect-[4/5]">
          <Image
            src={site.photo}
            alt="Chandan Verma"
            fill
            preload
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[50%_20%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-white backdrop-blur-md">
            <div>
              <p className="font-display text-lg leading-tight">
                {site.fullName}
              </p>
              <p className="text-sm text-white/75">{site.role}</p>
            </div>
            <span className="shrink-0 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-medium text-fg">
              {site.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
