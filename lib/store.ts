// Tiny database for client messages and bookings (server only).
// - Supabase when its URL + service role key env vars are set (plain or Vercel "storage_" prefixed names);
//   needed on Vercel, table in supabase/schema.sql.
// - Otherwise JSON files in /data (git-ignored), for local dev or a VPS.
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type MessageStatus = "new" | "read" | "archived";
export type BookingStatus = "pending" | "confirmed" | "done" | "cancelled";

export type Message = {
  id: string;
  createdAt: string;
  status: MessageStatus;
  name: string;
  email: string;
  phone?: string;
  type: string;
  budget: string;
  message: string;
};

type BookingBase = {
  id: string;
  createdAt: string;
  status: BookingStatus;
  name: string;
  email: string;
  phone?: string;
};

export type CallBooking = BookingBase & {
  kind: "call";
  date: string; // YYYY-MM-DD (IST)
  time: string; // HH:MM (IST)
  topic: string;
};

export type ProjectBooking = BookingBase & {
  kind: "project";
  service: string;
  budget: string;
  timeline: string;
  details: string;
};

export type Booking = CallBooking | ProjectBooking;

type Collections = { messages: Message[]; bookings: Booking[] };

// ---- Supabase backend (production / Vercel) --------------------------------
// Each collection is one row in the "store" table: { name, items (jsonb array), version }.

const sbUrl =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_storage_SUPABASE_URL;
const sbKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.storage_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.storage_SUPABASE_SECRET_KEY;
const db: SupabaseClient | null =
  sbUrl && sbKey ? createClient(sbUrl, sbKey, { auth: { persistSession: false } }) : null;

if (!db && process.env.VERCEL) {
  console.error("[store] Supabase env vars missing: Vercel can't write files, so form submissions will fail.");
}

async function dbRead<K extends keyof Collections>(d: SupabaseClient, name: K) {
  const { data, error } = await d.from("store").select("items, version").eq("name", name).maybeSingle();
  if (error) throw new Error(`[store] read ${name}: ${error.message}`);
  return { items: (data?.items ?? []) as Collections[K], version: data?.version as number | undefined };
}

// Optimistic locking: the write only lands if nobody else wrote since we read; otherwise retry.
async function dbUpdate<K extends keyof Collections, T>(
  d: SupabaseClient,
  name: K,
  fn: (items: Collections[K]) => T,
): Promise<T> {
  for (let attempt = 0; attempt < 10; attempt++) {
    const { items, version } = await dbRead(d, name);
    const result = fn(items);
    const { data, error } =
      version === undefined
        ? await d.from("store").upsert({ name, items, version: 1 }, { onConflict: "name", ignoreDuplicates: true }).select("name")
        : await d.from("store").update({ items, version: version + 1 }).eq("name", name).eq("version", version).select("name");
    if (error) throw new Error(`[store] write ${name}: ${error.message}`);
    if (data?.length) return result;
    await new Promise((res) => setTimeout(res, 30 + Math.random() * 70));
  }
  throw new Error(`[store] write ${name}: too many concurrent updates`);
}

// ---- file backend (local dev / VPS) -----------------------------------------

const DIR = path.join(process.cwd(), "data");
const file = (name: keyof Collections) => path.join(DIR, `${name}.json`);

export async function readAll<K extends keyof Collections>(name: K): Promise<Collections[K]> {
  if (db) return (await dbRead(db, name)).items;
  try {
    return JSON.parse(await fs.readFile(file(name), "utf8"));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [] as Collections[K];
    throw e;
  }
}

// Writes go through one queue so two requests can't overwrite each other.
let queue: Promise<unknown> = Promise.resolve();

export function update<K extends keyof Collections, T>(
  name: K,
  fn: (items: Collections[K]) => T,
): Promise<T> {
  if (db) return dbUpdate(db, name, fn);
  const run = queue.then(async () => {
    const items = await readAll(name);
    const result = fn(items);
    await fs.mkdir(DIR, { recursive: true });
    const tmp = `${file(name)}.${randomUUID()}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(items, null, 2));
    await fs.rename(tmp, file(name));
    return result;
  });
  queue = run.catch(() => {});
  return run;
}

export const newRecord = () => ({ id: randomUUID(), createdAt: new Date().toISOString() });

// ---- call slots -----------------------------------------------------------

export const CALL_TIMES = ["10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const nowIST = () => new Date(Date.now() + 5.5 * 60 * 60 * 1000);
export const todayIST = () => nowIST().toISOString().slice(0, 10);

// Next 14 days in India time, skipping Sundays.
export function callDates(): string[] {
  const ist = nowIST();
  const out: string[] = [];
  for (let i = 1; out.length < 14 && i < 30; i++) {
    const d = new Date(ist);
    d.setUTCDate(ist.getUTCDate() + i);
    if (d.getUTCDay() !== 0) out.push(d.toISOString().slice(0, 10));
  }
  return out;
}

export const slotKey = (date: string, time: string) => `${date} ${time}`;

export async function takenSlots(): Promise<string[]> {
  const bookings = await readAll("bookings");
  return bookings
    .filter((b): b is CallBooking => b.kind === "call" && (b.status === "pending" || b.status === "confirmed"))
    .map((b) => slotKey(b.date, b.time));
}
