import { MAX_SHOPPING_CART_LINE_QUANTITY } from "@/constants/limits";
import type { Book } from "@/lib/books";
import {
  addBookToShoppingCartLines,
  computeShoppingCartGrandTotal,
  computeShoppingCartTotalItemCount,
  removeShoppingCartLineByBookId,
  setShoppingCartLineQuantity,
  type ShoppingCartLineModel,
} from "@/lib/shopping-cart-helpers";

const sampleBook: Book = {
  id: 101,
  title: "Sample Title",
  author: "Sample Author",
  price: 11.25,
  cover: "https://example.com/cover.jpg",
  description: "Sample description",
  isbn: "978-0000000001",
};

describe("shopping cart helper functions", () => {
  it("adds a new shopping cart line when the book is not present", () => {
    const shoppingCartLines: ShoppingCartLineModel[] = [];
    const nextLines = addBookToShoppingCartLines(shoppingCartLines, sampleBook);
    expect(nextLines).toEqual([{ book: sampleBook, quantity: 1 }]);
  });

  it("increments quantity when the book already exists in the shopping cart", () => {
    const shoppingCartLines: ShoppingCartLineModel[] = [{ book: sampleBook, quantity: 2 }];
    const nextLines = addBookToShoppingCartLines(shoppingCartLines, sampleBook);
    expect(nextLines[0]?.quantity).toBe(3);

    const maxedLines: ShoppingCartLineModel[] = [
      { book: sampleBook, quantity: MAX_SHOPPING_CART_LINE_QUANTITY },
    ];
    const cappedLines = addBookToShoppingCartLines(maxedLines, sampleBook);
    expect(cappedLines[0]?.quantity).toBe(MAX_SHOPPING_CART_LINE_QUANTITY);
  });

  it("removes a shopping cart line by book id", () => {
    const shoppingCartLines: ShoppingCartLineModel[] = [{ book: sampleBook, quantity: 1 }];
    const nextLines = removeShoppingCartLineByBookId(shoppingCartLines, sampleBook.id);
    expect(nextLines).toEqual([]);
  });

  it("drops a line when quantity is set below one", () => {
    const shoppingCartLines: ShoppingCartLineModel[] = [{ book: sampleBook, quantity: 2 }];
    const nextLines = setShoppingCartLineQuantity(shoppingCartLines, sampleBook.id, 0);
    expect(nextLines).toEqual([]);
  });

  it("computes the shopping cart grand total across quantities", () => {
    const shoppingCartLines: ShoppingCartLineModel[] = [
      { book: { ...sampleBook, id: 1, price: 10 }, quantity: 2 },
      { book: { ...sampleBook, id: 2, price: 5 }, quantity: 1 },
    ];
    expect(computeShoppingCartGrandTotal(shoppingCartLines)).toBe(25);
  });

  it("computes total item count across lines", () => {
    const shoppingCartLines: ShoppingCartLineModel[] = [
      { book: sampleBook, quantity: 2 },
      { book: { ...sampleBook, id: 2 }, quantity: 3 },
    ];
    expect(computeShoppingCartTotalItemCount(shoppingCartLines)).toBe(5);

    const cappedLines = setShoppingCartLineQuantity(
      [{ book: sampleBook, quantity: 2 }],
      sampleBook.id,
      MAX_SHOPPING_CART_LINE_QUANTITY + 50,
    );
    expect(cappedLines[0]?.quantity).toBe(MAX_SHOPPING_CART_LINE_QUANTITY);
  });
});
