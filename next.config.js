/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return[
      {
        source: '/',
        destination: '/about',
        permanent: true
      }
    ]
  },
  reactStrictMode: true,
  images:{
    domains:['media.graphassets.com'],
    formats:['image/avif', 'image/webp']
  }
}

module.exports = nextConfig
