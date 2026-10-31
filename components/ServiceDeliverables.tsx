"use client";

import { useId, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Service } from "@/lib/content";
import { type Vars, cardHover, spotlight } from "./ui/cardFx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type TL = gsap.core.Timeline;
type Q = (selector: string) => HTMLElement[];

const accents = ["#6d5efc", "#0fb67f", "#f08a24", "#0a96e0"];
// bento rhythm: wide, narrow / narrow, wide
const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

const ac = { background: "var(--ac)" };
const tint = (p: number) => `color-mix(in srgb, var(--ac) ${p}%, transparent)`;
const panel =
  "rounded-xl border border-line bg-bg shadow-[0_24px_48px_-24px_rgba(15,23,42,0.32),0_2px_6px_-2px_rgba(15,23,42,0.06)]";

/* ---------- animation helpers ---------- */

// Builds a looping timeline that only plays while the visual is on screen.
// Markup is written in its finished state, so reduced-motion users see a complete picture.
function useLoop(build: (tl: TL, q: Q, root: HTMLElement) => void) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4, defaults: { duration: 0.6, ease: "power3.out" } });
        build(tl, gsap.utils.selector(root) as unknown as Q, root);
        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (st) => (st.isActive ? tl.play() : tl.pause()),
        });
      });
    },
    { scope: ref },
  );
  return ref;
}

// Position of `el` inside `root`, ignoring transforms (root must be positioned).
function offsetIn(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = el;
  while (n && n !== root) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight, cx: x + el.offsetWidth / 2, cy: y + el.offsetHeight / 2 };
}

function typeIn(tl: TL, el: HTMLElement | undefined, text: string, at?: gsap.Position) {
  if (!el) return;
  const p = { n: 0 };
  tl.call(() => void (el.textContent = ""), undefined, 0);
  tl.fromTo(
    p,
    { n: 0 },
    { n: text.length, duration: text.length * 0.045, ease: "none", onUpdate: () => void (el.textContent = text.slice(0, Math.round(p.n))) },
    at,
  );
}

function countIn(
  tl: TL,
  el: HTMLElement | undefined,
  to: number,
  fmt: (v: number) => string = (v) => Math.round(v).toLocaleString("en-IN"),
  at?: gsap.Position,
  { from = 0, duration = 1.4 } = {},
) {
  if (!el) return;
  const p = { v: from };
  tl.call(() => void (el.textContent = fmt(from)), undefined, 0);
  tl.fromTo(p, { v: from }, { v: to, duration, ease: "power2.out", onUpdate: () => void (el.textContent = fmt(p.v)) }, at);
}

const press = (tl: TL, el: Element | undefined, at?: gsap.Position) =>
  tl.to(el ?? {}, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1, ease: "power1.inOut" }, at);

const moveTo = (tl: TL, cur: Element | undefined, x: number, y: number, at?: gsap.Position) =>
  tl.to(cur ?? {}, { x, y, duration: 0.6, ease: "power2.inOut" }, at);

const outro = (tl: TL, targets: gsap.TweenTarget) =>
  tl.to(targets, { opacity: 0, y: -8, duration: 0.45, ease: "power2.in", stagger: 0.05 }, "+=1.8");

/* ---------- shared pieces ---------- */

