import type { Metadata } from "next";
import { Suspense } from "react";
import { loadAdminData } from "@/lib/admin";
import type { Booking } from "@/lib/store";
import { deleteBooking, setBookingStatus } from "../actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { Avatar, DateTile, FxCard, Icon } from "@/components/admin/graphics";
import {
  ActionButton,
  AdminLoading,
  AdminShell,
  ContactLinks,
  Empty,
  FilterTabs,
  StatusBadge,
  formatDate,
  formatSlot,
  statusColor,
  timeAgo,
} from "@/components/admin/ui";

export const metadata: Metadata = { title: "Bookings" };

export default function BookingsPage({ searchParams }: PageProps<"/admin/bookings">) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <Bookings searchParams={searchParams} />
    </Suspense>
  );
}

async function Bookings({ searchParams }: Pick<PageProps<"/admin/bookings">, "searchParams">) {
  const { bookings, badges } = await loadAdminData();
  const { kind, status } = await searchParams;
  const shown = bookings.filter((b) => (!kind || b.kind === kind) && (!status || b.status === status));

  const tab = (label: string, k?: string, s?: string) => {
    const q = new URLSearchParams({ ...(k && { kind: k }), ...(s && { status: s }) }).toString();
    return {
      label,
      href: q ? `/admin/bookings?${q}` : "/admin/bookings",
      active: kind === k && status === s,
      count: bookings.filter((b) => (!k || b.kind === k) && (!s || b.status === s)).length,
    };
  };

  return (
    <AdminShell
      active="bookings"
      badges={badges}
      title="Bookings"
      sub="Discovery calls and project requests. Confirm, mark done or cancel."
    >
      <FilterTabs
        items={[
          tab("All"),
          tab("Calls", "call"),
          tab("Projects", "project"),
          tab("Pending", undefined, "pending"),
          tab("Confirmed", undefined, "confirmed"),
          tab("Done", undefined, "done"),
          tab("Cancelled", undefined, "cancelled"),
        ]}
      />

      <div className="mt-8 space-y-4">
        {shown.length === 0 && <Empty>No bookings here.</Empty>}
        {shown.map((b) => (
          <BookingCard key={b.id} b={b} />
        ))}
      </div>
    </AdminShell>
  );
}

function BookingCard({ b }: { b: Booking }) {
  return (
    <FxCard accent={statusColor[b.status]} innerClassName="p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {b.kind === "call" ? <DateTile date={b.date} /> : <Avatar name={b.name} size="h-12 w-12 text-base" />}
          <div>
            <p className="mb-1 flex items-center gap-1.5 text-sm text-muted">
              <Icon name={b.kind === "call" ? "phone" : "briefcase"} className="h-4 w-4" />
              {b.kind === "call" ? "Call booking" : "Project booking"}
            </p>
            <h2 className="font-display text-2xl font-medium tracking-tight">
              {b.kind === "call" ? formatSlot(b.date, b.time) : b.service}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {b.name} ·{" "}
              <a href={`mailto:${b.email}`} className="hover:text-fg">
                {b.email}
              </a>
              {b.phone && (
                <>
                  {" · "}
                  <a href={`tel:${b.phone}`} className="hover:text-fg">
                    {b.phone}
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted">
          <span title={formatDate(b.createdAt)}>Booked {timeAgo(b.createdAt)}</span>
          <StatusBadge status={b.status} />
        </div>
      </div>

      {b.kind === "project" ? (
        <>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-bg px-3 py-1 ring-1 ring-line">Budget: {b.budget}</span>
            <span className="rounded-full bg-bg px-3 py-1 ring-1 ring-line">Timeline: {b.timeline}</span>
          </div>
          <p className="mt-5 whitespace-pre-line leading-relaxed">{b.details}</p>
        </>
      ) : (
        b.topic && <p className="mt-5 whitespace-pre-line leading-relaxed">{b.topic}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
        <ContactLinks
          email={b.email}
          phone={b.phone}
          subject={b.kind === "call" ? `Your call on ${formatSlot(b.date, b.time)}` : `Your ${b.service} project`}
        />
        {b.status === "pending" && (
          <ActionButton action={setBookingStatus.bind(null, b.id, "confirmed")} primary>
            Confirm
          </ActionButton>
        )}
        {(b.status === "pending" || b.status === "confirmed") && (
          <>
            <ActionButton action={setBookingStatus.bind(null, b.id, "done")}>Mark done</ActionButton>
            <ActionButton action={setBookingStatus.bind(null, b.id, "cancelled")}>Cancel</ActionButton>
          </>
        )}
        {(b.status === "done" || b.status === "cancelled") && (
          <ActionButton action={setBookingStatus.bind(null, b.id, "pending")}>Reopen</ActionButton>
        )}
        <form action={deleteBooking.bind(null, b.id)} className="ml-auto">
          <ConfirmButton message={`Delete the booking from ${b.name}?`}>Delete</ConfirmButton>
        </form>
      </div>
    </FxCard>
  );
}
