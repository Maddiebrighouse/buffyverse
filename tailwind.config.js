/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        almendra: ["Almendra", "serif"],
        grenze: ["Grenze", "cursive"],
        lacquer: ["Lacquer", "cursive"],
        longCang: ["Long Cang", "cursive"],
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      animation: {
        fadeUp: "fade-up 1s ease-in",
        fadeDown: "fade-down 3s ease-in",
        fadeInRight: "fade-in-right 2s ease-in",
        fadeLeft: "fade-out-left 1s ease-out",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(300px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-down": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-100px)" },
        },
        "fade-out-left": {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "1", transform: "translateX(-500px)" },
        },
        "fade-in-right": {
          "0%": { opacity: "0", transform: "translateX(-500px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".my-rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".perspective": {
          perspective: "1000px",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".bg-texture": {
          backgroundImage: "url('src/assets/frames/texture.jpg')",
        },
        ".sel-bs": {
          boxShadow: "0 0 24px 0.5px #ffaa01c9,0 0 24px 0.5px #ff007bd4",
        },
      };

      addUtilities(newUtilities, ["hover"]);
    }),
  ],
};