const iconPaths: Record<string, React.ReactNode> = {
  check: <path d="M20 6 9 17l-5-5" />,
  lock: (
    <>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 8H6" />
    </>
  ),
  truck: (
    <>
      <path d="M14 17V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11h2" />
      <path d="M14 9h4l4 4v4h-2M9 17h6" />
      <circle cx="6.5" cy="17.5" r="2" />
      <circle cx="17.5" cy="17.5" r="2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.9 1.9 0 0 0 3.4 0" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  cloud: <path d="M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z" />,
  phone: (
    <>
      <rect x="7" y="2" width="10" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  laptop: (
    <>
      <rect x="4" y="5" width="16" height="11" rx="1.5" />
      <path d="M2 19h20" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  branch: (
    <>
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="8" r="2" />
      <path d="M6 8v8M18 10c0 4-6 3-10 7" />
    </>
  ),
  thermo: <path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z" />,
  drop: <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z" />,
  wave: <path d="M2 12h4l3-7 4 14 3-7h6" />,
  play: <path d="m8 5 11 7-11 7z" />,
  alert: (
    <>
      <path d="M12 3 2 20h20z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
};

function Icon({ name, className = "h-3.5 w-3.5" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {iconPaths[name]}
    </svg>
  );
}

function Star({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z" />
    </svg>
  );
}

function Pointer({ label }: { label?: string }) {
  return (
    <div data-cursor className="pointer-events-none absolute top-0 left-0 z-20 motion-reduce:hidden">
      <svg viewBox="0 0 16 16" className="h-4 w-4 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]">
        <path d="M2 1.5 13 7.1l-4.7 1.3-1.9 4.6z" fill="var(--fg)" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      {label && (
        <span className="absolute top-3.5 left-3 rounded-full px-1.5 py-0.5 text-[9px] font-medium whitespace-nowrap text-white" style={ac}>
          {label}
        </span>
      )}
    </div>
  );
}

function Chrome({ url, children, className = "" }: { url?: string; children: React.ReactNode; className?: string }) {
  return (
    <div data-panel className={`${panel} overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="flex gap-1">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
          ))}
        </span>
        {url && <span className="mx-auto truncate rounded-md bg-surface px-3 py-0.5 font-mono text-[9px] text-muted">{url}</span>}
      </div>
      {children}
    </div>
  );
}

function Live() {
  return (
    <span className="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[9px] font-semibold tracking-wide" style={{ background: tint(14), color: "var(--ac)" }}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute h-full w-full animate-ping rounded-full opacity-75" style={ac} />
        <span className="relative h-1.5 w-1.5 rounded-full" style={ac} />
      </span>
      LIVE
    </span>
  );
}

function Chip({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span data-chip className={`${panel} inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-medium whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
}

function Tick({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-full text-white ${className}`} style={ac}>
      <Icon name="check" className="h-[60%] w-[60%]" />
    </span>
  );
}

// Horizontal progress track with checkpoints; `rider` travels on the fill's leading edge.
function Track({ steps, rider }: { steps: string[]; rider?: React.ReactNode }) {
  return (
    <div className="relative px-1">
      <div className="absolute top-[11px] right-4 left-4 h-[3px] rounded-full bg-surface-2">
        <div data-fill className="relative h-full w-full rounded-full" style={ac}>
          {rider && <span className="absolute right-0 bottom-full mb-2.5 translate-x-1/2">{rider}</span>}
        </div>
      </div>
      <div className="relative flex justify-between">
        {steps.map((s) => (
          <div key={s} className="flex w-6 flex-col items-center gap-1.5">
            <span className="relative grid h-6 w-6 place-items-center rounded-full border-2 border-line bg-bg">
              <span data-done className="absolute -inset-0.5 grid place-items-center rounded-full text-white" style={ac}>
                <Icon name="check" className="h-3 w-3" />
              </span>
            </span>
            <span className="text-[9px] whitespace-nowrap text-muted">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function runTrack(tl: TL, q: Q, onStep?: (i: number) => void) {
  const done = q("[data-done]");
  const [fill] = q("[data-fill]");
  tl.set(fill, { width: "0%" }, 0).set(done, { scale: 0 }, 0);
  done.forEach((d, i) => {
    if (i) tl.to(fill, { width: `${(i / (done.length - 1)) * 100}%`, duration: 0.8, ease: "power2.inOut" });
    onStep?.(i);
    tl.to(d, { scale: 1, duration: 0.4, ease: "back.out(3)" });
  });
}

/* ---------- visuals ---------- */

function DesignVisual() {
  const ref = useLoop((tl, q) => {
    const [board] = q("[data-board]");
    const els = q("[data-el]");
    const layers = q("[data-layer]");
    const [sel] = q("[data-sel]");
    const [cur] = q("[data-cursor]");
    tl.set(sel, { opacity: 0 }, 0)
      .set(cur, { opacity: 1, x: board.offsetWidth * 0.85, y: board.offsetHeight * 0.95 }, 0)
      .set(layers, { opacity: 0.35 }, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 });
    els.forEach((el, i) => {
      const b = offsetIn(el, board);
      moveTo(tl, cur, b.x + b.w * 0.7, b.y + b.h * 0.6);
      tl.from(el, { opacity: 0, scale: 0.6, transformOrigin: "left center", duration: 0.45, ease: "back.out(2)" })
        .to(sel, { opacity: 1, x: b.x - 4, y: b.y - 4, width: b.w + 8, height: b.h + 8, duration: 0.3 }, "<")
        .to(layers[i] ?? {}, { opacity: 1, duration: 0.2 }, "<");
    });
    tl.to(sel, { opacity: 0, duration: 0.3 }, "+=0.8");
    outro(tl, [q("[data-panel]"), cur]);
  });
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} flex w-full max-w-[440px] overflow-hidden`}>
        <div className="hidden w-24 shrink-0 flex-col gap-1 border-r border-line p-2 text-[9px] sm:flex">
          <span className="mb-1 px-1 text-muted">Layers</span>
          {["Heading", "Subtext", "Image", "Button"].map((l) => (
            <span key={l} data-layer className="flex items-center gap-1.5 rounded px-1 py-0.5">
              <span className="h-1.5 w-1.5 rounded-sm" style={ac} />
              {l}
            </span>
          ))}
        </div>
        <div data-board className="relative flex-1 p-4">
          <p className="mb-2 text-[9px] text-muted">Frame · Hero</p>
          <div data-el className="h-3 w-1/2 rounded-full bg-fg" />
          <div data-el className="mt-2 h-2 w-2/3 rounded-full bg-line" />
          <div data-el className="mt-3 h-16 rounded-lg" style={{ background: `linear-gradient(135deg, ${tint(70)}, ${tint(20)})` }} />
          <div data-el className="mt-3 inline-flex rounded-full px-3 py-1 text-[10px] font-medium text-white" style={ac}>
            Get started
          </div>
          <div data-sel className="pointer-events-none absolute top-0 left-0 rounded-md border-[1.5px] opacity-0" style={{ borderColor: "var(--ac)" }}>
            {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((p) => (
              <span key={p} className={`absolute h-1.5 w-1.5 border bg-bg ${p}`} style={{ borderColor: "var(--ac)" }} />
            ))}
          </div>
          <Pointer label="You" />
        </div>
      </div>
    </div>
  );
}

type Device = { label: string; frame: string; cols: string; blocks: number };
const screens: Device[] = [
  { label: "1440px", frame: "h-28 w-44", cols: "grid-cols-3", blocks: 6 },
  { label: "768px", frame: "h-32 w-24", cols: "grid-cols-2", blocks: 6 },
  { label: "375px", frame: "h-28 w-14", cols: "grid-cols-1", blocks: 4 },
];
const phones: Device[] = [
  { label: "Android", frame: "h-40 w-20", cols: "grid-cols-1", blocks: 4 },
  { label: "iOS", frame: "h-40 w-20", cols: "grid-cols-1", blocks: 4 },
];

function ResponsiveVisual({ devices = screens }: { devices?: Device[] } = {}) {
  const ref = useLoop((tl, q) => {
    tl.from(q("[data-device]"), { y: 30, opacity: 0, stagger: 0.12, duration: 0.7 })
      .from(q("[data-bar]"), { scaleX: 0, transformOrigin: "left", stagger: 0.08, duration: 0.4 }, "-=0.3")
      .from(q("[data-block]"), { scale: 0, opacity: 0, stagger: 0.03, duration: 0.35, ease: "back.out(2)" }, "-=0.2")
      .from(q("[data-label]"), { opacity: 0, y: 6, stagger: 0.1, duration: 0.3 });
    outro(tl, q("[data-device]"));
  });
  return (
    <div ref={ref} className="flex h-full items-end justify-center gap-4 px-6 pb-7">
      {devices.map((dv) => (
        <div key={dv.label} data-device className="flex flex-col items-center gap-2">
          <div className={`${dv.frame} overflow-hidden rounded-lg border-[3px] border-fg bg-bg p-1.5 shadow-[0_24px_40px_-20px_rgba(15,23,42,0.45)]`}>
            <div data-bar className="mb-1.5 flex items-center justify-between">
              <span className="h-1.5 w-1/3 rounded-full" style={ac} />
              <span className="h-1.5 w-1.5 rounded-full bg-line" />
            </div>
            <div className={`grid ${dv.cols} gap-1`}>
              <span data-block className="col-span-full h-7 rounded" style={{ background: tint(22) }} />
              {Array.from({ length: dv.blocks }, (_, i) => (
                <span key={i} data-block className="h-4 rounded bg-surface-2" />
              ))}
            </div>
          </div>
          <span data-label className="font-mono text-[9px] text-muted">
            {dv.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function SearchVisual() {
  const ref = useLoop((tl, q) => {
    const rows = q("[data-row]");
    const [rank] = q("[data-rank]");
    const setRank = (n: number) => () => void (rank.textContent = `#${n}`);
    const swap = { duration: 0.6, ease: "power3.inOut" };
    tl.set(rows[0], { y: 0 }, 0).set(rows[1], { y: 52 }, 0).set(rows[2], { y: 104 }, 0).call(setRank(3), undefined, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 });
    typeIn(tl, q("[data-query]")[0], "web developer near me");
    tl.from(rows, { opacity: 0, x: -12, stagger: 0.1, duration: 0.4 })
      .to(rows[2], { y: 52, ...swap }, "+=0.4")
      .to(rows[1], { y: 104, ...swap }, "<")
      .call(setRank(2))
      .to(rows[2], { y: 0, ...swap }, "+=0.4")
      .to(rows[0], { y: 52, ...swap }, "<")
      .call(setRank(1))
      .from(q("[data-chip]"), { opacity: 0, y: 10, scale: 0.9, ease: "back.out(2)" });
    outro(tl, [q("[data-panel]"), q("[data-chip]")]);
  });
  const results = [
    { url: "competitor.in", title: "Web Design Agency", ours: false, y: 52 },
    { url: "directory.com", title: "Top 10 Developers", ours: false, y: 104 },
    { url: "yoursite.com", title: "Your Brand · Websites that convert", ours: true, y: 0 },
  ];
  return (
    <div ref={ref} className="relative flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} w-full max-w-[400px] p-3`}>
        <div className="mb-3 flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-[11px]">
          <Icon name="search" className="h-3.5 w-3.5 text-muted" />
          <span data-query>web developer near me</span>
          <span className="caret -ml-1.5 text-muted">|</span>
        </div>
        <div className="relative h-[148px]">
          {results.map((r) => (
            <div
              key={r.url}
              data-row
              className="absolute inset-x-0 top-0 flex h-11 items-center gap-2.5 rounded-lg border px-3"
              style={{
                transform: `translateY(${r.y}px)`,
                borderColor: r.ours ? "var(--ac)" : "var(--line)",
                background: r.ours ? "color-mix(in srgb, var(--ac) 8%, var(--bg))" : "var(--bg)",
                zIndex: r.ours ? 1 : 0,
              }}
            >
              <span className="h-5 w-5 shrink-0 rounded-full" style={r.ours ? ac : { background: "var(--surface-2)" }} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[9px] text-muted">{r.url}</p>
                <p className="truncate text-[11px] font-medium">{r.title}</p>
              </div>
              {r.ours && (
                <span data-rank className="rounded-md px-1.5 py-0.5 text-[10px] font-semibold text-white" style={ac}>
                  #1
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <Chip className="absolute right-5 bottom-5">
        <span style={{ color: "var(--ac)" }}>▲ 214%</span> organic traffic
      </Chip>
    </div>
  );
}

function CmsVisual() {
  const NEW = "Diwali sale is live";
  const ref = useLoop((tl, q, root) => {
    const [edit] = q("[data-edit]");
    const [live] = q("[data-live]");
    const [btn] = q("[data-btn]");
    const [cur] = q("[data-cursor]");
    const [flash] = q("[data-flash]");
    const e = offsetIn(edit, root);
    const b = offsetIn(btn, root);
    tl.set(cur, { opacity: 1, x: e.x + e.w * 0.5, y: e.y + 70 }, 0).set(flash, { opacity: 0 }, 0);
    tl.call(() => void (live.textContent = "Summer collection"), undefined, 0);
    tl.from(q("[data-pane]"), { opacity: 0, y: 18, stagger: 0.12 });
    moveTo(tl, cur, e.x + e.w - 16, e.y + e.h * 0.6);
    typeIn(tl, edit, NEW);
    moveTo(tl, cur, b.cx, b.cy, "+=0.2");
    press(tl, btn);
    tl.to(live, { opacity: 0, y: -6, duration: 0.2 })
      .call(() => void (live.textContent = NEW))
      .to(live, { opacity: 1, y: 0, duration: 0.35 })
      .to(flash, { opacity: 1, duration: 0.2 }, "<")
      .to(flash, { opacity: 0, duration: 0.8 })
      .from(q("[data-chip]"), { opacity: 0, y: 10, ease: "back.out(2)" }, "<");
    outro(tl, [q("[data-pane]"), q("[data-chip]"), cur]);
  });
  return (
    <div ref={ref} className="relative flex h-full items-center justify-center gap-3 p-6 pb-12">
      <div data-pane className={`${panel} w-[46%] max-w-[200px] p-3 text-[10px]`}>
        <p className="mb-2 font-medium">Edit page</p>
        <p className="mb-1 text-muted">Headline</p>
        <p data-edit className="mb-2 h-6 truncate rounded-md border px-2 leading-[22px]" style={{ borderColor: "var(--ac)" }}>
          {NEW}
        </p>
        <p className="mb-1 text-muted">Banner</p>
        <div className="mb-3 flex items-center justify-between rounded-md border border-line px-2 py-1">
          Show on home
          <span className="relative h-3.5 w-6 rounded-full" style={ac}>
            <span className="absolute top-0.5 right-0.5 h-2.5 w-2.5 rounded-full bg-white" />
          </span>
        </div>
        <span data-btn className="block rounded-md py-1.5 text-center font-medium text-white" style={ac}>
          Publish
        </span>
      </div>
      <div data-pane className="relative w-[50%] max-w-[220px]">
        <Chrome url="yourbrand.com">
          <div className="p-3">
            <p data-live className="truncate font-display text-[13px] font-semibold">
              {NEW}
            </p>
            <div className="mt-2 h-14 rounded-md" style={{ background: `linear-gradient(135deg, ${tint(55)}, ${tint(15)})` }} />
            <div className="mt-2 h-1.5 w-3/4 rounded-full bg-line" />
            <div className="mt-1 h-1.5 w-1/2 rounded-full bg-line" />
          </div>
        </Chrome>
        <span data-flash className="pointer-events-none absolute -inset-1 rounded-2xl border-2 opacity-0" style={{ borderColor: "var(--ac)" }} />
      </div>
      <Chip className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Tick className="h-3.5 w-3.5" /> Published · no developer needed
      </Chip>
      <Pointer />
    </div>
  );
}

function LockVisual() {
  const ref = useLoop((tl, q) => {
    const [ok] = q("[data-ok]");
    tl.set(ok, { autoAlpha: 0 }, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 });
    typeIn(tl, q("[data-email]")[0], "you@brand.com");
    tl.from(q("[data-dot]"), { scale: 0, stagger: 0.07, duration: 0.2, ease: "back.out(3)" });
    press(tl, q("[data-btn]")[0], "+=0.2");
    tl.to(ok, { autoAlpha: 1, duration: 0.35 })
      .from(q("[data-shield]"), { scale: 0.4, rotation: -20, ease: "back.out(2.5)", duration: 0.6 }, "<")
      .fromTo(q("[data-ring]"), { scale: 0.8, opacity: 0.6 }, { scale: 2, opacity: 0, duration: 1, ease: "power2.out" }, "<")
      .from(q("[data-chip]"), { opacity: 0, y: 8, stagger: 0.1, ease: "back.out(2)" }, "-=0.5");
    outro(tl, [q("[data-panel]"), q("[data-chip]")]);
  });
  return (
    <div ref={ref} className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <div data-panel className={`${panel} relative w-56 p-4 text-[10px]`}>
        <div className="mb-3 flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-2">
            <Icon name="user" className="h-3.5 w-3.5" />
          </span>
          <span className="font-medium">Sign in to Dashboard</span>
        </div>
        <p data-email className="mb-2 h-7 rounded-md border border-line px-2 leading-[26px]">
          you@brand.com
        </p>
        <div className="mb-3 flex h-7 items-center gap-1 rounded-md border border-line px-2">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} data-dot className="h-1.5 w-1.5 rounded-full bg-fg" />
          ))}
        </div>
        <span data-btn className="block rounded-md py-1.5 text-center font-medium text-white" style={ac}>
          Sign in
        </span>
        <div data-ok className="invisible absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-bg opacity-0">
          <span className="relative grid h-12 w-12 place-items-center">
            <span data-ring className="absolute inset-0 rounded-full" style={ac} />
            <span data-shield className="relative grid h-12 w-12 place-items-center rounded-full text-white" style={ac}>
              <Icon name="shield" className="h-6 w-6" />
            </span>
          </span>
          <p className="text-[11px] font-medium">Access granted</p>
          <span className="rounded-full bg-surface px-2 py-0.5 text-muted">Role · Admin</span>
        </div>
      </div>
      <div className="flex gap-2">
        {["JWT sessions", "bcrypt", "Role-based"].map((c) => (
          <Chip key={c}>
            <Icon name="lock" className="h-3 w-3" />
            {c}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function ChartVisual() {
  const gid = `g${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const ref = useLoop((tl, q) => {
    const [vis, conv, rev] = q("[data-kpi]");
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 });
    countIn(tl, vis, 12480, undefined, "<0.2");
    countIn(tl, conv, 3.8, (v) => `${v.toFixed(1)}%`, "<");
    countIn(tl, rev, 84, (v) => `₹${Math.round(v)}k`, "<");
    tl.fromTo(q("[data-line]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" }, "<")
      .from(q("[data-area]"), { opacity: 0, duration: 0.8 }, "-=0.6")
      .from(q("[data-end]"), { scale: 0, transformOrigin: "center", ease: "back.out(3)", duration: 0.4 });
    outro(tl, q("[data-panel]"));
  });
  const line = "M0 70 C30 64 40 48 70 52 S120 30 150 36 S210 14 240 20 S280 8 300 6";
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} w-full max-w-[420px] p-4`}>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] font-medium">Overview · last 30 days</p>
          <Live />
        </div>
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            ["Visitors", "12,480"],
            ["Conversion", "3.8%"],
            ["Revenue", "₹84k"],
          ].map(([l, v]) => (
            <div key={l} className="rounded-lg bg-surface px-2.5 py-2">
              <p className="text-[9px] text-muted">{l}</p>
              <p data-kpi className="font-display text-base font-semibold tabular-nums">
                {v}
              </p>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 300 80" className="h-20 w-full overflow-visible">
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--ac)" stopOpacity="0.3" />
              <stop offset="1" stopColor="var(--ac)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[20, 40, 60].map((y) => (
            <line key={y} x1="0" x2="300" y1={y} y2={y} stroke="var(--line)" strokeDasharray="2 4" />
          ))}
          <path data-area d={`${line} V80 H0 Z`} fill={`url(#${gid})`} />
          <path data-line d={line} pathLength={1} fill="none" strokeWidth="2.5" strokeLinecap="round" style={{ stroke: "var(--ac)", strokeDasharray: 1 }} />
          <g data-end>
            <circle cx="300" cy="6" r="8" style={{ fill: tint(25) }} />
            <circle cx="300" cy="6" r="4" style={{ fill: "var(--ac)" }} stroke="#fff" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function NotifyVisual() {
  const items = [
    { who: "RK", text: "New order #2041 placed", t: "now" },
    { who: "AS", text: "Asha commented on a post", t: "2s" },
    { who: "₹", text: "Payment of ₹1,299 received", t: "5s" },
    { who: "MV", text: "Mohit joined the workspace", t: "9s" },
  ];
  const ref = useLoop((tl, q) => {
    const rows = q("[data-item]").reverse();
    const [bell] = q("[data-bell]");
    const [badge] = q("[data-badge]");
    tl.call(() => void (badge.textContent = "0"), undefined, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 });
    rows.forEach((r, i) => {
      tl.from(r, { opacity: 0, y: -14, scale: 0.96, duration: 0.45, ease: "back.out(1.6)" }, "+=0.25")
        .to(bell, { rotation: 16, duration: 0.07, yoyo: true, repeat: 5, ease: "sine.inOut" }, "<")
        .call(() => void (badge.textContent = String(i + 1)), undefined, "<");
    });
    outro(tl, q("[data-panel]"));
  });
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} w-full max-w-[320px] p-3`}>
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="flex items-center gap-2 text-[11px] font-medium">
            Activity <Live />
          </span>
          <span className="relative">
            <span data-bell className="block" style={{ transformOrigin: "50% 10%" }}>
              <Icon name="bell" className="h-4 w-4" />
            </span>
            <span data-badge className="absolute -top-1.5 -right-2 grid h-3.5 min-w-3.5 place-items-center rounded-full px-0.5 text-[8px] font-bold text-white" style={ac}>
              4
            </span>
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          {items.map((it, i) => (
            <div key={it.text} data-item className="flex items-center gap-2.5 rounded-lg border border-line px-2.5 py-2 text-[10px]" style={i === 0 ? { background: tint(7) } : undefined}>
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9px] font-semibold text-white" style={{ background: i % 2 ? "var(--fg)" : "var(--ac)" }}>
                {it.who}
              </span>
              <span className="flex-1 truncate">{it.text}</span>
              <span className="text-muted">{it.t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const nodeSpots = [
  [16, 22],
  [84, 22],
  [16, 78],
  [84, 78],
];

function NodesVisual({ labels = ["Core", "Auth", "Orders", "Users", "Payments"] }: { labels?: string[] } = {}) {
  const ref = useLoop((tl, q) => {
    const nodes = q("[data-node]");
    const packets = q("[data-packet]");
    const hits = q("[data-hit]");
    tl.set(packets, { opacity: 0, left: "50%", top: "50%" }, 0).set(hits, { opacity: 0 }, 0);
    tl.from(q("[data-hub]"), { scale: 0.6, opacity: 0, ease: "back.out(2)" })
      .from(q("[data-lines]"), { opacity: 0, duration: 0.4 })
      .from(nodes, { scale: 0.6, opacity: 0, stagger: 0.1, ease: "back.out(2)" }, "<");
    for (let round = 0; round < 2; round++) {
      const start = tl.duration() + 0.2;
      nodeSpots.forEach(([x, y], i) => {
        const at = start + i * 0.22;
        tl.set(packets[i], { opacity: 1, left: "50%", top: "50%" }, at)
          .to(packets[i], { left: `${x}%`, top: `${y}%`, duration: 0.7, ease: "power1.inOut" }, at)
          .set(packets[i], { opacity: 0 })
          .fromTo(hits[i], { opacity: 1 }, { opacity: 0, duration: 0.7 }, "<");
      });
    }
    tl.fromTo(q("[data-pulse]"), { scale: 1, opacity: 0.5 }, { scale: 1.8, opacity: 0, duration: 0.9 }, "-=0.6");
    outro(tl, [q("[data-hub]"), nodes, q("[data-lines]")]);
  });
  return (
    <div ref={ref} className="relative mx-auto h-full w-full max-w-[440px]">
      <svg data-lines className="absolute inset-0 h-full w-full" aria-hidden>
        {nodeSpots.map(([x, y]) => (
          <line key={`${x}-${y}`} x1="50%" y1="50%" x2={`${x}%`} y2={`${y}%`} strokeWidth="1.5" strokeDasharray="4 5" className="dash" style={{ stroke: tint(55) }} />
        ))}
      </svg>
      <div data-hub className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span data-pulse className="absolute inset-0 rounded-2xl opacity-0" style={ac} />
        <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-fg text-[11px] font-semibold text-bg shadow-[0_18px_30px_-12px_rgba(15,23,42,0.5)]">
          {labels[0]}
        </span>
      </div>
      {nodeSpots.map(([x, y], i) => (
        <div key={i} data-node className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
          <span className={`${panel} relative flex items-center gap-1.5 overflow-hidden rounded-lg px-2.5 py-1.5 text-[10px] font-medium whitespace-nowrap`}>
            <span data-hit className="absolute inset-0 opacity-0" style={{ background: tint(18) }} />
            <span className="relative h-1.5 w-1.5 rounded-full" style={ac} />
            <span className="relative">{labels[i + 1]}</span>
          </span>
        </div>
      ))}
      {nodeSpots.map((_, i) => (
        <span
          key={i}
          data-packet
          className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          style={{ ...ac, boxShadow: `0 0 0 4px ${tint(25)}` }}
        />
      ))}
    </div>
  );
}

type Row = [string, string, string, string];
const orderRows: Row[] = [
  ["#2041", "Riya S.", "₹2,499", "Paid"],
  ["#2040", "Aman K.", "₹1,150", "Shipped"],
  ["#2039", "Neha P.", "₹3,820", "Paid"],
  ["#2038", "Karan M.", "₹999", "Paid"],
];
const userRows: Row[] = [
  ["usr_01", "riya@mail.com", "admin", "Active"],
  ["usr_02", "aman@mail.com", "editor", "Active"],
  ["usr_03", "neha@mail.com", "user", "Active"],
  ["usr_04", "karan@mail.com", "user", "Active"],
];

function StatusPill({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[9px] font-medium whitespace-nowrap"
      style={muted ? { background: "var(--surface-2)", color: "var(--muted)" } : { background: tint(16), color: "var(--ac)" }}
    >
      {label}
    </span>
  );
}

function TableVisual({
  title = "Orders",
  rows = orderRows,
  cols = ["Order", "Customer", "Amount"],
  pending = "Pending",
}: { title?: string; rows?: Row[]; cols?: string[]; pending?: string } = {}) {
  const ref = useLoop((tl, q) => {
    const trs = q("[data-tr]");
    const [hl] = q("[data-hl]");
    tl.set(hl, { opacity: 0, y: trs[0].offsetTop }, 0).set(q("[data-after]"), { opacity: 0 }, 0).set(q("[data-before]"), { opacity: 1 }, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 }).from(trs, { opacity: 0, x: -10, stagger: 0.08, duration: 0.4 }, "-=0.2");
    trs.forEach((tr, i) => {
      tl.to(hl, { opacity: 1, y: tr.offsetTop, duration: 0.35, ease: "power2.inOut" }, i ? "+=0.25" : undefined);
      if (i === 2) tl.to(q("[data-before]"), { opacity: 0, duration: 0.2 }).to(q("[data-after]"), { opacity: 1, duration: 0.3 });
    });
    tl.to(hl, { opacity: 0, duration: 0.3 }, "+=0.4");
    outro(tl, q("[data-panel]"));
  });
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} w-full max-w-[430px] overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-line px-3 py-2.5">
          <span className="flex items-center gap-2 text-[11px] font-medium">
            <span className="grid h-5 w-5 place-items-center rounded-md text-white" style={ac}>
              <Icon name="db" className="h-3 w-3" />
            </span>
            {title}
            <span className="font-normal text-muted">· {rows.length} records</span>
          </span>
          <span className="rounded-md border border-line px-2 py-0.5 text-[9px]">+ New</span>
        </div>
        <div className="grid grid-cols-[1fr_1.4fr_1fr_64px] gap-2 px-3 py-1.5 text-[9px] tracking-wide text-muted uppercase">
          {[...cols, "Status"].map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>
        <div className="relative">
          <span data-hl className="absolute inset-x-0 top-0 h-8 opacity-0" style={{ background: tint(9) }} />
          {rows.map(([a, b, c, s], i) => (
            <div key={a} data-tr className="relative grid h-8 grid-cols-[1fr_1.4fr_1fr_64px] items-center gap-2 border-t border-line px-3 text-[10px]">
              <span className="font-mono">{a}</span>
              <span className="truncate">{b}</span>
              <span className="truncate tabular-nums">{c}</span>
              {i === 2 ? (
                <span className="relative">
                  <span data-before className="absolute top-0 left-0 opacity-0">
                    <StatusPill label={pending} muted />
                  </span>
                  <span data-after>
                    <StatusPill label={s} />
                  </span>
                </span>
              ) : (
                <span>
                  <StatusPill label={s} />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CloudVisual() {
  const ref = useLoop((tl, q) => {
    const packets = q("[data-packet]");
    tl.set(packets, { left: "0%", opacity: 0 }, 0);
    tl.from(q("[data-dev]"), { opacity: 0, y: 14, stagger: 0.12 })
      .from(q("[data-panel]"), { opacity: 0, y: 18 }, "<0.1")
      .from(q("[data-svc]"), { opacity: 0, x: -8, stagger: 0.12, duration: 0.35 })
      .from(q("[data-svc-ok]"), { scale: 0, stagger: 0.12, duration: 0.3, ease: "back.out(3)" }, "<0.1");
    for (let i = 0; i < 3; i++) {
      tl.set(packets, { opacity: 1, left: "0%" }, `+=${i ? 0.1 : 0.3}`)
        .to(packets, { left: "100%", duration: 0.8, ease: "power1.inOut", stagger: 0.15 })
        .set(packets, { opacity: 0 });
    }
    outro(tl, [q("[data-dev]"), q("[data-panel]")]);
  });
  const lane = (flip: boolean) => (
    <div className={`relative h-px flex-1 border-t-2 border-dashed border-line ${flip ? "-scale-x-100" : ""}`}>
      <span data-packet className="absolute -top-[5px] h-2 w-2 -translate-x-1/2 rounded-full opacity-0" style={{ ...ac, boxShadow: `0 0 0 3px ${tint(25)}` }} />
    </div>
  );
  return (
    <div ref={ref} className="flex h-full items-center justify-center gap-2 px-5">
      <span data-dev className={`${panel} grid h-12 w-12 shrink-0 place-items-center`}>
        <Icon name="phone" className="h-5 w-5" />
      </span>
      {lane(false)}
      <div data-panel className={`${panel} w-40 shrink-0 p-3`}>
        <p className="mb-2 flex items-center gap-2 text-[11px] font-medium">
          <span className="grid h-6 w-6 place-items-center rounded-md text-white" style={ac}>
            <Icon name="cloud" className="h-3.5 w-3.5" />
          </span>
          Firebase
        </p>
        {["Authentication", "Firestore", "Storage", "Push alerts"].map((s) => (
          <p key={s} data-svc className="flex items-center justify-between border-t border-line py-1.5 text-[10px]">
            {s}
            <span data-svc-ok>
              <Tick className="h-3.5 w-3.5" />
            </span>
          </p>
        ))}
      </div>
      {lane(true)}
      <span data-dev className={`${panel} grid h-12 w-12 shrink-0 place-items-center`}>
        <Icon name="laptop" className="h-5 w-5" />
      </span>
    </div>
  );
}

function StoreVisual() {
  const ref = useLoop((tl, q) => {
    const [label] = q("[data-label]");
    const [fill] = q("[data-fill]");
    const say = (t: string) => () => void (label.textContent = t);
    tl.call(say("Install"), undefined, 0).set(fill, { scaleX: 0 }, 0);
    tl.from(q("[data-phone]"), { opacity: 0, y: 30, duration: 0.7 })
      .from(q("[data-icon]"), { scale: 0.5, rotation: -12, ease: "back.out(2.5)" }, "-=0.3")
      .from(q("[data-star]"), { scale: 0, stagger: 0.08, duration: 0.3, ease: "back.out(3)" }, "-=0.2");
    press(tl, q("[data-install]")[0], "+=0.3");
    tl.call(say("Installing…"))
      .to(fill, { scaleX: 1, duration: 1.6, ease: "power1.inOut" })
      .call(say("Open"))
      .from(q("[data-chip]"), { opacity: 0, x: (i) => (i ? 12 : -12), stagger: 0.12, ease: "back.out(2)" });
    outro(tl, [q("[data-phone]"), q("[data-chip]")]);
  });
  return (
    <div ref={ref} className="relative flex h-full items-center justify-center p-5">
      <div data-phone className="h-[13.5rem] w-36 rounded-[1.6rem] border-[3px] border-fg bg-bg p-2.5 shadow-[0_30px_50px_-24px_rgba(15,23,42,0.5)]">
        <div className="mx-auto mb-3 h-1 w-8 rounded-full bg-fg/80" />
        <div className="flex items-center gap-2">
          <span data-icon className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, var(--ac), ${tint(60)})` }}>
            <Icon name="play" className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold">Invertis Mess</p>
            <p className="text-[9px] text-muted">Food & Drink</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-0.5 text-amber-400">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} data-star>
              <Star />
            </span>
          ))}
          <span className="ml-1 text-[9px] font-medium text-fg">4.8</span>
        </div>
        <div data-install className="relative mt-3 overflow-hidden rounded-full py-1.5 text-center text-[10px] font-medium text-white" style={{ background: tint(55) }}>
          <span data-fill className="absolute inset-0 origin-left" style={ac} />
          <span data-label className="relative">
            Open
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-12 rounded-md bg-surface-2" />
          ))}
        </div>
      </div>
      <Chip className="absolute top-8 left-4 sm:left-8">
        <Tick className="h-3.5 w-3.5" /> Signed release
      </Chip>
      <Chip className="absolute right-4 bottom-8 sm:right-8">
        <Icon name="play" className="h-3 w-3" /> Live on Play Store
      </Chip>
    </div>
  );
}

