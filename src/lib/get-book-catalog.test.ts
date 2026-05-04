import { createClient } from "@supabase/supabase-js";

import { APP_STRINGS } from "@/constants/app-strings";
import { books } from "@/lib/books";
import { getBookCatalogForHomePage } from "@/lib/get-book-catalog";

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

function supabaseClientReturning(resolution: { data: unknown; error: unknown }) {
  return {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        order: jest.fn(() => Promise.resolve(resolution)),
      })),
    })),
  };
}

const validDbRow = {
  id: 501,
  title: "DB Title",
  author: "DB Author",
  price: 8,
  cover: "https://example.com/db.jpg",
  description: "From the database.",
  isbn: "978-1111111111",
};

describe("getBookCatalogForHomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  });

  it("returns bundled books when Supabase env vars are missing", async () => {
    const result = await getBookCatalogForHomePage();
    expect(result.catalogBooks).toEqual(books);
    expect(result.catalogLoadWarning).toBeNull();
    expect(createClient).not.toHaveBeenCalled();
  });

  it("falls back with a warning when the query errors", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
    jest
      .mocked(createClient)
      .mockReturnValue(supabaseClientReturning({ data: null, error: { message: "network" } }) as never);

    const result = await getBookCatalogForHomePage();
    expect(result.catalogBooks).toEqual(books);
    expect(result.catalogLoadWarning).toBe(APP_STRINGS.CATALOG_SUPABASE_QUERY_FAILED);
  });

  it("falls back with a warning when no valid rows are returned", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
    jest.mocked(createClient).mockReturnValue(supabaseClientReturning({ data: [], error: null }) as never);

    const result = await getBookCatalogForHomePage();
    expect(result.catalogBooks).toEqual(books);
    expect(result.catalogLoadWarning).toBe(APP_STRINGS.CATALOG_SUPABASE_EMPTY_FALLBACK);
  });

  it("falls back when every row fails validation", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
    jest
      .mocked(createClient)
      .mockReturnValue(supabaseClientReturning({ data: [{ broken: true }], error: null }) as never);

    const result = await getBookCatalogForHomePage();
    expect(result.catalogBooks).toEqual(books);
    expect(result.catalogLoadWarning).toBe(APP_STRINGS.CATALOG_SUPABASE_EMPTY_FALLBACK);
  });

  it("returns database books when the query succeeds", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://project.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
    jest.mocked(createClient).mockReturnValue(supabaseClientReturning({ data: [validDbRow], error: null }) as never);

    const result = await getBookCatalogForHomePage();
    expect(result.catalogBooks).toEqual([expect.objectContaining({ id: 501, title: "DB Title" })]);
    expect(result.catalogLoadWarning).toBeNull();
  });
});
