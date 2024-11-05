/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = withNextIntl({
  env: {
    NEXT_PUBLIC_HOST_API: process.env.NEXT_PUBLIC_HOST_API,
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_HOST_DOMAIN,'dcatrah.com','https://dcatrah.com',"https://www.pexels.com"],
    unoptimized: true,
  },
});

module.exports = nextConfig;
