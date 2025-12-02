/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "techstudio.nyc3.cdn.digitaloceanspaces.com", //e.g cloudinary
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", //e.g cloudinary
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
