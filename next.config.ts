/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // When frontend calls /api/proxy/analytics/history...
        source: '/api/proxy/:path*',
        // ...Next.js securely proxies it to ${backend}/api/:path*
        destination: `${process.env.PULSEOPS_BACKEND_TARGET}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;