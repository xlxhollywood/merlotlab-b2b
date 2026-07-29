"use client"

import { useTranslations } from "next-intl"
import HeroOverlay from "@/components/section/hero-overlay"

// About Hero (docs/renewal/회사소개.png §1): 어두운 야경 네트워크 배경 + 좌측 흰 텍스트, 버튼 없음.
export default function AboutHeroSection() {
  const t = useTranslations("about")
  return (
    <HeroOverlay
      image="/images/about/1-banner.webp"
      imageAlt={t("heroTitle")}
      eyebrow={t("heroEyebrow")}
      title={t("heroTitle")}
      subtitle={t("heroSubtitle")}
    />
  )
}
