/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      colors: {
        'apple-black': '#000000',
        'apple-white': 'rgba(255, 255, 255, 0.9)',
      },
      spacing: {
        'section': '120px',
      },
    },
  },
  plugins: [],
}
