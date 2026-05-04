const DEFAULT_LOCALE = "en-US";
const DEFAULT_CURRENCY = "USD";

export function formatPriceForDisplay(amount: number): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency: DEFAULT_CURRENCY,
  }).format(amount);
}
