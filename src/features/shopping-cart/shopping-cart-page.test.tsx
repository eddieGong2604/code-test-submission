import { render, screen } from "@testing-library/react";

import { ShoppingCartPage } from "@/features/shopping-cart/shopping-cart-page";
import { APP_STRINGS } from "@/constants/app-strings";
import { ShoppingCartProvider } from "@/context/shopping-cart-context";
import { ToastProvider } from "@/context/toast-context";
import type { Book } from "@/lib/books";
import { SHOPPING_CART_LOCAL_STORAGE_KEY } from "@/constants/storage-keys";

const sampleBook: Book = {
  id: 701,
  title: "Cart Page Book",
  author: "Cart Author",
  price: 14,
  cover: "https://example.com/cart.jpg",
  description: "D",
  isbn: "978-701",
};

function renderCartPage() {
  return render(
    <ToastProvider>
      <ShoppingCartProvider>
        <ShoppingCartPage />
      </ShoppingCartProvider>
    </ToastProvider>,
  );
}

describe("ShoppingCartPage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("shows the empty state when the cart has no lines", async () => {
    renderCartPage();
    expect(await screen.findByRole("heading", { name: APP_STRINGS.EMPTY_CART_HEADING })).toBeInTheDocument();
  });

  it("lists line items and the summary when the cart has books", async () => {
    localStorage.setItem(
      SHOPPING_CART_LOCAL_STORAGE_KEY,
      JSON.stringify([{ book: sampleBook, quantity: 2 }]),
    );
    renderCartPage();
    expect(await screen.findByText("Cart Page Book")).toBeInTheDocument();
    expect(screen.getByText(APP_STRINGS.CART_TOTAL_LABEL)).toBeInTheDocument();
  });
});
