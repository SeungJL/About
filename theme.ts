import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    badgePink: {
      100: "#FEE7E7",
      800: "#FF69B4",
    },
    redMy: "#ff6b6b",
    mint: "var(--color-mint)",
    my: {
      bg: "#FEE7E7",
      color: "#FF69B4",
    },
    mintTheme: {
      100: "#E6FFFA",
      500: "var(--color-mint)",
      800: "var(--color-mint)",
    },
    redTheme: {
      500: "#ff6b6b",
    },
  },
  fonts: {
    body: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  },
  components: {
    Progress: {
      baseStyle: {
        track: {
          bg: "var(--font-h7)",
        },
        filledTrack: {
          bg: "var(--color-mint)",
        },
      },
    },
  },
});

export default theme;
