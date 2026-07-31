"use client"

import Image from "next/image"
import FadeInUp from "@/components/animation/fade-in-up"
import { Heading, Text } from "@/components/ui/typography"

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
          <Heading as="h2" variant="section" className="text-center">{heading}</Heading>
        </FadeInUp>
        <FadeInUp delay={300}>
          <div className="mt-12 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {items.map((item) => (
              <div key={item.icon} className="flex flex-col items-center text-center">
                <div className="relative h-16 w-16">
                  <Image src={item.icon} alt="" fill sizes="64px" className="object-contain" />
                </div>
                <Heading as="h3" variant="card" className="mt-4 lg:min-h-[5.25rem] flex items-center justify-center">
                  <span className="text-balance break-keep">{item.title}</span>
                </Heading>
                {/* 제목/본문 구분선 (피그마) */}
                <hr className="mt-3 w-11/12 border-t border-line" />
                <Text as="p" variant="body-sm" color="subtle" className="mt-3 text-balance break-keep">{item.desc}</Text>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
