import Image from "next/image";
import { site } from "@/lib/content";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

type Tile =
  | { kind: "image"; src: string; alt: string; pos: string; h: string }
  | { kind: "stat"; value: string; label: string; tone: string; h: string }
  | { kind: "chips"; items: string[]; h: string };

// Three columns of tiles; heights vary so the columns don't line up.
const columns: Tile[][] = [
  [
    { kind: "image", src: "/projects/today-india-times.webp", alt: "Today India Times", pos: "object-[30%_50%]", h: "h-56" },
    { kind: "stat", value: "99", label: "day commit streak", tone: "bg-lime-300 text-black", h: "h-36" },
    { kind: "image", src: "/projects/zoera-jewels.webp", alt: "Zoera Jewels", pos: "object-[25%_50%]", h: "h-64" },
    { kind: "chips", items: ["Next.js", "React", "Tailwind"], h: "h-32" },
  ],
  [
    { kind: "image", src: "/projects/invertis-mess.webp", alt: "Invertis Mess app", pos: "object-[72%_50%]", h: "h-72" },
    { kind: "stat", value: "4th", label: "HackBhoomi 2.0 (SIH internal)", tone: "bg-[#c3d7ec] text-black", h: "h-40" },
    { kind: "chips", items: ["Flutter", "Dart", "Firebase"], h: "h-32" },
    { kind: "image", src: "/projects/today-india-times.webp", alt: "Today India Times headlines", pos: "object-[95%_50%]", h: "h-52" },
  ],
  [
    { kind: "image", src: site.photo, alt: site.fullName, pos: "object-[50%_20%]", h: "h-60" },
    { kind: "stat", value: "1200+", label: "GitHub contributions", tone: "bg-violet-500 text-white", h: "h-40" },
    { kind: "image", src: "/projects/invertis-mess.webp", alt: "Invertis Mess website", pos: "object-[20%_50%]", h: "h-56" },
    { kind: "stat", value: "Live", label: "on Google Play", tone: "bg-emerald-400 text-black", h: "h-32" },
  ],
];

function TileView({ t }: { t: Tile }) {
  const base = `relative w-full shrink-0 overflow-hidden rounded-xl ${t.h}`;
  if (t.kind === "image") {
    return (
      <div className={`${base} bg-white/5`}>
        <Image src={t.src} alt={t.alt} fill sizes="240px" className={`object-cover ${t.pos}`} />
      </div>
    );
  }
  if (t.kind === "stat") {
    return (
      <div className={`${base} flex flex-col justify-end p-3 md:p-4 ${t.tone}`}>
        <p className="font-display text-xl font-semibold whitespace-nowrap tracking-tight sm:text-3xl xl:text-4xl">{t.value}</p>
        <p className="mt-1 text-[9px] leading-tight uppercase tracking-wide opacity-70 sm:text-xs">{t.label}</p>
      </div>
    );
  }
  return (
    <div className={`${base} flex flex-wrap content-center gap-1.5 border border-white/10 bg-white/5 p-2 md:gap-2 md:p-4`}>
      {t.items.map((c) => (
        <span key={c} className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80 md:px-3 md:py-1 md:text-xs">
          {c}
        </span>
      ))}
    </div>
  );
}

// "Expertise" block: pitch on the left, a dark panel of drifting work tiles on the right.
export default function Expertise() {
  return (
    <section className="container-x py-6 md:py-10">
      <Reveal>
        <div className="grid gap-10 rounded-[1.75rem] bg-bg p-6 md:rounded-[2.5rem] md:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div className="flex flex-col">
            <p className="flex items-center gap-3 text-lg">
              <span className="h-2 w-2 rounded-full bg-fg" />
              Expertise
            </p>
            <h2 className="mt-10 font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:mt-20 xl:text-6xl">
              I solve real problems
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed md:text-xl">
              I combine full-stack web development, Flutter mobile apps and clean UX/UI to build fast,
              reliable products that not only look great but drive real engagement and results for my
              clients.
            </p>
            <div className="mt-10 lg:mt-auto lg:pt-12">
              <Button href="/contact" variant="soft" className="text-base!">
                Let&apos;s talk <span aria-hidden>👋</span>
              </Button>
            </div>
          </div>

          <div
            aria-hidden
            className="drift relative h-[420px] overflow-hidden rounded-[1.5rem] bg-[#0d0e10] px-3 sm:h-[480px] md:rounded-[2rem] md:px-6 lg:h-[540px]"
          >
            <div className="grid h-full grid-cols-3 gap-3 md:gap-4">
              {columns.map((col, i) => (
                <div key={i} className="overflow-hidden">
                  <div className={`flex flex-col gap-3 pb-3 md:gap-4 md:pb-4 ${i % 2 ? "drift-down" : "drift-up"}`}>
                    {[...col, ...col].map((t, j) => (
                      <TileView key={j} t={t} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* soft fade at the top and bottom edges */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0d0e10] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0d0e10] to-transparent" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
