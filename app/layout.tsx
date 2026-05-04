import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { AppShellLayout } from "@/components/layout/app-shell-layout";
import { GlobalErrorBoundary } from "@/components/layout/global-error-boundary";
import { ShoppingCartProvider } from "@/context/shopping-cart-context";
import { ToastProvider } from "@/context/toast-context";
import { APP_STRINGS } from "@/constants/app-strings";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${APP_STRINGS.SITE_NAME} · ${APP_STRINGS.SITE_TAGLINE}`,
  description: APP_STRINGS.HOME_CATALOG_SUBTITLE,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ToastProvider>
          <ShoppingCartProvider>
            <AppShellLayout>
              <GlobalErrorBoundary>{children}</GlobalErrorBoundary>
            </AppShellLayout>
          </ShoppingCartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
