/** @type {import('next').NextConfig} */
// next/image loads only from this website's two Cloudinary folders (docs/client-website.md,
// Rendering posts). The guide's 3dwd-dev/estudiocastelo row (local CMS testing) and its two
// gallery crop rows are left out: this site uses only the production CMS and shows full images.
// Add them from the guide if local testing or crops start.
const nextConfig = {
  images: {
    remotePatterns: [
      // Uploads from the CMS (production).
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dzpne110u/image/upload/*/3dwd/estudiocastelo/**",
      },
      // This website's own static images.
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dzpne110u/image/upload/**/estudio_castelo/**",
      },
    ],
  },
};

export default nextConfig;
