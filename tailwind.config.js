/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'memorial-green': '#6b705c',
        'memorial-beige': '#f4f1ea',
        'memorial-border': '#a5a58d',
      },
    },
  },
  plugins: [],
}