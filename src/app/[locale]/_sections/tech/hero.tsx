"use client"

import { useTranslations } from "next-intl"
import HeroOverlay from "@/components/section/hero-overlay"

// 기술 소개 Hero (docs/renewal/기술.png §1): 공용 HeroOverlay 사용
export default function TechHero() {
  const t = useTranslations("tech")
  return (
    <HeroOverlay
      image="/images/tech/1-banner.webp"
      imageAlt={t("heroTitle")}
      eyebrow={t("heroEyebrow")}
      title={t("heroTitle")}
      subtitle={t("heroSubtitle")}
      action={{ label: t("heroButton"), href: "/contact" }}
    />
  )
}
