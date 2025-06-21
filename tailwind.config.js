/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffcc00",
        secondary: "#333",
        dark: "#222",
        "dark-gray": "#555",
        "light-gray": "#444",
        "border-gray": "#ccc",
        success: "#4CAF50",
        danger: "#f44336",
        info: "#007bff",
        warning: "#dc3545",
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
      minHeight: {
        screen: "100vh",
      },
      maxWidth: {
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
    },
  },
  plugins: [],
};
