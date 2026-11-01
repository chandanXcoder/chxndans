// Admin building blocks styled like the public site: accent cards, small charts, avatars.
// Pure markup + CSS animations, so these stay server components; motion comes from <AdminMotion />.
import { spotlight, type Vars } from "@/components/ui/cardFx";

const vars = (v: Record<string, string | number>) => v as React.CSSProperties;

// Site accent palette (same hues as the Experience / Contact sections).
export const accents = {
  blue: "#4361ee",
  violet: "#7048e8",
  green: "#2f9e44",
  amber: "#f59f00",
  red: "#e62b1e",
  pink: "#ef476f",
  ink: "#0d0e10",
} as const;

const icons = {
  mail: "M4 6h16v12H4z M4 7l8 6 8-6",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7v5l3 2",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  briefcase: "M3 8h18v11H3z M8 8V5h8v3 M3 13h18",
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={icons[name]} />
    </svg>
  );
}

// Pulsing dot for "needs attention" states.
export function LiveDot({ className = "bg-blue-500" }: { className?: string }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className={`live-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${className}`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${className}`} />
    </span>
  );
}

// The site's hover card: [data-card] outer gets the tilt + spotlight (see cardFx), tinted by `accent`.
export function FxCard({
  accent = accents.blue,
  className = "",
  innerClassName = "p-6 md:p-7",
  reveal = true,
  children,
}: {
  accent?: string;
  className?: string;
  innerClassName?: string;
  reveal?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div data-card data-reveal={reveal || undefined} className={`group min-w-0 ${className}`} style={{ "--ac": accent } as Vars}>
      <div
        data-tilt
        className={`relative h-full overflow-hidden rounded-[1.75rem] border border-line bg-surface transition-[border-color,box-shadow] duration-500 group-hover:border-transparent group-hover:shadow-[0_30px_60px_-30px_var(--ac)] ${innerClassName}`}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: spotlight }} />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

// "● Label" line used above every heading on the site.
export function Eyebrow({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <p className="flex items-center gap-3 text-sm text-muted">
      <span className="h-2 w-2 rounded-full bg-fg" style={color ? { background: color } : undefined} />
      {children}
    </p>
  );
}

const avatarHues = [accents.blue, accents.violet, accents.green, accents.amber, accents.pink, "#1098ad"];

// Initials on a soft tint of a colour picked from the name, so each person keeps theirs.
export function Avatar({ name, size = "h-11 w-11 text-sm" }: { name: string; size?: string }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
  const hue = avatarHues[[...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7) % avatarHues.length];
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full font-display font-semibold ${size}`}
      style={{ color: hue, background: `color-mix(in srgb, ${hue} 14%, var(--bg))` }}
      aria-hidden
    >
      {initials || "?"}
    </span>
  );
}

// Calendar-page tile for a YYYY-MM-DD date.
export function DateTile({ date }: { date: string }) {
  const d = new Date(`${date}T00:00:00Z`);
  return (
    <span className="flex w-12 shrink-0 flex-col overflow-hidden rounded-xl bg-bg text-center ring-1 ring-line">
      <span className="bg-fg py-0.5 text-[10px] font-medium tracking-wider text-bg uppercase">
        {d.toLocaleDateString("en-IN", { month: "short", timeZone: "UTC" })}
      </span>
      <span className="py-1.5 font-display text-lg leading-none font-medium">{d.getUTCDate()}</span>
    </span>
  );
}

const istDay = (iso: string) => new Date(Date.parse(iso) + 330 * 60_000).toISOString().slice(0, 10);

// Items per IST day for the last `days` days, oldest first.
export function dailyCounts(items: { createdAt: string }[], today: string, days: number) {
  const end = Date.parse(`${today}T00:00:00Z`);
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(end - (days - 1 - i) * 86_400_000).toISOString().slice(0, 10);
    return { date, n: items.filter((x) => istDay(x.createdAt) === date).length };
  });
}

// Tiny trend line in the card's accent that draws itself in.
export function Sparkline({ data, id }: { data: number[]; id: string }) {
  const max = Math.max(1, ...data);
  const w = 100;
  const h = 32;
  const line = data
    .map((v, k) => `${k ? "L" : "M"}${((k / (data.length - 1)) * w).toFixed(1)} ${(h - 3 - (v / max) * (h - 8)).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-10 w-full overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ac)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--ac)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w} ${h} L0 ${h}Z`} fill={`url(#${id})`} className="fade-in" />
      <path
        d={line}
        pathLength={1}
        fill="none"
        stroke="var(--ac)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="draw"
      />
    </svg>
  );
}

