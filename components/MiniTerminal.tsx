"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = { cmd: string; result: string; delay?: number; className?: string };

// A small terminal chip: types a command, prints the result, clears and repeats.
export default function MiniTerminal({ cmd, result, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ repeat: -1, repeatDelay: 0.6, delay })
          .from("[data-char]", { opacity: 0, duration: 0.01, stagger: 0.08 })
          .from("[data-result]", { opacity: 0, y: 6, duration: 0.4 }, "+=0.4")
          .to(["[data-char]", "[data-result]"], { opacity: 0, duration: 0.3 }, "+=2.2");
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className={`rounded-xl bg-[#0f1117] px-3.5 py-2.5 font-mono text-[11px] text-white shadow-[0_18px_40px_-16px_rgba(13,14,16,0.6)] ring-1 ring-white/10 sm:text-xs ${className}`}
    >
      <p className="flex items-center gap-1.5">
        <span className="text-[#28c840]">$</span>
        <span className="whitespace-pre">
          {[...cmd].map((c, i) => (
            <span key={i} data-char>
              {c}
            </span>
          ))}
        </span>
        <span className="caret inline-block h-[1.1em] w-[0.5em] bg-white/80" />
      </p>
      <p data-result className="mt-1 whitespace-nowrap text-[#c3e88d]">
        {result}
      </p>
    </div>
  );
}
