import { render, screen } from "@testing-library/react";

import { ShoppingCartEmptyState } from "@/features/shopping-cart/shopping-cart-empty-state";
import { APP_STRINGS } from "@/constants/app-strings";

describe("ShoppingCartEmptyState", () => {
  it("encourages the shopper to continue on the homepage", () => {
    render(<ShoppingCartEmptyState />);
    expect(screen.getByRole("heading", { name: APP_STRINGS.EMPTY_CART_HEADING })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: APP_STRINGS.CONTINUE_SHOPPING_LABEL })).toHaveAttribute("href", "/");
  });
});
