/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#E6F0FF',
          300: '#99C2FF',
          500: '#007BFF',
          600: '#0056b3',
        },
      },
    },
  },
  plugins: [],
}