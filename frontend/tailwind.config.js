/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        "new-amsterdam": ["New Amsterdam", "serif"],
      },
      colors: {
        greenish: "#00534d",
        btnColor: "#008934",
        info: "#018d85",
        textBg: "#55a764",
        topic: "#1a8881",
        head: "#085450",
      },
    },
  },
  plugins: [],
};
