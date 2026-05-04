import Link from "next/link";

import { APP_STRINGS } from "@/constants/app-strings";
import { ROUTES } from "@/constants/routes";

export function ShoppingCartEmptyState() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-slate-50 px-8 py-12 text-center shadow-sm">
      <div className="text-5xl" aria-hidden>
        📚
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">{APP_STRINGS.EMPTY_CART_HEADING}</h2>
        <p className="text-sm leading-relaxed text-slate-600">{APP_STRINGS.EMPTY_CART_BODY}</p>
      </div>
      <Link
        href={ROUTES.HOME}
        className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-layout hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        {APP_STRINGS.CONTINUE_SHOPPING_LABEL}
      </Link>
    </div>
  );
}
