"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { APP_STRINGS } from "@/constants/app-strings";
import { ROUTES } from "@/constants/routes";
import { ShoppingCartBadge } from "@/components/layout/shopping-cart-badge";

const baseNavLinkClassName =
  "rounded-full px-3 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";

const inactiveNavLinkClassName = `${baseNavLinkClassName} text-slate-700 hover:bg-slate-100`;

const activeNavLinkClassName = `${baseNavLinkClassName} bg-slate-900 text-white shadow-sm`;

export function SiteHeaderNavigation() {
  const pathname = usePathname();
  const isHomeActive = pathname === ROUTES.HOME;
  const isCartActive = pathname === ROUTES.SHOPPING_CART;

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur transition-colors duration-layout">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-page-x py-4">
        <Link
          href={ROUTES.HOME}
          className="flex flex-col leading-tight transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          <span className="text-lg font-bold tracking-tight">{APP_STRINGS.SITE_NAME}</span>
          <span className="text-xs font-medium text-slate-500">{APP_STRINGS.SITE_TAGLINE}</span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-3">
          <Link
            href={ROUTES.HOME}
            className={isHomeActive ? activeNavLinkClassName : inactiveNavLinkClassName}
            aria-current={isHomeActive ? "page" : undefined}
          >
            Home
          </Link>
          <Link
            href={ROUTES.SHOPPING_CART}
            className={
              isCartActive
                ? `${activeNavLinkClassName} inline-flex items-center gap-2 px-4 py-2`
                : `inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900`
            }
            aria-current={isCartActive ? "page" : undefined}
          >
            {APP_STRINGS.GO_TO_CART_LABEL}
            <ShoppingCartBadge />
          </Link>
        </nav>
      </div>
    </header>
  );
}
