import Link from "next/link";

import { APP_STRINGS } from "@/constants/app-strings";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">404</p>
      <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="text-sm leading-relaxed text-slate-600">
        The address may be mistyped, or the page may have moved. Head back to the catalog to keep
        browsing.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          {APP_STRINGS.CONTINUE_SHOPPING_LABEL}
        </Link>
        <Link
          href={ROUTES.SHOPPING_CART}
          className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 transition hover:bg-slate-50"
        >
          {APP_STRINGS.GO_TO_CART_LABEL}
        </Link>
      </div>
    </div>
  );
}
