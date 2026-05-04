"use client";

import { useShoppingCart } from "@/hooks/use-shopping-cart";

export function ShoppingCartBadge() {
  const { shoppingCartItemCount } = useShoppingCart();
  return (
    <span
      className="rounded-full bg-white/15 px-2 py-0.5 text-xs font-bold tabular-nums"
      aria-live="polite"
    >
      {shoppingCartItemCount}
    </span>
  );
}
