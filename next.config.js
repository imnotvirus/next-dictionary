/** @type {import('next').NextConfig} */

let withPWA = require("next-pwa");

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: "public",
  },
});

module.exports = nextConfig;
