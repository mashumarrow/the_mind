/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-top": "bounce-top 0.9s ease   both",
      },
      keyframes: {
        "bounce-top": {
          "0%": {
            transform: "translateY(-45px)",
            "animation-timing-function": "ease-in",
            opacity: "1",
          },
          "24%": {
            opacity: "1",
          },
          "40%": {
            transform: "translateY(-24px)",
            "animation-timing-function": "ease-in",
          },
          "65%": {
            transform: "translateY(-12px)",
            "animation-timing-function": "ease-in",
          },
          "82%": {
            transform: "translateY(-6px)",
            "animation-timing-function": "ease-in",
          },
          "93%": {
            transform: "translateY(-4px)",
            "animation-timing-function": "ease-in",
          },
          "25%,55%,75%,87%": {
            transform: "translateY(0)",
            "animation-timing-function": "ease-out",
          },
          to: {
            transform: "translateY(0)",
            "animation-timing-function": "ease-out",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
