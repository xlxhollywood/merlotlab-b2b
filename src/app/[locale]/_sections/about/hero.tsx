"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"

export default function AboutHeroSection() {
  const t = useTranslations("about")
  const [isHeroVisible, setIsHeroVisible] = useState(false)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      { threshold: 0.1 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center px-4 overflow-hidden"
      >
        {/* 배경 비디오 */}
        {isHeroVisible && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-[1.01]"
            src="/videos/about-hero.mp4"
          />
        )}

        {/* 검정색 그라디언트 오버레이 추가 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-[1]"></div>

        {/* 텍스트 콘텐츠 */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
          <FadeInUp delay={300}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              {t("hero1")}
            </h1>
          </FadeInUp>
          <FadeInUp delay={600}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t("hero2")}
            </h1>
          </FadeInUp>
        </div>
      </section>
  )
}
