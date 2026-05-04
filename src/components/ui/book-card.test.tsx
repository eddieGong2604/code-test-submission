import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BookCard } from "@/components/ui/book-card";
import { APP_STRINGS } from "@/constants/app-strings";
import { ShoppingCartProvider } from "@/context/shopping-cart-context";
import { ToastProvider } from "@/context/toast-context";
import { useShoppingCart } from "@/hooks/use-shopping-cart";
import type { Book } from "@/lib/books";

const sampleBook: Book = {
  id: 501,
  title: "Visible Title",
  author: "Visible Author",
  price: 20,
  cover: "https://example.com/cover.jpg",
  description: "Description",
  isbn: "978-1234567890",
};

function ShoppingCartItemCountProbe() {
  const { shoppingCartItemCount } = useShoppingCart();
  return <span data-testid="shopping-cart-item-count">{shoppingCartItemCount}</span>;
}

function renderBookCardWithShoppingCart() {
  return render(
    <ToastProvider>
      <ShoppingCartProvider>
        <ShoppingCartItemCountProbe />
        <BookCard book={sampleBook} />
      </ShoppingCartProvider>
    </ToastProvider>,
  );
}

describe("BookCard", () => {
  it("renders the book title and author for shoppers", () => {
    renderBookCardWithShoppingCart();
    expect(screen.getByText("Visible Title")).toBeInTheDocument();
    expect(screen.getByText("Visible Author")).toBeInTheDocument();
  });

  it("adds the book to the shopping cart when the call-to-action is pressed", async () => {
    const user = userEvent.setup();
    renderBookCardWithShoppingCart();
    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(screen.getByTestId("shopping-cart-item-count")).toHaveTextContent("1");
    expect(screen.getByRole("status")).toHaveTextContent(APP_STRINGS.ADDED_TO_CART_MESSAGE);
  });
});