function SupportVisual() {
  const ref = useLoop((tl, q) => {
    const [typing] = q("[data-typing]");
    const [m2] = q("[data-m2]");
    tl.set(typing, { autoAlpha: 0 }, 0).set(m2, { autoAlpha: 0 }, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 })
      .from(q("[data-m1]"), { opacity: 0, y: 10, scale: 0.95, transformOrigin: "left bottom", ease: "back.out(2)" })
      .to(typing, { autoAlpha: 1, duration: 0.2 }, "+=0.3")
      .fromTo(q("[data-tdot]"), { y: 0 }, { y: -3, duration: 0.25, yoyo: true, repeat: 5, stagger: 0.1, ease: "sine.inOut" })
      .to(typing, { autoAlpha: 0, duration: 0.15 })
      .fromTo(m2, { autoAlpha: 0, y: 10, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, transformOrigin: "right bottom", ease: "back.out(2)" })
      .from(q("[data-chip]"), { opacity: 0, y: 8, ease: "back.out(2)" }, "+=0.2");
    outro(tl, q("[data-panel]"));
  });
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} w-full max-w-[340px] p-3 text-[10px]`}>
        <div className="mb-3 flex items-center gap-2 border-b border-line pb-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-full font-semibold text-white" style={ac}>
            CV
          </span>
          <div className="flex-1">
            <p className="font-medium">Support</p>
            <p className="flex items-center gap-1 text-[9px] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online · replies in ~1h
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p data-m1 className="max-w-[80%] self-start rounded-2xl rounded-bl-sm bg-surface-2 px-3 py-2">
            Checkout button isn&apos;t working on iPhone.
          </p>
          <div className="relative min-h-8 self-end">
            <span data-typing className="invisible absolute right-0 bottom-0 flex gap-1 rounded-2xl rounded-br-sm bg-surface-2 px-3 py-2.5 opacity-0">
              {[0, 1, 2].map((i) => (
                <span key={i} data-tdot className="h-1.5 w-1.5 rounded-full bg-muted" />
              ))}
            </span>
            <p data-m2 className="rounded-2xl rounded-br-sm px-3 py-2 text-white" style={ac}>
              Found it. Fixed and deployed ✓
            </p>
          </div>
          <span data-chip className="mt-1 flex items-center gap-1.5 self-center rounded-full bg-surface px-2.5 py-1 text-[9px] text-muted">
            <Tick className="h-3 w-3" /> Ticket #128 resolved in 2h
          </span>
        </div>
      </div>
    </div>
  );
}

const products = [
  { name: "Gold Ring", price: "₹1,299", shape: "rounded-full border-[5px] border-white/90" },
  { name: "Necklace", price: "₹2,499", shape: "rounded-b-full border-[4px] border-t-0 border-white/90" },
  { name: "Earrings", price: "₹899", shape: "rotate-45 rounded-sm bg-white/90" },
];

function CartVisual() {
  const ref = useLoop((tl, q, root) => {
    const adds = q("[data-add]");
    const [cart] = q("[data-cart]");
    const [count] = q("[data-count]");
    const [fly] = q("[data-fly]");
    const [cur] = q("[data-cursor]");
    const c = offsetIn(cart, root);
    tl.call(() => void (count.textContent = "0"), undefined, 0)
      .set(fly, { opacity: 0 }, 0)
      .set(cur, { opacity: 1, x: c.cx, y: c.cy + 120 }, 0);
    tl.from(q("[data-product]"), { opacity: 0, y: 16, stagger: 0.1 }).from(cart, { opacity: 0, scale: 0.8 }, "<0.2");
    [0, 1].forEach((i) => {
      const b = offsetIn(adds[i], root);
      moveTo(tl, cur, b.cx, b.cy, "+=0.2");
      press(tl, adds[i]);
      tl.fromTo(fly, { x: b.cx - 6, y: b.cy - 6, opacity: 1, scale: 1 }, { x: c.cx - 6, duration: 0.7, ease: "power1.inOut" })
        .to(fly, { y: Math.min(b.cy, c.cy) - 50, duration: 0.35, ease: "power2.out" }, "<")
        .to(fly, { y: c.cy - 6, duration: 0.35, ease: "power2.in" }, ">")
        .to(fly, { opacity: 0, scale: 0.3, duration: 0.15 })
        .call(() => void (count.textContent = String(i + 1)))
        .fromTo(cart, { scale: 1.15 }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }, "<");
    });
    tl.from(q("[data-chip]"), { opacity: 0, y: 8, ease: "back.out(2)" });
    outro(tl, [q("[data-product]"), cart, q("[data-chip]"), cur]);
  });
  return (
    <div ref={ref} className="relative flex h-full flex-col justify-center gap-3 px-6 py-5">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-medium">New arrivals</p>
        <span data-cart className={`${panel} flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium`}>
          <Icon name="cart" className="h-3.5 w-3.5" /> Cart
          <span data-count className="grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] text-white" style={ac}>
            2
          </span>
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {products.map((p, i) => (
          <div key={p.name} data-product className={`${panel} p-2`}>
            <div className="grid h-16 place-items-center rounded-lg" style={{ background: `linear-gradient(135deg, var(--ac), ${tint(i === 1 ? 35 : 55)})` }}>
              <span className={`h-6 w-6 ${p.shape}`} />
            </div>
            <p className="mt-1.5 truncate text-[10px] font-medium">{p.name}</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-[9px] text-muted">{p.price}</span>
              <span data-add className="rounded-full px-1.5 py-0.5 text-[9px] font-medium text-white" style={ac}>
                Add
              </span>
            </div>
          </div>
        ))}
      </div>
      <Chip className="self-end">
        Subtotal <span className="font-semibold">₹3,798</span>
      </Chip>
      <span data-fly className="absolute top-0 left-0 h-3 w-3 rounded-full opacity-0" style={{ ...ac, boxShadow: `0 0 0 4px ${tint(25)}` }} />
      <Pointer />
    </div>
  );
}

function PayVisual() {
  const ref = useLoop((tl, q) => {
    const methods = q("[data-method]");
    const radios = q("[data-radio]");
    const [sel] = q("[data-sel]");
    const [ok] = q("[data-ok]");
    const [label] = q("[data-paylabel]");
    const [spin] = q("[data-spin]");
    tl.set(ok, { autoAlpha: 0 }, 0)
      .set(sel, { y: methods[0].offsetTop }, 0)
      .set(radios, { scale: 0 }, 0)
      .set(radios[0], { scale: 1 }, 0)
      .set(spin, { autoAlpha: 0 }, 0)
      .set(label, { autoAlpha: 1 }, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 }).from(methods, { opacity: 0, x: -8, stagger: 0.08, duration: 0.35 }, "-=0.2");
    [
      [0, 1],
      [1, 0],
    ].forEach(([from, to]) => {
      tl.to(sel, { y: methods[to].offsetTop, duration: 0.4, ease: "power3.inOut" }, "+=0.35")
        .to(radios[from], { scale: 0, duration: 0.15 }, "<")
        .to(radios[to], { scale: 1, duration: 0.3, ease: "back.out(3)" }, "<0.15");
    });
    press(tl, q("[data-pay]")[0], "+=0.3");
    tl.to(label, { autoAlpha: 0, duration: 0.15 })
      .to(spin, { autoAlpha: 1, duration: 0.15 })
      .fromTo(spin, { rotation: 0 }, { rotation: 540, duration: 1, ease: "none" }, "<")
      .to(ok, { autoAlpha: 1, duration: 0.3 })
      .fromTo(q("[data-draw]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, stagger: 0.25, ease: "power2.out" }, "<");
    outro(tl, q("[data-panel]"));
  });
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} relative w-full max-w-[300px] p-4 text-[10px]`}>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-medium">Checkout</span>
          <span className="font-display text-sm font-semibold">₹2,499</span>
        </div>
        <div className="relative flex flex-col gap-1.5">
          <span data-sel className="absolute inset-x-0 top-0 h-8 rounded-lg border-[1.5px]" style={{ borderColor: "var(--ac)", background: tint(7) }} />
          {[
            ["UPI", "Any UPI app"],
            ["PhonePe", "Wallet & UPI"],
            ["Cash on Delivery", "+ ₹40"],
          ].map(([m, s], i) => (
            <div key={m} data-method className="relative flex h-8 items-center gap-2 rounded-lg border border-line px-2.5">
              <span className="grid h-3.5 w-3.5 place-items-center rounded-full border border-line">
                <span data-radio className="h-2 w-2 rounded-full" style={{ ...ac, transform: i ? "scale(0)" : undefined }} />
              </span>
              <span className="flex-1 font-medium">{m}</span>
              <span className="text-[9px] text-muted">{s}</span>
            </div>
          ))}
        </div>
        <span data-pay className="relative mt-3 grid h-8 place-items-center rounded-lg font-medium text-white" style={ac}>
          <span data-paylabel>Pay ₹2,499</span>
          <span data-spin className="invisible absolute h-4 w-4 rounded-full border-2 border-white/30 border-t-white opacity-0" />
        </span>
        <div data-ok className="invisible absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl bg-bg opacity-0">
          <svg viewBox="0 0 52 52" className="h-14 w-14">
            <circle data-draw cx="26" cy="26" r="23" fill="none" strokeWidth="3" pathLength={1} style={{ stroke: "var(--ac)", strokeDasharray: 1 }} />
            <path data-draw d="M15 27l7 7 15-15" fill="none" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} style={{ stroke: "var(--ac)", strokeDasharray: 1 }} />
          </svg>
          <p className="text-[12px] font-semibold">Payment successful</p>
          <p className="font-mono text-[9px] text-muted">Txn ••••4821 · UPI</p>
        </div>
      </div>
    </div>
  );
}

