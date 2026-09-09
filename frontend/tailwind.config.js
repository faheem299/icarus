/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        icarus: {
          bg: "#0a0a0a",
          fg: "#f5f5f0",
          accent: "#e8a13c",
        },
      },
      fontFamily: {
        display: ["'Helvetica Neue'", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};