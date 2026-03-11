import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0a1628",
          800: "#0f1d32",
          700: "#132238",
          600: "#1a2d4a",
        },
        gold: {
          400: "#e8c36a",
          500: "#d4a853",
          600: "#c49a3d",
        },
        forest: {
          600: "#2d5a3d",
          700: "#245032",
        },
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
