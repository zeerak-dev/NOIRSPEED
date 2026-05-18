/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Real images will live under /public/cars/<slug>/. WebP preferred.
    // No remote image domains are configured — only local placeholders are allowed.
    formats: ["image/webp"],
  },
};

export default nextConfig;
