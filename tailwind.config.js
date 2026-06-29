/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand
        navy: {
          DEFAULT: "#0B2E59",
          50: "#EAF1FA",
          100: "#D2E0F3",
          200: "#A5C1E6",
          300: "#78A2D9",
          400: "#4B83CC",
          500: "#1E5AA8",
          600: "#184A88",
          700: "#123A6E",
          800: "#0B2E59",
          900: "#071E3D",
        },
        accent: {
          orange: "#F97316",
          red: "#DC2626",
          green: "#16A34A",
          amber: "#F59E0B",
        },
        surface: {
          main: "#F5F7FA",
          panel: "#FFFFFF",
          section: "#EEF2F7",
          border: "#D9E2EC",
        },
        ink: {
          DEFAULT: "#0B2E59",
          muted: "#64748B",
          subtle: "#94A3B8",
        },
      },
      fontFamily: {
        sans: ["Inter", "IBM Plex Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(11,46,89,0.04), 0 4px 12px rgba(11,46,89,0.05)",
        "soft-md": "0 2px 4px rgba(11,46,89,0.05), 0 8px 24px rgba(11,46,89,0.07)",
        "soft-lg": "0 4px 8px rgba(11,46,89,0.06), 0 16px 40px rgba(11,46,89,0.10)",
        "inner-soft": "inset 0 1px 2px rgba(11,46,89,0.06)",
        glow: "0 0 0 4px rgba(30,90,168,0.10)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
        "float-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        "float-soft": "float-soft 5s ease-in-out infinite",
        "draw-line": "draw-line 1.6s ease-out forwards",
        "shimmer": "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};
