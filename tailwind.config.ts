import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        base: {
          0: "#FFFFFF",
          100: "#AAAAB2",
          200: "#95959F",
          300: "#797985",
          400: "#202027",
          500: "#0E0E11",
        },
      },
      fontFamily: { sans: ["var(--font-sans)", ...fontFamily.sans] },

      screens: {
        xs: "360px",
        sm: "480px",
        xmd: "640px",
        md: "768px",
        lg: "992px",
        xl: "1140px",
        "2xl": "1440px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        "schedule-btn":
          "0px 1px 2px 0px rgba(0, 0, 0, 0.32), 0px 0px 12px 0px rgba(255, 255, 255, 0.05) inset",
      },
      backgroundImage: {
        "gradient-180":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.08) 100%) ",
        "gradient-service-card":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.01) 0%, rgba(255, 255, 255, 0.04) 100%)",

        "gradient-service-tag":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
      },
    },
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
