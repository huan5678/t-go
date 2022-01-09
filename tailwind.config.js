module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#CEFAD4",
          200: "#9EF6B4",
          300: "#6BE695",
          400: "#44CE81",
          DEFAULT: "#13AE67",
          600: "#0D9565",
          700: "#097D5F",
          800: "#066455",
          900: "#03534E",
        },
        secondary: {
          100: "#CEECFA",
          200: "#9FD5F6",
          300: "#6CB2E6",
          400: "#458CCD",
          DEFAULT: "#145DAD",
          600: "#0E4894",
          700: "#0A357C",
          800: "#062564",
          900: "#031A53",
        },
        info: {
          100: "#CBF4FD",
          200: "#98E3FC",
          300: "#63CAF6",
          400: "#3CAEED",
          DEFAULT: "#0285E2",
          600: "#0167C2",
          700: "#014CA2",
          800: "#003683",
          900: "#00266C",
        },
        warning: {
          100: "#FEF3CB",
          200: "#FEE498",
          300: "#FDD165",
          400: "#FBBD3E",
          DEFAULT: "#F99E00",
          600: "#D67F00",
          700: "#B36400",
          800: "#904B00",
          900: "#773900",
        },
        danger: {
          100: "#FDE4D2",
          200: "#FCC4A7",
          300: "#F69A7A",
          400: "#ED7257",
          DEFAULT: "#E23724",
          600: "#C21D1A",
          700: "#A2121B",
          800: "#830B1C",
          900: "#6C061D",
        },
        gray: {
          DEFAULT: "#828282",
          light: "#F2F2F2",
          dark: "#4F4F4F",
        },
      },
      container: {
        padding: "0.9375rem",
        center: true,
      },
      transitionDuration: {
        800: "800ms",
        1500: "1500ms",
        2000: "2000ms",
        2500: "2500ms",
      },
      boxShadow: {
        DEFAULT: "0px 3px 15px rgba(0, 0, 0, 0.25)",
      },
      fontFamily: {
        sans: [
          "Noto Sans TC",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          maxWidth: "100%",
          "@screen sm": {
            maxWidth: "540px",
          },
          "@screen md": {
            maxWidth: "720px",
          },
          "@screen lg": {
            maxWidth: "960px",
          },
          "@screen xl": {
            maxWidth: "1110px",
          },
        },
      });
    },
  ],
};
