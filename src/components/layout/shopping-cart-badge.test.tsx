import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ShoppingCartBadge } from "@/components/layout/shopping-cart-badge";
import { ShoppingCartProvider } from "@/context/shopping-cart-context";
import { ToastProvider } from "@/context/toast-context";
import { BookCard } from "@/components/ui/book-card";
import type { Book } from "@/lib/books";

const sampleBook: Book = {
  id: 802,
  title: "Badge Book",
  author: "Badge Author",
  price: 9,
  cover: "https://example.com/badge.jpg",
  description: "d",
  isbn: "978-802",
};

describe("ShoppingCartBadge", () => {
  it("reflects the shopping cart item count from context", async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ShoppingCartProvider>
          <ShoppingCartBadge />
          <BookCard book={sampleBook} />
        </ShoppingCartProvider>
      </ToastProvider>,
    );

    expect(screen.getByText("0")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    await waitFor(() => expect(screen.getByText("1")).toBeInTheDocument());
  });
});
