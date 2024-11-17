/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add this line to fix GitHub Pages path issues
  basePath: '/runner-nav-manager',
}

module.exports = nextConfig
