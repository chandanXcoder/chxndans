"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const HOVER = "a, button, [role=button], label, select, summary, [data-cursor-hover]";
const TEXT_INPUT = "input, textarea, [contenteditable=true]";

// Custom cursor: a dot pinned to the pointer and a ring that trails behind it.
// The ring grows over links/buttons and can show a label via data-cursor-text="View".
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power3" });
    const dotY = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power3" });
    const ringX = gsap.quickTo(ring.current, "x", { duration: 0.4, ease: "power3" });
    const ringY = gsap.quickTo(ring.current, "y", { duration: 0.4, ease: "power3" });

    let visible = false;
    let state = "";

    const setState = (next: "idle" | "hover" | "text" | "input", text = "") => {
      const key = next + text;
      if (key === state) return;
      state = key;
      if (label.current) label.current.textContent = text;

      const size = { idle: 36, hover: 64, text: 88, input: 4 }[next];
      gsap.to(ring.current, {
        width: size,
        height: size,
        backgroundColor: next === "hover" || next === "text" ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
        borderWidth: next === "input" ? 0 : 1.5,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot.current, { scale: next === "idle" ? 1 : 0, duration: 0.25, ease: "power3.out" });
      gsap.to(label.current, { opacity: next === "text" ? 1 : 0, scale: next === "text" ? 1 : 0.6, duration: 0.25 });
    };

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      if (!visible) {
        visible = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
      }
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return setState("idle");
      const withText = t.closest<HTMLElement>("[data-cursor-text]");
      if (withText) return setState("text", withText.dataset.cursorText ?? "");
      if (t.closest(TEXT_INPUT)) return setState("input");
      if (t.closest(HOVER)) return setState("hover");
      setState("idle");
    };

    const onDown = () => gsap.to(ring.current, { scale: 0.8, duration: 0.15, ease: "power2.out" });
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });

    const onLeave = () => {
      visible = false;
      gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  });

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-white opacity-0 mix-blend-difference"
      >
        <span
          ref={label}
          className="text-[11px] font-semibold tracking-[0.12em] text-black uppercase opacity-0"
        />
      </div>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 rounded-full bg-white opacity-0 mix-blend-difference"
      />
    </>
  );
}
