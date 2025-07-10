"use client"

import { useState } from "react"
import Statistics from "@/components/statistics/statistics"
import PortfolioUseCases from "@/components/card/portfolio-use-cases"
import SplitText from "@/components/animation/split-text"
import { Button } from "@/components/ui/button"

const stats = [
  {
    label: "도입 사업장",
    value: 1034,
    unit: "개소",
    description: "`24.01 ~`25.02, 17MW",
  },
  {
    label: "누적 절감 전력량",
    value: 21500,
    unit: "TWh",
    description: "전환 시스템을 통해 누적된 절감량",
  },
  {
    label: "평균 설치 소요 기간",
    value: 11.4,
    unit: "일",
    description: "사업장 한 곳 설치 완료 기준",
  },
  {
    label: "사업장 전력량 절감 평균",
    value: 52.5,
    unit: "%",
    description: "시스템 도입 후 절감된 평균 수치",
  },
]

const filterTypes = [
  { label: "전체", value: "all" },
  { label: "주차장", value: "주차장" },
  { label: "사무실", value: "사무실" },
  { label: "물류 창고", value: "물류 창고" },
  { label: "제조 시설", value: "제조 시설" },
]

export default function UseCases() {
  const [activeFilter, setActiveFilter] = useState("all")

  const handleFilterChange = (filterValue: string) => {
    setActiveFilter(filterValue)
  }

  return (
    <main className="min-h-screen">
      <section className="relative w-full px-5 py-24 bg-white text-center">
        <div className="inner-container relative max-w-[1120px] mx-auto">
          <div className="py-48 text-center text-gray-700">
            <h2 className="text-6xl font-bold leading-[60px] text-center text-gray-700">
              사업장 전력 절감 
              <br />
              <span className="text-primary block mt-2">
                <SplitText text="메를로랩이 " delay={100} />함께 하겠습니다
              </span>
            </h2>
          </div>

          <Statistics stats={stats} />

          {/* 필터 섹션 */}
          <div className="my-12">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {filterTypes.map((filter) => (
                <Button
                  key={filter.value}
                  variant={activeFilter === filter.value ? "default" : "outline"}
                  onClick={() => handleFilterChange(filter.value)}
                  className={`px-6 py-2 rounded-full transition-all duration-200 ${
                    activeFilter === filter.value
                      ? "bg-primary text-white hover:bg-primary/90"
                      : "border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          <PortfolioUseCases />
        </div>
      </section>
    </main>
  )
}
