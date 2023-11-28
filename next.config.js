/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: [
    {
      source: "https://www.andriinepomniashchyi.pp.ua/(.*)",
      destination: "https://andriinepomniashchyi.pp.ua/$1",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;
