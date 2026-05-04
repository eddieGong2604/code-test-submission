import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      spacing: {
        "page-x": "var(--spacing-page-x)",
        "section-y": "var(--spacing-section-y)",
        "card-gap": "var(--spacing-card-gap)",
      },
      transitionDuration: {
        layout: "220ms",
      },
    },
  },
  plugins: [],
};

export default config;
