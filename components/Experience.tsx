"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { events, experience } from "@/lib/content";
import SectionHeading from "./ui/SectionHeading";
import { Mic } from "./illustrations/parts";
import { type Vars, cardHover, countUp, seededLevels, spotlight } from "./ui/cardFx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const greens = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const heat = seededLevels(20 * 7, 23);

// A client site being built: skeleton blocks fill in, the pipeline highlight hops along, a deploy toast pops.
function FreelanceVisual() {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-bg ring-1 ring-line">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          {["#ff6b6b", "#ffd43b", "#51cf66"].map((c) => (
            <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
          ))}
          <span className="ml-2 flex-1 truncate rounded-full bg-surface px-3 py-0.5 text-[10px] text-muted">your-store.com</span>
        </div>
        <div className="space-y-2 p-3">
          <div data-build className="h-14 origin-left rounded-lg" style={{ background: "linear-gradient(120deg, var(--ac), #91a7ff)" }} />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} data-build className="space-y-1.5 rounded-lg bg-surface p-2">
                <div className="aspect-[4/3] rounded-md bg-surface-2" />
                <div className="h-1.5 w-3/4 rounded-full bg-surface-2" />
                <div className="h-1.5 w-1/2 rounded-full" style={{ background: "var(--ac)", opacity: 0.5 }} />
              </div>
            ))}
          </div>
        </div>
        <span
          className="pop absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-fg px-3 py-1 text-[11px] font-medium text-bg shadow-lg"
          style={{ "--d": "4s", "--delay": "1s" } as Vars}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Deployed
        </span>
      </div>
      <div className="relative grid grid-cols-4 rounded-full bg-bg p-1 text-center text-xs font-medium ring-1 ring-line">
        <span className="absolute inset-y-1 left-1 w-[calc(25%-0.125rem)]">
          <span
            className="hop block h-full w-full rounded-full ring-1"
            style={{ background: "color-mix(in srgb, var(--ac) 16%, transparent)", "--tw-ring-color": "var(--ac)", "--step": "100%" } as Vars}
          />
        </span>
        {["Brief", "Design", "Build", "Ship"].map((s) => (
          <span key={s} className="relative py-2">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

const clubs = [
  { src: "/clubs/itech.png", alt: "I-Tech Technical Club logo" },
  { src: "/clubs/abhiruchi.png", alt: "abhiरुचि The Hobby Club logo" },
];
const clubChips = [
  { label: "Workshops", pos: "top-[6%] left-[38%]", delay: "0s" },
  { label: "Hackathons", pos: "bottom-[8%] left-[6%]", delay: "1.3s" },
  { label: "Tech talks", pos: "bottom-[12%] right-[4%]", delay: "2.6s" },
];

function ClubsVisual() {
  return (
    <div className="relative h-52 overflow-hidden rounded-2xl bg-bg ring-1 ring-line">
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        <line x1="28%" y1="50%" x2="72%" y2="50%" stroke="var(--ac)" strokeWidth="2" strokeDasharray="6 6" className="dash" />
      </svg>
      {clubs.map((c, i) => (
        <div
          key={c.src}
          className={`float absolute top-1/2 -mt-10 h-20 w-20 overflow-hidden rounded-full bg-white p-1.5 shadow-[0_16px_30px_-12px_rgba(13,14,16,0.35)] ring-1 ring-line ${i ? "right-[8%] sm:right-[16%]" : "left-[8%] sm:left-[16%]"}`}
          style={{ "--d": `${5 + i}s`, "--delay": `${i * 0.8}s` } as Vars}
        >
          <Image src={c.src} alt={c.alt} width={80} height={80} className="h-full w-full object-contain" />
        </div>
      ))}
      {clubChips.map((c) => (
        <span
          key={c.label}
          className={`pop absolute ${c.pos} rounded-full px-3 py-1 text-xs font-medium text-white`}
          style={{ background: "var(--ac)", "--d": "4s", "--delay": c.delay } as Vars}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

function EventsVisual() {
  return (
    <div className="relative h-52 overflow-hidden rounded-2xl bg-[#0d0e10]">
      <div className="sweep absolute top-0 left-[calc(50%-6rem)] h-[160%] w-48 bg-gradient-to-b from-white/35 to-transparent [clip-path:polygon(46%_0,54%_0,100%_100%,0_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#e62b1e]/25 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -mt-12 -ml-12 h-24 w-24">
        {[0, 1, 2].map((i) => (
          <span key={i} className="ring-pulse absolute inset-0 rounded-full border-2" style={{ borderColor: "var(--ac)", "--delay": `${i * 0.8}s` } as Vars} />
        ))}
        <span className="absolute inset-0 m-auto block h-20 w-11">
          <Mic />
        </span>
      </div>
      {/* event names roll through like a stage board */}
      <div data-ticker className="absolute inset-x-4 bottom-3 h-6 overflow-hidden text-center font-display text-sm font-medium text-white">
        {events.map((e, i) => (
          <span key={e.slug} data-tick className={`absolute inset-0 truncate ${i ? "opacity-0" : ""}`}>
            <span style={{ color: "var(--ac)" }}>●</span> {e.title}
          </span>
        ))}
      </div>
    </div>
  );
}

function GitHubVisual() {
  return (
    <div className="rounded-2xl bg-bg p-4 ring-1 ring-line">
      <div className="mb-4 flex gap-6">
        {[
          { n: 99, s: "", l: "day streak" },
          { n: 1200, s: "+", l: "contributions" },
        ].map((x) => (
          <div key={x.l}>
            <p className="font-display text-3xl font-medium tracking-tight tabular-nums">
              <span data-count={x.n}>{x.n}</span>
              {x.s}
            </p>
            <p className="text-xs text-muted">{x.l}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: "repeat(20, minmax(0, 1fr))" }}>
        {heat.map((l, i) => (
          <span
            key={i}
            className={`aspect-square rounded-[2px] ${l ? "glow" : ""}`}
            style={{ background: greens[l], "--d": "2.8s", "--delay": `${Math.floor(i / 7) * 0.1}s` } as Vars}
          />
        ))}
      </div>
      <p className="mt-4 truncate rounded-lg bg-[#0d0e10] px-3 py-2 font-mono text-xs text-white/80">
        <span className="text-emerald-400">$</span> git commit -m &quot;ship something small&quot;
        <span className="caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-white/80" />
      </p>
    </div>
  );
}

const looks: Record<string, { accent: string; Visual: () => React.JSX.Element }> = {
  freelance: { accent: "#4361ee", Visual: FreelanceVisual },
  clubs: { accent: "#7048e8", Visual: ClubsVisual },
  events: { accent: "#e62b1e", Visual: EventsVisual },
  github: { accent: "#2f9e44", Visual: GitHubVisual },
};

export default function Experience({ heading = true }: { heading?: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-rail]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-timeline]", start: "top 60%", end: "bottom 60%", scrub: 0.6 } },
        );

        gsap.utils.toArray<HTMLElement>("[data-item]").forEach((item) => {
          const st = { trigger: item, start: "top 75%" };
          const card = item.querySelector<HTMLElement>("[data-card]")!;

          gsap.from(card, { x: 60, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: st });
          gsap.from(item.querySelectorAll("[data-side]"), { y: 24, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, scrollTrigger: st });
          gsap.from(item.querySelector("[data-dot]"), {
            scale: 0,
            duration: 0.6,
            ease: "back.out(3)",
            scrollTrigger: { trigger: item, start: "top 60%", toggleActions: "play none none reverse" },
          });
          gsap.from(card.querySelectorAll("[data-point]"), { x: -20, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.12, delay: 0.3, scrollTrigger: st });

          const build = card.querySelectorAll("[data-build]");
          if (build.length) {
            gsap
              .timeline({ repeat: -1, repeatDelay: 1.5, scrollTrigger: st })
              .from(build, { scaleX: 0, opacity: 0, duration: 0.6, ease: "power3.out", stagger: 0.25 })
              .to(build, { opacity: 0, duration: 0.4, delay: 2.5 });
          }

          countUp(card, card);
        });

        gsap.utils.toArray<HTMLElement>("[data-ticker]").forEach((ticker) => {
          const ticks = ticker.querySelectorAll("[data-tick]");
          gsap.set(ticks, { yPercent: 100, opacity: 0 });
          const tl = gsap.timeline({ repeat: -1 });
          ticks.forEach((t) => {
            tl.to(t, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
              .to(t, { yPercent: -100, opacity: 0, duration: 0.5, ease: "power3.in" }, "+=1.6")
              .set(t, { yPercent: 100 });
          });
        });
      });

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () =>
        cardHover(gsap.utils.toArray<HTMLElement>("[data-card]")),
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} id="experience" className="card py-12 md:py-20">
      <div className="container-x">
        {heading && (
          <SectionHeading
            label="Experience & leadership"
            title={
              <>
                Building, shipping
                <br />
                <span className="text-muted">&amp; leading.</span>
              </>
            }
            aside={
              <p className="max-w-xs text-muted">
                Freelance delivery, club leadership, and running some of the
                biggest tech events on campus.
              </p>
            }
          />
        )}

        <div data-timeline className="relative">
          {/* rail: grey track with a fill that grows as you scroll */}
          <div className="absolute top-3 bottom-3 left-[11px] w-0.5 rounded-full bg-line md:left-[231px]">
            <div data-rail className="h-full w-full origin-top rounded-full bg-gradient-to-b from-[#4361ee] via-[#e62b1e] to-[#2f9e44]" />
          </div>

          <div className="space-y-6 md:space-y-10">
            {experience.map((e, i) => {
              const { accent, Visual } = looks[e.id];
              return (
                <div key={e.id} data-item className="relative grid grid-cols-1 gap-4 pl-10 md:grid-cols-[220px_1fr] md:gap-12 md:pl-0" style={{ "--ac": accent } as Vars}>
                  <span className="absolute top-8 left-0 grid h-6 w-6 place-items-center rounded-full bg-bg ring-1 ring-line md:left-[220px]">
                    <span data-dot className="h-3 w-3 rounded-full" style={{ background: "var(--ac)", boxShadow: "0 0 0 6px color-mix(in srgb, var(--ac) 18%, transparent)" }} />
                  </span>

                  <div className="hidden md:sticky md:top-32 md:block md:self-start md:pt-6 md:text-right">
                    <p data-side className="font-mono text-xs text-muted tabular-nums">
                      {String(i + 1).padStart(2, "0")}/{String(experience.length).padStart(2, "0")}
                    </p>
                    <p data-side className="mt-2 font-display text-2xl font-medium tracking-tight">
                      {e.period}
                    </p>
                  </div>

                  <article data-card className="group min-w-0">
                    <div
                      data-tilt
                      className="relative grid grid-cols-1 gap-8 overflow-hidden rounded-[1.75rem] border border-line bg-surface p-7 transition-[border-color,box-shadow] duration-500 group-hover:border-transparent group-hover:shadow-[0_30px_60px_-30px_var(--ac)] md:p-9 xl:grid-cols-[1fr_1.05fr] xl:items-center"
                    >
                      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: spotlight }} />

                      <div className="relative min-w-0">
                        <p className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--ac)" }} />
                          <span>
                            <span className="md:hidden">{e.period} · </span>
                            {e.org}
                          </span>
                        </p>
                        <h3 className="mt-4 font-display text-3xl font-medium tracking-tight md:text-4xl">{e.role}</h3>
                        <ul className="mt-6 space-y-3 text-muted">
                          {e.points.map((pt) => (
                            <li key={pt} data-point className="flex gap-3 leading-relaxed">
                              <span className="mt-2.5 h-px w-4 shrink-0" style={{ background: "var(--ac)" }} />
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="relative min-w-0">
                        <Visual />
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
