import type { Book } from "@/lib/books";

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function coercePrice(value: unknown): number | null {
  if (isFiniteNumber(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

export function parseBookFromUnknownRow(row: unknown): Book | null {
  if (!row || typeof row !== "object") {
    return null;
  }

  const record = row as Record<string, unknown>;
  const id = record.id;
  const title = record.title;
  const author = record.author;
  const cover = record.cover;
  const description = record.description;
  const isbn = record.isbn;
  const price = coercePrice(record.price);

  if (typeof id !== "number" || !Number.isInteger(id)) {
    return null;
  }
  if (!isNonEmptyString(title) || !isNonEmptyString(author)) {
    return null;
  }
  if (!isNonEmptyString(cover) || !isNonEmptyString(description) || !isNonEmptyString(isbn)) {
    return null;
  }
  if (price === null) {
    return null;
  }

  return {
    id,
    title,
    author,
    price,
    cover,
    description,
    isbn,
  };
}

export function parseBooksFromSupabaseRows(rows: unknown): Book[] {
  if (!Array.isArray(rows)) {
    return [];
  }
  return rows
    .map((row) => parseBookFromUnknownRow(row))
    .filter((book): book is Book => Boolean(book));
}
