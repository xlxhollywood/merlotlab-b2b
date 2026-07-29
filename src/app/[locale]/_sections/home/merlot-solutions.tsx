"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import FadeInUp from "@/components/animation/fade-in-up"

// Merlot 솔루션 개요: EMS / RTLS 2행 (docs/renewal/메인.png §3)
export default function MerlotSolutionsSection() {
  const t = useTranslations("home")
  const br = () => <br />

  const solutions = [
    {
      image: "/images/main/3-device-1.webp",
      name: t("emsName"),
      descKey: "emsDesc",
      href: "/solutions/ems",
    },
    {
      image: "/images/main/3-device-2.webp",
      name: t("rtlsName"),
      descKey: "rtlsDesc",
      href: "/solutions/rtls",
    },
  ] as const

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <FadeInUp delay={200}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">{t("solutionsTitle")}</h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed">
              {t("solutionsSubtitle")}
            </p>
          </div>
        </FadeInUp>

        <div className="mt-12 sm:mt-16 flex flex-col gap-14 sm:gap-20">
          {solutions.map((s) => (
            <FadeInUp key={s.name} delay={300}>
              <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] items-center gap-8 lg:gap-12">  {/* 디바이스 목업 (네이티브 크기 유지, 좌측 정렬) */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-[440px] aspect-[455/232]">
                    <Image src={s.image} alt={s.name} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 440px" />
                  </div>
                </div>
                {/* 텍스트 */}
                <div className="text-center lg:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{s.name}</h3>
                  <p className="mt-3 text-sm sm:text-base text-gray-500 leading-relaxed">{t.rich(s.descKey, { br })}</p>
                  <Link
                    href={s.href}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 text-primary"
                  >
                    {t("learnMore")}
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </Link>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
