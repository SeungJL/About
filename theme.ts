import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    mint: "#00c2b3",
    red: "#ff6b6b",
  },
  fonts: {
    body: `"Pretend",-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  },
  components: {
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
