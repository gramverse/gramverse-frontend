/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  // important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Iran"],
      },
      colors: {
        "submit-btn": "#EA5A69",
        "form-bg": "#F5F5F5",
        "primary": "#F5F5F5",
        "form-border": "#CDCDCD",
      },
    },
  },
  plugins: [],
};
