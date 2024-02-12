import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    badgePink: {
      100: "#FEE7E7",
      800: "#FF69B4",
    },
    badgeMint: {
      100: "#E6FFFA",
      800: "#00c2b3",
    },
    redMy: "#ff6b6b",
    mint: "#00c2b3",
    my: {
      bg: "#FEE7E7",
      color: "#FF69B4",
    },
    mintTheme: {
      100: "#00c2b3",
      500: "#00c2b3",
      800: "#ffffff",
    },
    redTheme: {
      100: "#ff6b6b",
      500: "#ff6b6b",
      800: "#ffffff",
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
    Badge: {
      baseStyle: {
        fontSize: "12px",
        lineHeight: 1.5,
        padding: "0px 4px",
      },
    },
    Button: {
      baseStyle: {
        borderRadius: "4px",
        _focus: {
          outline: "none",
          boxShadow: "none",
        },
      },
      sizes: {
        xs: {
          h: "24px",
        },

        md: {
          h: "42px",
        },
        lg: {
          h: "46px",
        },
      },
    },
  },
});

export default theme;
