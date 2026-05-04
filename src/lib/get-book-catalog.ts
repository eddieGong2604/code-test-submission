import "server-only";

import { books, type Book } from "@/lib/books";
import { APP_STRINGS } from "@/constants/app-strings";
import { createServerSupabaseClient } from "@/lib/supabase/server-client";
import { parseBooksFromSupabaseRows } from "@/lib/validate-book";

export type BookCatalogLoadResult = {
  catalogBooks: Book[];
  catalogLoadWarning: string | null;
};

export async function getBookCatalogForHomePage(): Promise<BookCatalogLoadResult> {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return { catalogBooks: books, catalogLoadWarning: null };
  }

  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return {
      catalogBooks: books,
      catalogLoadWarning: APP_STRINGS.CATALOG_SUPABASE_QUERY_FAILED,
    };
  }

  const catalogBooksFromDatabase = parseBooksFromSupabaseRows(data ?? []);

  if (!catalogBooksFromDatabase.length) {
    return {
      catalogBooks: books,
      catalogLoadWarning: APP_STRINGS.CATALOG_SUPABASE_EMPTY_FALLBACK,
    };
  }

  return {
    catalogBooks: catalogBooksFromDatabase,
    catalogLoadWarning: null,
  };
}
