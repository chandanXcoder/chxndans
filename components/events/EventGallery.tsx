"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { EventItem } from "@/lib/content";
import { lockScroll } from "../SmoothScroll";

gsap.registerPlugin(useGSAP);

type Photo = EventItem["photos"][number];

export function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`h-4 w-4 ${dir === "left" ? "rotate-180" : ""}`} aria-hidden>
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-surface-2 bg-[radial-gradient(circle_at_30%_20%,var(--glow),transparent_60%)]">
      <div className="flex flex-col items-center gap-3 text-muted">
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden>
          <path
            d="M4 8h3l2-3h6l2 3h3v11H4z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <span className="text-sm">Photos coming soon</span>
        <span className="sr-only">{title}</span>
      </div>
    </div>
  );
}

// Swipeable photo strip for an event; clicking a photo opens it full screen.
export default function EventGallery({
  photos,
  title,
  className = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 40vw, 100vw",
}: {
  photos: Photo[];
  title: string;
  className?: string;
  sizes?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState<Set<string>>(new Set());
  const [open, setOpen] = useState<number | null>(null);
  const shown = photos.filter((p) => !broken.has(p.src));

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setIndex(Math.round(el.scrollLeft / Math.max(el.clientWidth, 1)));
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  if (shown.length === 0) {
    return (
      <div className={`relative overflow-hidden rounded-2xl ${className}`}>
        <Placeholder title={title} />
      </div>
    );
  }

  return (
    <div className={`group/gallery relative overflow-hidden rounded-2xl bg-surface-2 ${className}`}>
      <div
        ref={track}
        className="flex h-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {shown.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="relative h-full w-full shrink-0 snap-start cursor-zoom-in"
            aria-label={`Open photo ${i + 1} of ${shown.length}: ${p.alt}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-700 motion-safe:group-hover/gallery:scale-[1.03]"
              onError={() => setBroken((b) => new Set(b).add(p.src))}
            />
          </button>
        ))}
      </div>

      {shown.length > 1 && (
        <>
          <div className="pointer-events-none absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between opacity-0 transition-opacity group-hover/gallery:opacity-100 max-md:opacity-100">
            {(["left", "right"] as const).map((dir) => {
              const disabled = dir === "left" ? index === 0 : index >= shown.length - 1;
              return (
                <button
                  key={dir}
                  type="button"
                  onClick={() => go(index + (dir === "left" ? -1 : 1))}
                  disabled={disabled}
                  aria-label={dir === "left" ? "Previous photo" : "Next photo"}
                  className="pointer-events-auto grid h-9 w-9 place-items-center rounded-full bg-bg/90 text-fg shadow-sm backdrop-blur transition disabled:opacity-0"
                >
                  <Chevron dir={dir} />
                </button>
              );
            })}
          </div>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {shown.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-1.5 rounded-full bg-white transition-all ${i === index ? "w-5" : "w-1.5 opacity-60"}`}
              />
            ))}
          </div>
        </>
      )}

      {open !== null && (
        <Lightbox photos={shown} start={open} title={title} onClose={() => setOpen(null)} />
      )}
    </div>
  );
}

function Lightbox({
  photos,
  start,
  title,
  onClose,
}: {
  photos: Photo[];
  start: number;
  title: string;
  onClose: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(start);
  const step = useCallback((d: number) => setI((n) => (n + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      } else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "ArrowRight") step(1);
    };
    // capture so Escape closes the lightbox before any modal underneath sees it
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
      lockScroll(false);
    };
  }, [onClose, step]);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(root.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
        gsap.from("[data-photo]", { scale: 0.94, opacity: 0, duration: 0.45, ease: "power3.out" });
      });
    },
    { scope: root },
  );

  const p = photos[i];
  return createPortal(
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photos`}
      className="fixed inset-0 z-[80] flex flex-col bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between p-4 text-sm text-white/80 md:p-6">
        <span>
          {title} · {i + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>
      <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
        <div data-photo key={p.src} className="absolute inset-4 md:inset-x-24">
          <Image src={p.src} alt={p.alt} fill sizes="100vw" className="object-contain" />
        </div>
        {photos.length > 1 &&
          (["left", "right"] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir === "left" ? -1 : 1)}
              aria-label={dir === "left" ? "Previous photo" : "Next photo"}
              className={`absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 ${
                dir === "left" ? "left-4 md:left-6" : "right-4 md:right-6"
              }`}
            >
              <Chevron dir={dir} />
            </button>
          ))}
      </div>
      <p className="p-4 text-center text-sm text-white/70 md:p-6">{p.alt}</p>
    </div>,
    document.body,
  );
}
