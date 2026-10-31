"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { club, events } from "@/lib/content";
import EventCard from "./events/EventCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const title = ["Stages,", "crowds", "&", "crews."];

// The events the club ran, as the second chapter of the Clubs section: a timeline with one
// column and a rail on the left on small screens, two staggered columns either side of a
// centre rail on large screens. The rail draws itself as you scroll.
export default function Events() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-word]", {
          yPercent: 110,
          rotate: 4,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: "[data-title]", start: "top 85%" },
        });

        gsap.from("[data-intro]", {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: "[data-title]", start: "top 80%" },
        });

        gsap.from("[data-divider]", {
          scaleX: 0,
          ease: "none",
          scrollTrigger: { trigger: "[data-divider]", start: "top 95%", end: "top 55%", scrub: true },
        });

        gsap.fromTo(
          "[data-rail]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-timeline]", start: "top 70%", end: "bottom 70%", scrub: 0.6 },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-event]").forEach((el) => {
          const right = el.dataset.side === "right";
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%" } });
          tl.from(el.querySelector("[data-dot]"), { scale: 0, duration: 0.6, ease: "back.out(3)" })
            .from(el.querySelector("[data-ring]"), { scale: 0.4, opacity: 0, duration: 0.8, ease: "power2.out" }, "<")
            .from(
              el.querySelector("[data-card]"),
              {
                x: right ? 60 : -60,
                y: 40,
                opacity: 0,
                rotateY: right ? -8 : 8,
                transformPerspective: 1200,
                duration: 1.2,
                ease: "power3.out",
              },
              "<0.1",
            );
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} id="events" className="mt-24 scroll-mt-28 md:mt-36">
      <div className="container-x">
        <div className="mb-14 flex items-center gap-4 text-sm uppercase tracking-[0.16em] text-muted md:mb-20">
          <span className="font-display tabular-nums text-fg">02</span>
          <span data-divider className="h-px flex-1 origin-left bg-line" />
          <span>Events by {club.name}</span>
        </div>

        <div className="mb-16 grid gap-8 md:mb-24 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2
            data-title
            className="font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] md:text-7xl"
          >
            {title.map((w, i) => (
              <span key={w} className="mr-[0.25em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span data-word className={`inline-block ${i > 1 ? "text-muted" : ""}`}>
                  {w}
                </span>
              </span>
            ))}
          </h2>
          <div>
            <p data-intro className="max-w-md text-lg leading-relaxed text-muted">
              Every one of these came out of the club: hosting TEDx, running sound for a summit and keeping a
              24-hour hackathon on track.
            </p>
            <p data-intro className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-medium tracking-tight tabular-nums">
                {String(events.length).padStart(2, "0")}
              </span>
              <span className="text-sm text-muted">events organised, hosted and run</span>
            </p>
          </div>
        </div>

        <div data-timeline className="relative lg:pb-48">
          <span aria-hidden className="absolute top-2 bottom-0 left-[7px] w-px bg-line lg:left-1/2" />
          <span
            aria-hidden
            data-rail
            className="absolute top-2 bottom-0 left-[7px] w-px origin-top bg-gradient-to-b from-fg via-fg/70 to-fg/20 lg:left-1/2"
          />
          <ol className="grid gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-16">
            {events.map((e, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={e.slug}
                  data-event
                  data-side={right ? "right" : "left"}
                  className={`relative pl-9 lg:pl-0 ${right ? "lg:translate-y-48" : ""}`}
                >
                  <span
                    aria-hidden
                    className={`absolute top-10 left-0 grid h-[15px] w-[15px] place-items-center ${
                      right ? "lg:-left-[calc(2rem+7.5px)]" : "lg:left-auto lg:-right-[calc(2rem+7.5px)]"
                    }`}
                  >
                    <span data-ring className="absolute -inset-2 rounded-full bg-glow/70 blur-[6px]" />
                    <span data-dot className="relative grid h-full w-full place-items-center rounded-full border border-line bg-bg">
                      <span className="h-[7px] w-[7px] rounded-full bg-fg" />
                    </span>
                  </span>
                  <div data-card className="h-full">
                    <EventCard event={e} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
