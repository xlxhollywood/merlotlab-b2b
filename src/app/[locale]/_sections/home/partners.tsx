"use client"

import LogoCarouselMain from "@/components/carousel/logo-carousel-main"
import FadeInUp from "@/components/animation/fade-in-up"

// 주요 도입사: 기존 LogoCarouselMain 재사용 (자체 "주요 도입사" 제목 포함). (docs/renewal/메인.png §4)
export default function PartnersSection() {
  return (
    <section className="w-full bg-gray-50 py-14 sm:py-16 lg:py-20">
      <FadeInUp delay={200}>
        <LogoCarouselMain />
      </FadeInUp>
    </section>
  )
}
