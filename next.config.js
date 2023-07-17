/** @type {import('next').NextConfig} */

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
