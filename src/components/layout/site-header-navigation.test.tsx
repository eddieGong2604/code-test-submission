import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

import { SiteHeaderNavigation } from "@/components/layout/site-header-navigation";
import { APP_STRINGS } from "@/constants/app-strings";
import { ShoppingCartProvider } from "@/context/shopping-cart-context";
import { ToastProvider } from "@/context/toast-context";

function renderHeader() {
  return render(
    <ToastProvider>
      <ShoppingCartProvider>
        <SiteHeaderNavigation />
      </ShoppingCartProvider>
    </ToastProvider>,
  );
}

describe("SiteHeaderNavigation", () => {
  it("marks the home link as current on the homepage", () => {
    jest.mocked(usePathname).mockReturnValue("/");
    renderHeader();
    const homeLink = screen.getByRole("link", { name: /^home$/i });
    expect(homeLink).toHaveAttribute("aria-current", "page");
  });

  it("marks the cart link as current on the cart route", () => {
    jest.mocked(usePathname).mockReturnValue("/cart");
    renderHeader();
    const cartLink = screen.getByRole("link", { name: new RegExp(APP_STRINGS.GO_TO_CART_LABEL, "i") });
    expect(cartLink).toHaveAttribute("aria-current", "page");
  });
});
