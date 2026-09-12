import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF6",
        "paper-dark": "#030712",
        ink: {
          900: "#0B1830",
          800: "#132038",
          700: "#1C3A5E",
          600: "#2C4E76",
          500: "#4A6B93",
          400: "#7C93B0",
          300: "#AFC0D6",
          200: "#D7E0EC",
          100: "#EEF2F7"
        },
        amber: {
          700: "#8A5A17",
          600: "#A9711F",
          500: "#C08A2E",
          400: "#D6A65A",
          300: "#E6C388",
          200: "#F1DEB6",
          100: "#FAF1DF"
        },
        line: {
          DEFAULT: "#DDE3EC",
          dark: "#24344F"
        },
        bio: {
          cyan: "#06B6D4",
          emerald: "#10B981",
          violet: "#8B5CF6",
          blue: "#3B82F6",
          glow: "#22D3EE"
        }
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(6, 182, 212, 0.25)",
        "glow-lg": "0 0 35px -5px rgba(16, 185, 129, 0.3)",
        "glow-amber": "0 0 25px -5px rgba(192, 138, 46, 0.3)"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      maxWidth: {
        prose: "72ch",
        content: "1200px"
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(to right, rgba(28,58,94,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,58,94,0.06) 1px, transparent 1px)",
        "grid-lines-dark":
          "linear-gradient(to right, rgba(34,211,238,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.04) 1px, transparent 1px)"
      },
      backgroundSize: {
        grid: "36px 36px"
      }
    }
  },
  plugins: []
};

export default config;