function ShipVisual() {
  const ref = useLoop((tl, q) => {
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 });
    runTrack(tl, q);
    tl.from(q("[data-chip]"), { opacity: 0, y: 8, ease: "back.out(2)" });
    outro(tl, q("[data-panel]"));
  });
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} w-full max-w-[400px] p-4`}>
        <div className="mb-10 flex items-start justify-between">
          <div>
            <p className="text-[11px] font-medium">Order #ZJ-2041</p>
            <p className="text-[9px] text-muted">Bareilly → New Delhi</p>
          </div>
          <span className="rounded-md bg-surface px-2 py-0.5 text-[9px] font-medium">Ekart</span>
        </div>
        <Track
          steps={["Packed", "Shipped", "Out for delivery", "Delivered"]}
          rider={
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-fg text-bg shadow-md">
              <Icon name="truck" className="h-4 w-4" />
            </span>
          }
        />
        <div className="mt-4 flex justify-end">
          <span data-chip className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-medium" style={{ background: tint(14), color: "var(--ac)" }}>
            <Icon name="check" className="h-3 w-3" /> Delivered in 2 days · SMS sent
          </span>
        </div>
      </div>
    </div>
  );
}

function ApiVisual() {
  const ref = useLoop((tl, q) => {
    tl.from(q("[data-pane]"), { opacity: 0, y: 18, stagger: 0.12 });
    typeIn(tl, q("[data-url]")[0], "/api/orders?limit=20");
    press(tl, q("[data-send]")[0], "+=0.2");
    tl.from(q("[data-status]"), { opacity: 0, scale: 0.7, ease: "back.out(3)", duration: 0.35 }).from(
      q("[data-json]"),
      { opacity: 0, x: -6, stagger: 0.09, duration: 0.3 },
      "<",
    );
    countIn(tl, q("[data-ms]")[0], 38, (v) => `${Math.round(v)} ms`, "<", { duration: 0.6 });
    outro(tl, q("[data-pane]"));
  });
  const json: [string, string][] = [
    ["{", ""],
    ['  "orders": ', "["],
    ['    { "id": ', "2041 },"],
    ['    { "id": ', "2040 }"],
    ["  ],", ""],
    ['  "total": ', "128"],
    ["}", ""],
  ];
  return (
    <div ref={ref} className="flex h-full items-center justify-center gap-3 p-6">
      <div data-pane className={`${panel} w-[44%] max-w-[190px] p-3 text-[10px]`}>
        <p className="mb-2 font-medium">Request</p>
        <div className="mb-2 flex items-center gap-1.5 rounded-md border border-line px-1.5 py-1">
          <span className="rounded px-1 text-[9px] font-bold text-white" style={ac}>
            GET
          </span>
          <span data-url className="truncate font-mono text-[9px]">
            /api/orders?limit=20
          </span>
        </div>
        <p className="mb-0.5 text-[9px] text-muted">Headers</p>
        <p className="mb-3 truncate font-mono text-[9px]">Authorization: Bearer ••••</p>
        <span data-send className="block rounded-md py-1.5 text-center font-medium text-white" style={ac}>
          Send
        </span>
      </div>
      <div data-pane className="w-[52%] max-w-[230px] rounded-xl bg-[#0d0e10] p-3 font-mono text-[9.5px] leading-[1.6] text-white/80 shadow-[0_24px_48px_-24px_rgba(15,23,42,0.6)]">
        <div className="mb-2 flex items-center justify-between font-sans">
          <span data-status className="rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400">
            200 OK
          </span>
          <span data-ms className="text-white/40">
            38 ms
          </span>
        </div>
        {json.map(([k, v], i) => (
          <p key={i} data-json className="whitespace-pre">
            <span className="text-sky-300">{k}</span>
            <span className="text-amber-300">{v}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

function SpeedVisual() {
  const ref = useLoop((tl, q) => {
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 })
      .fromTo(q("[data-arc]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0.02, duration: 1.6, ease: "power2.out" })
      .fromTo(q("[data-needle]"), { rotation: -90, svgOrigin: "60 60" }, { rotation: 86, svgOrigin: "60 60", duration: 1.6, ease: "back.out(1.2)" }, "<");
    countIn(tl, q("[data-score]")[0], 98, undefined, "<", { duration: 1.6 });
    tl.from(q("[data-vital]"), { opacity: 0, x: 10, stagger: 0.12, duration: 0.35 }, "-=0.6").from(
      q("[data-good]"),
      { scale: 0, stagger: 0.12, duration: 0.3, ease: "back.out(3)" },
      "<0.1",
    );
    outro(tl, q("[data-panel]"));
  });
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} flex w-full max-w-[380px] items-center gap-4 p-4`}>
        <div className="relative w-[46%] shrink-0">
          <svg viewBox="0 0 120 68" className="w-full">
            <path d="M10 60a50 50 0 0 1 100 0" fill="none" stroke="var(--surface-2)" strokeWidth="10" strokeLinecap="round" />
            <path
              data-arc
              d="M10 60a50 50 0 0 1 100 0"
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              pathLength={1}
              style={{ stroke: "var(--ac)", strokeDasharray: 1, strokeDashoffset: 0.02 }}
            />
            <g data-needle transform="rotate(86 60 60)">
              <line x1="60" y1="60" x2="60" y2="22" stroke="var(--fg)" strokeWidth="3" strokeLinecap="round" />
            </g>
            <circle cx="60" cy="60" r="5" fill="var(--fg)" />
          </svg>
          <p className="-mt-1 text-center">
            <span data-score className="font-display text-2xl font-semibold tabular-nums" style={{ color: "var(--ac)" }}>
              98
            </span>
            <span className="block text-[9px] text-muted">Performance</span>
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          {[
            ["LCP", "1.1 s"],
            ["INP", "80 ms"],
            ["CLS", "0.01"],
          ].map(([k, v]) => (
            <div key={k} data-vital className="flex items-center justify-between rounded-lg bg-surface px-2.5 py-1.5 text-[10px]">
              <span className="font-medium">{k}</span>
              <span className="flex items-center gap-2 tabular-nums">
                {v}
                <span data-good className="rounded-full px-1.5 py-px text-[8px] font-semibold" style={{ background: tint(16), color: "var(--ac)" }}>
                  GOOD
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeployVisual() {
  const logs = ["Installing dependencies…", "Running checks…", "Preview ready", "Deployed to yoursite.com"];
  const ref = useLoop((tl, q) => {
    const [log] = q("[data-log]");
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 });
    runTrack(tl, q, (i) => {
      tl.call(() => void (log.textContent = logs[i])).to({}, { duration: 0.35 });
    });
    tl.from(q("[data-chip]"), { opacity: 0, scale: 0.7, ease: "back.out(2)", duration: 0.4 });
    outro(tl, q("[data-panel]"));
  });
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} w-full max-w-[400px] p-4`}>
        <div className="mb-5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-mono text-[10px]">
            <Icon name="branch" className="h-3.5 w-3.5" /> main · a1b2c3d
          </span>
          <span className="rounded-md bg-surface px-2 py-0.5 text-[9px] font-medium">Production</span>
        </div>
        <Track steps={["Build", "Test", "Preview", "Live"]} />
        <div className="mt-4 flex items-center justify-between gap-2 rounded-lg bg-[#0d0e10] px-3 py-2 font-mono text-[9.5px] text-white/80">
          <span className="truncate">
            <span className="text-white/40">$ </span>
            <span data-log>{logs[3]}</span>
          </span>
          <span data-chip className="shrink-0 rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400">
            ● Ready
          </span>
        </div>
      </div>
    </div>
  );
}

function MotionVisual() {
  const ref = useLoop((tl, q) => {
    const [stage] = q("[data-stage]");
    const [shape] = q("[data-shape]");
    const [head] = q("[data-head]");
    const keys = q("[data-key]");
    const [time] = q("[data-time]");
    const dist = stage.offsetWidth - shape.offsetWidth - 32;
    const D = 2.2;
    tl.set(shape, { x: 0, rotation: 0, scale: 1 }, 0).set(head, { left: "0%" }, 0);
    tl.from([stage, q("[data-tracks]")], { opacity: 0, y: 18, stagger: 0.12 });
    const t0 = tl.duration() + 0.2;
    tl.to(head, { left: "100%", duration: D, ease: "none" }, t0)
      .to(shape, { x: dist, rotation: 180, duration: D, ease: "power3.inOut" }, t0)
      .to(shape, { keyframes: [{ scale: 1.35 }, { scale: 1 }], duration: D, ease: "sine.inOut" }, t0);
    countIn(tl, time, D, (v) => `${v.toFixed(2)}s`, t0, { duration: D });
    keys.forEach((k) => {
      const at = t0 + (Number(k.dataset.key) / 100) * D;
      tl.fromTo(k, { scale: 1.8 }, { scale: 1, duration: 0.4, ease: "back.out(3)" }, at);
    });
    outro(tl, [stage, q("[data-tracks]")]);
  });
  const tracks: [string, number[]][] = [
    ["x", [0, 100]],
    ["rotate", [0, 50, 100]],
    ["scale", [0, 50, 100]],
  ];
  return (
    <div ref={ref} className="flex h-full flex-col items-center justify-center gap-2.5 p-6">
      <div data-stage className={`${panel} relative h-20 w-full max-w-[420px] overflow-hidden`}>
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <span
          data-shape
          className="absolute top-1/2 left-4 -mt-5 h-10 w-10 rounded-xl"
          style={{ background: `linear-gradient(135deg, var(--ac), ${tint(55)})`, boxShadow: `0 12px 24px -8px ${tint(70)}` }}
        />
      </div>
      <div data-tracks className={`${panel} w-full max-w-[420px] p-2.5 text-[9px]`}>
        <div className="mb-1.5 flex items-center justify-between font-mono text-muted">
          <span>ease: power3.inOut</span>
          <span data-time>2.20s</span>
        </div>
        <div className="grid grid-cols-[44px_1fr] gap-x-2">
          <div className="flex flex-col gap-1.5">
            {tracks.map(([name]) => (
              <span key={name} className="h-4 font-mono leading-4 text-muted">
                {name}
              </span>
            ))}
          </div>
          <div className="relative flex flex-col gap-1.5">
            {tracks.map(([name, ks]) => (
              <div key={name} className="relative h-4 rounded bg-surface">
                <span className="absolute inset-y-1.5 right-1.5 left-1.5 rounded-full" style={{ background: tint(18) }} />
                {ks.map((k) => (
                  <span
                    key={k}
                    data-key={k}
                    className="absolute top-1/2 -mt-1 -ml-1 h-2 w-2 rotate-45 rounded-[2px]"
                    style={{ ...ac, left: `calc(6px + (100% - 12px) * ${k / 100})` }}
                  />
                ))}
              </div>
            ))}
            <span className="pointer-events-none absolute inset-y-0 right-1.5 left-1.5">
              <span data-head className="absolute -top-1 -bottom-1 w-px" style={{ ...ac, left: "100%" }}>
                <span className="absolute -top-1 -left-[3px] h-2 w-[7px] rounded-sm" style={ac} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingVisual() {
  const ref = useLoop((tl, q) => {
    const [page] = q("[data-page]");
    const [view] = q("[data-view]");
    const travel = Math.max(0, page.offsetHeight - view.offsetHeight);
    tl.set(page, { y: 0 }, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 })
      .from(q("[data-hero]"), { opacity: 0, y: 10, stagger: 0.1, duration: 0.4 })
      .fromTo(q("[data-ring]"), { scale: 1, opacity: 0.6 }, { scale: 1.6, opacity: 0, duration: 0.9, repeat: 1 })
      .to(page, { y: -travel, duration: 2.2, ease: "power2.inOut" })
      .to(page, { y: 0, duration: 1.2, ease: "power2.inOut" }, "+=0.4")
      .from(q("[data-chip]"), { opacity: 0, x: 12, ease: "back.out(2)" }, "<");
    countIn(tl, q("[data-conv]")[0], 38, (v) => `+${Math.round(v)}%`, "<");
    outro(tl, [q("[data-panel]"), q("[data-chip]")]);
  });
  return (
    <div ref={ref} className="relative flex h-full items-center justify-center p-6">
      <Chrome url="launch.yourbrand.com" className="w-full max-w-[400px]">
        <div data-view className="h-40 overflow-hidden">
          <div data-page className="flex flex-col items-center px-4 pt-4">
            <span data-hero className="mb-1.5 rounded-full px-2 py-0.5 text-[8px] font-medium" style={{ background: tint(14), color: "var(--ac)" }}>
              New · Launching today
            </span>
            <span data-hero className="h-3 w-48 max-w-full rounded-full bg-fg" />
            <span data-hero className="mt-1.5 h-3 w-32 rounded-full bg-fg" />
            <span data-hero className="mt-2 h-1.5 w-40 max-w-full rounded-full bg-line" />
            <span data-hero className="relative mt-3 grid place-items-center">
              <span data-ring className="absolute inset-0 rounded-full opacity-0" style={ac} />
              <span className="relative rounded-full px-4 py-1.5 text-[9px] font-medium text-white" style={ac}>
                Get early access
              </span>
            </span>
            <div className="mt-5 flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-2 w-8 rounded-full bg-surface-2" />
              ))}
            </div>
            <div className="mt-5 grid w-full grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-line p-2">
                  <span className="mb-1.5 block h-4 w-4 rounded" style={{ background: tint(30) }} />
                  <span className="block h-1.5 w-3/4 rounded-full bg-line" />
                  <span className="mt-1 block h-1.5 w-1/2 rounded-full bg-line" />
                </div>
              ))}
            </div>
            <div className="my-4 w-full rounded-lg px-3 py-3 text-center text-[9px] font-medium text-white" style={ac}>
              Join 2,000+ early users →
            </div>
          </div>
        </div>
      </Chrome>
      <span data-chip className={`${panel} absolute right-3 bottom-4 flex flex-col rounded-xl px-3 py-2`}>
        <span className="text-[9px] text-muted">Conversion rate</span>
        <span data-conv className="font-display text-base font-semibold" style={{ color: "var(--ac)" }}>
          +38%
        </span>
      </span>
    </div>
  );
}

function ChipVisual() {
  const sensors = [
    { icon: "thermo", name: "Temp", to: 24.6, fmt: (v: number) => `${v.toFixed(1)}°C` },
    { icon: "drop", name: "Humidity", to: 61, fmt: (v: number) => `${Math.round(v)}%` },
    { icon: "wave", name: "Soil", to: 42, fmt: (v: number) => `${Math.round(v)}%` },
  ];
  const ref = useLoop((tl, q) => {
    tl.from(q("[data-mcu]"), { opacity: 0, scale: 0.85, ease: "back.out(2)" })
      .fromTo(q("[data-trace]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, stagger: 0.15, ease: "power2.inOut" })
      .from(q("[data-sensor]"), { opacity: 0, x: 10, stagger: 0.15, duration: 0.4 }, "-=0.6");
    q("[data-val]").forEach((el, i) => countIn(tl, el, sensors[i].to, sensors[i].fmt, i ? "<0.1" : "-=0.2", { duration: 1 }));
    tl.fromTo(q("[data-led]"), { opacity: 1 }, { opacity: 0.2, duration: 0.15, yoyo: true, repeat: 7 }, "<");
    outro(tl, [q("[data-mcu]"), q("[data-traces]"), q("[data-sensor]")]);
  });
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div className="grid w-full max-w-[420px] grid-cols-[auto_1fr_auto] items-center">
        <div
          data-mcu
          className="relative grid h-24 w-24 place-items-center rounded-xl bg-fg font-mono text-[10px] text-bg shadow-[0_20px_36px_-16px_rgba(15,23,42,0.6)]"
        >
          {["-left-1.5", "-right-1.5"].map((side) => (
            <span key={side} className={`absolute inset-y-3 ${side} flex flex-col justify-between`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-1 w-1.5 rounded-sm bg-muted" />
              ))}
            </span>
          ))}
          <span data-led className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full" style={{ ...ac, boxShadow: "0 0 6px var(--ac)" }} />
          ESP32
        </div>
        <svg data-traces viewBox="0 0 100 100" preserveAspectRatio="none" className="h-28 w-full" aria-hidden>
          {[17, 50, 83].map((y) => (
            <path
              key={y}
              data-trace
              d={`M0 50 H45 V${y} H100`}
              pathLength={1}
              fill="none"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              style={{ stroke: "var(--ac)", strokeDasharray: 1 }}
            />
          ))}
        </svg>
        <div className="flex flex-col gap-2">
          {sensors.map((s) => (
            <div key={s.name} data-sensor className={`${panel} flex w-32 items-center gap-2 px-2 py-1.5`}>
              <span className="grid h-6 w-6 place-items-center rounded-md" style={{ background: tint(15), color: "var(--ac)" }}>
                <Icon name={s.icon} className="h-3.5 w-3.5" />
              </span>
              <span className="flex-1 text-[9px] text-muted">{s.name}</span>
              <span data-val className="text-[10px] font-semibold tabular-nums">
                {s.fmt(s.to)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DemoVisual() {
  const ref = useLoop((tl, q) => {
    const slides = q("[data-slide]");
    const dots = q("[data-pdot]");
    tl.set(slides, { autoAlpha: 0, x: 0 }, 0)
      .set(slides[0], { autoAlpha: 1 }, 0)
      .set(dots, { width: 6, opacity: 0.3 }, 0)
      .set(dots[0], { width: 16, opacity: 1 }, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 });
    countIn(tl, q("[data-timer]")[0], 152, (v) => `0${Math.floor(v / 60)}:${String(Math.round(v) % 60).padStart(2, "0")}`, "<", {
      from: 180,
      duration: 5.5,
    });
    [1, 2].forEach((i) => {
      tl.to(slides[i - 1], { autoAlpha: 0, x: -16, duration: 0.35 }, i === 1 ? "+=1" : "+=1.4")
        .fromTo(slides[i], { autoAlpha: 0, x: 16 }, { autoAlpha: 1, x: 0, duration: 0.45 }, "<0.1")
        .to(dots[i - 1], { width: 6, opacity: 0.3, duration: 0.3 }, "<")
        .to(dots[i], { width: 16, opacity: 1, duration: 0.3 }, "<");
      if (i === 1) tl.from(q("[data-bar]"), { scaleY: 0, transformOrigin: "bottom", stagger: 0.08, duration: 0.5, ease: "back.out(2)" }, "<0.2");
    });
    tl.from(q("[data-award]"), { opacity: 0, scale: 0.4, rotation: -15, ease: "back.out(2.5)", duration: 0.6 }, "+=0.4");
    outro(tl, [q("[data-panel]"), q("[data-award]")]);
  });
  return (
    <div ref={ref} className="relative flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} w-full max-w-[380px] p-2.5`}>
        <div className="relative h-32 overflow-hidden rounded-lg bg-[#0d0e10] text-white">
          <div data-slide className="invisible absolute inset-0 flex flex-col justify-center px-5">
            <p className="text-[9px] text-white/50">Team Invertis · HackBhoomi</p>
            <p className="mt-1 font-display text-lg font-semibold">SmartFarm Monitor</p>
            <span className="mt-2 h-1 w-10 rounded-full" style={ac} />
          </div>
          <div data-slide className="invisible absolute inset-0 flex items-end gap-2 px-5 pt-6 pb-4">
            {[35, 55, 45, 75, 95].map((h, i) => (
              <span key={i} data-bar className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 4 ? "var(--ac)" : "rgba(255,255,255,0.18)" }} />
            ))}
          </div>
          <div data-slide className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="flex items-center gap-1.5 text-[9px] font-semibold tracking-wide text-red-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> LIVE DEMO
            </span>
            <p className="font-display text-base">Sensors → Dashboard in 200ms</p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between px-1">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span key={i} data-pdot className="h-1.5 rounded-full bg-fg" style={{ width: i === 2 ? 16 : 6, opacity: i === 2 ? 1 : 0.3 }} />
            ))}
          </div>
          <span className="font-mono text-[9px] text-muted">
            Pitch <span data-timer>02:32</span>
          </span>
        </div>
      </div>
      <span data-award className={`${panel} absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] font-semibold sm:right-8`}>
        <span className="grid h-5 w-5 place-items-center rounded-full text-white" style={ac}>
          <Star className="h-3 w-3" />
        </span>
        Judges&apos; pick
      </span>
    </div>
  );
}

