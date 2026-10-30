"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const m = window.matchMedia(query);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

// Paper plane flying along a dashed curve (SVG motion path scales with the scene).
export default function PaperPlane() {
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => true);
  const path = "M10 150 C 80 20, 170 190, 310 40";
  return (
    <svg viewBox="0 0 320 170" className="w-full overflow-visible" aria-hidden>
      <path d={path} fill="none" stroke="#4361ee" strokeOpacity="0.35" strokeWidth="2.5" strokeDasharray="6 8" />
      <g transform={reduced ? "translate(300 44) rotate(-30)" : undefined}>
        {!reduced && <animateMotion dur="5s" repeatCount="indefinite" rotate="auto" path={path} />}
        <path d="M-16 -12 22 0 -16 12 -8 0z" fill="#4361ee" />
        <path d="M-8 0 22 0 -16 12z" fill="#2f45c5" />
      </g>
    </svg>
  );
}
