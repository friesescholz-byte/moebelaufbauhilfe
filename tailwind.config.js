/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: {
            50: '#f0f8fa',
            100: '#daf0f5',
            200: '#b6e1ec',
            300: '#84ccdf',
            400: '#4db0cd',
            500: '#0c647b', // Core brand teal from Logo
            600: '#0a5569',
            700: '#074555',
            800: '#053542',
            900: '#03232c',
          },
          amber: {
            50: '#fffbeb',
            100: '#fef3c7',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
          },
          cream: '#fcfaf6',
          dark: '#0a1922',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(12, 100, 123, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'card': '0 20px 40px -15px rgba(10, 25, 34, 0.07)',
        'glow': '0 0 25px rgba(12, 100, 123, 0.35)',
      }
    },
  },
  plugins: [],
}
