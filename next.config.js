const OCUBE_API_SERVER = process.env.NEXT_PUBLIC_OCUBE_API_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/app/:path*",
        destination: `${OCUBE_API_SERVER}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
