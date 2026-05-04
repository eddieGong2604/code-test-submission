import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ShoppingCartLineItem } from "@/features/shopping-cart/shopping-cart-line-item";
import type { Book } from "@/lib/books";
import type { ShoppingCartLineModel } from "@/lib/shopping-cart-helpers";

const sampleBook: Book = {
  id: 901,
  title: "Line Item Book",
  author: "Line Item Author",
  price: 8,
  cover: "https://example.com/cover.jpg",
  description: "d",
  isbn: "978-9999999999",
};

const shoppingCartLine: ShoppingCartLineModel = { book: sampleBook, quantity: 2 };

describe("ShoppingCartLineItem", () => {
  it("invokes remove handler when the shopper removes a line", async () => {
    const user = userEvent.setup();
    const onRemoveLine = jest.fn();
    const onChangeQuantity = jest.fn();

    render(
      <ul>
        <ShoppingCartLineItem
          shoppingCartLine={shoppingCartLine}
          onRemoveLine={onRemoveLine}
          onChangeQuantity={onChangeQuantity}
        />
      </ul>,
    );

    await user.click(screen.getByRole("button", { name: /remove/i }));
    expect(onRemoveLine).toHaveBeenCalledWith(sampleBook.id);
  });

  it("requests a lower quantity when decrease is pressed", async () => {
    const user = userEvent.setup();
    const onChangeQuantity = jest.fn();
    render(
      <ul>
        <ShoppingCartLineItem
          shoppingCartLine={shoppingCartLine}
          onRemoveLine={jest.fn()}
          onChangeQuantity={onChangeQuantity}
        />
      </ul>,
    );
    await user.click(screen.getByRole("button", { name: /decrease quantity/i }));
    expect(onChangeQuantity).toHaveBeenCalledWith(sampleBook.id, 1);
  });

  it("requests a higher quantity when increase is pressed", async () => {
    const user = userEvent.setup();
    const onChangeQuantity = jest.fn();
    render(
      <ul>
        <ShoppingCartLineItem
          shoppingCartLine={shoppingCartLine}
          onRemoveLine={jest.fn()}
          onChangeQuantity={onChangeQuantity}
        />
      </ul>,
    );
    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(onChangeQuantity).toHaveBeenCalledWith(sampleBook.id, 3);
  });

  it("disables increase at the maximum line quantity", () => {
    const onChangeQuantity = jest.fn();
    render(
      <ul>
        <ShoppingCartLineItem
          shoppingCartLine={{ book: sampleBook, quantity: 99 }}
          onRemoveLine={jest.fn()}
          onChangeQuantity={onChangeQuantity}
        />
      </ul>,
    );
    expect(screen.getByRole("button", { name: /increase quantity/i })).toBeDisabled();
  });
});
