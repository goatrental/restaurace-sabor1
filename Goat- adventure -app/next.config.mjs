/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "goatrental.cz" },
    ],
  },
};

export default nextConfig;
