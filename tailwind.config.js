/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#3B82F6',
        'primary-dark': '#1E40AF',
        'secondary': '#10B981',
        'danger': '#EF4444',
      },
      spacing: {
        'btn': '120px',
        'gap': '16px',
      }
    },
  },
  plugins: [],
}
