import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    badgePink: {
      100: "#FEE7E7",
      800: "#FF69B4",
    },
    redMy: "#ff6b6b",
    mint: "#00c2b3",
    my: {
      bg: "#FEE7E7",
      color: "#FF69B4",
    },
    mintTheme: {
      100: "#E6FFFA",
      500: "#00c2b3",
      800: "#00c2b3",
    },
    redTheme: {
      500: "#ff6b6b",
    },
    yellowTheme: {
      500: "#FEBC5A",
    },
    puppleTheme: {
      500: "#9E7CFF",
    },
  },
  fonts: {
    body: `apple, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "4px",
        _focus: {
          outline: "none",
          boxShadow: "none",
        },
      },
      sizes: {
        md: {
          h: "42px",
        },
        lg: {
          h: "46px",
        },
      },
    },
    // Progress: {
    //   baseStyle: {
    //     track: {
    //       bg: "var(--font-h7)",
    //     },
    //     filledTrack: {
    //       bg: "var(--color-mint)",
    //     },
    //   },
    // },
  },
});

export default theme;
