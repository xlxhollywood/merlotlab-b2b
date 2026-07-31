"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import FadeInUp from "@/components/animation/fade-in-up"
import { Heading } from "@/components/ui/typography"

// About 회사 개요 (docs/renewal/회사소개.png §3): 중앙 헤딩 + 좌 로고박스 / 우 정보 테이블.
export default function CompanyOverview() {
  const t = useTranslations("about")

  const rows = [
    { label: t("ovNameLabel"), value: t("ovName") },
    { label: t("ovCeoLabel"), value: t("ovCeo") },
    { label: t("ovFoundedLabel"), value: t("ovFounded") },
    { label: t("ovBizLabel"), value: t("ovBiz") },
    { label: t("ovHqLabel"), value: t("ovHq") },
    { label: t("ovSiteLabel"), value: t("ovSite") },
  ]

  return (
    <section className="w-full bg-white pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeInUp delay={200}>
          <Heading as="h2" variant="section" className="text-center">
            {t("overviewTitle")}
          </Heading>
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 lg:gap-12 items-stretch">
            {/* 로고 박스 */}
            <div className="flex items-center justify-center bg-gray-50 rounded-lg py-14 lg:py-0">
              <Image
                src="/images/brand/logo.svg"
                alt={t("ovName")}
                width={220}
                height={40}
                className="w-[180px] sm:w-[220px] h-auto"
                unoptimized
              />
            </div>

            {/* 정보 테이블 */}
            <div className="border-t-2 border-gray-800">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex flex-col sm:flex-row gap-1 sm:gap-6 py-5 border-b border-gray-200"
                >
                  <div className="w-full sm:w-32 flex-shrink-0 font-semibold text-content sm:text-center">
                    {row.label}
                  </div>
                  <div className="text-content-muted">{row.value}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
