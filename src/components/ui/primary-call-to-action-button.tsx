import type { ButtonHTMLAttributes, ReactNode } from "react";

type PrimaryCallToActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  /** `outline` = light surface + dark label (e.g. Remove on a white card). */
  variant?: "primary" | "outline";
};

const sharedLayout =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition duration-layout hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantClassName: Record<NonNullable<PrimaryCallToActionButtonProps["variant"]>, string> = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:outline-slate-900 disabled:hover:translate-y-0",
  outline:
    "border border-slate-200 bg-white text-slate-900 ring-1 ring-slate-200/80 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-slate-900 disabled:hover:translate-y-0",
};

export function PrimaryCallToActionButton({
  children,
  className = "",
  type = "button",
  variant = "primary",
  ...rest
}: PrimaryCallToActionButtonProps) {
  return (
    <button
      type={type}
      className={`${sharedLayout} ${variantClassName[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
