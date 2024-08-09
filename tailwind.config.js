/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  important: "#root",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        sans: ["iran"]
      },
      colors: {
        'submit-btn': '#EA5A69',
        'form-bg' : '#F5F5F5',
        'form-border' : '#CDCDCD',
      },
      backgroundImage: {
        'reset-password': "url('/assets/svg/reset-password-bg.svg')",
      }
    },
  },
  plugins: [],
};
