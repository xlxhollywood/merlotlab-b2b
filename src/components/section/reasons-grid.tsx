"use client"

import Image from "next/image"
import FadeInUp from "@/components/animation/fade-in-up"

// 선택 이유 그리드 (rtls/ems 공용): 중앙 제목 + 4컬럼(아이콘/제목/설명, 중앙 정렬).
export default function ReasonsGrid({
  heading,
  items,
}: {
  heading: React.ReactNode
  items: { icon: string; title: React.ReactNode; desc: React.ReactNode }[]
}) {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeInUp delay={200}>
          <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">{heading}</h2>
        </FadeInUp>
        <FadeInUp delay={300}>
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {items.map((item) => (
              <div key={item.icon} className="flex flex-col items-center text-center">
                <div className="relative h-16 w-16">
                  <Image src={item.icon} alt="" fill sizes="64px" className="object-contain" />
                </div>
                <h3 className="mt-4 text-base sm:text-lg font-bold text-gray-800">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
