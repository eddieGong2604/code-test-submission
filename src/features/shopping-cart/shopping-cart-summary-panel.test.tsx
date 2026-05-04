import { render, screen } from "@testing-library/react";

import { ShoppingCartSummaryPanel } from "@/features/shopping-cart/shopping-cart-summary-panel";
import { APP_STRINGS } from "@/constants/app-strings";

describe("ShoppingCartSummaryPanel", () => {
  it("displays the formatted grand total", () => {
    render(<ShoppingCartSummaryPanel shoppingCartGrandTotal={42.5} />);
    expect(screen.getByText(APP_STRINGS.CART_TOTAL_LABEL)).toBeInTheDocument();
    expect(screen.getByText("$42.50")).toBeInTheDocument();
  });
});
