import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          bg: "#050505",
          alt: "#111111",
          card: "#181818",
          border: "#2A2A2A",
          text: "#F5F5F5",
          muted: "#A3A3A3",
          red: "#C1121F",
          gold: "#D4AF37",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      animation: {
        "spin-slow": "spin 14s linear infinite",
        "noir-drift": "noir-drift 18s ease-in-out infinite alternate",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        marquee: "marquee 60s linear infinite",
        "bg-drift-x": "bg-drift-x 28s ease-in-out infinite alternate",
        "bg-drift-y": "bg-drift-y 36s ease-in-out infinite alternate",
      },
      keyframes: {
        "noir-drift": {
          "0%": { transform: "translate3d(-2%, 0, 0) scale(1)" },
          "100%": { transform: "translate3d(2%, 0, 0) scale(1.05)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.85" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "bg-drift-x": {
          "0%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "100%": { transform: "translate3d(20vw, 6vh, 0) scale(1.08)" },
        },
        "bg-drift-y": {
          "0%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "100%": { transform: "translate3d(-15vw, -8vh, 0) scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
