import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./types/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        matcha: {
          50: "var(--color-matcha-50)",
          100: "var(--color-matcha-100)",
          300: "var(--color-matcha-300)",
          500: "var(--color-matcha-500)",
          700: "var(--color-matcha-700)"
        },
        peach: {
          100: "var(--color-peach-100)",
          300: "var(--color-peach-300)",
          500: "var(--color-peach-500)"
        },
        foam: "var(--color-foam)",
        oat: "var(--color-oat)",
        cream: "var(--color-cream)",
        ink: "var(--color-ink)"
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)"
      },
      boxShadow: {
        "premium-lg": "0 24px 70px rgba(24, 33, 16, 0.18)",
        "premium-md": "0 12px 36px rgba(24, 33, 16, 0.16)",
        "glow-matcha": "0 0 45px rgba(122, 161, 103, 0.34)"
      },
      backgroundImage: {
        "radial-soft":
          "radial-gradient(circle at 20% 20%, rgba(196, 223, 170, 0.25), transparent 52%), radial-gradient(circle at 80% 0%, rgba(255, 179, 159, 0.24), transparent 55%)",
        halftone:
          "radial-gradient(rgba(24, 33, 16, 0.13) 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.95" }
        }
      },
      animation: {
        float: "float 4.5s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
