/** @type {import('tailwindcss').Config} */
module.exports = {
  important: "#app",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      '12' : '12px',
      '13' : '13px',
      '14' : '14px',
      '16': '16px',
      '17': '17px',
      '18': '18px'
    },
    extend: {},
  },
  plugins: []
}
