/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        green: '#00FF41',
        amber: '#EF9F27',
        blue: '#5aabf5',
        purple: '#a88bfa',
        grey: '#888888',
        card1: '#0f0f0f',
        card2: '#161616',
        border: '#1e1e1e',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'cursive'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
