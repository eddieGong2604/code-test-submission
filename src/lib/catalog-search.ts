import type { Book } from "@/lib/books";

export function filterBooksBySearchQuery(
  catalogBooks: Book[],
  searchQuery: string,
): Book[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  if (!normalizedQuery) {
    return catalogBooks;
  }
  return catalogBooks.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(normalizedQuery);
    const authorMatch = book.author.toLowerCase().includes(normalizedQuery);
    return titleMatch || authorMatch;
  });
}
