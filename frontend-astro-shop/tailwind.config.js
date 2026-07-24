export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

extend: {
  animation: {
    floatSlow: "floatSlow 18s ease-in-out infinite",
    floatSlower: "floatSlow 26s ease-in-out infinite",
    drift: "drift 40s linear infinite",
  },
  keyframes: {
    floatSlow: {
      "0%, 100%": { transform: "translateY(0px)" },
      "50%": { transform: "translateY(-40px)" },
    },
    drift: {
      "0%": { transform: "translateX(-10%)" },
      "100%": { transform: "translateX(10%)" },
    },
  },
}
