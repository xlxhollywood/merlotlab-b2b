"use client"

import { useTranslations } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"
import AnimatedEnergyChart from "@/components/chart/energy"
import SoftBreak from "@/components/ui/soft-break"

// 초기 비용 부담 없이 (docs/renewal/EMS 솔루션.png §6): 제목/부제 + 원본 AnimatedEnergyChart(애니메이션 3막대, 반응형)
export default function EmsCostBars() {
  const t = useTranslations("ems")
  const br = () => <SoftBreak />

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeInUp delay={200}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-content break-keep">{t("costHeading")}</h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-content-subtle leading-relaxed break-keep">{t.rich("costSubtitle", { br })}</p>
          </div>
        </FadeInUp>
        <div className="mt-10 sm:mt-12">
          <AnimatedEnergyChart />
        </div>
      </div>
    </section>
  )
}
