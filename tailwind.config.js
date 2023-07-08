/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'railway_blue': '#0162B1',
      },
      backgroundImage: {
        'login': 'url(/WaveLine.svg)',
      },
      spacing: {
        '500': '500px'
      }
    },
  },
  plugins: [],
}
