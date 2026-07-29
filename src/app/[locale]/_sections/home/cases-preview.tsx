"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import FadeInUp from "@/components/animation/fade-in-up"

// 도입 사례 프리뷰: 정적 6카드 (docs/renewal/메인.png §5). 카드 비인터랙티브, 직각 모서리.
export default function CasesPreviewSection() {
  const t = useTranslations("home")
  const br = () => <br />

  const cases = [
    { image: "/images/main/4-building-1.webp", name: t("case1Name"), type: t("case1Type") },
    { image: "/images/main/4-building-2.webp", name: t("case2Name"), type: t("case2Type") },
    { image: "/images/main/4-building-3.webp", name: t("case3Name"), type: t("case3Type") },
    { image: "/images/main/4-building-4.webp", name: t("case4Name"), type: t("case4Type") },
    { image: "/images/main/4-building-5.webp", name: t("case5Name"), type: t("case5Type") },
    { image: "/images/main/4-building-6.webp", name: t("case6Name"), type: t("case6Type") },
  ]

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeInUp delay={200}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">{t("casesTitle")}</h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed">
              {t.rich("casesSubtitle", { br })}
            </p>
            <Link
              href="/cases"
              className="mt-6 inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              {t("moreCases")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeInUp>

        {/* 카드별 개별 FadeInUp → 모바일에서 스크롤 시 하나씩 등장 */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {cases.map((c) => (
            <FadeInUp key={c.name} delay={150} threshold={0.2}>
              <div className="relative aspect-[400/380] overflow-hidden">
                <Image src={c.image} alt={c.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                {/* 하단 그라디언트 + 유형(위) + 이름(아래) */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4">
                  <p className="text-xs text-white/75">{c.type}</p>
                  <p className="mt-0.5 text-sm sm:text-base font-semibold text-white">{c.name}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
