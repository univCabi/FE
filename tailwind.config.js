module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#21BF48",
        mainText: "#000000",
        subText: "#767676",
        accentText: "#EB5757",
        background: "#f2f2f2",
        "neutral-150": "#f0f0f0",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
    },
    screens: {
      ss: "480px",
      sm: "620px",
      sl: "768px",
      md: "1060px",
      lg: "1200px",
    },
  },
  corePlugins: {
    preflight: true,
  },
};
