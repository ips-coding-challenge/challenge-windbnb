module.exports = {
  // purge: ["./src/*.js", "./src/components/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Montserrat", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
        muli: ["Muli", "sans-serif"],
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "12px",
        large: "16px",
      },
      inset: {
        0: "0",
        20: "20%",
        50: "50%",
        70: "70%",
        auto: "auto",
      },
    },
  },
  extend: {},
  variants: {},
  plugins: [],
};
