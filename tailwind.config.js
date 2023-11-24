const defaultTheme = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */

module.exports = {
  important: "#_next",
  // important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        railway_blue: "#0162B1",
        primary: "#4096ff",
        railway_gray: "#8697A8",
        railway_error: "#d32f2f",
      },
      backgroundImage: {
        login: "url(/WaveLine.svg)",
      },
      spacing: {
        150: "9.375rem",
        161: "40.25rem",
      },
      screens: {
        phone: {
          max: "750px",
        },
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
}
