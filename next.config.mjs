/** @type {import('next').NextConfig} */
// next/image loads only from this website's two Cloudinary folders (docs/cms/client-website.md,
// Images). The 3dwd-dev/estudiocastelo entry (local CMS testing) and the two gallery crop entries
// (docs/cms/galleries.md, Images) are left out: this site uses only the production CMS and shows
// full images (docs/site.md, Quirks). Add them from those docs if local testing or crops start.
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
