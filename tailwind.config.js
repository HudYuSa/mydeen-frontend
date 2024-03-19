/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#4D2A86",
        secondary: "#38196E",
        primarySoft: "#73618F",
        mainBackground: "#FAFAFA",
        confirm: "#00990F",
        confirmSoft: "#8ED595",
        grayed: "#868686",
        slightGray: "#E0E0E0",
        dark: "#5B5B5B",
      },
    },
  },
  plugins: [],
};
