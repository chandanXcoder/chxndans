"use client";

import { useCallback, useState } from "react";
import type { EventItem } from "@/lib/content";
import { Arrow } from "../ui/Button";
import EventGallery from "./EventGallery";
import EventModal from "./EventModal";

export default function EventCard({ event }: { event: EventItem }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-line bg-surface p-3 transition duration-500 hover:border-accent/40 hover:shadow-[0_24px_60px_-20px_var(--glow)] motion-safe:hover:-translate-y-1.5 md:p-4">
      <EventGallery photos={event.photos} title={event.title} />

      <div className="flex flex-1 flex-col px-3 pt-6 pb-3 md:px-5 md:pt-8 md:pb-5">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          {event.year} · {event.role}
        </p>
        <h3 className="mt-3 font-display text-2xl font-medium tracking-tight md:text-3xl">{event.title}</h3>
        <p className="mt-1 text-muted">{event.tagline}</p>

        <div className="mt-8 grid grid-cols-3 gap-3 border-y border-line py-5">
          {event.metrics.map((m) => (
            <div key={m.label}>
              <p className="font-display text-2xl font-medium tracking-tight md:text-3xl">{m.value}</p>
              <p className="mt-1 text-xs text-muted">{m.label}</p>
            </div>
          ))}
        </div>

        <ul className="mt-6 space-y-2.5 text-muted">
          {event.highlights.map((h) => (
            <li key={h} className="flex gap-3 leading-relaxed">
              <span className="mt-2.5 h-px w-4 shrink-0 bg-fg/40" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-6 mb-8 flex flex-wrap gap-2">
          {event.tags.map((t) => (
            <span key={t} className="rounded-full bg-soft px-3 py-1 text-sm text-fg/80">
              {t}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-auto inline-flex items-center gap-2 self-start rounded-full bg-fg px-5 py-2.5 text-sm text-bg transition hover:opacity-85"
        >
          Read full story
          <Arrow />
        </button>
      </div>

      {open && <EventModal event={event} onClose={close} />}
    </article>
  );
}
