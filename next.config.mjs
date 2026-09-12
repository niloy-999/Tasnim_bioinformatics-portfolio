/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"]
  },
  eslint: {
    // Lint config wasn't set up in this environment (no network to install
    // eslint-config-next and verify it). Don't let a missing/incomplete lint
    // setup block `next build`; run `npm run lint` separately once configured.
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
