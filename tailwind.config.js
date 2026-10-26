/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#06f7be',
          green: '#149674',
          dark: '#242a36',
          blue: '#3f6299',
        }
      }
    }
  }
}