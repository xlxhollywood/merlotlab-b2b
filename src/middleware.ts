import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // locale 라우팅을 적용할 경로. 아래는 제외:
  // - /api           (API 라우트)
  // - /studio        (Sanity Studio, 비-로컬라이즈드)
  // - /_next, /_vercel (내부)
  // - 확장자 있는 정적 파일 (favicon.png, robots.txt, sitemap.xml 등)
  matcher: '/((?!api|studio|_next|_vercel|.*\\..*).*)',
}
