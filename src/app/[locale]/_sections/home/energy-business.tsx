"use client"

import { useTranslations } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"
import AnimatedEnergyChart from "@/components/chart/energy"

export default function EnergyBusinessSection() {
  const t = useTranslations("home")
  const hl = (chunks: React.ReactNode) => <span className="text-primary">{chunks}</span>
  const br = () => <br />

  return (
    <section className="mt-4 sm:mt-4 lg:mt-4 mb-24 sm:mb-32 lg:mb-40 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10 mb-24 sm:mb-0">
            <FadeInUp delay={300}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-content-muted mb-4 sm:mb-6">
                {t.rich("energyBizTitle", { hl })}
              </h2>
            </FadeInUp>
            <FadeInUp delay={600}>
              <p className="text-base sm:text-lg lg:text-xl text-content-muted leading-relaxed px-4 sm:px-0">
                {t.rich("energyBizDesc", { br })}
              </p>
            </FadeInUp>
          </div>
        </div>
        <AnimatedEnergyChart />
      </div>
    </section>
  )
}
