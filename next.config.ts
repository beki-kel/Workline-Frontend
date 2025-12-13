import 'dotenv/config';
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/organizations/:organizationId/outlines/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://workline-backend.vercel.app'}/api/organizations/:organizationId/outlines/:path*`,
      },
      {
        source: '/api/organizations/:organizationId/outlines',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://workline-backend.vercel.app'}/api/organizations/:organizationId/outlines`,
      },
      {
        source: '/api/organizations/:organizationId/members/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://workline-backend.vercel.app'}/api/organizations/:organizationId/members/:path*`,
      },
      {
        source: '/api/organizations/:organizationId/members',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://workline-backend.vercel.app'}/api/organizations/:organizationId/members`,
      },
      {
        source: '/api/organizations/:organizationId/invitations',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://workline-backend.vercel.app'}/api/organizations/:organizationId/invitations`,
      },
      {
        source: '/api/invitations/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://workline-backend.vercel.app'}/api/invitations/:path*`,
      },

      {
        source: '/api/:path*',
        destination: 'https://workline-backend.vercel.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;