function DomainVisual() {
  const ref = useLoop((tl, q) => {
    const [add] = q("[data-addlabel]");
    tl.call(() => void (add.textContent = "Add"), undefined, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 });
    typeIn(tl, q("[data-q]")[0], "yourbrand");
    tl.from(q("[data-res]"), { opacity: 0, y: 8, stagger: 0.1, duration: 0.35 });
    press(tl, q("[data-add]")[0], "+=0.4");
    tl.call(() => void (add.textContent = "Added ✓")).from(q("[data-chip]"), { opacity: 0, y: 8, ease: "back.out(2)" }, "+=0.2");
    outro(tl, [q("[data-panel]"), q("[data-chip]")]);
  });
  const res = [
    { ext: ".com", price: "₹799/yr", ok: true },
    { ext: ".in", price: "₹499/yr", ok: true },
    { ext: ".dev", price: "Taken", ok: false },
  ];
  return (
    <div ref={ref} className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <div data-panel className={`${panel} w-full max-w-[340px] p-3 text-[10px]`}>
        <div className="mb-2.5 flex items-center gap-2 rounded-lg border border-line px-2.5 py-1.5">
          <Icon name="globe" className="h-3.5 w-3.5 text-muted" />
          <span data-q className="font-medium">
            yourbrand
          </span>
          <span className="caret -ml-1.5 text-muted">|</span>
        </div>
        {res.map((r, i) => (
          <div key={r.ext} data-res className="flex items-center justify-between border-t border-line py-2">
            <span className={r.ok ? "font-medium" : "text-muted line-through"}>yourbrand{r.ext}</span>
            <span className="flex items-center gap-2">
              <span className="text-muted">{r.price}</span>
              {r.ok &&
                (i === 0 ? (
                  <span data-add className="rounded-md px-2 py-0.5 font-medium text-white" style={ac}>
                    <span data-addlabel>Added ✓</span>
                  </span>
                ) : (
                  <span className="rounded-md border border-line px-2 py-0.5">Add</span>
                ))}
            </span>
          </div>
        ))}
      </div>
      <Chip>
        <Tick className="h-3.5 w-3.5" /> yourbrand.com connected to Vercel
      </Chip>
    </div>
  );
}

