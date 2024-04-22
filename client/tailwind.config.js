import { Theme } from "./src/classes/Theme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[class*="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: (new Theme()).getColors()
    },
  },
  plugins: [],
}