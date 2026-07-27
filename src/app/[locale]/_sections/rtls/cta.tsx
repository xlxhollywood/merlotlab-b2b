"use client"

import { useTranslations } from "next-intl"
import CtaBand from "@/components/section/cta-band"

// RTLS CTA (docs/renewal/RTLS 솔루션.png §7)
export default function RtlsCta() {
  const t = useTranslations("rtls")
  return (
    <CtaBand eyebrow={t("ctaEyebrow")} heading={t("ctaHeading")} buttonLabel={t("ctaButton")} href="/contact" />
  )
}
