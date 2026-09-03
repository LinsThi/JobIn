-- JobIn — user profiles (skills + tracked job categories).
-- Auth is handled by Supabase Auth (email OTP). This table is the only
-- application data stored server-side; everything else stays on-device.
--
-- Run this once in the Supabase SQL editor (see docs/SUPABASE_AUTH.md).

create table if not exists public.profiles (
  id                 uuid primary key references auth.users (id) on delete cascade,
  skills             text[] not null default '{}',
  tracked_categories text[] not null default '{}'
    check (
      array_length(tracked_categories, 1) is null
      or array_length(tracked_categories, 1) <= 3
    ),
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles
  for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Provision an empty profile row the moment a user signs up, so the app can
-- always read/patch a single row instead of upserting.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id) on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
