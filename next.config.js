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
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
