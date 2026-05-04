import { render } from "@testing-library/react";

import { useShoppingCart } from "@/hooks/use-shopping-cart";

function Consumer() {
  useShoppingCart();
  return null;
}

describe("useShoppingCart", () => {
  it("throws when rendered outside ShoppingCartProvider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow(/useShoppingCart must be used within ShoppingCartProvider/);
    consoleError.mockRestore();
  });
});
