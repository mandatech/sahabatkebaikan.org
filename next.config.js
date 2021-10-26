/* eslint-disable no-unused-vars */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,

      use: ['@svgr/webpack'],
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'res.cloudinary.com',
      'api-staging.sahabatkebaikan.org',
      'api.sahabatkebaikan.org',
      'via.placeholder.com',
      'localhost',
    ],
  },
});
