"use client"

import { useTranslations } from "next-intl"
import HeroOverlay from "@/components/section/hero-overlay"

// RTLS Hero (docs/renewal/RTLS 솔루션.png §1): 밝은 배경 배너 + 어두운 텍스트 (HeroOverlay light)
export default function RtlsHero() {
  const t = useTranslations("rtls")
  return (
    <HeroOverlay
      variant="light"
      image="/images/rtls/1-banner.png"
      imageAlt={t("heroTitle")}
      eyebrow={t("heroEyebrow")}
      title={t("heroTitle")}
      subtitle={t.rich("heroSubtitle", { br: () => <br /> })}
      action={{ label: t("heroButton"), href: "/contact" }}
    />
  )
}
