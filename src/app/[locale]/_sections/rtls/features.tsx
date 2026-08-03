"use client"

import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/layout/section"
import FeatureRow from "@/components/section/feature-row"
import FadeInUp from "@/components/animation/fade-in-up"

// RTLS 솔루션 기능 (docs/renewal/RTLS 솔루션.png §4): 제목/부제 + alternating 4행
export default function RtlsFeatures() {
  const t = useTranslations("rtls")

  const rows = [
    { eyebrow: t("feat1Eyebrow"), title: t("feat1Title"), bullets: [t("feat1B1"), t("feat1B2"), t("feat1B3")], image: "/images/rtls/3-solution-1.webp" },
    { eyebrow: t("feat2Eyebrow"), title: t("feat2Title"), bullets: [t("feat2B1"), t("feat2B2"), t("feat2B3")], image: "/images/rtls/3-solution-2.webp" },
    { eyebrow: t("feat3Eyebrow"), title: t("feat3Title"), bullets: [t("feat3B1"), t("feat3B2"), t("feat3B3")], image: "/images/rtls/3-solution-3.webp" },
    { eyebrow: t("feat4Eyebrow"), title: t("feat4Title"), bullets: [t("feat4B1"), t("feat4B2"), t("feat4B3")], image: "/images/rtls/3-solution-4.webp" },
  ]

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeInUp delay={200}>
          <SectionHeader title={t("featuresTitle")} subtitle={t("featuresSubtitle")} />
        </FadeInUp>

        <div className="mt-12 sm:mt-16 flex flex-col gap-14 sm:gap-20">
          {rows.map((row, i) => (
            <FeatureRow key={row.title} {...row} imageAlt={row.title} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
