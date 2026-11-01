"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cardHover, countUp } from "@/components/ui/cardFx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Same motion language as the public site, for the admin pages:
// [data-reveal] rises in (siblings stagger), [data-count] counts up,
// [data-card] gets the accent spotlight + 3D tilt on hover.
export default function AdminMotion({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = el.querySelectorAll("[data-reveal]");
        gsap.set(items, { opacity: 0 });
        ScrollTrigger.batch(items, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.fromTo(batch, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.08 }),
        });
        countUp(el, el);
      });

      mm.add("(hover: hover) and (prefers-reduced-motion: no-preference)", () =>
        cardHover(gsap.utils.toArray<HTMLElement>("[data-card]", el)),
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
