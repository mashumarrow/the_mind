/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "bounce-top": "bounce-top 0.9s ease   both",
        "tracking-in-expand":
          "tracking-in-expand 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000)   both",
        "wobble-ver-right": "wobble-ver-right 1.5s ease  infinite both",
        "pulsate-bck": "pulsate-bck 1s ease  1.5s  infinite both",
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
        "tracking-in-expand": {
          "0%": {
            "letter-spacing": "-.5em",
            opacity: "0",
          },
          "40%": {
            opacity: ".6",
          },
          to: {
            opacity: "1",
          },
        },
        "wobble-ver-right": {
          "0%,to": {
            transform: "translateY(0) rotate(0)",
            "transform-origin": "50% 50%",
          },
          "15%": {
            transform: "translateY(-20px) rotate(6deg)",
          },
          "30%": {
            transform: "translateY(15px) rotate(-6deg)",
          },
          "45%": {
            transform: "translateY(-10px) rotate(3.0deg)",
          },
          "60%": {
            transform: "translateY(9px) rotate(-2.0deg)",
          },
          "75%": {
            transform: "translateY(-6px) rotate(1.2deg)",
          },
        },
        "pulsate-bck": {
          "0%,to": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(.9)",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
