/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Vercel's file tracing sometimes misses non-JS assets read via fs at
  // runtime — this makes sure the certificate template PDF is always
  // bundled with the route that needs it.
  outputFileTracingIncludes: {
    "/api/certificate/download/route": ["./certificate-assets/**"],
  },
};

module.exports = nextConfig;
