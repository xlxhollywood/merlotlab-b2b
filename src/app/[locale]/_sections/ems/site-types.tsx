"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import FadeInUp from "@/components/animation/fade-in-up"

// 사업장 유형별 (docs/renewal/EMS 솔루션.png §5): 원형 사진 4장 + 도입사례 버튼
export default function EmsSiteTypes() {
  const t = useTranslations("ems")
  const hl = (chunks: React.ReactNode) => <span className="text-primary">{chunks}</span>
  const br = () => <br />

  const types = [
    { image: "/images/ems/4-round-1.png", name: t("site1Name"), desc: t.rich("site1Desc", { br }) },
    { image: "/images/ems/4-round-2.png", name: t("site2Name"), desc: t.rich("site2Desc", { br }) },
    { image: "/images/ems/4-round-3.png", name: t("site3Name"), desc: t.rich("site3Desc", { br }) },
    { image: "/images/ems/4-round-4.png", name: t("site4Name"), desc: t.rich("site4Desc", { br }) },
  ]

  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeInUp delay={200}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">
              {t.rich("siteTypesHeading", { hl, br })}
            </h2>
            <Link
              href="/cases"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-gray-50"
            >
              {t("siteTypesButton")}
              <ArrowRight className="w-4 h-4 text-primary" />
            </Link>
          </div>
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="mt-12 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {types.map((type) => (
              <div key={type.name} className="flex flex-col items-center text-center">
                <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-full">
                  <Image src={type.image} alt={type.name} fill className="object-cover" sizes="(max-width: 1024px) 45vw, 220px" />
                </div>
                <h3 className="mt-5 text-lg sm:text-xl font-bold text-gray-800">{type.name}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
