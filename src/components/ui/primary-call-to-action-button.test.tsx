import { render, screen } from "@testing-library/react";

import { PrimaryCallToActionButton } from "@/components/ui/primary-call-to-action-button";

describe("PrimaryCallToActionButton", () => {
  it("renders a button with the default type", () => {
    render(<PrimaryCallToActionButton>Click me</PrimaryCallToActionButton>);
    expect(screen.getByRole("button", { name: /click me/i })).toHaveAttribute("type", "button");
  });

  it("honors an explicit submit type for forms", () => {
    render(<PrimaryCallToActionButton type="submit">Send</PrimaryCallToActionButton>);
    expect(screen.getByRole("button", { name: /send/i })).toHaveAttribute("type", "submit");
  });

  it("supports an outline variant with a light surface", () => {
    render(<PrimaryCallToActionButton variant="outline">Secondary</PrimaryCallToActionButton>);
    const button = screen.getByRole("button", { name: /secondary/i });
    expect(button.className).toContain("bg-white");
    expect(button.className).toContain("text-slate-900");
  });
});
