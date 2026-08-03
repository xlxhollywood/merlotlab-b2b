"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import FadeInUp from "@/components/animation/fade-in-up"
import { SectionHeader } from "@/components/layout/section"
import { Text } from "@/components/ui/typography"

// About Intro (docs/renewal/회사소개.png §2): 중앙 헤딩 + 좌측정렬 3문단 + 하단 중앙 AX 일러스트.
export default function AboutIntro() {
  const t = useTranslations("about")
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeInUp delay={200}>
          <SectionHeader title={t("introHeading")} />
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="mt-20 sm:mt-26 space-y-6 text-base/8 sm:text-lg/9 lg:text-xl/10 text-content-muted break-keep">
            <Text as="p" variant="subtitle-lg" color="default" className="break-keep">{t("introP1")}</Text>
            <Text as="p" variant="subtitle-lg" color="default" className="break-keep">{t("introP2")}</Text>
            <Text as="p" variant="subtitle-lg" color="default" className="break-keep">{t("introP3")}</Text>
            <Text as="p" variant="subtitle-lg" color="default" className="break-keep">{t("introP4")}</Text>
          </div>
        </FadeInUp>
      </div>

      <FadeInUp delay={400}>
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <Image
            src="/images/about/2-ax.webp"
            alt={t("introAxAlt")}
            width={1100}
            height={720}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="w-full h-auto"
          />
        </div>
      </FadeInUp>
    </section>
  )
}
