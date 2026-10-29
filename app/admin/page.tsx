import Link from "next/link";
import { Suspense } from "react";
import { loadAdminData } from "@/lib/admin";
import { todayIST, type CallBooking } from "@/lib/store";
import { AdminLoading, AdminShell, Empty, StatusBadge, formatDate, formatSlot } from "@/components/admin/ui";

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

  const stats = [
    { label: "New messages", value: badges.messages, href: "/admin/messages?status=new" },
    { label: "Pending bookings", value: badges.bookings, href: "/admin/bookings?status=pending" },
    { label: "Upcoming calls", value: upcoming.length, href: "/admin/bookings?kind=call" },
    { label: "Project bookings", value: bookings.filter((b) => b.kind === "project").length, href: "/admin/bookings?kind=project" },
  ];

  return (
    <AdminShell active="dashboard" badges={badges} title="Dashboard">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="group rounded-3xl bg-surface p-6 transition-colors hover:bg-surface-2">
            <p className="font-display text-5xl font-medium tracking-tight">{s.value}</p>
            <p className="mt-6 flex items-center justify-between text-muted">
              {s.label}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <Heading href="/admin/messages">Latest messages</Heading>
          {messages.length ? (
            <ul className="divide-y divide-line border-y border-line">
              {messages.slice(0, 5).map((m) => (
                <li key={m.id}>
                  <Link href="/admin/messages" className="flex items-start justify-between gap-4 py-4 hover:bg-surface/50">
                    <span className="min-w-0">
                      <span className="block font-medium">{m.name}</span>
                      <span className="block truncate text-sm text-muted">{m.message}</span>
                    </span>
                    <span className="flex shrink-0 flex-col items-end gap-2 text-xs text-muted">
                      <StatusBadge status={m.status} />
                      {formatDate(m.createdAt)}
                    </span>
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
            <ul className="divide-y divide-line border-y border-line">
              {upcoming.slice(0, 5).map((b) => (
                <li key={b.id} className="flex items-start justify-between gap-4 py-4">
                  <span className="min-w-0">
                    <span className="block font-medium">{formatSlot(b.date, b.time)}</span>
                    <span className="block truncate text-sm text-muted">
                      {b.name} · {b.email}
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
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-display text-2xl font-medium tracking-tight">{children}</h2>
      <Link href={href} className="text-sm text-muted hover:text-fg">
        View all →
      </Link>
    </div>
  );
}