function SslVisual() {
  const ref = useLoop((tl, q) => {
    const [warn] = q("[data-warn]");
    const [lock] = q("[data-lock]");
    tl.set(warn, { autoAlpha: 1 }, 0)
      .set(lock, { autoAlpha: 0 }, 0)
      .set(q("[data-knob]"), { x: 0 }, 0)
      .set(q("[data-track]"), { opacity: 0.35 }, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 })
      .to(warn, { autoAlpha: 0, duration: 0.25 }, "+=0.8")
      .fromTo(lock, { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, ease: "back.out(3)", duration: 0.45 })
      .from(q("[data-cert]"), { opacity: 0, y: 14 }, "-=0.1")
      .from(q("[data-crow]"), { opacity: 0, x: -6, stagger: 0.1, duration: 0.3 })
      .to(q("[data-knob]"), { x: 10, duration: 0.3, ease: "back.out(2)" }, "+=0.2")
      .to(q("[data-track]"), { opacity: 1, duration: 0.3 }, "<");
    outro(tl, [q("[data-panel]"), q("[data-cert]")]);
  });
  return (
    <div ref={ref} className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <div data-panel className={`${panel} flex w-full max-w-[340px] items-center gap-2 px-3 py-2 font-mono text-[10px]`}>
        <span className="relative h-5 w-[86px] shrink-0">
          <span data-warn className="invisible absolute inset-0 flex items-center gap-1 rounded-md bg-red-500/10 px-1.5 text-[9px] text-red-500 opacity-0">
            <Icon name="alert" className="h-3 w-3" /> Not secure
          </span>
          <span data-lock className="absolute inset-0 flex items-center gap-1 rounded-md px-1.5 text-[9px] font-semibold" style={{ background: tint(14), color: "var(--ac)" }}>
            <Icon name="lock" className="h-3 w-3" /> Secure
          </span>
        </span>
        <span className="truncate">
          <span className="text-muted">https://</span>yourbrand.com
        </span>
      </div>
      <div data-cert className={`${panel} w-full max-w-[340px] p-3 text-[10px]`}>
        <p className="mb-2 flex items-center gap-2 font-medium">
          <span className="grid h-6 w-6 place-items-center rounded-md text-white" style={ac}>
            <Icon name="shield" className="h-3.5 w-3.5" />
          </span>
          Certificate is valid
        </p>
        {[
          ["Issued by", "Let's Encrypt"],
          ["Expires", "in 89 days"],
        ].map(([k, v]) => (
          <p key={k} data-crow className="flex justify-between border-t border-line py-1.5">
            <span className="text-muted">{k}</span>
            {v}
          </p>
        ))}
        <p data-crow className="flex items-center justify-between border-t border-line pt-1.5">
          <span className="text-muted">Auto-renew</span>
          <span data-track className="relative h-3.5 w-6 rounded-full" style={ac}>
            <span data-knob className="absolute top-0.5 left-0.5 h-2.5 w-2.5 rounded-full bg-white" style={{ transform: "translateX(10px)" }} />
          </span>
        </p>
      </div>
    </div>
  );
}

