/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        acePurple: "#7A2CBF",
        aceGreen: "#8BC34A",
        aceDark: "#1A1A1A",
        aceLight: "#F9F9F9",
        aceGold: "#b99a45",
        aceBeige: "#e3d6b4",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
