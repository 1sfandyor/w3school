/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mavjud bo'lmagan sahifalar uchun 404
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig; 