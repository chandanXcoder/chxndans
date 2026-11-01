import Link from "next/link";
import { Suspense } from "react";
import { loadAdminData } from "@/lib/admin";
import { todayIST, type CallBooking } from "@/lib/store";
import { site } from "@/lib/content";
import { Arrow } from "@/components/ui/Button";
import AdminScene from "@/components/admin/AdminScene";
import {
  AdminLoading,
  AdminShell,
  Empty,
  StatusBadge,
  formatDate,
  formatSlot,
  statusColor,
  timeAgo,
} from "@/components/admin/ui";
import {
  ActivityChart,
  Avatar,
  BarList,
  DateTile,
  Eyebrow,
  FxCard,
  Icon,
  Sparkline,
  accents,
  dailyCounts,
  type IconName,
} from "@/components/admin/graphics";

function greeting() {
  const h = Number(new Date().toLocaleString("en-IN", { hour: "numeric", hour12: false, timeZone: "Asia/Kolkata" }));
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<AdminLoading />}>
      <Dashboard />
    </Suspense>
  );
}

async function Dashboard() {
  const { messages, bookings, badges } = await loadAdminData();
  const today = todayIST();
  const upcoming = bookings
    .filter((b): b is CallBooking => b.kind === "call" && b.date >= today && (b.status === "pending" || b.status === "confirmed"))
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const calls = bookings.filter((b) => b.kind === "call");
  const projects = bookings.filter((b) => b.kind === "project");
  const week = (items: { createdAt: string }[]) => dailyCounts(items, today, 7).map((d) => d.n);

  const stats: { label: string; value: number; href: string; icon: IconName; accent: string; trend: number[] }[] = [
    { label: "New messages", value: badges.messages, href: "/admin/messages?status=new", icon: "mail", accent: accents.blue, trend: week(messages) },
    { label: "Pending bookings", value: badges.bookings, href: "/admin/bookings?status=pending", icon: "clock", accent: accents.amber, trend: week(bookings) },
    { label: "Upcoming calls", value: upcoming.length, href: "/admin/bookings?kind=call", icon: "phone", accent: accents.green, trend: week(calls) },
    { label: "Project bookings", value: projects.length, href: "/admin/bookings?kind=project", icon: "briefcase", accent: accents.violet, trend: week(projects) },
  ];

  const statuses = ["pending", "confirmed", "done", "cancelled"] as const;
  const types = Object.entries(
    messages.reduce<Record<string, number>>((acc, m) => ({ ...acc, [m.type]: (acc[m.type] ?? 0) + 1 }), {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([label, count]) => ({ label, count, color: accents.blue }));

  const intro = (
    <div className="mb-14 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div data-reveal>
        <p className="mb-5 flex items-center gap-3 text-lg text-fg">
          <span className="h-2 w-2 rounded-full bg-fg" />
          {greeting()}
        </p>
        <h1 className="font-display text-5xl leading-[1] font-medium tracking-tight md:text-7xl">
          Hey {site.name},
          <br />
          <span className="text-muted">here&apos;s your day.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
          {badges.messages + badges.bookings > 0
            ? "A few things are waiting for a reply. Everything new is listed below."
            : "All caught up — nothing needs your attention right now."}
        </p>

        <div className="mt-10 space-y-4">
          {[
            { href: "/admin/messages?status=new", n: badges.messages, label: "new message", color: accents.blue },
            { href: "/admin/bookings?status=pending", n: badges.bookings, label: "pending booking", color: accents.amber },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-center justify-between border-b border-line pb-4 font-display text-xl transition-colors hover:text-muted md:text-2xl"
            >
              <span className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.color }} />
                <span data-count={l.n}>{l.n}</span> {l.label}
                {l.n === 1 ? "" : "s"}
              </span>
              <Arrow className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </Link>
          ))}
          {upcoming[0] && (
            <p className="text-sm text-muted">
              Next call · {formatSlot(upcoming[0].date, upcoming[0].time)} with {upcoming[0].name}
            </p>
          )}
        </div>
      </div>
      <div data-reveal className="mx-auto w-full max-w-[460px]">
        <AdminScene messages={badges.messages} bookings={badges.bookings} />
      </div>
    </div>
  );

  return (
    <AdminShell active="dashboard" badges={badges} title="Dashboard" intro={intro}>
      {/* stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const thisWeek = s.trend.reduce((a, b) => a + b, 0);
          return (
            <Link key={s.label} href={s.href} className="contents">
              <FxCard accent={s.accent}>
                <div className="flex items-start justify-between">
                  <Eyebrow color="var(--ac)">{s.label}</Eyebrow>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-bg ring-1 ring-line transition-colors duration-500 group-hover:text-white group-hover:ring-transparent group-hover:[background:var(--ac)]" style={{ color: "var(--ac)" }}>
                    <Icon name={s.icon} className="h-[18px] w-[18px]" />
                  </span>
                </div>
                <p className="mt-6 font-display text-6xl font-medium tracking-tight tabular-nums">
                  <span data-count={s.value}>{s.value}</span>
                </p>
                <div className="mt-4">
                  <Sparkline data={s.trend} id={`spark-${s.icon}`} />
                </div>
                <p className="mt-3 flex items-center justify-between text-sm text-muted">
                  {thisWeek > 0 ? `+${thisWeek} in the last 7 days` : "Quiet week"}
                  <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </p>
              </FxCard>
            </Link>
          );
        })}
      </div>

      {/* charts */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.7fr_1fr]">
        <ActivityChart messages={messages} bookings={bookings} today={today} />
        <div className="grid gap-4">
          <BarList
            title="Bookings by status"
            accent={accents.amber}
            rows={statuses.map((s) => ({
              label: s[0].toUpperCase() + s.slice(1),
              count: bookings.filter((b) => b.status === s).length,
              color: statusColor[s],
            }))}
          />
          <BarList title="Messages by type" accent={accents.blue} rows={types} />
        </div>
      </div>

      {/* lists */}
      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Heading href="/admin/messages">Latest messages</Heading>
          {messages.length ? (
            <ul>
              {messages.slice(0, 5).map((m) => (
                <li key={m.id} data-reveal>
                  <Link href="/admin/messages" className="group flex items-center gap-4 border-b border-line py-4">
                    <Avatar name={m.name} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="font-display text-lg transition-colors group-hover:text-muted">{m.name}</span>
                        <span className="text-xs text-muted" title={formatDate(m.createdAt)}>
                          {timeAgo(m.createdAt)}
                        </span>
                      </span>
                      <span className="block truncate text-sm text-muted">{m.message}</span>
                    </span>
                    <StatusBadge status={m.status} />
                    <Arrow className="hidden h-4 w-4 shrink-0 transition-transform group-hover:rotate-45 sm:block" />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No messages yet.</Empty>
          )}
        </div>

        <div>
          <Heading href="/admin/bookings?kind=call">Upcoming calls</Heading>
          {upcoming.length ? (
            <ul>
              {upcoming.slice(0, 5).map((b) => (
                <li key={b.id} data-reveal className="flex items-center gap-4 border-b border-line py-4">
                  <DateTile date={b.date} />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg">{formatSlot(b.date, b.time).split(" · ")[1]}</span>
                    <span className="block truncate text-sm text-muted">
                      {b.name}
                      {b.topic ? ` · ${b.topic}` : ` · ${b.email}`}
                    </span>
                  </span>
                  <StatusBadge status={b.status} />
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No upcoming calls.</Empty>
          )}
        </div>
      </div>
    </AdminShell>
  );
}

function Heading({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <div data-reveal className="mb-4 flex items-end justify-between border-b border-fg pb-4">
      <h2 className="font-display text-3xl font-medium tracking-tight">{children}</h2>
      <Link href={href} className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
        View all
        <Arrow className="transition-transform duration-300 group-hover:rotate-45" />
      </Link>
    </div>
  );
}
