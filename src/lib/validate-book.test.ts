import { parseBookFromUnknownRow, parseBooksFromSupabaseRows } from "@/lib/validate-book";

const validRow = {
  id: 1,
  title: "Title",
  author: "Author",
  price: 12.5,
  cover: "https://example.com/c.jpg",
  description: "A fine read.",
  isbn: "978-0000000000",
};

describe("parseBookFromUnknownRow", () => {
  it("returns a Book when the row is complete and well typed", () => {
    expect(parseBookFromUnknownRow(validRow)).toEqual({
      id: 1,
      title: "Title",
      author: "Author",
      price: 12.5,
      cover: "https://example.com/c.jpg",
      description: "A fine read.",
      isbn: "978-0000000000",
    });
  });

  it("coerces a numeric price from a string", () => {
    expect(parseBookFromUnknownRow({ ...validRow, price: " 19.99 " })?.price).toBe(19.99);
  });

  it("returns null when price string is not numeric", () => {
    expect(parseBookFromUnknownRow({ ...validRow, price: "free" })).toBeNull();
  });

  it("returns null for non-object rows", () => {
    expect(parseBookFromUnknownRow(null)).toBeNull();
    expect(parseBookFromUnknownRow(undefined)).toBeNull();
    expect(parseBookFromUnknownRow("x")).toBeNull();
    expect(parseBookFromUnknownRow(42)).toBeNull();
  });

  it("returns null when id is not an integer", () => {
    expect(parseBookFromUnknownRow({ ...validRow, id: 1.2 })).toBeNull();
    expect(parseBookFromUnknownRow({ ...validRow, id: "1" })).toBeNull();
  });

  it("returns null when strings are empty or whitespace", () => {
    expect(parseBookFromUnknownRow({ ...validRow, title: "  " })).toBeNull();
    expect(parseBookFromUnknownRow({ ...validRow, author: "" })).toBeNull();
    expect(parseBookFromUnknownRow({ ...validRow, cover: "" })).toBeNull();
    expect(parseBookFromUnknownRow({ ...validRow, description: "" })).toBeNull();
    expect(parseBookFromUnknownRow({ ...validRow, isbn: "" })).toBeNull();
  });

  it("returns null when price is missing or not finite", () => {
    expect(parseBookFromUnknownRow({ ...validRow, price: NaN })).toBeNull();
    expect(parseBookFromUnknownRow({ ...validRow, price: Number.POSITIVE_INFINITY })).toBeNull();
    expect(parseBookFromUnknownRow({ ...validRow, price: null })).toBeNull();
  });
});

describe("parseBooksFromSupabaseRows", () => {
  it("returns an empty array when input is not an array", () => {
    expect(parseBooksFromSupabaseRows(null)).toEqual([]);
    expect(parseBooksFromSupabaseRows({})).toEqual([]);
  });

  it("filters out invalid rows and keeps valid ones", () => {
    const result = parseBooksFromSupabaseRows([
      validRow,
      { ...validRow, id: "bad" },
      { ...validRow, id: 2, title: "Second" },
    ]);
    expect(result).toHaveLength(2);
    expect(result.map((b) => b.id)).toEqual([1, 2]);
  });
});
