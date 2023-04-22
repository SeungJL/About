/** @type {import('next').NextConfig} */

// const { default: axios } = require("axios");
// const schedule = require("node-schedule");

// schedule.scheduleJob("* * 1 * *", async function () {
//   const url =
//     process.env.NODE_ENV.toLowerCase() === "development"
//       ? "http://localhost:3000"
//       : "https://votehelper.herokuapp.com/";
//   await axios.patch(url + "/api/user/score");
// });
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "*",
      "user-images.githubusercontent.com",
      "play-lh.googleusercontent.com",
    ],
  },
  reactStrictMode: true,
  experimental: {
    largePageDataBytes: 300 * 1000,
  },
  compiler: {
    styledComponents: true,
  },
};
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// const nextConfig = withBundleAnalyzer({
//   images: {
//     domains: [
//       "localhost",
//       "*",
//       "user-images.githubusercontent.com",
//       "play-lh.googleusercontent.com",
//     ],
//   },
//   reactStrictMode: true,
//   compiler: {
//     styledComponents: true,
//   },
//   webpack(config, { webpack }) {
//     const prod = process.env.NODE_ENV === "production";
//     const plugins = [...config.plugins];

//     return {
//       ...config,
//       mode: prod ? "production" : "development",
//       devtool: prod ? "hidden-source-map" : "eval",
//       plugins,
//     };
//   },
// });

module.exports = nextConfig;
