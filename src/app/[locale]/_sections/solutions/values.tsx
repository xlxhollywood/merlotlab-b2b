"use client"

import { useTranslations } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"
import CompanyStrengths from "@/components/card/company-strength"

export default function ValuesSection() {
  const t = useTranslations("solutions")

  return (
      <section className="bg-white sm:py-20 md:py-24 lg:py-32 px-4 sm:px-5 pb-16">
        <div className="text-center mb-24 sm:mb-32 md:mb-40 gap-32 pt-16 sm:pt-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[50px] md:leading-[60px] text-center text-gray-700">
            <FadeInUp delay={200}>
              <span className="block">{t("valuesHeading1")}</span>
            </FadeInUp>
            <FadeInUp delay={400}>
              <span className="text-primary">{t("valuesHeading2")}</span>
            </FadeInUp>
          </h2>
        </div>
        <FadeInUp delay={600}>
          <CompanyStrengths />
        </FadeInUp>
      </section>
  )
}
