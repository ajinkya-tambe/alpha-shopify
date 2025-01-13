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

  experimental:{
    ppr:'incremental'
  },
  devIndicators:{
    appIsrStatus: true,
    buildActivity:true ,
    buildActivityPosition: "bottom-right",
  },
};

export default nextConfig;
