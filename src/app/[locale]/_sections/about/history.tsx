"use client"

import { useTranslations } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"

type TimelineItem = { month: string; text: string }
type TimelineYear = { year: string; items: TimelineItem[] }

// About 회사 연혁 (docs/renewal/회사소개.png §5): 세로 타임라인 (좌 연도·보라 노드·세로선 / 우 월+텍스트).
export default function AboutHistory() {
  const t = useTranslations("about")
  const timeline = t.raw("timeline") as TimelineYear[]

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeInUp delay={200}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              {t("historyTitle")}
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-500">
              {t("historySubtitle")}
            </p>
          </div>
        </FadeInUp>

        <div className="mt-12 sm:mt-16">
          {timeline.map((yearBlock) => (
              <div key={yearBlock.year}>
                {yearBlock.items.map((item, i) => (
                  <div
                    key={`${yearBlock.year}-${i}`}
                    className="grid grid-cols-[56px_28px_1fr] sm:grid-cols-[80px_40px_1fr]"
                  >
                    {/* 연도 (연도 그룹 첫 항목에만) */}
                    <div className="pt-4 text-right pr-3 sm:pr-4 text-lg sm:text-xl font-bold text-primary">
                      {i === 0 ? yearBlock.year : ""}
                    </div>

                    {/* 세로선 + 노드 */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-primary/40" />
                      {i === 0 && (
                        <div className="absolute left-1/2 top-4 -translate-x-1/2 translate-y-1 w-3.5 h-3.5 rounded-full border-2 border-primary bg-white" />
                      )}
                    </div>

                    {/* 월 + 텍스트 */}
                    <div className="flex gap-3 sm:gap-4 pt-4 pb-4 pl-2 sm:pl-4">
                      <div className="w-6 flex-shrink-0 font-bold text-gray-800">
                        {item.month}
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}
