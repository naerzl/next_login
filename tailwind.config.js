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
        'primary': '#4096ff',
        'railway_gray': "#8697A8"
      },
      backgroundImage: {
        'login': 'url(/WaveLine.svg)',
      },
      spacing: {
        '150': '9.375rem',
        '161': '40.25rem',
      },
    },
  },
  plugins: [],

}
