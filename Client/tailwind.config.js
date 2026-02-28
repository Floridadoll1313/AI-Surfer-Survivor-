/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: "#00eaff",
          pink: "#ff00ea",
          green: "#00ff9d",
        },
      },
    },
  },
  plugins: [],
}
