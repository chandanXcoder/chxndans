"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { club } from "@/lib/content";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import Events from "./Events";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Splits "15k+" into 15 and "k+" so the number can count up.
function splitMetric(value: string) {
  const m = value.match(/^(\d+)(.*)$/);
  return m ? { n: Number(m[1]), rest: m[2] } : null;
}

// Moves a soft light under the cursor across a card.
function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
}

const spotlight =
  "pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(420px_circle_at_var(--x)_var(--y),var(--glow),transparent_60%)]";

// My club membership: I-Tech and abhiरुचि, the hobby club it belongs to, followed by the
// events the club ran as a second chapter.
export default function Clubs() {
  const ref = useRef<HTMLElement>(null);
  const { parent } = club;
  const marquee = [...club.learned, ...club.learned];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-logo]", {
          scale: 0.5,
          rotate: -40,
          opacity: 0,
          duration: 1.6,
          ease: "expo.out",
          stagger: 0.2,
        });

        gsap.to("[data-parallax]", {
          y: -36,
          ease: "none",
          scrollTrigger: { trigger: "[data-hero]", start: "top bottom", end: "bottom top", scrub: true },
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const counter = { v: 0 };
          el.textContent = "0";
          gsap.to(counter, {
            v: target,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
            onUpdate: () => {
              el.textContent = String(Math.round(counter.v));
            },
          });
        });

        gsap.from("[data-divider]", { scaleX: 0, duration: 1.4, ease: "expo.out" });

        gsap.from("[data-chip]", {
          y: 18,
          scale: 0.85,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2)",
          stagger: 0.06,
          scrollTrigger: { trigger: "[data-chips]", start: "top 90%" },
        });

        gsap.set("[data-skill]", { y: 60, opacity: 0, rotateX: -20, transformPerspective: 800 });
        ScrollTrigger.batch("[data-skill]", {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: "power3.out", stagger: 0.08 }),
        });

        gsap.utils.toArray<HTMLElement>("[data-bar]").forEach((el) => {
          gsap.from(el, {
            scaleX: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 95%", end: "top 60%", scrub: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="clubs" className="card overflow-hidden py-20 md:py-28">
      <div className="container-x space-y-4">
        <div className="mb-10 flex items-center gap-4 text-sm uppercase tracking-[0.16em] text-muted md:mb-14">
          <span className="font-display tabular-nums text-fg">01</span>
          <span data-divider className="h-px flex-1 origin-left bg-line" />
          <span>The club</span>
        </div>
        <div data-hero className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <article
              onPointerMove={trackSpotlight}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-accent/40 md:p-10"
            >
              <span aria-hidden className={spotlight} />
              <div className="relative flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.16em] text-muted">
                <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg/40" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-fg/60" />
                  </span>
                  {club.status}
                </span>
                <span>{club.period}</span>
              </div>

              <div className="relative mt-10 flex items-center gap-6 md:gap-9">
                <div data-parallax className="relative grid h-24 w-24 shrink-0 place-items-center md:h-36 md:w-36">
                  <span aria-hidden className="absolute inset-0 rounded-full bg-glow/60 blur-2xl" />
                  <span aria-hidden className="spin-slow absolute -inset-2 rounded-full border border-dashed border-fg/25" />
                  <span aria-hidden className="spin-rev absolute -inset-5 rounded-full">
                    <span className="absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rounded-full bg-fg/70" />
                  </span>
                  <div data-logo className="relative h-full w-full">
                    <div className="float relative h-full w-full" style={{ "--d": "5s" } as React.CSSProperties}>
                      <Image src={club.logo} alt={`${club.name} logo`} fill sizes="144px" className="object-contain" />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">{club.fullName}</h2>
                  <p className="mt-2 text-sm font-medium text-fg/70">A club of {parent.fullName}, Invertis University</p>
                </div>
              </div>

              <p className="relative mt-8 mb-10 max-w-2xl text-lg leading-relaxed text-muted">{club.about}</p>

              <div className="relative mt-auto grid grid-cols-3 gap-3 border-t border-line pt-6">
                {club.metrics.map((m) => {
                  const parts = splitMetric(m.value);
                  return (
                    <div key={m.label}>
                      <p className="font-display text-2xl font-medium tracking-tight tabular-nums md:text-4xl">
                        {parts ? (
                          <>
                            <span data-count={parts.n}>{parts.n}</span>
                            {parts.rest}
                          </>
                        ) : (
                          m.value
                        )}
                      </p>
                      <p className="mt-1 text-xs text-muted">{m.label}</p>
                    </div>
                  );
                })}
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article
              onPointerMove={trackSpotlight}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition-colors duration-500 hover:border-accent/40 md:p-10"
            >
              <span aria-hidden className={spotlight} />
              <p className="relative text-xs uppercase tracking-[0.16em] text-muted">Parent organisation</p>
              <div data-parallax className="relative mx-auto my-8 grid h-40 w-40 place-items-center md:h-44 md:w-44">
                <span aria-hidden className="absolute inset-2 rounded-full bg-glow/60 blur-2xl" />
                <div data-logo className="relative h-full w-full">
                  <div className="h-full w-full animate-[spin_40s_linear_infinite] group-hover:[animation-play-state:paused]">
                    <Image src={parent.logo} alt={`${parent.fullName} logo`} fill sizes="176px" className="object-contain" />
                  </div>
                </div>
              </div>
              <h3 className="relative font-display text-2xl font-medium tracking-tight md:text-3xl">{parent.fullName}</h3>
              <p className="relative mt-3 leading-relaxed text-muted">{parent.about}</p>
              <div data-chips className="relative mt-6 flex flex-wrap gap-2">
                {parent.clubs.map((c) => (
                  <span
                    key={c}
                    data-chip
                    className={`rounded-full px-3 py-1 text-sm ${c === club.name ? "bg-fg text-bg" : "bg-soft text-fg/80"}`}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {club.roles.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1}>
              <article
                onPointerMove={trackSpotlight}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition duration-500 hover:border-accent/40 hover:shadow-[0_24px_60px_-20px_var(--glow)] motion-safe:hover:-translate-y-1 md:p-10"
              >
                <span aria-hidden className={spotlight} />
                <div className="relative flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted">
                  <span>My role</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-line font-display text-fg transition-colors group-hover:bg-accent group-hover:text-accent-ink">
                    {i + 1}
                  </span>
                </div>
                <h3 className="relative mt-10 font-display text-2xl font-medium tracking-tight md:text-3xl">{r.title}</h3>
                <p className="relative mt-3 leading-relaxed text-muted">{r.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20 md:mt-28">
        <div className="container-x mb-10 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.16em] text-muted">
              <span className="h-2 w-2 rounded-full bg-fg" />
              What the club taught me
            </p>
            <h2 className="font-display text-4xl font-medium leading-[0.95] tracking-[-0.03em] md:text-6xl">
              More than a club,
              <br />
              <span className="text-muted">a training ground.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href={club.project.href} variant="soft">
              {club.project.label}
            </Button>
          </Reveal>
        </div>

        <div aria-hidden className="marquee mb-10 overflow-hidden border-y border-line py-5">
          <div className="marquee-track flex w-max">
            {marquee.map((s, i) => (
              <span key={i} className="flex shrink-0 items-center gap-8 px-6 font-display text-3xl font-medium tracking-tight md:text-5xl">
                <span className={i % 2 ? "text-muted" : ""}>{s.title}</span>
                <span className="text-xl text-fg/40">✦</span>
              </span>
            ))}
          </div>
        </div>

        <div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {club.learned.map((s, i) => (
            <article
              key={s.title}
              data-skill
              onPointerMove={trackSpotlight}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-surface p-7 transition duration-500 hover:border-accent/40 motion-safe:hover:-translate-y-1"
            >
              <span aria-hidden className={spotlight} />
              <span className="relative font-display text-sm text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="relative mt-8 font-display text-2xl font-medium tracking-tight">{s.title}</h3>
              <span data-bar className="relative mt-4 block h-px w-full origin-left bg-fg/30" />
              <p className="relative mt-4 leading-relaxed text-muted">{s.text}</p>
            </article>
          ))}
        </div>
      </div>

      <Events />
    </section>
  );
}
