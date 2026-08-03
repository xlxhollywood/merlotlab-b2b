"use client"

import FadeInUp from "@/components/animation/fade-in-up"
import { Heading, Text } from "@/components/ui/typography"
import { SectionHeader } from "@/components/layout/section"

// STEP 프로세스 (rtls/ems 공용): 회색 배경 + 중앙 제목/부제 + 3 STEP 카드.
export default function StepProcess({
  heading,
  subtitle,
  steps,
}: {
  heading: React.ReactNode
  subtitle: React.ReactNode
  steps: { no: string; title: string; desc: React.ReactNode }[]
}) {
  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeInUp delay={200}>
          <SectionHeader title={heading} subtitle={subtitle} subtitleColor="default" />
        </FadeInUp>

        <FadeInUp delay={300}>
          {/* 모바일 세로 적층 시 하단 포커스 그림자가 다음 카드에 가려지지 않도록 간격 확보 */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
            {steps.map((step) => (
              <div
                key={step.no}
                className="flex flex-col rounded-2xl bg-white p-6 lg:p-8 shadow-[0_12px_24px_-8px_rgba(17,17,26,0.16),0_2px_8px_-2px_rgba(17,17,26,0.06)] min-h-[220px]"
              >
                <p className="text-base font-bold text-primary">{step.no}</p>
                <Heading as="h3" variant="card" className="mt-3 md:min-h-[3.5rem] break-keep">{step.title}</Heading>
                <Text as="p" variant="body-sm" color="subtle" className="mt-8 break-keep">{step.desc}</Text>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
