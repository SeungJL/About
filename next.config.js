/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "localhost",
      "user-images.githubusercontent.com",
      "play-lh.googleusercontent.com",
      "studyabout.s3.ap-northeast-2.amazonaws.com",
      "k.kakaocdn.net",
      "p.kakaocdn.net",
    ],
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: "/login/:path*",
        destination: "/login",
      },
    ];
  },
};

module.exports = nextConfig;
