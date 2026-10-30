"use client";

import { useEffect, useRef } from "react";

// Shared stage for the animated illustrations: dotted canvas, soft glow,
// pointer parallax (--mx/--my, mouse only) and an `.in-view` class once visible.
export default function Scene({
  label,
  className = "aspect-square max-w-[600px]",
  glow = "from-[#dbe8f7] to-[#eef2ff]",
  children,
}: {
  label: string;
  className?: string;
  glow?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && el.classList.add("in-view"), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    e.currentTarget.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--mx", "0");
    e.currentTarget.style.setProperty("--my", "0");
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      role="img"
      aria-label={label}
      className={`relative mx-auto w-full select-none [--mx:0] [--my:0] ${className}`}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(rgba(13,14,16,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(circle_at_center,black_45%,transparent_75%)]" />
      <div className={`absolute top-[18%] left-[16%] h-[66%] w-[66%] rounded-full bg-gradient-to-br ${glow}`} />
      {children}
    </div>
  );
}