function DnsVisual() {
  const rows = [
    ["A", "@", "76.76.21.21"],
    ["CNAME", "www", "cname.vercel-dns.com"],
    ["MX", "@", "smtp.google.com"],
    ["TXT", "@", "v=spf1 include:_spf…"],
  ];
  const ref = useLoop((tl, q) => {
    const spins = q("[data-spin]");
    const oks = q("[data-ok]");
    tl.set(spins, { autoAlpha: 1 }, 0).set(oks, { scale: 0 }, 0);
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 }).from(q("[data-row]"), { opacity: 0, x: -8, stagger: 0.08, duration: 0.35 }, "-=0.2");
    tl.fromTo(spins, { rotation: 0 }, { rotation: 720, duration: 2.6, ease: "none" }, "<");
    countIn(tl, q("[data-pct]")[0], 100, (v) => `${Math.round(v)}%`, "<", { duration: 2.6 });
    tl.fromTo(q("[data-prog]"), { scaleX: 0 }, { scaleX: 1, duration: 2.6, ease: "power1.inOut" }, "<");
    spins.forEach((s, i) => {
      tl.to(s, { autoAlpha: 0, duration: 0.15 }, `<${i ? 0.45 : 0.6}`).to(oks[i], { scale: 1, duration: 0.3, ease: "back.out(3)" }, "<");
    });
    outro(tl, q("[data-panel]"));
  });
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} w-full max-w-[420px] overflow-hidden text-[10px]`}>
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="font-medium">DNS · yourbrand.com</span>
          <span className="text-muted">
            Propagation{" "}
            <span data-pct className="font-semibold text-fg tabular-nums">
              100%
            </span>
          </span>
        </div>
        {rows.map(([t, h, v]) => (
          <div key={t} data-row className="grid grid-cols-[52px_32px_1fr_16px] items-center gap-2 border-t border-line px-3 py-2">
            <span className="w-fit rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold" style={{ background: tint(14), color: "var(--ac)" }}>
              {t}
            </span>
            <span className="font-mono text-muted">{h}</span>
            <span className="truncate font-mono">{v}</span>
            <span className="relative h-4 w-4">
              <span data-spin className="invisible absolute inset-0 rounded-full border-2 border-line opacity-0" style={{ borderTopColor: "var(--ac)" }} />
              <span data-ok className="absolute inset-0">
                <Tick />
              </span>
            </span>
          </div>
        ))}
        <div className="h-1 bg-surface-2">
          <span data-prog className="block h-full origin-left" style={ac} />
        </div>
      </div>
    </div>
  );
}

function MailVisual() {
  const ref = useLoop((tl, q) => {
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 })
      .from(q("[data-old]"), { opacity: 0, stagger: 0.08, duration: 0.3 }, "-=0.2")
      .from(q("[data-new]"), { opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, duration: 0.5, ease: "power3.out" }, "+=0.4")
      .from(q("[data-newin]"), { opacity: 0, x: 16, duration: 0.4 }, "-=0.2")
      .from(q("[data-chip]"), { opacity: 0, y: 8, scale: 0.9, stagger: 0.12, ease: "back.out(2)" }, "+=0.2");
    outro(tl, [q("[data-panel]"), q("[data-chip]")]);
  });
  return (
    <div ref={ref} className="flex h-full flex-col items-center justify-center gap-3 p-6">
      <div data-panel className={`${panel} w-full max-w-[360px] overflow-hidden text-[10px]`}>
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="flex items-center gap-1.5 font-medium">
            <Icon name="mail" className="h-3.5 w-3.5" /> Inbox
          </span>
          <span className="text-muted">Primary</span>
        </div>
        <div data-new className="overflow-hidden border-t border-line px-3 py-2" style={{ background: tint(8) }}>
          <div data-newin className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full font-semibold text-white" style={ac}>
              Y
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex justify-between font-semibold">
                you@yourbrand.com <span className="font-normal text-muted">now</span>
              </p>
              <p className="truncate text-muted">Your order has shipped. Track it here →</p>
            </div>
            <span className="h-2 w-2 shrink-0 rounded-full" style={ac} />
          </div>
        </div>
        {["Weekly report", "Invoice #0042"].map((s) => (
          <div key={s} data-old className="flex items-center gap-2.5 border-t border-line px-3 py-2 text-muted">
            <span className="h-7 w-7 shrink-0 rounded-full bg-surface-2" />
            <span className="flex-1 truncate">{s}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {["SPF", "DKIM", "DMARC"].map((c) => (
          <Chip key={c}>
            <Tick className="h-3.5 w-3.5" /> {c}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function UptimeVisual() {
  const ref = useLoop((tl, q) => {
    tl.from(q("[data-panel]"), { opacity: 0, y: 18 }).from(
      q("[data-ub]"),
      { scaleY: 0, transformOrigin: "bottom", stagger: 0.015, duration: 0.3 },
      "-=0.2",
    );
    countIn(tl, q("[data-up]")[0], 99.98, (v) => `${v.toFixed(2)}%`, "<");
    tl.fromTo(q("[data-spark]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, "-=0.4");
    outro(tl, q("[data-panel]"));
  });
  return (
    <div ref={ref} className="flex h-full items-center justify-center p-6">
      <div data-panel className={`${panel} w-full max-w-[420px] p-4 text-[10px]`}>
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            All systems operational
          </span>
          <span data-up className="font-display text-sm font-semibold tabular-nums" style={{ color: "var(--ac)" }}>
            99.98%
          </span>
        </div>
        <div className="flex h-8 gap-[2px]">
          {Array.from({ length: 45 }, (_, i) => (
            <span key={i} data-ub className="flex-1 rounded-[2px]" style={{ background: i === 31 ? "#f59e0b" : "var(--ac)", opacity: i === 31 ? 1 : 0.85 }} />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[8px] text-muted">
          <span>45 days ago</span>
          <span>Today</span>
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-lg bg-surface px-2.5 py-2">
          <span className="text-muted">Response</span>
          <svg viewBox="0 0 200 30" preserveAspectRatio="none" className="h-6 flex-1">
            <path
              data-spark
              d="M0 20 L20 18 L40 22 L60 12 L80 16 L100 10 L120 19 L140 14 L160 17 L180 9 L200 13"
              pathLength={1}
              fill="none"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              style={{ stroke: "var(--ac)", strokeDasharray: 1 }}
            />
          </svg>
          <span className="font-semibold tabular-nums">142 ms</span>
        </div>
      </div>
    </div>
  );
}

const visuals: Record<string, () => React.ReactNode> = {
  "Custom design": DesignVisual,
  "Interface design": DesignVisual,
  "Responsive build": ResponsiveVisual,
  "Flutter app": () => <ResponsiveVisual devices={phones} />,
  "SEO foundations": SearchVisual,
  "On-page SEO": SearchVisual,
  "Easy updates": CmsVisual,
  Authentication: LockVisual,
  Security: LockVisual,
  Dashboards: ChartVisual,
  "Live dashboard": ChartVisual,
  "Search Console & analytics": ChartVisual,
  "Real-time features": NotifyVisual,
  "Scalable architecture": NodesVisual,
  Integrations: () => <NodesVisual labels={["API", "PhonePe", "Ekart", "Email", "SMS"]} />,
  "Technical SEO": () => <NodesVisual labels={["Site", "sitemap.xml", "robots.txt", "Schema", "Canonical"]} />,
  "Database design": () => <TableVisual title="users" rows={userRows} cols={["_id", "email", "role"]} pending="Invited" />,
  "Admin panel": TableVisual,
  "Firebase backend": CloudVisual,
  "Store publishing": StoreVisual,
  "Updates & support": SupportVisual,
  "Ongoing support": SupportVisual,
  "Catalogue & cart": CartVisual,
  Payments: PayVisual,
  Shipping: ShipVisual,
  "REST APIs": ApiVisual,
  "Core Web Vitals": SpeedVisual,
  Performance: SpeedVisual,
  "Fast delivery": DeployVisual,
  "Rapid build": DeployVisual,
  Deployment: DeployVisual,
  Animations: MotionVisual,
  "Landing pages": LandingVisual,
  "Hardware setup": ChipVisual,
  "Demo ready": DemoVisual,
  "Domain setup": DomainVisual,
  "SSL / HTTPS": SslVisual,
  "DNS configuration": DnsVisual,
  "Business email": MailVisual,
  Monitoring: UptimeVisual,
};

// "What you get" bento grid on a service page: each deliverable gets a small animated product mock-up.
export default function ServiceDeliverables({ items }: { items: Service["deliverables"] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-card]", {
          y: 60,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 85%" },
        });
      });
      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () =>
        cardHover(gsap.utils.toArray<HTMLElement>("[data-card]")),
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
      {items.map((it, i) => {
        const Visual = visuals[it.title] ?? DesignVisual;
        return (
          <article
            key={it.title}
            data-card
            className={`group min-w-0 ${items.length === 4 ? spans[i] : "lg:col-span-6"}`}
            style={{ "--ac": accents[i % accents.length] } as Vars}
          >
            <div
              data-tilt
              className="relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-bg p-2 transition-[border-color,box-shadow] duration-500 group-hover:border-transparent group-hover:shadow-[0_40px_80px_-40px_var(--ac)]"
            >
              <div aria-hidden className="relative h-64 overflow-hidden rounded-[1.35rem] bg-surface md:h-72">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(var(--line) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                    maskImage: "radial-gradient(ellipse at center, #000 35%, transparent 80%)",
                  }}
                />
                <div
                  className="absolute top-1/2 left-1/2 h-56 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: tint(28) }}
                />
                <div className="relative h-full">
                  <Visual />
                </div>
              </div>

              <div className="relative flex flex-1 flex-col px-4 pt-6 pb-4 md:px-6 md:pt-7 md:pb-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs text-muted">
                    <span className="h-1.5 w-1.5 rounded-full" style={ac} />
                    Included
                  </span>
                  <span className="font-mono text-xs text-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium tracking-tight md:text-[1.75rem]">{it.title}</h3>
                <p className="mt-2 max-w-md leading-relaxed text-muted">{it.text}</p>
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: spotlight }}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
