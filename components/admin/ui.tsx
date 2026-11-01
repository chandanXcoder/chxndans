import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/admin/actions";
import { site } from "@/lib/content";
import type { BookingStatus, MessageStatus } from "@/lib/store";
import { LiveDot } from "./graphics";
import AdminMotion from "./AdminMotion";
import { Arrow } from "@/components/ui/Button";

// "5m ago", "3h ago", "2d ago", then a plain date.
export function timeAgo(iso: string) {
  const s = (Date.now() - Date.parse(iso)) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86_400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 7 * 86_400) return `${Math.floor(s / 86_400)}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" });
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

export const formatSlot = (date: string, time: string) => {
  const day = new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });
  const [h, m] = time.split(":").map(Number);
  return `${day} · ${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
};

// WhatsApp link from a free-form phone number (assumes India for 10-digit numbers).
export const whatsappLink = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits.length === 10 ? `91${digits}` : digits}`;
};

// Accent per status, in the site palette.
export const statusColor: Record<MessageStatus | BookingStatus, string> = {
  new: "#4361ee",
  read: "#868e96",
  archived: "#adb5bd",
  pending: "#f59f00",
  confirmed: "#2f9e44",
  done: "#0d0e10",
  cancelled: "#e62b1e",
};

export function StatusBadge({ status }: { status: MessageStatus | BookingStatus }) {
  const c = statusColor[status];
  const live = status === "new" || status === "pending";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full bg-bg px-3 py-1 text-xs font-medium capitalize ring-1 ring-line"
      style={{ color: c }}
    >
      {live ? <LiveDot className="bg-current" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      <span className="text-fg">{status}</span>
    </span>
  );
}

// A one-button form that runs a bound server action.
export function ActionButton({
  action,
  children,
  primary,
}: {
  action: () => Promise<void>;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <form action={action}>
      <button
        type="submit"
        className={`rounded-full px-4 py-2 text-sm transition-[background-color,transform] active:scale-95 ${
          primary ? "bg-fg text-bg hover:bg-fg/85" : "bg-bg ring-1 ring-line hover:ring-fg"
        }`}
      >
        {children}
      </button>
    </form>
  );
}

export function ContactLinks({ email, phone, subject }: { email: string; phone?: string; subject: string }) {
  return (
    <>
      <a
        href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}
        className="rounded-full border border-line bg-bg px-4 py-2 text-sm transition-[border-color,transform] hover:border-fg active:scale-95"
      >
        Reply by email
      </a>
      {phone && (
        <a
          href={whatsappLink(phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm text-white transition-[background-color,transform] hover:bg-emerald-600 active:scale-95"
        >
          WhatsApp
        </a>
      )}
    </>
  );
}

export function FilterTabs({ items }: { items: { label: string; href: string; active: boolean; count?: number }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t, i) => (
        <Link
          key={t.href}
          href={t.href}
          style={{ "--i": i } as React.CSSProperties}
          className={`admin-in rounded-full px-4 py-2 text-sm transition-[background-color,color,transform] active:scale-95 ${
            t.active ? "bg-fg text-bg" : "bg-surface text-fg/80 hover:bg-surface-2"
          }`}
        >
          {t.label}
          {t.count !== undefined && <span className="ml-2 opacity-60">{t.count}</span>}
        </Link>
      ))}
    </div>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-reveal
      className="flex flex-col items-center gap-4 rounded-[1.75rem] border border-dashed border-line p-10 text-center text-muted"
    >
      <svg viewBox="0 0 64 48" className="float w-16" style={{ "--d": "5s" } as React.CSSProperties} aria-hidden>
        <rect x="2" y="2" width="60" height="44" rx="8" fill="#fff" stroke="#d6dee8" strokeWidth="2" />
        <path
          d="M6 8l26 20L58 8"
          fill="none"
          stroke="#9fb8d8"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p>{children}</p>
    </div>
  );
}

const tabs = [
  { key: "dashboard", label: "Dashboard", href: "/admin" },
  { key: "messages", label: "Messages", href: "/admin/messages" },
  { key: "bookings", label: "Bookings", href: "/admin/bookings" },
] as const;

// Admin chrome: top bar card with tabs and logout, then the page body card.
export function AdminShell({
  active,
  badges,
  title,
  sub,
  intro,
  children,
}: {
  active: (typeof tabs)[number]["key"];
  badges: { messages: number; bookings: number };
  title: string;
  sub?: string;
  // Replaces the default eyebrow + heading (used by the dashboard hero).
  intro?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="card admin-in">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src={site.avatar}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-surface"
            />
            <span className="leading-tight">
              <span className="block font-display text-[17px] font-semibold tracking-tight">{site.fullName}</span>
              <span className="block text-xs text-muted">Admin panel</span>
            </span>
          </Link>
          <nav className="order-last flex w-full gap-1 overflow-x-auto md:order-none md:w-auto" aria-label="Admin">
            {tabs.map((t) => {
              const count = t.key === "messages" ? badges.messages : t.key === "bookings" ? badges.bookings : 0;
              return (
                <Link
                  key={t.key}
                  href={t.href}
                  aria-current={active === t.key ? "page" : undefined}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm transition-colors sm:px-4 sm:text-[15px] ${
                    active === t.key ? "bg-fg text-bg" : "text-fg/70 hover:bg-surface hover:text-fg"
                  }`}
                >
                  {t.label}
                  {count > 0 && (
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#4361ee] px-1.5 text-[11px] text-white">
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-fg"
            >
              View site
              <Arrow className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-full bg-surface px-4 py-2 text-sm transition-colors hover:bg-surface-2"
              >
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <section className="card min-h-[70vh] py-12 md:py-20">
        <AdminMotion className="container-x">
          {intro ?? (
            <div data-reveal className="mb-10 md:mb-14">
              <p className="mb-5 flex items-center gap-3 text-lg text-fg">
                <span className="h-2 w-2 rounded-full bg-fg" />
                Admin panel
              </p>
              <h1 className="font-display text-5xl leading-[1] font-medium tracking-tight md:text-7xl">{title}</h1>
              {sub && <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{sub}</p>}
            </div>
          )}
          {children}
        </AdminMotion>
      </section>
    </>
  );
}

export function AdminLoading() {
  return (
    <section className="card min-h-[80vh] py-14">
      <div className="container-x space-y-4">
        <div className="shimmer h-5 w-40 rounded-full" />
        <div className="shimmer h-16 w-80 max-w-full rounded-2xl" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="shimmer h-36 rounded-3xl" />
          ))}
        </div>
        <div className="shimmer h-40 rounded-3xl" />
        <div className="shimmer h-40 rounded-3xl" />
      </div>
    </section>
  );
}
