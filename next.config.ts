import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dcncthzfsjsusyugdrjn.supabase.co',
        port: '',
        pathname: '/storage/v1/object/**', // Supabase Storage 경로만 허용
      },
      {
        protocol: 'https',
        hostname: 'image-proxy.saint0325.workers.dev', // 🔥 Cloudflare Workers 프록시 추가
        port: '',
        pathname: '/**', // 모든 경로 허용
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**', // Sanity 이미지용
      },
    ],
    
    // 🔥 핵심 최적화 설정들
    formats: ['image/webp'], // WebP 우선 사용
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // 디바이스별 크기
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // 아이콘 등 작은 이미지용
    minimumCacheTTL: 3600, // Vercel CDN 캐시 (1시간)
    
    // 추가 최적화 옵션들
    dangerouslyAllowSVG: true, // SVG 허용 (필요시)
    contentDispositionType: 'attachment', // 보안 강화
  },

  // 🔥 브라우저 캐시 헤더 설정 (4번 완성!)
  async headers() {
    return [
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400', // 1시간 캐시, 1일 백그라운드 갱신
          },
        ],
      },
    ]
  },
}

export default withNextIntl(nextConfig)