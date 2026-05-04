import { render, screen, waitFor } from "@testing-library/react";

import { ShoppingCartProvider } from "@/context/shopping-cart-context";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import { SHOPPING_CART_LOCAL_STORAGE_KEY } from "@/constants/storage-keys";
import type { Book } from "@/lib/books";

const sampleBook: Book = {
  id: 601,
  title: "Storage Book",
  author: "Storage Author",
  price: 5,
  cover: "https://example.com/s.jpg",
  description: "d",
  isbn: "978-601",
};

function ItemCount() {
  const { shoppingCartItemCount } = useShoppingCart();
  return <span data-testid="item-count">{shoppingCartItemCount}</span>;
}

describe("ShoppingCartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts from zero when storage is empty", async () => {
    render(
      <ShoppingCartProvider>
        <ItemCount />
      </ShoppingCartProvider>,
    );
    await waitFor(() => expect(screen.getByTestId("item-count")).toHaveTextContent("0"));
  });

  it("hydrates lines from localStorage", async () => {
    localStorage.setItem(
      SHOPPING_CART_LOCAL_STORAGE_KEY,
      JSON.stringify([{ book: sampleBook, quantity: 4 }]),
    );
    render(
      <ShoppingCartProvider>
        <ItemCount />
      </ShoppingCartProvider>,
    );
    await waitFor(() => expect(screen.getByTestId("item-count")).toHaveTextContent("4"));
  });

  it("treats corrupt storage as an empty cart", async () => {
    localStorage.setItem(SHOPPING_CART_LOCAL_STORAGE_KEY, "not-json");
    render(
      <ShoppingCartProvider>
        <ItemCount />
      </ShoppingCartProvider>,
    );
    await waitFor(() => expect(screen.getByTestId("item-count")).toHaveTextContent("0"));
  });

  it("drops lines that are missing required fields", async () => {
    localStorage.setItem(
      SHOPPING_CART_LOCAL_STORAGE_KEY,
      JSON.stringify([{ book: { title: "x" }, quantity: 1 }]),
    );
    render(
      <ShoppingCartProvider>
        <ItemCount />
      </ShoppingCartProvider>,
    );
    await waitFor(() => expect(screen.getByTestId("item-count")).toHaveTextContent("0"));
  });
});
