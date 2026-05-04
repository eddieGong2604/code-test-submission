import { render, screen } from "@testing-library/react";

import { BookGridSkeleton } from "@/components/ui/book-grid-skeleton";

describe("BookGridSkeleton", () => {
  it("exposes a busy grid for assistive technologies", () => {
    render(<BookGridSkeleton />);
    const region = screen.getByLabelText("Loading books");
    expect(region).toHaveAttribute("aria-busy", "true");
  });
});
