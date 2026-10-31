"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { achievements, events } from "@/lib/content";
import { Flame } from "./illustrations/parts";
import { type Vars, cardHover, countUp, seededLevels, spotlight } from "./ui/cardFx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&";
const greens = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

const heat = seededLevels(24 * 7, 11);

function StreakVisual() {
  return (
    <div className="flex items-end gap-4 md:gap-6">
      <div className="grid flex-1 grid-flow-col grid-rows-3 gap-[3px]" style={{ gridTemplateColumns: "repeat(33, minmax(0, 1fr))" }}>
        {Array.from({ length: 99 }, (_, i) => (
          <span
            key={i}
            data-streak
            className={`aspect-square rounded-[2px] ${i === 98 ? "animate-pulse" : ""}`}
            style={{ background: `hsl(${44 - (i / 98) * 38} 95% ${60 - (i / 98) * 10}%)` }}
          />
        ))}
      </div>
      <span className="w-10 shrink-0 md:w-14">
        <Flame />
      </span>
    </div>
  );
}

function ContributionsVisual() {
  return (
    <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={{ gridTemplateColumns: "repeat(24, minmax(0, 1fr))" }}>
      {heat.map((l, i) => (
        <span
          key={i}
          className={`aspect-square rounded-[2px] ${l ? "glow" : ""}`}
          style={{ background: greens[l], "--d": "2.8s", "--delay": `${Math.floor(i / 7) * 0.1}s` } as Vars}
        />
      ))}
    </div>
  );
}

const podium = [
  { rank: "2", h: "64%" },
  { rank: "1", h: "88%" },
  { rank: "3", h: "48%" },
  { rank: "4", h: "36%", me: true },
];

function HackathonVisual() {
  return (
    <div className="relative flex h-40 items-end gap-2">
      {podium.map((p) => (
        <div key={p.rank} className="flex h-full flex-1 flex-col items-center justify-end">
          {p.me && (
            <span className="float mb-2 rounded-full bg-fg px-2.5 py-1 text-xs font-medium text-bg" style={{ "--d": "3s" } as Vars}>
              me
            </span>
          )}
          <div
            data-bar
            className={`w-full origin-bottom rounded-t-xl pt-2 text-center font-display text-lg font-medium ${p.me ? "text-white" : "bg-surface-2 text-muted"}`}
            style={{ height: p.h, background: p.me ? "var(--ac)" : undefined }}
          >
            {p.rank}
          </div>
        </div>
      ))}
      {/* confetti, fired on hover */}
      {Array.from({ length: 18 }, (_, i) => (
        <span
          key={i}
          data-confetti
          className="pointer-events-none absolute bottom-[30%] left-[87%] h-2 w-1.5 rounded-[1px] opacity-0"
          style={{ background: ["#7048e8", "#fcc419", "#ef476f", "#12b886"][i % 4] }}
        />
      ))}
    </div>
  );
}

function PlayStoreVisual() {
  return (
    <div className="flex items-center gap-5">
      <div className="float w-24 shrink-0 rounded-[1.4rem] border-[5px] border-fg bg-bg p-2 pt-3 shadow-[0_18px_30px_-12px_rgba(13,14,16,0.45)]" style={{ "--d": "5s", "--r": "-4deg" } as Vars}>
        <div className="mx-auto mb-2 h-1 w-6 rounded-full bg-fg/15" />
        <div className="grid aspect-square place-items-center rounded-xl font-display text-xl font-semibold text-white" style={{ background: "linear-gradient(135deg, #63e6be, var(--ac))" }}>
          IM
        </div>
        <div className="mt-2 space-y-1">
          <div className="h-1 rounded-full bg-surface-2" />
          <div className="h-1 w-2/3 rounded-full bg-surface-2" />
        </div>
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <p className="flex items-center gap-2 text-sm font-medium">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: "var(--ac)" }} />
            <span className="relative h-2.5 w-2.5 rounded-full" style={{ background: "var(--ac)" }} />
          </span>
          Live on Google Play
        </p>
        {/* install button that loops install → open */}
        <div className="relative h-10 w-full max-w-40 overflow-hidden rounded-full bg-surface-2 text-sm font-medium">
          <span data-install-fill className="absolute inset-y-0 left-0 w-0" style={{ background: "var(--ac)" }} />
          <span data-install-a className="absolute inset-0 grid place-items-center">Install</span>
          <span data-install-b className="absolute inset-0 grid place-items-center text-white opacity-0">Open</span>
        </div>
      </div>
    </div>
  );
}

function TedxVisual() {
  return (
    <div className="relative h-40 overflow-hidden rounded-2xl bg-[#0d0e10]">
      <div className="sweep absolute top-0 left-[calc(50%-6rem)] h-[160%] w-48 bg-gradient-to-b from-white/40 to-transparent [clip-path:polygon(46%_0,54%_0,100%_100%,0_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#e62b1e]/25 to-transparent" />
      <div className="absolute bottom-4 left-5">
        <p className="font-display text-4xl leading-none font-bold tracking-tight" style={{ color: "var(--ac)" }}>
          TEDx
        </p>
        <p className="mt-1 text-xs text-white/60">Invertis University</p>
      </div>
      <div className="absolute right-5 bottom-4 flex h-10 items-end gap-1">
        {[0.1, 0.5, 0.25, 0.7, 0.35, 0.6, 0.15].map((d) => (
          <span key={d} className="eq h-full w-1.5 origin-bottom rounded-full bg-white/80" style={{ "--delay": `${d}s` } as Vars} />
        ))}
      </div>
    </div>
  );
}

