/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "studyabout.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "localhost:3000",
      },
      {
        protocol: "https",
        hostname: "user-images.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "p.kakaocdn.net",
      },
      {
        protocol: "http",
        hostname: "p.kakaocdn.net",
      },
      {
        protocol: "https",
        hostname: "k.kakaocdn.net",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
      },
    ],
  },

  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
