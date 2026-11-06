"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects as allProjects, type Project } from "@/lib/content";
import { Arrow } from "./ui/Button";

// Alternating stage colours behind each screenshot (Eloqwnt "Works" style).
const stages = ["bg-[#0d0e10]", "bg-[#d9dcdf]"];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`h-4 w-4 ${dir === "left" ? "rotate-180" : ""}`} aria-hidden>
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

// Horizontal, swipeable row of project cards that bleeds off the right edge of the card.
export default function WorksSlider({
  items = allProjects,
  label = "Works",
}: {
  items?: Project[];
  label?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("article");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: "smooth" });
  };

  return (
    <section className="card py-20 md:py-28">
      <div className="container-x mb-10 flex items-end justify-between gap-6 md:mb-14">
        <p className="flex items-center gap-3 text-lg">
          <span className="h-2 w-2 rounded-full bg-fg" />
          {label}
        </p>
        <Link href="/work" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
          All projects
          <Arrow />
        </Link>
      </div>

      {/* left padding lines the first card up with the page container; the row runs to the card edge */}
      <div
        ref={track}
        tabIndex={0}
        aria-label={`${label}: scroll for more projects`}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-[2rem] pr-4 pb-2 outline-none focus-visible:ring-2 focus-visible:ring-fg/40 focus-visible:ring-offset-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pl-[max(1rem,calc((100%-1360px)/2+1rem))] scroll-pl-[max(1rem,calc((100%-1360px)/2+1rem))] md:pr-8 md:pl-[max(2rem,calc((100%-1360px)/2+2rem))] md:scroll-pl-[max(2rem,calc((100%-1360px)/2+2rem))]"
      >
        {items.map((p, i) => (
          <article key={p.slug} className="group w-[86%] shrink-0 snap-start sm:w-[62%] lg:w-[min(46%,680px)]">
            <Link
              href={`/work/${p.slug}`}
              aria-label={`${p.title} case study`}
              data-cursor-text="View"
              className={`relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.5rem] md:rounded-[2rem] ${stages[i % 2]}`}
            >
              {p.image && (
                <span className="relative block aspect-[16/10] w-[88%] overflow-hidden rounded-lg shadow-[0_25px_60px_-20px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out group-hover:scale-[1.03] md:rounded-xl">
                  <Image
                    src={p.image}
                    alt={`${p.title} website screenshot`}
                    fill
                    sizes="(min-width: 1024px) 600px, 86vw"
                    className="object-cover object-top"
                  />
                </span>
              )}
              <span className="absolute right-4 bottom-4 grid h-10 w-10 place-items-center rounded-full bg-white text-fg opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:right-6 md:bottom-6">
                <Arrow />
              </span>
            </Link>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="font-display text-2xl font-medium tracking-tight sm:shrink-0 sm:whitespace-nowrap md:text-3xl xl:text-[2.1rem]">
                <Link href={`/work/${p.slug}`}>
                  {p.title} <span className="text-muted/60">- {p.year}</span>
                </Link>
              </h3>
              <ul className="flex flex-wrap gap-2 sm:flex-1 sm:justify-end">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-xl border border-line px-3.5 py-1.5 text-sm whitespace-nowrap xl:px-4 xl:py-2 xl:text-base">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <div className="container-x mt-10 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={edge.start}
          aria-label="Previous project"
          className="grid h-14 w-14 place-items-center rounded-full bg-soft transition-colors hover:bg-glow disabled:opacity-40"
        >
          <Chevron dir="left" />
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          disabled={edge.end}
          aria-label="Next project"
          className="grid h-14 w-14 place-items-center rounded-full bg-soft transition-colors hover:bg-glow disabled:opacity-40"
        >
          <Chevron dir="right" />
        </button>
      </div>
    </section>
  );
}
