import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ['lh3.googleusercontent.com'], // Add Google profile image domain here
    remotePatterns: [
      {
        // protocol: 'https:',
        hostname: '*',
      }
    ]
  },
};

export default nextConfig;
