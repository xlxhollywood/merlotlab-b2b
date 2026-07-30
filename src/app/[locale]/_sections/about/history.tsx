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
          {timeline.map((yearBlock, yearIndex) => (
              <div key={yearBlock.year}>
                {yearBlock.items.map((item, i) => {
                  // 연도 그룹의 첫 항목에는 위쪽 여백을 더 줘 연 별 간격을 연 내 간격보다 넓힘 (첫 연도 제외).
                  const isYearStart = i === 0
                  const yearGap = isYearStart && yearIndex > 0
                  const topPad = yearGap ? "pt-16 sm:pt-20" : "pt-4"
                  const nodeTop = yearGap ? "top-16 sm:top-20" : "top-4"
                  return (
                  <div
                    key={`${yearBlock.year}-${i}`}
                    className="grid grid-cols-[56px_28px_1fr] sm:grid-cols-[80px_40px_1fr]"
                  >
                    {/* 연도 (연도 그룹 첫 항목에만) */}
                    <div className={`${topPad} text-right pr-3 sm:pr-4 text-lg sm:text-xl font-bold text-primary`}>
                      {isYearStart ? yearBlock.year : ""}
                    </div>

                    {/* 세로선 + 노드 */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-primary/40" />
                      {isYearStart && (
                        <div className={`absolute left-1/2 ${nodeTop} -translate-x-1/2 translate-y-1 w-3.5 h-3.5 rounded-full border-2 border-primary bg-white`} />
                      )}
                    </div>

                    {/* 월 + 텍스트 */}
                    <div className={`flex gap-3 sm:gap-4 ${topPad} pb-4 pl-2 sm:pl-4`}>
                      <div className="w-6 flex-shrink-0 font-bold text-gray-800">
                        {item.month}
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed break-keep">
                        {item.text}
                      </p>
                    </div>
                  </div>
                  )
                })}
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}
