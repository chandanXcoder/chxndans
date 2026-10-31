import Image from "next/image";
import Link from "next/link";
import { logout } from "@/app/admin/actions";
import { site } from "@/lib/content";
import type { BookingStatus, MessageStatus } from "@/lib/store";

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

const tones: Record<MessageStatus | BookingStatus, string> = {
  new: "bg-blue-100 text-blue-700",
  read: "bg-surface-2 text-muted",
  archived: "bg-surface-2 text-muted",
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-700",
  done: "bg-surface-2 text-fg",
  cancelled: "bg-red-100 text-red-700",
};

export function StatusBadge({ status }: { status: MessageStatus | BookingStatus }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${tones[status]}`}>{status}</span>
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
        className={`rounded-full px-4 py-2 text-sm transition-colors ${
          primary ? "bg-fg text-bg hover:bg-fg/85" : "bg-surface hover:bg-surface-2"
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
        className="rounded-full border border-line px-4 py-2 text-sm transition-colors hover:border-fg"
      >
        Reply by email
      </a>
      {phone && (
        <a
          href={whatsappLink(phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-emerald-500 px-4 py-2 text-sm text-white transition-colors hover:bg-emerald-600"
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
      {items.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className={`rounded-full px-4 py-2 text-sm transition-colors ${
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
  return <p className="rounded-3xl bg-surface p-10 text-center text-muted">{children}</p>;
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
  children,
}: {
  active: (typeof tabs)[number]["key"];
  badges: { messages: number; bookings: number };
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="card">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src={site.avatar}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
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
                    <span className="grid h-5 min-w-5 place-items-center rounded-full bg-blue-500 px-1.5 text-[11px] text-white">
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/" className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-fg">
              View site ↗
            </Link>
            <form action={logout}>
              <button type="submit" className="rounded-full bg-surface px-4 py-2 text-sm transition-colors hover:bg-surface-2">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <section className="card min-h-[70vh] py-10 md:py-14">
        <div className="container-x">
          <h1 className="mb-8 font-display text-4xl font-medium tracking-tight md:text-5xl">{title}</h1>
          {children}
        </div>
      </section>
    </>
  );
}

export function AdminLoading() {
  return (
    <section className="card min-h-[80vh] py-14">
      <div className="container-x space-y-4">
        <div className="h-12 w-64 animate-pulse rounded-full bg-surface" />
        <div className="h-40 animate-pulse rounded-3xl bg-surface" />
        <div className="h-40 animate-pulse rounded-3xl bg-surface" />
      </div>
    </section>
  );
}
