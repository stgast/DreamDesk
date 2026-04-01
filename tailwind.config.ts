import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Rubik", "system-ui", "sans-serif"],
        body: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["Reddit Mono", "Courier New", "monospace"],
      },
      colors: {
        dark: {
          bg: "#0a0a0a",
          surface: "#141414",
          card: "#1e1e1e",
          border: "#2a2a2a",
          hover: "#333333",
        },
        accent: {
          DEFAULT: "#2196F3",
          hover: "#42A5F5",
          muted: "rgba(33, 150, 243, 0.15)",
        },
        lime: {
          DEFAULT: "#8BC34A",
          muted: "rgba(139, 195, 74, 0.15)",
        },
        category: {
          mouse: "#64B5F6",
          keyboard: "#CE93D8",
          headphones: "#FFB74D",
          mousepad: "#4DB6AC",
        },
      },
      borderRadius: {
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        glow: "0 0 30px rgba(33, 150, 243, 0.1)",
        "card-hover": "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