function EventsVisual() {
  const tickets = [...events, ...events];
  return (
    <div className="marquee -mx-7 overflow-hidden py-3 md:-mx-9 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="marquee-track flex w-max gap-4 px-2" style={{ animationDuration: "50s" }}>
        {tickets.map((e, i) => (
          <div
            key={`${e.slug}-${i}`}
            aria-hidden={i >= events.length}
            className={`relative w-56 shrink-0 rounded-2xl bg-bg p-4 ring-1 ring-line transition-[translate,rotate] duration-300 hover:-translate-y-2 hover:rotate-0 ${i % 2 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"}`}
          >
            <p className="flex items-center justify-between text-xs text-muted">
              <span>{e.year}</span>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--ac)" }} />
            </p>
            <p className="mt-1 truncate font-display text-lg font-medium tracking-tight">{e.title}</p>
            <div className="relative mt-3 border-t border-dashed border-line pt-3 text-xs text-muted">
              <span className="absolute -top-2 -left-6 h-4 w-4 rounded-full bg-surface" />
              <span className="absolute -top-2 -right-6 h-4 w-4 rounded-full bg-surface" />
              <span className="block truncate">{e.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const looks: Record<string, { accent: string; span: string; Visual: () => React.JSX.Element }> = {
  streak: { accent: "#f76707", span: "sm:col-span-2", Visual: StreakVisual },
  contributions: { accent: "#2f9e44", span: "", Visual: ContributionsVisual },
  hackathon: { accent: "#7048e8", span: "", Visual: HackathonVisual },
  playstore: { accent: "#0ca678", span: "", Visual: PlayStoreVisual },
  tedx: { accent: "#e62b1e", span: "", Visual: TedxVisual },
  events: { accent: "#1c7ed6", span: "sm:col-span-2 lg:col-span-3", Visual: EventsVisual },
};

export default function Achievements() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-card]");

        gsap.from(cards, {
          y: 70,
          opacity: 0,
          scale: 0.96,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-grid]", start: "top 85%" },
        });

        cards.forEach((card) => {
          const st = { trigger: card, start: "top 80%" };

          countUp(card, card);

          card.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el) => {
            const word = el.dataset.scramble ?? "";
            const prog = { p: 0 };
            gsap.to(prog, {
              p: 1,
              duration: 1.2,
              ease: "none",
              scrollTrigger: st,
              onUpdate: () => {
                const done = Math.floor(prog.p * word.length);
                el.textContent = [...word]
                  .map((c, i) => (i < done ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
                  .join("");
              },
            });
          });

          const cells = card.querySelectorAll("[data-streak]");
          if (cells.length) {
            gsap.from(cells, { scale: 0, opacity: 0, duration: 0.35, ease: "back.out(3)", stagger: { each: 0.018, grid: [3, 33], axis: "x" }, scrollTrigger: st });
          }

          const bars = card.querySelectorAll("[data-bar]");
          if (bars.length) {
            gsap.from(bars, { scaleY: 0, duration: 1, ease: "elastic.out(1, 0.6)", stagger: 0.12, scrollTrigger: st });
          }
        });

        const fill = ref.current?.querySelector("[data-install-fill]");
        if (fill) {
          gsap
            .timeline({ repeat: -1, repeatDelay: 1, scrollTrigger: { trigger: fill, start: "top 90%" } })
            .to(fill, { width: "100%", duration: 1.8, ease: "power1.inOut" })
            .to("[data-install-a]", { opacity: 0, duration: 0.2 }, "<0.9")
            .to("[data-install-b]", { opacity: 1, duration: 0.3 }, ">")
            .to({}, { duration: 1.6 })
            .to(["[data-install-b]", fill], { opacity: 0, duration: 0.3 })
            .set(fill, { width: 0, opacity: 1 })
            .to("[data-install-a]", { opacity: 1, duration: 0.3 });
        }
      });

      // pointer spotlight, gentle 3D tilt and a confetti pop on hover
      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () =>
        cardHover(gsap.utils.toArray<HTMLElement>("[data-card]")),
      );
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="card py-8 md:py-12">
      <div className="container-x">
        <div data-grid className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => {
            const { accent, span, Visual } = looks[a.id];
            const num = a.value.match(/^(\d+)(.*)$/);
            return (
              <article key={a.id} data-card className={`group min-w-0 ${span}`} style={{ "--ac": accent } as Vars}>
                <div
                  data-tilt
                  className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface p-7 transition-[border-color,box-shadow] duration-500 group-hover:border-transparent group-hover:shadow-[0_30px_60px_-30px_var(--ac)] md:p-9"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: spotlight }}
                  />

                  <div className="relative flex items-center justify-between text-sm text-muted">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: "var(--ac)" }} />
                      {a.title}
                    </span>
                    <span className="font-mono text-xs tabular-nums">
                      {String(i + 1).padStart(2, "0")}/{String(achievements.length).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="relative mt-6 font-display text-6xl font-medium tracking-tight tabular-nums md:text-7xl">
                    {num ? (
                      <>
                        <span data-count={num[1]}>{num[1]}</span>
                        {num[2]}
                      </>
                    ) : (
                      <span data-scramble={a.value}>{a.value}</span>
                    )}
                    {a.unit && <span className="ml-2 text-2xl text-muted">{a.unit}</span>}
                  </p>
                  <p className="relative mt-3 max-w-md leading-relaxed text-muted">{a.text}</p>

                  <div className="relative mt-auto pt-8">
                    <Visual />
                  </div>

                  {a.id === "events" && (
                    <Link
                      href="/about/clubs#events"
                      className="relative mt-6 inline-flex items-center gap-2 self-start rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:scale-105"
                    >
                      See all events
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
