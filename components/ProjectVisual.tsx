import Image from "next/image";
import type { Project } from "@/lib/content";

// Stylised device mockup used until real screenshots are added to /public.
export default function ProjectVisual({
  p,
  index,
  className = "aspect-[4/3]",
}: {
  p: Project;
  index: number;
  className?: string;
}) {
  const mobile = p.slug === "invertis-mess";
  const news = p.slug === "today-india-times";

  // Real screenshot in a browser frame on a dark stage (Eloqwnt-style showcase).
  if (p.image) {
    return (
      <div className={`relative overflow-hidden rounded-[2rem] bg-[#1d1e21] ${className}`}>
        <div
          className={`absolute -bottom-1/3 left-1/2 h-2/3 w-3/4 -translate-x-1/2 rounded-full bg-gradient-to-r ${p.accent} opacity-35 blur-[90px] transition-opacity duration-700 group-hover:opacity-60`}
        />
        <div className="absolute inset-0 flex items-center justify-center px-[8%]">
          <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-[1.02]">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#2a2b2f] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              {p.site && (
                <span className="ml-3 truncate rounded-full bg-white/10 px-3 py-0.5 text-[10px] text-white/60">
                  {p.site}
                </span>
              )}
            </div>
            <Image
              src={p.image}
              alt={`${p.title} website screenshot`}
              width={1905}
              height={936}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-line bg-surface ${className}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${p.accent} opacity-85 transition-transform duration-[1.2s] ease-out group-hover:scale-110`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_110%,rgba(0,0,0,0.35),transparent_60%)]" />
      <span className="absolute top-5 left-6 font-display text-sm font-medium text-black/60">
        0{index + 1}
      </span>

      <div className="absolute inset-0 grid place-items-center p-10 transition-transform duration-700 ease-out group-hover:-translate-y-2">
        {mobile ? (
          <div className="aspect-[9/19] h-[86%] overflow-hidden rounded-[2rem] border-[6px] border-fg bg-white p-3 shadow-2xl">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-fg/15" />
            <div className="mb-3 h-16 rounded-xl bg-accent/80" />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="mb-2 h-8 rounded-lg bg-surface-2" />
            ))}
          </div>
        ) : (
          <div className="w-[88%] max-w-3xl overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl">
            <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-fg/15" />
              <span className="h-2 w-2 rounded-full bg-fg/15" />
              <span className="h-2 w-2 rounded-full bg-fg/15" />
              <span className="ml-3 h-2 w-1/3 rounded-full bg-fg/10" />
            </div>
            {news ? (
              <div className="p-3">
                <div className="mb-2 flex items-center justify-between border-b border-line pb-2">
                  <span className="font-display text-[11px] font-semibold tracking-tight text-fg">
                    TODAY INDIA TIMES
                  </span>
                  <span className="rounded bg-red-600 px-1.5 py-0.5 text-[8px] font-semibold text-white">
                    LIVE
                  </span>
                </div>
                <div className="mb-2 flex gap-2">
                  {["India", "World", "Business", "Tech", "Sports"].map((c) => (
                    <span key={c} className="text-[8px] text-muted">
                      {c}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <div
                      className={`mb-2 aspect-[16/9] rounded-md bg-gradient-to-br ${p.accent} opacity-80`}
                    />
                    <div className="h-2.5 w-11/12 rounded-full bg-fg/30" />
                    <div className="mt-1.5 h-2.5 w-2/3 rounded-full bg-fg/30" />
                    <div className="mt-2 h-1.5 w-full rounded-full bg-fg/10" />
                  </div>
                  <div className="space-y-2">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="border-b border-line pb-2">
                        <div className="mb-1 h-8 rounded bg-surface-2" />
                        <div className="h-1.5 w-full rounded-full bg-fg/20" />
                        <div className="mt-1 h-1.5 w-2/3 rounded-full bg-fg/10" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 p-3">
                <div className="col-span-3 mb-1 h-14 rounded-lg bg-surface p-3">
                  <div className="h-2.5 w-1/2 rounded-full bg-fg/25" />
                  <div className="mt-2 h-2 w-1/3 rounded-full bg-fg/10" />
                </div>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="aspect-square rounded-lg bg-surface">
                    <div
                      className={`m-2 h-1/2 rounded-md bg-gradient-to-br ${p.accent} opacity-70`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <span className="absolute right-5 bottom-5 rounded-full bg-white/80 px-3 py-1.5 text-xs text-fg backdrop-blur">
        {p.title}
      </span>
    </div>
  );
}
