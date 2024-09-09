/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Iran"],
      },
      colors: {
        "submit-btn": "#EA5A69",
        "form-bg": "#F5F5F5",
        primary: "#F5F5F5",
        tertiary: "#F6881F",
        secondary: "#EA5A69",
        "border-gray": "#CDCDCD",
        "form-border": "#CDCDCD",
      },
      keyframes: {
        openModal: {
          "0%": { transform: "scaleX(0) scaleY(0.1)" },
          "30%": { transform: "scaleX(1) scaleY(0.1)" },
          "70%": { transform: "scaleY(1.2)" },
          "100%": { transform: "scaleY(1)" },
        },
        closeModal: {
          "0%": {},
          "30%": { transform: "scaleY(0.1) scaleX(1)" },
          "70%": { transform: "scaleX(0.1) scaleY(0.1)" },
          "100%": { transform: "scaleX(0) scaleY(0)" },
        },
        openDrawer: {
          "0%": { transform: "translateY(100%) scaleY(0)" },
          "40%": { transform: "translateY(60%) scaleY(0.4)" },
          "80%": { transform: "translateY(20%) scaleY(0.8)" },
          "100%": { transform: "translateY(0%) scaleY(1)" },
        },
        closeDrawer: {
          "100%": { transform: "translateY(100%) scaleY(0)" },
          "80%": { transform: "translateY(60%) scaleY(0.4)" },
          "40%": { transform: "translateY(20%) scaleY(0.8)" },
          "0%": { transform: "translateY(0%) scaleY(1)" },
        },
      },
      animation: {
        openModal: "openModal 0.5s ease-in",
        closeModal: "ease-in-out 0.5s closeModal",
        openDrawer: "openDrawer 0.5s ease-in",
        closeDrawer: "ease-in-out 0.5s closeDrawer",
      },
    },
  },
  plugins: [],
};
