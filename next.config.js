/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      resourceQuery: { not: [/url/] },
      use: [{ loader: "@svgr/webpack", options: { svgo: false } }],
    });

    config.module.rules.push({
      test: /\.(mp4|hdr|glb|woff|woff2)$/i,
      type: "asset/resource",
    });

    config.module.rules.push({
      resourceQuery: /url/,
      type: "asset/resource",
    });

    config.module.rules.push({
      test: /\.glsl$/,
      type: "asset/source",
    });

    return config;
  },
  i18n: {
    locales: ["en", "ua"],
    defaultLocale: "en",
    // domains: [
    //   {
    //     domain: "andriinepomniashchyi.pp.ua",
    //     defaultLocale: "en-US",
    //     http: true,
    //   },
    // ],
    // localeDetection: false
  },
};

module.exports = nextConfig;
