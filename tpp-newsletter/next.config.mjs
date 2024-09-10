/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Handle .svg files
      use: ["@svgr/webpack"], // Use @svgr/webpack to transform them into React components
    });

    return config;
  },
};

export default nextConfig;
