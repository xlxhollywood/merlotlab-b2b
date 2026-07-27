"use client"

import { useTranslations } from "next-intl"
import HeroOverlay from "@/components/section/hero-overlay"

// EMS Hero (docs/renewal/EMS 솔루션.png §1): 밝은 배경 배너 (HeroOverlay light)
export default function EmsHero() {
  const t = useTranslations("ems")
  return (
    <HeroOverlay
      image="/images/ems/1-banner.png"
      imageAlt={t("heroTitle")}
      eyebrow={t("heroEyebrow")}
      title={t("heroTitle")}
      subtitle={t.rich("heroSubtitle", { br: () => <br /> })}
      action={{ label: t("heroButton"), href: "/contact" }}
    />
  )
}
