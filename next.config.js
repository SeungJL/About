/** @type {import('next').NextConfig} */
const schedule = require("node-schedule");

schedule.scheduleJob("* * 1 * *", function () {
  fetch({
    method: "PATCH",
    url: "/api/user/score",
  });
});

const nextConfig = {
  images: {
    domains: [
      "localhost",
      "user-images.githubusercontent.com",
      "play-lh.googleusercontent.com",
      "*",
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
