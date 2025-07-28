/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'dcncthzfsjsusyugdrjn.supabase.co', // Supabase 이미지
      'cdn.sanity.io',  // Sanity 이미지 (나중을 위해)
    ],
  },
}

module.exports = nextConfig