"use client"

import { useTranslations } from "next-intl"
import CtaBand from "@/components/section/cta-band"

// 기술 CTA: 공용 CtaBand에 tech 문구 주입 (docs/renewal/기술.png §4)
export default function TechCta() {
  const t = useTranslations("tech")
  return (
    <CtaBand
      eyebrow={t("ctaEyebrow")}
      heading={t("ctaHeading")}
      buttonLabel={t("ctaButton")}
      href="/contact"
    />
  )
}
