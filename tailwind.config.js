/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#081410",
        surface: "#0F1E19",
        "surface-2": "#152A24",
        line: "#1E362F",
        "line-soft": "#152722",
        paper: "#EAF3F0",
        "paper-muted": "#8CA79E",
        "paper-faint": "#547067",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Manrope'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(45,212,191,0.15), 0 12px 40px -12px rgba(45,212,191,0.35)",
        "glow-violet": "0 0 0 1px rgba(167,139,250,0.15), 0 12px 40px -12px rgba(167,139,250,0.35)",
        panel: "0 1px 0 0 rgba(234,243,240,0.04) inset, 0 20px 50px -24px rgba(0,0,0,0.6)",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-2%, 3%)" },
        },
        rise: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        drift: "drift 18s ease-in-out infinite",
        rise: "rise 0.5s ease-out both",
      },
    },
  },
  plugins: [],
}
