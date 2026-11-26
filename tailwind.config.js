/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        haven: {
          canvas: "#f6fbf5",
          surface: "#ffffff",
          muted: "#f0f5f0",
          border: "#e1e9e1",
          ink: "#181d1a",
          mutedInk: "#59413a",
          primary: "#a93102",
          primaryHover: "#cc491d",
          green: "#2c694e",
          greenLight: "#aeeecb",
          gold: "#f4a261",
        },
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        display: ["Epilogue", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px -2px rgba(31, 36, 33, 0.04), 0 6px 16px -4px rgba(228, 90, 45, 0.06)",
        warm: "0 12px 28px -6px rgba(228, 90, 45, 0.12)",
      },
    },
  },
  plugins: [],
}

