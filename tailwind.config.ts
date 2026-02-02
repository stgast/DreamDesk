import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0f0f0f",
          surface: "#1a1a1a",
          card: "#242424",
          border: "#2d2d2d",
          hover: "#2d2d2d",
        },
        accent: {
          DEFAULT: "#6366f1",
          hover: "#818cf8",
          muted: "rgba(99, 102, 241, 0.2)",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        inner: "inset 0 1px 2px rgba(255,255,255,0.05)",
        glow: "0 0 20px rgba(99, 102, 241, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
