"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { hero, site } from "@/lib/content";
import Button from "./ui/Button";
import { techIcons } from "./illustrations/techIcons";

const stack = [
  techIcons.react,
  techIcons.next,
  techIcons.typescript,
  techIcons.node,
  techIcons.flutter,
  techIcons.firebase,
  techIcons.mongodb,
  techIcons.tailwind,
  techIcons.github,
];

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
          )
          .from(".hero-chip", { y: 20, opacity: 0, duration: 0.9, stagger: 0.12 }, 0.9);

        // stack logos light up in their brand colour, one after another
        const wave = gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 2 });
        gsap.utils.toArray<SVGElement>(".hero-logo").forEach((el, i) => {
          wave
            .to(el, { fill: el.dataset.brand, y: -4, duration: 0.3, ease: "power2.out" }, i * 0.12)
            .to(el, { fill: "rgba(13,14,16,0.35)", y: 0, duration: 0.5, ease: "power2.in", clearProps: "fill,transform" }, i * 0.12 + 0.45);
        });
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="card relative flex overflow-hidden pt-32 pb-14 md:pt-36 lg:min-h-[100svh] lg:items-center lg:pt-28 lg:pb-12"
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

      <div className="container-x relative grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="hero-fade mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-bg/70 py-1.5 pr-4 pl-1.5 text-sm backdrop-blur">
            <span className="rounded-full bg-fg px-2.5 py-1 text-xs font-medium text-bg">{site.location}</span>
            {hero.eyebrow}
          </p>

          <h1 className="font-display text-[12.5vw] font-medium leading-[0.95] tracking-[-0.04em] sm:text-[9vw] lg:text-[4.6rem] xl:text-[5.9rem]">
            {hero.lines.map((line, i) => (
              <span key={line} className="hero-line block overflow-hidden pb-[0.08em]">
                <span className={`block ${i > 0 ? "text-muted" : ""}`}>
                  {line}
                  {i === hero.lines.length - 1 && <span className="text-accent"> {hero.accent}</span>}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{hero.sub}</p>
          <div className="hero-fade mt-9 flex flex-wrap gap-3">
            <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
            <Button href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </Button>
          </div>

          {/* tech I ship with: greyscale logos that take their brand colour on hover */}
          <div className="hero-fade mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:gap-8">
            <p className="shrink-0 text-xs tracking-[0.18em] text-muted uppercase">Tech I ship with</p>
            <ul className="flex flex-wrap items-center gap-x-[18px] gap-y-3 sm:gap-x-6">
              {stack.map((icon) => (
                <li key={icon.title} className="group/logo">
                  <svg
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label={icon.title}
                    data-brand={icon.color}
                    className="hero-logo h-5 w-5 fill-fg/35 sm:h-6 sm:w-6 transition-[fill,transform] duration-300 group-hover/logo:-translate-y-0.5 group-hover/logo:fill-(--brand)"
                    style={{ "--brand": icon.color } as React.CSSProperties}
                  >
                    <title>{icon.title}</title>
                    <path d={icon.path} />
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* framed portrait: one name plate inside, two proof chips outside */}
        <div className="relative mx-auto w-full max-w-[400px] sm:max-w-[420px] lg:mr-0 lg:max-w-[440px] xl:max-w-[480px]">
          <div aria-hidden className="absolute -inset-8 rounded-[3rem] bg-glow/50 blur-3xl" />
          <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] border border-line sm:translate-x-5 sm:translate-y-5" />

          <div className="hero-photo relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface shadow-[0_40px_80px_-32px_rgba(13,14,16,0.45)] ring-1 ring-black/10">
            <Image
              src={site.photo}
              alt="Chandan Verma"
              fill
              preload
              sizes="(min-width: 1024px) 480px, 420px"
              className="object-cover object-[50%_18%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white">
              <div className="min-w-0">
                <p className="font-display text-xl leading-tight font-medium sm:text-2xl">{site.fullName}</p>
                <p className="mt-0.5 truncate text-sm text-white/75">
                  Full-stack developer<span className="hidden sm:inline"> · {site.location}</span>
                </p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium ring-1 ring-white/25 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available
              </span>
            </div>
          </div>

          <div className="hero-chip absolute top-8 -left-4 rounded-2xl bg-bg/95 px-4 py-3 shadow-[0_18px_40px_-16px_rgba(13,14,16,0.35)] ring-1 ring-black/5 backdrop-blur sm:-left-10">
            <p className="font-display text-lg leading-none font-semibold sm:text-xl">
              <span className="text-[#e62b1e]">TEDx</span> Co-host
            </p>
            <p className="mt-1 text-xs text-muted">Invertis University</p>
          </div>
          <div className="hero-chip absolute top-[60%] -right-4 sm:top-[42%] flex items-center gap-3 rounded-2xl bg-bg/95 py-2.5 pr-4 pl-2.5 shadow-[0_18px_40px_-16px_rgba(13,14,16,0.35)] ring-1 ring-black/5 backdrop-blur sm:-right-10">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-surface">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill={techIcons.flutter.color} aria-hidden>
                <path d={techIcons.flutter.path} />
              </svg>
            </span>
            <div>
              <p className="font-display text-sm leading-tight font-semibold">Invertis Mess</p>
              <p className="text-xs text-muted">Live on Google Play</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
