# BookHaven (`bookhaven-submission`)

**BookHaven** is a small online bookstore demo: a responsive catalog of books on the home page, a dedicated shopping cart at `/cart`, add/remove and quantity controls, and a cart that persists in the browser via localStorage. The catalog can load from Supabase (Postgres `books` table) when credentials are set, or fall back to bundled data in `src/lib/books.ts`.

This document lists the technologies and tooling present in **code-test-submission** (npm package `bookhaven-submission`).

---

## Developer decisions

High-level choices aligned with the code test brief (BookHaven). For stack tables and commands, see the sections below.

### Framework and libraries

- **Next.js (App Router)** — file-based routing for `/` and `/cart`, React Server Components for the catalog loader, and built-in `loading` / `error` boundaries. Fits SEO and a small storefront without a separate API layer for the catalog.
- **Tailwind CSS** — fast layout and responsive grids with shared tokens (spacing, transitions) in `tailwind.config.ts` and CSS variables in `globals.css`.
- **Supabase (optional)** — server-only reads from Postgres when env vars are set; otherwise the app uses **`src/lib/books.ts`** so reviewers can run the app with zero backend setup.
- **Prisma** — schema and client are in the repo for introspection / `db:studio` and to mirror the `books` table; catalog reads use Supabase today, not Prisma queries, to keep the data path that ships in production simple.

### State management

- **Shopping cart:** `useReducer` in `ShoppingCartProvider` plus pure helpers in `shopping-cart-helpers.ts`. Actions are explicit (`ADD_BOOK`, `REMOVE_LINE`, `CHANGE_QUANTITY`, `HYDRATE`) so updates stay easy to trace and test.
- **Persistence:** `localStorage` after hydration avoids overwriting the shopper’s cart before the first client read; quantities are clamped using shared limits from `src/constants/limits.ts`.
- **Toast:** separate lightweight context for “added to cart” feedback without coupling cart logic to UI notifications.

### Architecture

- **`app/`** — routes, Suspense for the home catalog, and route-level loading UI.
- **`src/features/`** — page-level UI for home catalog and cart (`HomeBookCatalog`, `ShoppingCartPage`).
- **`src/components/`** — shared layout (`AppShellLayout`, header, badge) and primitives (`BookCard`, buttons, skeletons).
- **`src/lib/`** — catalog resolution, validation, formatting, and cart math (with colocated `*.test.ts` / `*.test.tsx` where it keeps tests next to the behavior they protect).
- **`src/constants/`** — user-facing copy, routes, storage keys, and numeric limits in one place.

### Testing strategy

