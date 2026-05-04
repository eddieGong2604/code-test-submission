"use client";

import Image from "next/image";

import { APP_STRINGS } from "@/constants/app-strings";
import type { Book } from "@/lib/books";
import { formatPriceForDisplay } from "@/lib/format-currency";
import { PrimaryCallToActionButton } from "@/components/ui/primary-call-to-action-button";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import { useToast } from "@/context/toast-context";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const { addBookToShoppingCart } = useShoppingCart();
  const { showToast } = useToast();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-layout hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-50">
        <Image
          src={book.cover}
          alt={`Cover of ${book.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-layout group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold leading-snug text-slate-900">{book.title}</h3>
          <p className="text-sm font-medium text-slate-500">{book.author}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span className="rounded-full bg-slate-100 px-2 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-slate-700">
            {APP_STRINGS.CART_LINE_SKU_PREFIX}: {book.isbn}
          </span>
          <span className="text-base font-bold text-slate-900">
            {formatPriceForDisplay(book.price)}
          </span>
        </div>
        <PrimaryCallToActionButton
          className="mt-auto w-full"
          onClick={() => {
            addBookToShoppingCart(book);
            showToast(APP_STRINGS.ADDED_TO_CART_MESSAGE);
          }}
          aria-label={`${APP_STRINGS.ADD_TO_CART_LABEL}: ${book.title}`}
        >
          {APP_STRINGS.ADD_TO_CART_LABEL}
        </PrimaryCallToActionButton>
      </div>
    </article>
  );
}
