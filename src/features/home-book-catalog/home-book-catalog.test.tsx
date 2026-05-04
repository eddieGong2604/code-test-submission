import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HomeBookCatalog } from "@/features/home-book-catalog/home-book-catalog";
import { APP_STRINGS } from "@/constants/app-strings";
import { ShoppingCartProvider } from "@/context/shopping-cart-context";
import { ToastProvider } from "@/context/toast-context";
import type { Book } from "@/lib/books";

const bookA: Book = {
  id: 901,
  title: "Unique Alpha Title",
  author: "Writer One",
  price: 10,
  cover: "https://example.com/a.jpg",
  description: "Desc",
  isbn: "978-901",
};

const bookB: Book = {
  id: 902,
  title: "Other Book",
  author: "Writer Two",
  price: 11,
  cover: "https://example.com/b.jpg",
  description: "Desc",
  isbn: "978-902",
};

function renderCatalog(
  props: Partial<{ initialCatalogBooks: Book[]; catalogLoadWarning: string | null }> = {},
) {
  return render(
    <ToastProvider>
      <ShoppingCartProvider>
        <HomeBookCatalog
          initialCatalogBooks={props.initialCatalogBooks ?? [bookA, bookB]}
          catalogLoadWarning={props.catalogLoadWarning ?? null}
        />
      </ShoppingCartProvider>
    </ToastProvider>,
  );
}

describe("HomeBookCatalog", () => {
  it("renders the heading and book cards", () => {
    renderCatalog();
    expect(screen.getByRole("heading", { name: APP_STRINGS.HOME_CATALOG_HEADING })).toBeInTheDocument();
    expect(screen.getByText("Unique Alpha Title")).toBeInTheDocument();
    expect(screen.getByText("Other Book")).toBeInTheDocument();
  });

  it("shows a warning banner when catalog load produced a warning", () => {
    const warning = "Temporary catalog issue.";
    renderCatalog({ catalogLoadWarning: warning });
    expect(screen.getByRole("status")).toHaveTextContent(warning);
  });

  it("filters books when the shopper types in the search field", async () => {
    const user = userEvent.setup();
    renderCatalog();
    await user.type(screen.getByRole("searchbox"), "Unique Alpha");
    expect(screen.getByText("Unique Alpha Title")).toBeInTheDocument();
    expect(screen.queryByText("Other Book")).not.toBeInTheDocument();
  });

  it("shows an empty state when no books match the search", async () => {
    const user = userEvent.setup();
    renderCatalog();
    await user.type(screen.getByRole("searchbox"), "zzzz-no-match");
    expect(screen.getByText(/no books match your search/i)).toBeInTheDocument();
  });
});
