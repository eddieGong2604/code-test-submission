-- Create table + RLS. Run migrations in filename order (see README).
create table if not exists public.books (
  id integer primary key,
  title text not null,
  author text not null,
  price numeric(10, 2) not null,
  cover text not null,
  description text not null,
  isbn text not null unique
);

alter table public.books enable row level security;

drop policy if exists "Allow public read books" on public.books;
create policy "Allow public read books"
  on public.books for select
  using (true);
