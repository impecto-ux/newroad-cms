/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070707', // Darker background from observation
        primary: {
          DEFAULT: 'hsl(115.33, 68.18%, 74.12%)', // Extracted from CSS
          light: 'hsl(12, 85%, 64%)',
        },
        accent: {
          DEFAULT: 'hsl(342, 89%, 48%)',
        },
        'bg-dark': '#0a0a0a',
        'bg-darker': '#040404',
      },
      fontFamily: {
        sans: ['"Neue Montreal"', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        scrolldown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      animation: {
        scrolldown: 'scrolldown 2s cubic-bezier(0.77, 0, 0.175, 1) infinite',
      }
    },
  },
  plugins: [],
}
