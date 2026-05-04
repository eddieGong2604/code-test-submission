import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ToastProvider, useToast } from "@/context/toast-context";

function ToastTrigger({ label }: { label: string }) {
  const { showToast } = useToast();
  return (
    <button type="button" onClick={() => showToast("Hello from toast")}>
      {label}
    </button>
  );
}

describe("ToastProvider", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("shows a toast message when showToast is called", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger label="Notify" />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: /notify/i }));
    expect(screen.getByRole("status")).toHaveTextContent("Hello from toast");
  });

  it("clears the toast after the timeout", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <ToastProvider>
        <ToastTrigger label="Notify" />
      </ToastProvider>,
    );
    await user.click(screen.getByRole("button", { name: /notify/i }));
    expect(screen.getByRole("status")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3500);
    });
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("useToast", () => {
  it("throws when used outside ToastProvider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ToastTrigger label="x" />)).toThrow(/useToast must be used within ToastProvider/);
    consoleError.mockRestore();
  });
});
