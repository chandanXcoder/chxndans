"use client";

import { useRef } from "react";
import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "accent" | "ghost" | "soft";
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`h-3.5 w-3.5 ${className}`} aria-hidden>
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

// Pill button that leans toward the cursor (magnetic hover).
export default function Button({ href, children, variant = "accent", external, className = "", onClick }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.35;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const styles = {
    accent: "bg-accent text-accent-ink hover:bg-accent/85",
    ghost: "border border-line bg-bg text-fg hover:border-accent",
    soft: "bg-soft text-fg hover:bg-glow",
  }[variant];

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-medium transition-[background-color,color,transform] duration-300 ease-out ${styles} ${className}`}
    >
      {children}
      <span className="grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-current/15">
        <Arrow className="transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </Link>
  );
}
