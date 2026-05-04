"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import { APP_STRINGS } from "@/constants/app-strings";
import { PrimaryCallToActionButton } from "@/components/ui/primary-call-to-action-button";

type GlobalErrorBoundaryProps = {
  children: ReactNode;
};

type GlobalErrorBoundaryState = {
  hasError: boolean;
};

export class GlobalErrorBoundary extends Component<
  GlobalErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): GlobalErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("GlobalErrorBoundary caught an error:", error, errorInfo);
  }

  private handleReset = (): void => {
    this.setState({ hasError: false });
    if (typeof window !== "undefined") {
      window.location.assign("/");
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col gap-4 rounded-2xl border border-rose-200 bg-rose-50 p-8 text-rose-900 shadow-sm transition-opacity duration-layout">
          <h2 className="text-xl font-bold">{APP_STRINGS.SITE_NAME}</h2>
          <p className="text-sm leading-relaxed">
            Something went wrong while rendering this section. You can safely return home and
            continue shopping.
          </p>
          <PrimaryCallToActionButton type="button" onClick={this.handleReset}>
            Return home
          </PrimaryCallToActionButton>
        </div>
      );
    }
    return this.props.children;
  }
}
