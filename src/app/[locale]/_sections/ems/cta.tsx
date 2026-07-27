"use client"

import { useTranslations } from "next-intl"
import CtaBand from "@/components/section/cta-band"

// EMS CTA (docs/renewal/EMS 솔루션.png §10)
export default function EmsCta() {
  const t = useTranslations("ems")
  return <CtaBand eyebrow={t("ctaEyebrow")} heading={t("ctaHeading")} buttonLabel={t("ctaButton")} href="/contact" />
}
