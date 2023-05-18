import { extendTheme } from "@chakra-ui/react";
import { css } from "@chakra-ui/system";

const badgePink = css({
  bg: "#FEE7E7",
  color: "#FF69B4",
});
const theme = extendTheme({
  colors: {
    redMy: "#ff6b6b",
    mint: "#00c2b3",
    my: {
      bg: "#FEE7E7",
      color: "#FF69B4",
    },
    mintTheme: {
      500: "#00c2b3",
    },
  },
  fonts: {
    body: `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  },
  components: {
    Badge: {
      variants: {
        badgePink,
      },
    },

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
