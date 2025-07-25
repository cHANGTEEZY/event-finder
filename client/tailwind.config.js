/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4e0189",
        accent: "#a995ce",
        secondaty: "#2f3a4b",
        muted: "#1f1f1f",
        background: "#222834",
        mutedWhite: "#f0ede4",
      },
      fontFamily: {
        DMSANS: ["DMSANS"],
        DMSANSMEDIUM: ["DMSANSMEDIUM"],
        DMSANSSEMIBOLD: ["DMSANSSEMIBOLD"],
        DMSANSBOLD: ["DMSANSBOLD"],
        DMSANSEXTRABOLD: ["DMSANSEXTRABOLD"],
      },
    },
  },
  plugins: [],
};
