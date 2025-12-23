/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        acePurple: "#7A2CBF",    // main purple
        aceGreen: "#8BC34A",     // accent green
        aceDark: "#1A1A1A",
        aceLight: "#F9F9F9",
        aceGold: "#b99a45",
        aceBeige: "#e3d6b4",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}
