"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { techIcons } from "./illustrations/techIcons";
import TechLogo from "./ui/TechLogo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WEEKS = 52;
const STREAK = 99;
const shades = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

// Seeded so the server and the browser draw the same squares.
const levels = (() => {
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const total = WEEKS * 7;
  return Array.from({ length: total }, (_, i) => {
    const r = rand();
    if (i >= total - STREAK) return 1 + Math.floor(r * 4); // the streak: never an empty day
    return r < 0.35 ? 0 : 1 + Math.floor(r * r * 4);
  });
})();

const commits = [
  "feat: add live terminal to the home page",
  "fix: smoother orbit on mobile",
  "feat(app): push notifications for mess menu",
  "chore: deploy to Firebase hosting",
  "feat: events gallery with lightbox",
  "perf: lazy-load project images",
];

const stats = [
  { n: 1200, suffix: "+", label: "contributions" },
  { n: STREAK, suffix: "", label: "day best streak" },
];

// An animated GitHub contribution graph: squares fill in a wave and a commit feed keeps ticking.
export default function GitHubPulse() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-cell]", {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(3)",
          stagger: { grid: [WEEKS, 7], from: "start", amount: 1.8 },
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const counter = { v: 0 };
          el.textContent = "0";
          gsap.to(counter, {
            v: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: { trigger: ref.current, start: "top 80%" },
            onUpdate: () => {
              el.textContent = String(Math.round(counter.v));
            },
          });
        });

        const feed = gsap.utils.toArray<HTMLElement>("[data-commit]");
        gsap.set(feed, { yPercent: 100, opacity: 0 });
        const tl = gsap.timeline({ repeat: -1 });
        feed.forEach((c) => {
          tl.to(c, { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" })
            .to(c, { yPercent: -100, opacity: 0, duration: 0.5, ease: "power3.in" }, "+=1.8")
            .set(c, { yPercent: 100 });
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="rounded-3xl border border-line bg-surface p-6 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-fg">
            <TechLogo icon={techIcons.github} className="h-6 w-6" fill="var(--bg)" />
          </span>
          <div>
            <p className="font-display text-xl font-medium tracking-tight">github.com/chandanXcoder</p>
            <p className="flex items-center gap-2 text-sm text-muted">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Shipping every day
            </p>
          </div>
        </div>
        <div className="flex gap-8">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-3xl font-medium tracking-tight tabular-nums md:text-4xl">
                <span data-count={s.n}>{s.n}</span>
                {s.suffix}
              </p>
              <p className="text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* phones show the last half year, wider screens the full year */}
      <div className="mt-8 grid grid-flow-col grid-cols-[repeat(26,minmax(0,1fr))] grid-rows-7 gap-[3px] sm:grid-cols-[repeat(52,minmax(0,1fr))]">
        {levels.map((l, i) => (
          <span
            key={i}
            data-cell
            className={`aspect-square rounded-[2px] ${i < levels.length / 2 ? "max-sm:hidden" : ""} ${i === levels.length - 1 ? "animate-pulse" : ""}`}
            style={{ background: shades[l] }}
          />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-line pt-5 font-mono text-xs text-muted sm:text-sm">
        <span className="shrink-0 rounded-md bg-fg px-2 py-0.5 text-bg">main</span>
        <span className="relative h-5 flex-1 overflow-hidden">
          {commits.map((c, i) => (
            <span key={c} data-commit className={`absolute inset-0 truncate ${i ? "opacity-0" : ""}`}>
              {c}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
