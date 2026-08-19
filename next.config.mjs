/** @type {import('next').NextConfig} */
const nextConfig = {
  /* allows access to remote files in cloudinary*/
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    cacheComponents: true,
  },
};

export default nextConfig;
