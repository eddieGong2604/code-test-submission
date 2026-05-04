import { render, screen } from "@testing-library/react";

import { AppShellLayout } from "@/components/layout/app-shell-layout";
import { APP_STRINGS } from "@/constants/app-strings";
import { ShoppingCartProvider } from "@/context/shopping-cart-context";
import { ToastProvider } from "@/context/toast-context";

describe("AppShellLayout", () => {
  it("renders skip link, navigation, and page content", () => {
    render(
      <ToastProvider>
        <ShoppingCartProvider>
          <AppShellLayout>
            <p>Page body</p>
          </AppShellLayout>
        </ShoppingCartProvider>
      </ToastProvider>,
    );
    expect(screen.getByRole("link", { name: APP_STRINGS.SKIP_TO_MAIN_CONTENT })).toHaveAttribute(
      "href",
      "#main-content",
    );
    expect(screen.getByRole("main")).toHaveTextContent("Page body");
  });
});
