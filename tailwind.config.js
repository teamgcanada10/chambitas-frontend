const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#eef2ff',
          '100': '#e0e7ff',
          '200': '#c7d2fe',
          '300': '#a5b4fc',
          '400': '#818cf8',
          '500': '#6366f1',
          '600': '#4f46e5',
          '700': '#4338ca',
          '800': '#3730a3',
          '900': '#312e81',
          '950': '#1e1b4b',
        },
      },
      backgroundImage: {
        'modern-light': 'linear-gradient(to right, #f8fafc, #e0e7ff)',
        'modern-dark': 'linear-gradient(to right, #0f172a, #1e1b4b)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-bg': 'gradient-bg 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-bg': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.glassmorphism': {
          'background': 'rgba(255, 255, 255, 0.2)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.3)',
        },
        '.dark .glassmorphism': {
          'background': 'rgba(0, 0, 0, 0.2)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        }
      })
    })
  ],
}