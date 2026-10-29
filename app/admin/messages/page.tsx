import type { Metadata } from "next";
import { Suspense } from "react";
import { loadAdminData } from "@/lib/admin";
import type { MessageStatus } from "@/lib/store";
import { deleteMessage, setMessageStatus } from "../actions";
import ConfirmButton from "@/components/admin/ConfirmButton";
import {
  ActionButton,
  AdminLoading,
  AdminShell,
  ContactLinks,
  Empty,
  FilterTabs,
  StatusBadge,
  formatDate,
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
    <AdminShell active="messages" badges={badges} title="Messages">
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
          <article
            key={m.id}
            className={`rounded-3xl border p-6 md:p-8 ${m.status === "new" ? "border-blue-200 bg-blue-50/40" : "border-line"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
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
              <div className="flex items-center gap-3 text-sm text-muted">
                {formatDate(m.createdAt)}
                <StatusBadge status={m.status} />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-surface px-3 py-1">{m.type}</span>
              <span className="rounded-full bg-surface px-3 py-1">Budget: {m.budget}</span>
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
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
