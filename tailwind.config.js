/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 1.5s infinite',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        slideDown: {
          'from': { transform: 'translate(-50%, -100%)' },
          'to': { transform: 'translate(-50%, 0)' },
        }
      },
      colors: {
        black: '#1a1a1a',
        blue: '#2196F3',
        white: '#ffffff',
        gray: '#a0a0a0',
        'gray-light': '#e6e6e6',
        skin: '#ffdbac',
        'gray-light-2': '#dcdcdc'
      }
    },
  },
  plugins: [],
}

