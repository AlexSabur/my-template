import { withTV } from "tailwind-variants/transformer";
import colors from "tailwindcss/colors";

export default withTV({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    // colors: {
    //   transparent: "transparent",
    //   current: "currentColor",
    //   black: colors.black,
    //   white: colors.white,
    //   //
    //   main: "#622BFF",
    //   danger: "#FF4D57",
    // },
  },
  plugins: [],
});
