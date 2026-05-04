import { filterBooksBySearchQuery } from "@/lib/catalog-search";
import type { Book } from "@/lib/books";

const catalogBooks: Book[] = [
  {
    id: 1,
    title: "Alpha Tales",
    author: "Alex Author",
    price: 10,
    cover: "https://example.com/a.jpg",
    description: "d",
    isbn: "1",
  },
  {
    id: 2,
    title: "Beta Stories",
    author: "Alex Author",
    price: 12,
    cover: "https://example.com/b.jpg",
    description: "d",
    isbn: "2",
  },
];

describe("filterBooksBySearchQuery", () => {
  it("returns the full catalog when the query is empty or whitespace", () => {
    expect(filterBooksBySearchQuery(catalogBooks, "")).toEqual(catalogBooks);
    expect(filterBooksBySearchQuery(catalogBooks, "   ")).toEqual(catalogBooks);
  });

  it("returns only books matching the search query", () => {
    const filteredBooks = filterBooksBySearchQuery(catalogBooks, "beta");
    expect(filteredBooks).toHaveLength(1);
    expect(filteredBooks[0]?.title).toBe("Beta Stories");
  });
});
