/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        accent: '#d4af37',
        merugreen: '#198754',
      },
    },
  },
  plugins: [],
}
