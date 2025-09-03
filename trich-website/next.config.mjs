/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://13.211.37.83:8080/:path*",
      },
    ];
  },
};

export default nextConfig;
