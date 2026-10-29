"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  // When set, direct children animate one after another.
  stagger?: number;
};

export default function Reveal({ children, className, delay = 0, stagger }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(stagger ? el.children : el, {
          y: 48,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          delay,
          stagger,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
