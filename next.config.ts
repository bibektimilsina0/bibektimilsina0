import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allowedDevOrigins: ["192.168.0.120"],
  images: {
    // Local /uploads/* are served natively; allow pasted https image URLs too.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
