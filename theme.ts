import { extendTheme } from "@chakra-ui/react";
import { css } from "@chakra-ui/system";

const badgePink = css({
  bg: "#FEE7E7",
  color: "#FF69B4",
});
const theme = extendTheme({
  colors: {
    mint: "#00c2b3",
    redMy: "#ff6b6b",
    my: {
      bg: "#FEE7E7",
      color: "#FF69B4",
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
          bg: "linear-gradient(90deg, rgba(160,164,175,1) -50%,  rgba(0,194,179,1)100%);",
        },
      },
    },
  },
});

export default theme;
