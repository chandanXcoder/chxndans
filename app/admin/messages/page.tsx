import type { Metadata } from "next";
import { Suspense } from "react";
import { loadAdminData } from "@/lib/admin";
import type { MessageStatus } from "@/lib/store";
import { deleteMessage, setMessageStatus } from "../actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { Avatar, FxCard } from "@/components/admin/graphics";
import {
  ActionButton,
  AdminLoading,
  AdminShell,
  ContactLinks,
  Empty,
  FilterTabs,
  StatusBadge,
  formatDate,
  statusColor,
  timeAgo,
} from "@/components/admin/ui";

export const metadata: Metadata = { title: "Messages" };

const filters: { label: string; value?: MessageStatus }[] = [
  { label: "All" },
  { label: "New", value: "new" },
  { label: "Read", value: "read" },
  { label: "Archived", value: "archived" },
];

export default function MessagesPage({ searchParams }: PageProps<"/admin/messages">) {
  return (
    <Suspense fallback={<AdminLoading />}>
      <Messages searchParams={searchParams} />
    </Suspense>
  );
}

async function Messages({ searchParams }: Pick<PageProps<"/admin/messages">, "searchParams">) {
  const { messages, badges } = await loadAdminData();
  const { status } = await searchParams;
  // "All" hides archived messages
  const shown = messages.filter((m) => (status ? m.status === status : m.status !== "archived"));

  return (
    <AdminShell
      active="messages"
      badges={badges}
      title="Messages"
      sub="Everything sent through the contact form. Reply, mark as read or archive."
    >
      <FilterTabs
        items={filters.map((f) => ({
          label: f.label,
          href: f.value ? `/admin/messages?status=${f.value}` : "/admin/messages",
          active: (status ?? undefined) === f.value,
          count: f.value ? messages.filter((m) => m.status === f.value).length : undefined,
        }))}
      />

      <div className="mt-8 space-y-4">
        {shown.length === 0 && <Empty>No messages here.</Empty>}
        {shown.map((m) => (
          <FxCard key={m.id} accent={statusColor[m.status]} innerClassName="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <Avatar name={m.name} size="h-14 w-14 text-lg" />
                <div>
                  <h2 className="font-display text-2xl font-medium tracking-tight">{m.name}</h2>
                  <p className="mt-1 text-sm text-muted">
                    <a href={`mailto:${m.email}`} className="hover:text-fg">
                      {m.email}
                    </a>
                    {m.phone && (
                      <>
                        {" · "}
                        <a href={`tel:${m.phone}`} className="hover:text-fg">
                          {m.phone}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <span title={formatDate(m.createdAt)}>{timeAgo(m.createdAt)}</span>
                <StatusBadge status={m.status} />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-bg px-3 py-1 ring-1 ring-line">{m.type}</span>
              <span className="rounded-full bg-bg px-3 py-1 ring-1 ring-line">Budget: {m.budget}</span>
            </div>
            <p className="mt-5 whitespace-pre-line leading-relaxed">{m.message}</p>

            <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
              <ContactLinks email={m.email} phone={m.phone} subject={`Re: your ${m.type.toLowerCase()} enquiry`} />
              {m.status === "new" ? (
                <ActionButton action={setMessageStatus.bind(null, m.id, "read")} primary>
                  Mark as read
                </ActionButton>
              ) : (
                <ActionButton action={setMessageStatus.bind(null, m.id, "new")}>Mark as new</ActionButton>
              )}
              {m.status === "archived" ? (
                <ActionButton action={setMessageStatus.bind(null, m.id, "read")}>Unarchive</ActionButton>
              ) : (
                <ActionButton action={setMessageStatus.bind(null, m.id, "archived")}>Archive</ActionButton>
              )}
              <form action={deleteMessage.bind(null, m.id)} className="ml-auto">
                <ConfirmButton message={`Delete the message from ${m.name}?`}>Delete</ConfirmButton>
              </form>
            </div>
          </FxCard>
        ))}
      </div>
    </AdminShell>
  );
}
