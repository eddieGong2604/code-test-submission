import { MAX_SHOPPING_CART_LINE_QUANTITY } from "@/constants/limits";
import type { Book } from "@/lib/books";

export type ShoppingCartLineModel = {
  book: Book;
  quantity: number;
};

function clampLineQuantity(quantity: number): number {
  return Math.min(Math.max(quantity, 0), MAX_SHOPPING_CART_LINE_QUANTITY);
}

export function addBookToShoppingCartLines(
  shoppingCartLines: ShoppingCartLineModel[],
  book: Book,
): ShoppingCartLineModel[] {
  const existingLine = shoppingCartLines.find((line) => line.book.id === book.id);
  if (!existingLine) {
    return [...shoppingCartLines, { book, quantity: 1 }];
  }
  return shoppingCartLines.map((line) =>
    line.book.id === book.id
      ? { ...line, quantity: clampLineQuantity(line.quantity + 1) }
      : line,
  );
}

export function removeShoppingCartLineByBookId(
  shoppingCartLines: ShoppingCartLineModel[],
  bookId: number,
): ShoppingCartLineModel[] {
  return shoppingCartLines.filter((line) => line.book.id !== bookId);
}

export function setShoppingCartLineQuantity(
  shoppingCartLines: ShoppingCartLineModel[],
  bookId: number,
  nextQuantity: number,
): ShoppingCartLineModel[] {
  if (nextQuantity < 1) {
    return removeShoppingCartLineByBookId(shoppingCartLines, bookId);
  }
  const clampedQuantity = clampLineQuantity(nextQuantity);
  return shoppingCartLines.map((line) =>
    line.book.id === bookId ? { ...line, quantity: clampedQuantity } : line,
  );
}

export function computeShoppingCartGrandTotal(
  shoppingCartLines: ShoppingCartLineModel[],
): number {
  return shoppingCartLines.reduce(
    (total, line) => total + line.book.price * line.quantity,
    0,
  );
}

export function computeShoppingCartTotalItemCount(
  shoppingCartLines: ShoppingCartLineModel[],
): number {
  return shoppingCartLines.reduce((count, line) => count + line.quantity, 0);
}
