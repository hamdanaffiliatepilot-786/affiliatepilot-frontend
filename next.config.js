/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Sab images allow kar diya hai
      },
    ],
  }
}
module.exports = nextConfig;
