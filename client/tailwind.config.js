/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      mode: "jit",
      screens: {
        'xs': '480px',
        'sm': '768px',
        'md': '1060px'
      },
    },
  },
  plugins: [],
}
