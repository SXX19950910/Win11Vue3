/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      '12' : '12px',
      '13' : '13px',
      '14' : '14px'
    },
    extend: {},
  },
  plugins: []
}
