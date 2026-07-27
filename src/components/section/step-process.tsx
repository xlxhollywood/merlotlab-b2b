"use client"

import FadeInUp from "@/components/animation/fade-in-up"

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
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 leading-snug">{heading}</h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed">{subtitle}</p>
          </div>
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {steps.map((step) => (
              <div key={step.no} className="flex flex-col rounded-2xl bg-white p-6 lg:p-8 shadow-sm min-h-[220px]">
                <p className="text-sm font-bold text-primary">{step.no}</p>
                <h3 className="mt-3 text-lg sm:text-xl font-bold text-gray-800">{step.title}</h3>
                <p className="mt-auto pt-8 text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