The suite focuses on **behavior users depend on**: cart line math, catalog fallback when Supabase misbehaves, row validation for untrusted DB shapes, search/filter, and components that wire context to clicks and navigation. Pure logic is tested without the DOM where possible; interactive pieces use Testing Library with **user-event** so tests resemble real usage. See [Why these tests?](#why-these-tests) for a concise map to files. As of the latest run: **16** Jest suites, **45** tests (`npm test`).

### Challenges and learnings

- **Supabase rows vs `Book` type** — Postgres can return numbers as strings; `validate-book.ts` normalizes and filters invalid rows so the UI always receives a consistent `Book` shape or falls back to bundled data with a visible warning.
- **Cart hydration** — deferring `localStorage` writes until after `HYDRATE` prevents flashing an empty cart on first paint when persisted lines exist.
- **Server vs client boundaries** — `server-only` on catalog and Supabase modules avoids accidentally pulling server clients into client bundles.

---

## How to run the project

### Prerequisites

- **Node.js** — use a current LTS release (the repo targets modern Next.js / React).
- **npm** — comes with Node; this repo uses `package-lock.json`.

### 1. Install dependencies

From the `code-test-submission` directory:

```bash
npm install
```

`postinstall` runs **`prisma generate`**, so the Prisma client is created without a separate step.

### 2. Environment variables

Copy the example env file and fill in values as needed:

```bash
cp .env.example .env.local
```

| Variable | Required to run the app? | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Only if you want the live **Supabase** catalog | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Only with Supabase URL above | Anon key for server-side reads |
| `DATABASE_URL` | No for `npm run dev` / catalog via Supabase or static data | Postgres URL for Prisma (`db:studio`, `db:pull`, future ORM use) |

If Supabase variables are missing or invalid, the homepage still works using the built-in catalog in **`src/lib/books.ts`**.

### 3. (Optional) Create and seed `books` in Supabase

If you use Supabase, run every **`supabase/*.sql`** file **in sorted filename order** in the Supabase SQL editor or `psql` (create table, then seed). Example order in this repo:

1. `supabase/2026-05-04--00-00--create-books-table.sql`
2. `supabase/2026-05-04--00-01--seed-books.sql`

### 4. Development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the home catalog and [http://localhost:3000/cart](http://localhost:3000/cart) for the cart page.

### Other useful commands

| Command | When to use it |
| --- | --- |
| `npm test` | Run the Jest suite |
| `npm run lint` | Run ESLint (`next lint`) |
| `npm run build` | Production build (`prisma generate` + `next build`) |
| `npm start` | Serve the production build (run **`npm run build`** first) |
| `npm run db:studio` | Open Prisma Studio (needs valid **`DATABASE_URL`**) |

---

## Runtime application

| Technology | Role in this project |
| --- | --- |
| **Next.js** `^15.1.0` | App Router under `app/` (`layout.tsx`, `page.tsx`, `cart/`, `error.tsx`, `loading.tsx`, `not-found.tsx`), `next dev` / `next build` / `next start`, built-in optimizations |
| **React** `^19.0.0` | UI components and client providers (`react-dom` `^19.0.0`) |
| **TypeScript** `^5.7.2` | Strict mode, path alias `@/*` → `./src/*`, `jsx: preserve`, Next.js TypeScript plugin |
| **`server-only`** `^0.0.1` | Marks server-only modules (catalog loader, Supabase/Prisma helpers) so they are not bundled into client code |

---

## Styling and assets

| Technology | Role in this project |
| --- | --- |
| **Tailwind CSS** `^3.4.16` | Utility-first styling; content globs in `tailwind.config.ts` for `app/`, `src/components`, `src/features`, `src/context`; theme extensions (Inter-based `fontFamily`, spacing tokens, layout transition duration) |
| **PostCSS** `^8.4.49` | Pipeline for Tailwind |
| **Autoprefixer** `^10.4.20` | Vendor prefixes in the CSS build |
| **`next/font/google`** | **Inter** loaded in `app/layout.tsx` with CSS variable `--font-inter` |
| **`next/image`** | Optimized remote images; `next.config.ts` allows `https://m.media-amazon.com/images/**` via `images.remotePatterns` |
| **`next.config.ts`** | TypeScript Next config; `outputFileTracingRoot` set for predictable file tracing in nested workspaces |

---

## Data layer

| Technology | Role in this project |
| --- | --- |
| **`@supabase/supabase-js`** `^2.47.10` | Server-side Supabase client (`src/lib/supabase/server-client.ts`); homepage catalog reads the `books` table from `get-book-catalog.ts` when URL + anon key are configured |
| **Static fallback** | `src/lib/books.ts` used when Supabase is not configured, the query fails, or no rows pass validation |
| **`validate-book.ts`** | Parses and normalizes Supabase rows into the shared `Book` type (handles numeric/string quirks from Postgres) |
| **Prisma** `^6.19.3` (`prisma` CLI + **`@prisma/client`** `^6.19.3`) | `prisma/schema.prisma`: PostgreSQL datasource via `DATABASE_URL`, `Book` model mapped to table `books` (`@@map("books")`); `src/lib/prisma.ts` exports a singleton `PrismaClient`; **no feature code imports it yet** — catalog at runtime uses Supabase, not Prisma queries |
| **`supabase/*.sql`** | Hand-written SQL (timestamp-prefixed filenames) for creating and seeding `books` in Supabase or any Postgres client |

---

## Testing

| Technology | Role in this project |
| --- | --- |
| **Jest** `^29.7.0` | Unit and component tests (`npm test`) |
| **`next/jest`** | Jest integration for Next.js (`jest.config.mjs`) |
| **`jest-environment-jsdom`** `^29.7.0` | DOM environment for React component tests |
| **`@testing-library/react`** `^16.1.0` | Render and interact with components |
| **`@testing-library/user-event`** `^14.5.2` | User interaction simulation |
| **`@testing-library/jest-dom`** `^6.6.3` | Extra DOM matchers (`jest.setup.ts`) |
| **`@types/jest`** `^29.5.14` | TypeScript types for Jest |
| **`jest.config.mjs`** | `watchman: false`, `moduleNameMapper` for `@/*`, `setupFilesAfterEnv` |

### Why these tests?

Tests target the **main spine** of the app: catalog resolution, validation of external rows, cart math, money formatting, search, and UI that connects context to user actions. Failures in these areas would break shopping or mislead shoppers, so they get automated checks first.

| Area | What is covered | Example files |
| --- | --- | --- |
| **Cart logic** | Add line, merge quantities, remove line, quantity floor, grand total, item count | `shopping-cart-helpers.test.ts` |
| **Money** | Stable USD display for prices | `format-currency.test.ts` |
| **Search** | Empty query returns full list; substring match on title/author | `catalog-search.test.ts` |
| **DB / API shape** | Supabase client creation when env is set or absent; `getBookCatalogForHomePage` fallbacks and success path; `parseBooksFromSupabaseRows` coercion and invalid rows | `server-client.test.ts`, `get-book-catalog.test.ts`, `validate-book.test.ts` |
| **Home catalog UI** | Heading, cards, warning banner, search filter, empty search state | `home-book-catalog.test.tsx` |
| **Book card** | Visible title/author; add-to-cart from CTA | `book-card.test.tsx` |
| **Cart UI** | Line quantity controls and remove; empty state; summary total; full page with lines vs empty | `shopping-cart-line-item.test.tsx`, `shopping-cart-empty-state.test.tsx`, `shopping-cart-summary-panel.test.tsx`, `shopping-cart-page.test.tsx` |
| **Chrome** | Active nav link per route; cart badge count from context; shell wraps children | `site-header-navigation.test.tsx`, `shopping-cart-badge.test.tsx`, `app-shell-layout.test.tsx` |
| **Tooling sanity** | Prisma client export smoke check | `prisma.test.ts` |

**Count:** `npm test` reports **45** tests across **16** suites (the original brief mentioned **11** tests as a minimum bar for critical paths; this repo goes further on the same priorities).

---

## Linting and types for tooling

| Technology | Role in this project |
| --- | --- |
| **ESLint** `^9.17.0` | `npm run lint` via `next lint` |
| **`eslint-config-next`** `^15.1.0` | Next.js + React recommended rules |
| **`@eslint/eslintrc`** `^3.2.0` | ESLint flat-config compatibility where needed |
| **`@types/node`** `^22.10.0` | Node typings (`tsconfig` includes `"types": ["node"]`) |
| **`@types/react`** / **`@types/react-dom`** `^19.x` | React typings |

---

## npm scripts

| Script | What it runs |
| --- | --- |
| `dev` | `next dev` |
| `build` | `prisma generate` then `next build` |
| `start` | `next start` |
| `lint` | `next lint` |
| `test` | `jest` |
| `postinstall` | `prisma generate` |
| `db:generate` | `prisma generate` |
| `db:studio` | `prisma studio` |
| `db:pull` | `prisma db pull` (introspect DB into schema) |

---

## Environment variables

See the table in **[How to run the project](#how-to-run-the-project)** (step 2). The canonical template is **`.env.example`**; use **`.env.local`** for local overrides (not committed).

---

## Where things live (high level)

- **`app/`** — routes, global CSS, root layout  
- **`src/components/`** — layout shell, UI primitives  
- **`src/features/`** — home catalog, cart page UI  
- **`src/context/`** — shopping cart (`useReducer`) and toast context  
- **`src/hooks/`** — e.g. `use-shopping-cart`  
- **`src/lib/`** — catalog, Supabase, Prisma singleton, helpers, tests alongside libs  
- **`src/constants/`** — routes, strings, limits, storage keys  
- **`prisma/`** — `schema.prisma`  
- **`supabase/`** — ordered SQL migrations / seeds  
