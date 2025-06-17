/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
    ignoreDuringDev: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  experimental: {
    esmExternals: false
  },
  webpack: (config) => {
    // Handle Prisma generated files
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: [/src\/generated/],
      type: 'javascript/auto'
    });

    return config;
  }
}

export default nextConfig 