import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/services", destination: "/services/custom-development", permanent: false }];
  },
};

export default nextConfig;
