"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site, type NavItem } from "@/lib/content";
import Button from "./ui/Button";

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function linkProps(href: string, external?: boolean) {
  return external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
}

// Desktop item: hover or keyboard focus opens the dropdown panel.
function DesktopItem({ item, active, pathname }: { item: NavItem; active: boolean; pathname: string }) {
  const underline = `after:absolute after:inset-x-4 after:bottom-1 after:h-px after:origin-left after:bg-fg after:transition-transform after:duration-300 ${
    active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
  }`;

  if (!item.children) {
    return (
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`relative px-4 py-2 text-[17px] transition-colors ${underline} ${active ? "text-fg" : "text-muted hover:text-fg"}`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="group/dd relative">
      <Link
        href={item.href}
        aria-haspopup="true"
        className={`relative flex items-center gap-1.5 px-4 py-2 text-[17px] transition-colors ${underline} ${
          active ? "text-fg" : "text-muted hover:text-fg"
        }`}
      >
        {item.label}
        <span className="transition-transform duration-300 group-hover/dd:rotate-180 group-focus-within/dd:rotate-180">
          <Chevron />
        </span>
      </Link>
      <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-300 group-hover/dd:visible group-hover/dd:opacity-100 group-focus-within/dd:visible group-focus-within/dd:opacity-100">
        <div className="min-w-72 translate-y-2 whitespace-nowrap rounded-2xl border border-line bg-bg p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover/dd:translate-y-0 group-focus-within/dd:translate-y-0">
          {item.children.map((c) => {
            const current = !c.external && pathname === c.href;
            return (
              <Link
                key={c.href}
                {...linkProps(c.href, c.external)}
                aria-current={current ? "page" : undefined}
                className={`flex items-center justify-between gap-6 rounded-xl px-4 py-2.5 text-[15px] transition-colors hover:bg-surface ${
                  current ? "bg-surface text-fg" : "text-fg/80"
                }`}
              >
                {c.label}
                <span className="text-muted">{c.external ? "↗" : "→"}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
          scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-18 items-center justify-between">
          <Link href="/" onClick={close} className="font-display text-xl font-semibold tracking-tight">
            {site.name}
            <span className="text-glow">.</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <DesktopItem key={item.href} item={item} active={isActive(item.href)} pathname={pathname} />
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" variant="soft" className="py-3! text-base!">
              Let&apos;s chat <span aria-hidden>👋</span>
            </Button>
          </div>

          <button
            onClick={() => (open ? close() : setOpen(true))}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
          >
            <span
              className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`}
            />
            <span
              className={`absolute h-px w-5 bg-fg transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`}
            />
          </button>
        </div>
      </header>

      {/* full-screen mobile menu with expandable sections */}
      <div
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg px-4 pt-24 pb-10 transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col">
          {nav.map((item, i) => {
            const isOpen = expanded === item.label;
            return (
              <div
                key={item.href}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
                className={`border-b border-line transition-[transform,opacity] duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={close}
                    className={`flex-1 py-4 font-display text-3xl ${isActive(item.href) ? "text-fg" : "text-fg/80"}`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      aria-label={`${isOpen ? "Hide" : "Show"} ${item.label} pages`}
                      aria-expanded={isOpen}
                      className="grid h-10 w-10 place-items-center rounded-full border border-line"
                    >
                      <Chevron open={isOpen} />
                    </button>
                  )}
                </div>
                {item.children && (
                  <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col pb-4">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            {...linkProps(c.href, c.external)}
                            onClick={close}
                            className={`flex items-center justify-between py-2 text-lg ${
                              !c.external && pathname === c.href ? "text-fg" : "text-muted"
                            }`}
                          >
                            {c.label}
                            <span>{c.external ? "↗" : "→"}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className="mt-10 flex flex-col gap-3">
          <a href={`mailto:${site.email}`} className="text-muted">
            {site.email}
          </a>
          <a href={site.phoneHref} className="text-muted">
            {site.phone}
          </a>
          <Button href="/contact" className="mt-2 justify-between" onClick={close}>
            Let&apos;s talk
          </Button>
        </div>
      </div>
    </>
  );
}