// Stacked bars of messages + bookings received per day (IST).
export function ActivityChart({
  messages,
  bookings,
  today,
  days = 14,
}: {
  messages: { createdAt: string }[];
  bookings: { createdAt: string }[];
  today: string;
  days?: number;
}) {
  const m = dailyCounts(messages, today, days);
  const b = dailyCounts(bookings, today, days);
  const cols = m.map((c, i) => ({ date: c.date, m: c.n, b: b[i].n }));
  const max = Math.max(4, ...cols.map((c) => c.m + c.b));
  const total = cols.reduce((s, c) => s + c.m + c.b, 0);
  const label = (d: string) =>
    new Date(`${d}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });

  return (
    <FxCard accent={accents.blue} className="h-full" innerClassName="p-6 md:p-8">
      <div className="flex h-full flex-col">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <Eyebrow color="var(--ac)">Activity · last {days} days</Eyebrow>
            <p className="mt-3 font-display text-4xl font-medium tracking-tight">
              <span data-count={total}>{total}</span> <span className="text-muted">enquiries</span>
            </p>
          </div>
          <div className="flex gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-fg" /> Messages
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--ac)" }} /> Bookings
            </span>
          </div>
        </div>
        <div className="relative min-h-44 flex-1">
          {[1, 0.5, 0].map((f) => (
            <div key={f} className="absolute inset-x-0 flex items-center gap-2" style={{ bottom: `${f * 100}%` }}>
              <span className="w-4 text-right text-[10px] text-muted tabular-nums">{Math.round(max * f)}</span>
              <span className="h-px flex-1 border-t border-dashed border-line" />
            </div>
          ))}
          <div className="absolute inset-y-0 right-0 left-6 flex items-end gap-1.5 sm:gap-2">
            {cols.map((c, i) => (
              <div key={c.date} title={`${label(c.date)}: ${c.m} messages, ${c.b} bookings`} className="group/bar relative flex h-full flex-1 flex-col justify-end">
                <div
                  className="grow-y flex flex-col overflow-hidden rounded-md transition-opacity group-hover/bar:opacity-80"
                  style={vars({ "--i": i, height: `${Math.max(((c.m + c.b) / max) * 100, 2)}%` })}
                >
                  {c.m + c.b === 0 ? (
                    <div className="h-full bg-surface-2" />
                  ) : (
                    <>
                      <div style={{ flexGrow: c.b, background: "var(--ac)" }} />
                      <div className="bg-fg" style={{ flexGrow: c.m }} />
                    </>
                  )}
                </div>
                <span className="pointer-events-none absolute -top-7 left-1/2 z-10 -translate-x-1/2 translate-y-1 rounded-md bg-fg px-1.5 py-0.5 text-[11px] whitespace-nowrap text-bg opacity-0 transition-all group-hover/bar:translate-y-0 group-hover/bar:opacity-100">
                  {c.m + c.b}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex justify-between pl-6 text-[11px] text-muted">
          <span>{label(cols[0].date)}</span>
          <span>Today</span>
        </div>
      </div>
    </FxCard>
  );
}

// Labelled horizontal bars (e.g. bookings by status) that fill in on load.
export function BarList({
  title,
  accent,
  rows,
}: {
  title: string;
  accent: string;
  rows: { label: string; count: number; color: string }[];
}) {
  const total = rows.reduce((s, r) => s + r.count, 0);
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <FxCard accent={accent}>
      <Eyebrow color="var(--ac)">{title}</Eyebrow>
      <p className="mt-3 font-display text-3xl font-medium tracking-tight">
        <span data-count={total}>{total}</span> <span className="text-muted">total</span>
      </p>
      <ul className="mt-5 space-y-3 text-sm">
        {rows.length === 0 && <li className="text-muted">No data yet</li>}
        {rows.map((r, i) => (
          <li key={r.label}>
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <span className="truncate text-muted">{r.label}</span>
              <span className="tabular-nums">{r.count}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div className="grow-x h-full rounded-full" style={vars({ "--i": i, width: `${(r.count / max) * 100}%`, background: r.color })} />
            </div>
          </li>
        ))}
      </ul>
    </FxCard>
  );
}
