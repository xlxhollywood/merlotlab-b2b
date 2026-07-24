import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // 지원 언어
  locales: ['ko', 'en'],
  // 기본 언어 (미번역 시 폴백도 ko)
  defaultLocale: 'ko',
  // Stripe식: 기본어(ko)는 접두어 없이 /about, 그 외(en)만 /en/about
  localePrefix: 'as-needed',
})
