import type { Metadata } from "next";

import { APP_STRINGS } from "@/constants/app-strings";

export const metadata: Metadata = {
  title: `${APP_STRINGS.CART_PAGE_HEADING} · ${APP_STRINGS.SITE_NAME}`,
  description: APP_STRINGS.CART_PAGE_SUBTITLE,
};

export default function ShoppingCartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
