import { gsap } from "gsap";

export type Vars = React.CSSProperties & Record<`--${string}`, string>;

// Seeded so the server and the browser draw the same squares.
export function seededLevels(count: number, seed: number) {
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: count }, () => {
    const r = rand();
    return r < 0.2 ? 0 : 1 + Math.floor(r * r * 4);
  });
}

// Counts every [data-count] inside `scope` up from 0 once `trigger` scrolls into view.
export function countUp(scope: Element, trigger: Element) {
  scope.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const counter = { v: 0 };
    el.textContent = "0";
    gsap.to(counter, {
      v: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger, start: "top 80%" },
      onUpdate: () => {
        el.textContent = String(Math.round(counter.v));
      },
    });
  });
}

// Pointer spotlight (--mx/--my), a gentle 3D tilt on the [data-tilt] child and an optional
// [data-confetti] pop on enter. Returns a cleanup for gsap.matchMedia.
export function cardHover(cards: HTMLElement[]) {
  const cleanups = cards.map((card) => {
    const inner = card.querySelector<HTMLElement>("[data-tilt]") ?? card;
    gsap.set(inner, { transformPerspective: 1000 });
    const rx = gsap.quickTo(inner, "rotationX", { duration: 0.6, ease: "power3.out" });
    const ry = gsap.quickTo(inner, "rotationY", { duration: 0.6, ease: "power3.out" });
    const confetti = card.querySelectorAll<HTMLElement>("[data-confetti]");

    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", `${x * 100}%`);
      card.style.setProperty("--my", `${y * 100}%`);
      // wide cards tilt less so they don't look warped
      const max = r.width > 700 ? 2 : 5;
      rx((0.5 - y) * max * 2);
      ry((x - 0.5) * max * 2);
    };
    const enter = () => {
      if (!confetti.length) return;
      gsap.killTweensOf(confetti);
      gsap.fromTo(
        confetti,
        { x: 0, y: 0, rotation: 0, opacity: 1 },
        {
          x: () => gsap.utils.random(-160, 40),
          y: () => gsap.utils.random(-150, -40),
          rotation: () => gsap.utils.random(-360, 360),
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.01,
        },
      );
    };
    const leave = () => {
      rx(0);
      ry(0);
    };

    card.addEventListener("pointermove", move);
    card.addEventListener("pointerenter", enter);
    card.addEventListener("pointerleave", leave);
    return () => {
      card.removeEventListener("pointermove", move);
      card.removeEventListener("pointerenter", enter);
      card.removeEventListener("pointerleave", leave);
    };
  });
  return () => cleanups.forEach((c) => c());
}

// Background for the hover spotlight layer; the card sets --ac to its accent.
export const spotlight =
  "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--ac) 16%, transparent), transparent 70%)";
