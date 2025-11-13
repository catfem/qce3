/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./{App,index}.tsx",
    "./{components,context,hooks,pages,services,supabase}/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'background-light': '#f7f9fc',
        'background-dark': '#111827',
        'sidebar-light': 'rgba(255, 255, 255, 0.7)',
        'sidebar-dark': 'rgba(31, 41, 55, 0.7)',
        'card-light': 'rgba(255, 255, 255, 0.8)',
        'card-dark': 'rgba(55, 65, 81, 0.8)',
        'border-light': 'rgba(209, 213, 219, 0.5)',
        'border-dark': 'rgba(75, 85, 99, 0.5)',
        'primary': '#3b82f6',
        'primary-hover': '#2563eb',
        'text-light-primary': '#111827',
        'text-light-secondary': '#6b7280',
        'text-dark-primary': '#f9fafb',
        'text-dark-secondary': '#d1d5db',
      },
      backdropBlur: {
        xl: '24px',
      }
    }
  },
  plugins: [],
}
