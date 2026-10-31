"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { EventItem } from "@/lib/content";
import { lockScroll } from "../SmoothScroll";
import EventGallery from "./EventGallery";

gsap.registerPlugin(useGSAP);

// Full story of one event: big gallery, all metrics, every contribution.
export default function EventModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    lockScroll(true);
    panel.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      trigger?.focus();
    };
  }, [onClose]);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-backdrop]", { opacity: 0, duration: 0.35, ease: "power2.out" });
        gsap.from(panel.current, { y: 40, opacity: 0, duration: 0.6, ease: "power3.out" });
      });
    },
    { scope: root },
  );

  return createPortal(
    <div ref={root} className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6">
      <div data-backdrop className="absolute inset-0 bg-fg/50 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`event-${event.slug}-title`}
        tabIndex={-1}
        data-lenis-prevent
        className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-[2rem] bg-bg outline-none md:rounded-[2rem]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-bg/90 text-fg shadow-sm backdrop-blur transition hover:bg-surface md:top-6 md:right-6"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>

        <div className="p-3 md:p-4">
          <EventGallery
            photos={event.photos}
            title={event.title}
            className="aspect-[16/10] md:aspect-[16/8]"
            sizes="(min-width: 896px) 896px, 100vw"
          />
        </div>

        <div className="px-6 pt-6 pb-10 md:px-12 md:pt-8 md:pb-14">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {event.year} · {event.role}
          </p>
          <h3 id={`event-${event.slug}-title`} className="mt-3 font-display text-3xl font-medium tracking-tight md:text-5xl">
            {event.title}
          </h3>
          <p className="mt-2 text-lg text-muted">{event.tagline}</p>

          <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {event.metrics.map((m) => (
              <div key={m.label} className="bg-surface p-4 md:p-6">
                <p className="font-display text-2xl font-medium tracking-tight md:text-4xl">{m.value}</p>
                <p className="mt-1 text-xs text-muted md:text-sm">{m.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-lg leading-relaxed text-fg/80">{event.summary}</p>

          <h4 className="mt-10 mb-4 text-sm font-medium uppercase tracking-[0.16em] text-muted">What I did</h4>
          <ul className="space-y-3 text-muted">
            {event.contributions.map((c) => (
              <li key={c} className="flex gap-3 leading-relaxed">
                <span className="mt-2.5 h-px w-4 shrink-0 bg-fg/40" />
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-2">
            {event.tags.map((t) => (
              <span key={t} className="rounded-full bg-soft px-3.5 py-1.5 text-sm text-fg/80">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
