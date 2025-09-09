/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // all files in app folder
    "./components/**/*.{js,jsx,ts,tsx}", // if you add components folder later
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans-serif"], // 👈 set your default family
      },
    },
  },
  plugins: [],
};
