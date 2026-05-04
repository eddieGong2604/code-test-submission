import { APP_STRINGS } from "@/constants/app-strings";
import { formatPriceForDisplay } from "@/lib/format-currency";

type ShoppingCartSummaryPanelProps = {
  shoppingCartGrandTotal: number;
};

export function ShoppingCartSummaryPanel({
  shoppingCartGrandTotal,
}: ShoppingCartSummaryPanelProps) {
  return (
    <aside className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-inner">
      <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
        <span>{APP_STRINGS.CART_TOTAL_LABEL}</span>
        <span className="text-2xl font-bold text-slate-900">
          {formatPriceForDisplay(shoppingCartGrandTotal)}
        </span>
      </div>
    </aside>
  );
}
