"use client";

import { useEffect } from "react";

type RootErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function RootError({ error, reset }: RootErrorProps) {
  useEffect(() => {
    console.error("Route error boundary:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-lg space-y-4 rounded-2xl border border-rose-200 bg-rose-50 p-8 text-rose-900 shadow-sm">
      <h2 className="text-xl font-bold">We hit a snag</h2>
      <p className="text-sm leading-relaxed">
        The page could not be rendered. This is usually temporary. You can try again or head back
        home.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-rose-900 ring-1 ring-rose-200 transition hover:bg-rose-100"
        >
          Try again
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.href = "/";
          }}
          className="rounded-full bg-rose-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-800"
        >
          Go home
        </button>
      </div>
    </div>
  );
}
