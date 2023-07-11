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
        'primary': '#4096ff'
      },
      backgroundImage: {
        'login': 'url(/WaveLine.svg)',
      },
      spacing: {
        '24': '24px',
        "40": "40px",
        "80": "80px",
        '150': '150px',
        '500': '500px',
        '1024': '1024px'
      },
      fontSize: {
        '20': '20px'
      },
      minWidth: {
        '700': '700px'
      }
    },
  },
  plugins: [],

}
