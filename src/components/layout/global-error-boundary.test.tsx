import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { GlobalErrorBoundary } from "@/components/layout/global-error-boundary";
import { APP_STRINGS } from "@/constants/app-strings";

function Bomb({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error("render failure");
  }
  return <p>Healthy child</p>;
}

describe("GlobalErrorBoundary", () => {
  it("renders children when no error occurs", () => {
    render(
      <GlobalErrorBoundary>
        <Bomb shouldThrow={false} />
      </GlobalErrorBoundary>,
    );
    expect(screen.getByText("Healthy child")).toBeInTheDocument();
  });

  it("renders a recovery panel after a child throws", async () => {
    const user = userEvent.setup();
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    const assign = jest.fn();
    Object.defineProperty(window, "location", {
      value: { assign },
      writable: true,
      configurable: true,
    });

    render(
      <GlobalErrorBoundary>
        <Bomb shouldThrow />
      </GlobalErrorBoundary>,
    );

    expect(screen.getByText(APP_STRINGS.SITE_NAME)).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /return home/i }));
    expect(assign).toHaveBeenCalledWith("/");

    consoleError.mockRestore();
  });
});
