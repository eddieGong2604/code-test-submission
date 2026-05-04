import type { ReactNode } from "react";

import { SiteHeaderNavigation } from "@/components/layout/site-header-navigation";
import { APP_STRINGS } from "@/constants/app-strings";

type AppShellLayoutProps = {
  children: ReactNode;
};

export function AppShellLayout({ children }: AppShellLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <a
        href="#main-content"
        className="skip-to-main"
      >
        {APP_STRINGS.SKIP_TO_MAIN_CONTENT}
      </a>
      <SiteHeaderNavigation />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl px-page-x py-section-y outline-none"
      >
        {children}
      </main>
    </div>
  );
}
