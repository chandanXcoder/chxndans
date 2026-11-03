// One-off: copy data/messages.json and data/bookings.json into Supabase.
// Usage: node --env-file=.env.local scripts/import-data.mjs
// Overwrites the "messages" and "bookings" rows in the store table with the local files.
import { readFile } from "node:fs/promises";
import { createClient } from "@supabase/supabase-js";

const url =
  process.env.SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_storage_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.storage_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.storage_SUPABASE_SECRET_KEY;
if (!url || !key) throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY first.");
const db = createClient(url, key, { auth: { persistSession: false } });

for (const name of ["messages", "bookings"]) {
  let items;
  try {
    items = JSON.parse(await readFile(`data/${name}.json`, "utf8"));
  } catch (e) {
    if (e.code === "ENOENT") { console.log(`${name}: no local file, skipped`); continue; }
    throw e;
  }
  const { data: row } = await db.from("store").select("version").eq("name", name).maybeSingle();
  const { error } = await db.from("store").upsert({ name, items, version: (row?.version ?? 0) + 1 });
  if (error) throw error;
  console.log(`${name}: imported ${items.length}`);
}
