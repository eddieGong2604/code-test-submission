"use client";

import Link from "next/link";

import { APP_STRINGS } from "@/constants/app-strings";
import { ROUTES } from "@/constants/routes";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import { ShoppingCartEmptyState } from "@/features/shopping-cart/shopping-cart-empty-state";
import { ShoppingCartLineItem } from "@/features/shopping-cart/shopping-cart-line-item";
import { ShoppingCartSummaryPanel } from "@/features/shopping-cart/shopping-cart-summary-panel";

export function ShoppingCartPage() {
  const {
    shoppingCartLines,
    shoppingCartGrandTotal,
    removeShoppingCartLine,
    changeShoppingCartLineQuantity,
  } = useShoppingCart();

  const hasShoppingCartLines = shoppingCartLines.length > 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {APP_STRINGS.CART_PAGE_HEADING}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600">{APP_STRINGS.CART_PAGE_SUBTITLE}</p>
        </div>
        <Link
          href={ROUTES.HOME}
          className="text-sm font-semibold text-slate-900 underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          {APP_STRINGS.CONTINUE_SHOPPING_LABEL}
        </Link>
      </div>

      {!hasShoppingCartLines ? (
        <ShoppingCartEmptyState />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <ul className="space-y-4">
            {shoppingCartLines.map((shoppingCartLine) => (
              <ShoppingCartLineItem
                key={shoppingCartLine.book.id}
                shoppingCartLine={shoppingCartLine}
                onRemoveLine={removeShoppingCartLine}
                onChangeQuantity={changeShoppingCartLineQuantity}
              />
            ))}
          </ul>
          <ShoppingCartSummaryPanel shoppingCartGrandTotal={shoppingCartGrandTotal} />
        </div>
      )}
    </div>
  );
}
