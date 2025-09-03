import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ❌ WARNING: This will allow production builds to succeed
    // even if your project has type errors.
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.alias["pdfjs-dist"] = path.join(
      __dirname,
      "node_modules/pdfjs-dist/legacy/build/pdf"
    );
    return config;
  },
  transpilePackages: ["pdfjs-dist"],
};

export default nextConfig;
