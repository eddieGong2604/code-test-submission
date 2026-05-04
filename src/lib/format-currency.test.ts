import { formatPriceForDisplay } from "@/lib/format-currency";

describe("formatPriceForDisplay", () => {
  it("formats currency for shoppers in USD", () => {
    expect(formatPriceForDisplay(12.5)).toContain("12.50");
  });
});
