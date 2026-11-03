-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- Stores the admin panel's messages and bookings (one row per collection).
create table if not exists public.store (
  name text primary key,
  items jsonb not null default '[]'::jsonb,
  version integer not null default 1
);

insert into public.store (name) values ('messages'), ('bookings')
on conflict (name) do nothing;

-- Lock the table to the server: RLS on with no policies, so only the service_role key can read/write it.
alter table public.store enable row level security;
