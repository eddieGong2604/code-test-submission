"use client";

import Image from "next/image";

import { MAX_SHOPPING_CART_LINE_QUANTITY } from "@/constants/limits";
import { APP_STRINGS } from "@/constants/app-strings";
import { PrimaryCallToActionButton } from "@/components/ui/primary-call-to-action-button";
import { formatPriceForDisplay } from "@/lib/format-currency";
import type { ShoppingCartLineModel } from "@/lib/shopping-cart-helpers";

type ShoppingCartLineItemProps = {
  shoppingCartLine: ShoppingCartLineModel;
  onRemoveLine: (bookId: number) => void;
  onChangeQuantity: (bookId: number, nextQuantity: number) => void;
};

export function ShoppingCartLineItem({
  shoppingCartLine,
  onRemoveLine,
  onChangeQuantity,
}: ShoppingCartLineItemProps) {
  const { book, quantity } = shoppingCartLine;
  const lineTotal = book.price * quantity;
  const isAtMaxQuantity = quantity >= MAX_SHOPPING_CART_LINE_QUANTITY;

  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition duration-layout hover:shadow-md sm:flex-row sm:items-center">
      <div className="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50">
        <Image
          src={book.cover}
          alt={`Cover art for ${book.title}`}
          fill
          sizes="96px"
          className="object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div>
          <p className="text-lg font-bold text-slate-900">{book.title}</p>
          <p className="text-sm font-medium text-slate-500">{book.author}</p>
          <p className="mt-1 text-xs font-mono uppercase tracking-wide text-slate-500">
            {APP_STRINGS.CART_LINE_SKU_PREFIX}: {book.isbn}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
            <button
              type="button"
              className="h-8 w-8 rounded-full text-lg font-semibold text-slate-800 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
              onClick={() => onChangeQuantity(book.id, quantity - 1)}
              aria-label={`${APP_STRINGS.DECREASE_QUANTITY_LABEL} for ${book.title}`}
            >
              −
            </button>
            <span className="min-w-[2ch] text-center text-sm font-bold tabular-nums" aria-live="polite">
              {quantity}
            </span>
            <button
              type="button"
              className="h-8 w-8 rounded-full text-lg font-semibold text-slate-800 transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
              onClick={() => onChangeQuantity(book.id, quantity + 1)}
              aria-label={`${APP_STRINGS.INCREASE_QUANTITY_LABEL} for ${book.title}`}
              disabled={isAtMaxQuantity}
            >
              +
            </button>
          </div>
          <span className="text-sm text-slate-600">
            {formatPriceForDisplay(book.price)} each
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start gap-3 sm:items-end">
        <p className="text-base font-bold text-slate-900">{formatPriceForDisplay(lineTotal)}</p>
        <PrimaryCallToActionButton
          type="button"
          variant="outline"
          onClick={() => onRemoveLine(book.id)}
          aria-label={`${APP_STRINGS.REMOVE_LINE_LABEL} ${book.title}`}
        >
          {APP_STRINGS.REMOVE_LINE_LABEL}
        </PrimaryCallToActionButton>
      </div>
    </li>
  );
}
