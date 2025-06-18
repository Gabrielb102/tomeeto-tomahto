/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
    ignoreDuringDev: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  webpack: (config, { isServer }) => {
    // Handle Prisma generated files
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      include: [/prisma-client/],
      type: 'javascript/auto'
    });

    // Ensure Prisma client is properly bundled
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  // Ensure Prisma client is properly handled in production
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma-client']
  }
}

export default nextConfig 