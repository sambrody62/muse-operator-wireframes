/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sketch': ['"Kalam"', '"Comic Sans MS"', 'cursive'],
        'mono': ['"Courier New"', 'monospace']
      },
      animation: {
        'draw': 'draw 0.5s ease-in-out'
      },
      keyframes: {
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' }
        }
      }
    },
  },
  plugins: [],
}