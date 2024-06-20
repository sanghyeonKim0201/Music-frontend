/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
      },
      {
        hostname: 'i.ytimg.com',
        protocol: 'https',
      },
      {
        hostname: 'www.gstatic.com',
        protocol: 'https',
      },
      {
        hostname: 'yt3.ggpht.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
