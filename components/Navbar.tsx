"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site, type NavItem, type NavLink } from "@/lib/content";
import Button, { Arrow } from "./ui/Button";

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

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-3" aria-label={`${site.fullName}, home`}>
      <span className="relative">
        <Image
          src={site.photo}
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 rounded-full object-cover object-[50%_20%]"
        />
        <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-bg" />
      </span>
      <span className="leading-tight">
        <span className="block font-display text-[17px] font-semibold tracking-tight">{site.fullName}</span>
        <span className="block text-xs text-muted">Full-stack developer</span>
      </span>
    </Link>
  );
}

// One row inside a mega-menu panel: thumbnail or number, title and a short description.
function PanelLink({ link, n, current }: { link: NavLink; n: number; current: boolean }) {
  return (
    <Link
      {...linkProps(link.href, link.external)}
      aria-current={current ? "page" : undefined}
      className={`group/link flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-surface ${current ? "bg-surface" : ""}`}
    >
      {link.image ? (
        <span className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg bg-[#1d1e21]">
          <Image src={link.image} alt="" fill sizes="96px" className="object-cover object-top" />
        </span>
      ) : (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface text-xs text-muted transition-colors group-hover/link:bg-bg">
          {link.external ? "↗" : String(n).padStart(2, "0")}
        </span>
      )}
      <span className="min-w-0">
        <span className="flex items-center gap-2 font-medium text-fg">
          {link.label}
          <Arrow className="opacity-0 transition-[opacity,transform] duration-300 group-hover/link:translate-x-0.5 group-hover/link:opacity-100" />
        </span>
        {link.desc && <span className="mt-0.5 line-clamp-2 text-sm leading-snug text-muted">{link.desc}</span>}
      </span>
    </Link>
  );
}

// Desktop item: hover or keyboard focus opens a mega-menu panel under the bar.
function DesktopItem({ item, active, pathname }: { item: NavItem; active: boolean; pathname: string }) {
  const pill = `rounded-full px-4 py-2 text-[15px] transition-colors ${
    active ? "bg-surface text-fg" : "text-fg/70 hover:bg-surface hover:text-fg"
  }`;

  if (!item.children) {
    return (
      <Link href={item.href} aria-current={active ? "page" : undefined} className={pill}>
        {item.label}
      </Link>
    );
  }

  // the overview link (same href as the section) lives in the intro column instead of the grid
  const links = item.children.filter((c) => c.href !== item.href);
  const wide = links.length > 4;

  return (
    <div className="group/dd">
      <Link
        href={item.href}
        aria-haspopup="true"
        className={`flex items-center gap-1.5 ${pill} group-hover/dd:bg-surface group-hover/dd:text-fg`}
      >
        {item.label}
        <span className="transition-transform duration-300 group-hover/dd:rotate-180 group-focus-within/dd:rotate-180">
          <Chevron />
        </span>
      </Link>
      <div className={`invisible absolute top-full left-1/2 z-50 ${wide ? "w-[min(880px,calc(100vw-2rem))]" : "w-[min(620px,calc(100vw-2rem))]"} -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-300 group-hover/dd:visible group-hover/dd:opacity-100 group-focus-within/dd:visible group-focus-within/dd:opacity-100`}
      >
        <div className="grid translate-y-2 grid-cols-[240px_1fr] gap-2 rounded-[1.75rem] border border-line bg-bg p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover/dd:translate-y-0 group-focus-within/dd:translate-y-0">
          <div className="relative flex flex-col justify-between overflow-hidden rounded-[1.25rem] bg-surface p-6">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -bottom-20 h-48 w-48 rounded-full bg-glow/70 blur-[60px]"
            />
            <div className="relative">
              <p className="mb-3 flex items-center gap-2 text-sm text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-fg" />
                {item.label}
              </p>
              <p className="font-display text-xl leading-snug tracking-tight">{item.intro}</p>
            </div>
            <Link
              href={item.href}
              className="relative mt-8 inline-flex items-center gap-2 self-start rounded-full bg-bg px-4 py-2 text-sm transition-colors hover:bg-fg hover:text-bg"
            >
              {item.children.find((c) => c.href === item.href)?.label ?? `All ${item.label.toLowerCase()}`}
              <Arrow />
            </Link>
          </div>
          <div className={`grid content-start gap-1 p-2 ${wide ? "grid-cols-2" : "grid-cols-1"}`}>
            {links.map((c, i) => (
              <PanelLink key={c.href} link={c} n={i + 1} current={!c.external && pathname === c.href} />
            ))}
          </div>
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
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  // tuck the bar away while scrolling down, bring it back on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 400 && y > lastY.current);
      lastY.current = y;
    };
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
        className={`fixed inset-x-0 top-0 z-50 px-2 pt-2 transition-transform duration-500 ease-out md:px-4 md:pt-3 ${
          hidden && !open ? "-translate-y-[120%]" : ""
        }`}
      >
        <div
          className={`relative mx-auto flex h-16 max-w-[1528px] items-center justify-between rounded-full border bg-bg/85 pr-2 pl-3 backdrop-blur-xl transition-[border-color,box-shadow] duration-500 md:h-[72px] md:pr-3 ${
            scrolled || open
              ? "border-line shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]"
              : "border-transparent"
          }`}
        >
          <Logo onClick={close} />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => (
              <DesktopItem key={item.href} item={item} active={isActive(item.href)} pathname={pathname} />
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <span className="hidden items-center gap-2 text-sm text-muted xl:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for work
            </span>
            <Button href="/contact" className="py-3! text-[15px]!">
              Let&apos;s talk
            </Button>
          </div>

          <button
            onClick={() => (open ? close() : setOpen(true))}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative grid h-12 w-12 place-items-center rounded-full bg-surface lg:hidden"
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
        className={`fixed inset-0 z-40 flex flex-col overflow-y-auto bg-page px-2 pt-22 pb-6 transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col rounded-[1.75rem] bg-bg px-5 py-2" aria-label="Mobile">
          {nav.map((item, i) => {
            const isOpen = expanded === item.label;
            return (
              <div
                key={item.href}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
                className={`border-b border-line transition-[transform,opacity] duration-500 last:border-b-0 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={close}
                    className={`flex-1 py-4 font-display text-3xl tracking-tight ${isActive(item.href) ? "text-fg" : "text-fg/70"}`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      aria-label={`${isOpen ? "Hide" : "Show"} ${item.label} pages`}
                      aria-expanded={isOpen}
                      className="grid h-10 w-10 place-items-center rounded-full bg-surface"
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
                      <div className="flex flex-col gap-1 pb-4">
                        {item.children.map((c) => (
                          <Link
                            key={c.href}
                            {...linkProps(c.href, c.external)}
                            onClick={close}
                            className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-lg ${
                              !c.external && pathname === c.href ? "bg-surface text-fg" : "text-muted"
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
        <div className="mt-2 flex flex-col gap-3 rounded-[1.75rem] bg-bg p-5">
          <p className="flex items-center gap-2 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Available for work
          </p>
          <a href={`mailto:${site.email}`} className="text-lg">
            {site.email}
          </a>
          <a href={site.phoneHref} className="text-lg">
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
