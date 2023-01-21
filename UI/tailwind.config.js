/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Open Sans", "sans-serif"],
        Pacifico: ["Pacifico","sans-serif"],
        Inter: ["Inter","sans-serif"]
      },
    },
  },
  plugins: [],
};
