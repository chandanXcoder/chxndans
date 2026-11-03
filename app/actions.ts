"use server";

import { CALL_TIMES, callDates, newRecord, slotKey, update, type Booking } from "@/lib/store";
import { contact, services, site } from "@/lib/content";
import { notify } from "@/lib/notify";
import { after } from "next/server";

export type FormState = { ok: boolean; error?: string } | null;

const text = (d: FormData, key: string, max = 200) => String(d.get(key) ?? "").trim().slice(0, max);
// A storage failure (database down, missing table, read-only disk) becomes a friendly form error
// instead of crashing the page.
const SAVE_ERROR = `Sorry, something went wrong on our side. Please try again, or email ${site.email}.`;
async function save<T>(run: () => Promise<T>): Promise<{ ok: true; value: T } | { ok: false }> {
  try {
    return { ok: true, value: await run() };
  } catch (e) {
    console.error("[actions] save failed:", e);
    return { ok: false };
  }
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Shared contact fields; the hidden "company" input is a honeypot for bots.
function person(d: FormData) {
  const name = text(d, "name", 100);
  const email = text(d, "email", 200);
  const phone = text(d, "phone", 30) || undefined;
  if (!name || !isEmail(email)) return { error: "Please add your name and a valid email." } as const;
  return { name, email, phone } as const;
}

export async function sendMessage(_: FormState, d: FormData): Promise<FormState> {
  if (text(d, "company")) return { ok: true };
  const p = person(d);
  if ("error" in p) return { ok: false, error: p.error };
  const message = text(d, "message", 5000);
  if (!message) return { ok: false, error: "Please write a short message." };

  const type = pick(text(d, "type"), contact.projectTypes);
  const budget = pick(text(d, "budget"), contact.budgets);
  const saved = await save(() =>
    update("messages", (items) => {
      items.push({ ...newRecord(), status: "new", ...p, type, budget, message });
    }),
  );
  if (!saved.ok) return { ok: false, error: SAVE_ERROR };
  after(() =>
    notify({
      subject: `New message from ${p.name}`,
      fields: [["Name", p.name], ["Email", p.email], ["Phone", p.phone], ["Type", type], ["Budget", budget], ["Message", message]],
      replyTo: p.email,
      adminPath: "/admin/messages",
    }),
  );
  return { ok: true };
}

export async function bookCall(_: FormState, d: FormData): Promise<FormState> {
  if (text(d, "company")) return { ok: true };
  const p = person(d);
  if ("error" in p) return { ok: false, error: p.error };
  const date = text(d, "date", 10);
  const time = text(d, "time", 5);
  if (!callDates().includes(date) || !CALL_TIMES.includes(time)) {
    return { ok: false, error: "Please pick a date and time slot." };
  }

  const topic = text(d, "topic", 2000);
  const saved = await save(() =>
    update("bookings", (items) => {
      const clash = items.some(
        (b) =>
          b.kind === "call" &&
          (b.status === "pending" || b.status === "confirmed") &&
          slotKey(b.date, b.time) === slotKey(date, time),
      );
      if (clash) return false;
      items.push({ ...newRecord(), status: "pending", kind: "call", ...p, date, time, topic });
      return true;
    }),
  );
  if (!saved.ok) return { ok: false, error: SAVE_ERROR };
  const booked = saved.value;
  if (booked) {
    after(() =>
      notify({
        subject: `Call booked: ${date} ${time} IST - ${p.name}`,
        fields: [["Name", p.name], ["Email", p.email], ["Phone", p.phone], ["When", `${date} ${time} IST`], ["Topic", topic]],
        replyTo: p.email,
        adminPath: "/admin/bookings",
      }),
    );
  }
  return booked ? { ok: true } : { ok: false, error: "That slot was just booked. Please pick another one." };
}

export async function bookProject(_: FormState, d: FormData): Promise<FormState> {
  if (text(d, "company")) return { ok: true };
  const p = person(d);
  if ("error" in p) return { ok: false, error: p.error };
  const details = text(d, "details", 5000);
  if (!details) return { ok: false, error: "Please describe your project in a few lines." };

  const booking: Booking = {
    ...newRecord(),
    status: "pending",
    kind: "project",
    ...p,
    service: pick(text(d, "service"), services.map((s) => s.title)),
    budget: pick(text(d, "budget"), contact.budgets),
    timeline: pick(text(d, "timeline"), contact.timelines),
    details,
  };
  const saved = await save(() =>
    update("bookings", (items) => {
      items.push(booking);
    }),
  );
  if (!saved.ok) return { ok: false, error: SAVE_ERROR };
  after(() =>
    notify({
      subject: `Project request: ${booking.service} - ${p.name}`,
      fields: [
        ["Name", p.name],
        ["Email", p.email],
        ["Phone", p.phone],
        ["Service", booking.service],
        ["Budget", booking.budget],
        ["Timeline", booking.timeline],
        ["Details", details],
      ],
      replyTo: p.email,
      adminPath: "/admin/bookings",
    }),
  );
  return { ok: true };
}

// Only accept values from the known option lists.
function pick(value: string, options: string[]) {
  return options.includes(value) ? value : options[options.length - 1];
}
