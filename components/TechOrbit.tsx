"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { techIcons, type TechIcon } from "./illustrations/techIcons";
import TechLogo from "./ui/TechLogo";

gsap.registerPlugin(useGSAP);

// Rings of logos around a core; radius is a share of the container width (cqw).
const rings: {
  rad: number;
  d: string;
  reverse?: boolean;
  icons: TechIcon[];
}[] = [
  {
    rad: 17,
    d: "18s",
    icons: [techIcons.next, techIcons.react, techIcons.typescript],
  },
  {
    rad: 29,
    d: "28s",
    reverse: true,
    icons: [
      techIcons.flutter,
      techIcons.dart,
      techIcons.firebase,
      techIcons.supabase,
    ],
  },
  {
    rad: 40.5,
    d: "40s",
    icons: [
      techIcons.github,
      techIcons.git,
      techIcons.node,
      techIcons.mongodb,
      techIcons.tailwind,
    ],
  },
];

// A solar system of the tech I use: logos orbit a glowing core and the whole thing tilts toward the cursor.
export default function TechOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-chip]", {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(2)",
          stagger: 0.06,
          delay: 0.3,
        });
        gsap.from("[data-core]", {
          scale: 0,
          rotate: -90,
          duration: 1.2,
          ease: "back.out(2)",
        });

        const rx = gsap.quickTo(tilt.current, "rotateX", {
          duration: 0.8,
          ease: "power3.out",
        });
        const ry = gsap.quickTo(tilt.current, "rotateY", {
          duration: 0.8,
          ease: "power3.out",
        });
        const onMove = (e: PointerEvent) => {
          const r = ref.current!.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 18);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 18);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
        };
        const el = ref.current!;
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        };
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="group/orbit relative mx-auto aspect-square w-full max-w-[520px] [perspective:1200px]"
    >
      <div
        ref={tilt}
        className="absolute inset-0 @container [transform-style:preserve-3d]"
      >
        <span
          aria-hidden
          className="absolute inset-[22%] rounded-full bg-glow/70 blur-3xl"
        />

        {/* logo chips */}
        {rings.map((r) =>
          r.icons.map((icon, i) => (
            <span
              key={icon.title}
              className={`${r.reverse ? "orbit-rev" : "orbit"} absolute top-1/2 left-1/2 -mt-[22px] -ml-[22px] group-hover/orbit:[animation-play-state:paused] md:-mt-[26px] md:-ml-[26px]`}
              style={
                {
                  "--rad": `${r.rad}cqw`,
                  "--d": r.d,
                  "--start": `${(360 / r.icons.length) * i}deg`,
                } as React.CSSProperties
              }
            >
              {/* intro animation lives on this wrapper; the chip's own CSS hover transition would fight GSAP */}
              <span data-chip className="block">
                <span
                  className="group/chip grid h-11 w-11 place-items-center rounded-2xl bg-bg shadow-[0_10px_30px_-10px_rgba(15,23,42,0.35)] ring-1 ring-line transition duration-300 hover:scale-125 hover:shadow-[0_0_0_6px_color-mix(in_srgb,var(--brand)_20%,transparent)] md:h-[52px] md:w-[52px]"
                  style={{ "--brand": icon.color } as React.CSSProperties}
                >
                  <TechLogo icon={icon} className="h-5 w-5 md:h-6 md:w-6" />
                </span>
              </span>
            </span>
          )),
        )}

        {/* core */}
        <div
          data-core
          className="absolute top-1/2 left-1/2 -mt-10 -ml-10 h-20 w-20 md:-mt-12 md:-ml-12 md:h-24 md:w-24"
        >
          <span className="absolute inset-0 animate-ping rounded-3xl bg-fg/10 [animation-duration:2.4s]" />
          <span className="relative grid h-full w-full place-items-center rounded-3xl bg-fg font-mono text-xl font-semibold text-bg shadow-[0_20px_50px_-15px_rgba(15,23,42,0.6)] md:text-2xl">
            &lt;/&gt;
          </span>
        </div>
      </div>
    </div>
  );
}
