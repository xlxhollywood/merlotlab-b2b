"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import FadeInUp from "@/components/animation/fade-in-up"

// About Intro (docs/renewal/회사소개.png §2): 중앙 헤딩 + 좌측정렬 3문단 + 하단 중앙 AX 일러스트.
export default function AboutIntro() {
  const t = useTranslations("about")
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeInUp delay={200}>
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">
            {t("introHeading")}
          </h2>
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="mt-8 sm:mt-10 space-y-6 text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
            <p>{t("introP1")}</p>
            <p>{t("introP2")}</p>
            <p>{t("introP3")}</p>
          </div>
        </FadeInUp>
      </div>

      <FadeInUp delay={400}>
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <Image
            src="/images/about/2-ax.png"
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
