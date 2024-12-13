/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "fruit-left": "fly-left 0.5s ease-out forwards",
        "fruit-right": "fly-right 0.5s ease-out forwards",
      },
      keyframes: {
        "fly-left": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-50px, 50px)" },
        },
        "fly-right": {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(50px, 50px)" },
        },
      },
    },
  },
  plugins: [],
};


