import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * The site is served from a sub-path (https://<user>.github.io/<repo>/), so the deploy workflow sets
 * NEXT_PUBLIC_BASE_PATH=/Technomiles.com. Locally it's empty and the site runs at the root.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true, // /about/ → about/index.html, which GitHub Pages serves directly
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
