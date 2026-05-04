"use client";

import { useMemo, useState } from "react";

import { BookCard } from "@/components/ui/book-card";
import { APP_STRINGS } from "@/constants/app-strings";
import type { Book } from "@/lib/books";
import { filterBooksBySearchQuery } from "@/lib/catalog-search";

type HomeBookCatalogProps = {
  initialCatalogBooks: Book[];
  catalogLoadWarning: string | null;
};

export function HomeBookCatalog({
  initialCatalogBooks,
  catalogLoadWarning,
}: HomeBookCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const visibleBooks = useMemo(
    () => filterBooksBySearchQuery(initialCatalogBooks, searchQuery),
    [initialCatalogBooks, searchQuery],
  );

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {APP_STRINGS.HOME_CATALOG_HEADING}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600">{APP_STRINGS.HOME_CATALOG_SUBTITLE}</p>
        </div>
        {catalogLoadWarning ? (
          <div
            role="status"
            className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          >
            {catalogLoadWarning}
          </div>
        ) : null}
        <label className="block text-sm font-semibold text-slate-700" htmlFor="book-search">
          {APP_STRINGS.SEARCH_PLACEHOLDER}
        </label>
        <input
          id="book-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={APP_STRINGS.SEARCH_PLACEHOLDER}
          className="w-full max-w-md rounded-full border border-slate-200 bg-white px-4 py-2 text-sm shadow-inner transition focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          aria-describedby="book-search-hint"
        />
        <p id="book-search-hint" className="text-xs text-slate-500">
          Bonus: filter the grid by title or author without leaving the page.
        </p>
      </div>

      {visibleBooks.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-600">
          No books match your search. Try a different keyword.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-card-gap sm:grid-cols-2 lg:grid-cols-3">
          {visibleBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
