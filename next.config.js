/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure API routes work with static export
  // This is a workaround for Next.js static export with API routes
  rewrites: async () => {
    return [];
  },
};

module.exports = nextConfig;
