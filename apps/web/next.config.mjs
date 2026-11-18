/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@workspace/ui'],
  // The Independence Month offer (Oct 2026) has ended; send old ad/WhatsApp
  // links to the courses page instead of a 404. Temporary so the URL can be
  // reused for a future campaign.
  async redirects() {
    return [
      { source: '/independence', destination: '/explore', permanent: false },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'techstudio.nyc3.cdn.digitaloceanspaces.com', //e.g cloudinary
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', //e.g cloudinary
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
