"use client"

import { useTranslations } from "next-intl"
import { Heading, Text } from "@/components/ui/typography"
import { SectionHeader } from "@/components/layout/section"
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
          <SectionHeader title={t("processTitle")} subtitle={t("processSubtitle")} />
        </FadeInUp>

        {/* 카드 하단 포커스 그림자가 다음 카드에 가려지지 않도록 간격 확보 */}
        <div className="mt-10 sm:mt-12 space-y-6">
          {steps.map((step) => (
            <FadeInUp key={step.no} delay={150}>
              <div className="flex items-start gap-4 sm:gap-6 rounded-2xl bg-white p-10 sm:p-15 py-16 shadow-[0_12px_24px_-8px_rgba(17,17,26,0.16),0_2px_8px_-2px_rgba(17,17,26,0.06)] ring-1 ring-gray-100">
                <span className="text-2xl sm:text-3xl font-bold text-primary shrink-0">{step.no}</span>
                <div>
                  <Heading as="h3" variant="cardSmall" className="break-keep">{step.title}</Heading>
                  <Text as="p" variant="body-sm" color="subtle" className="mt-1 break-keep">{step.desc}</Text>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
