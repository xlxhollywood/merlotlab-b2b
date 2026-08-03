"use client"

import { useTranslations } from "next-intl"
import { TrendingUp } from "lucide-react"
import { SectionHeader } from "@/components/layout/section"
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
          <SectionHeader title={t("costHeading")} subtitle={t.rich("costSubtitle", { br })} />
          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-4 rounded-2xl bg-primary/5 px-6 py-5 text-base font-medium text-primary">
              <TrendingUp className="h-4 w-4" />
              {t("costBadge")}
            </span>
          </div>
        </FadeInUp>
        <div className="mt-10 sm:mt-12">
          <AnimatedEnergyChart />
        </div>
      </div>
    </section>
  )
}
