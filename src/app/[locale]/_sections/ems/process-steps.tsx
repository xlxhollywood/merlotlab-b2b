"use client"

import { useTranslations } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"

// 도입 프로세스 (docs/renewal/EMS 솔루션.png §8): 5단계 번호 카드
export default function EmsProcessSteps() {
  const t = useTranslations("ems")

  const steps = [
    { no: "01", title: t("proc1Title"), desc: t("proc1Desc") },
    { no: "02", title: t("proc2Title"), desc: t("proc2Desc") },
    { no: "03", title: t("proc3Title"), desc: t("proc3Desc") },
    { no: "04", title: t("proc4Title"), desc: t("proc4Desc") },
    { no: "05", title: t("proc5Title"), desc: t("proc5Desc") },
  ]

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeInUp delay={200}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">{t("processTitle")}</h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-500">{t("processSubtitle")}</p>
          </div>
        </FadeInUp>

        <div className="mt-10 sm:mt-12 space-y-4">
          {steps.map((step) => (
            <FadeInUp key={step.no} delay={150}>
              <div className="flex items-start gap-4 sm:gap-6 rounded-2xl bg-white p-5 sm:p-6 shadow-sm ring-1 ring-gray-100">
                <span className="text-xl sm:text-2xl font-bold text-primary shrink-0">{step.no}</span>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-800">{step.title}</h3>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
