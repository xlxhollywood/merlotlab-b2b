"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import LogoCarouselMain from "@/components/carousel/logo-carousel-main"
import FadeInUp from "@/components/animation/fade-in-up"

export default function HeroSection() {
  const t = useTranslations("home")
  const gray = (chunks: React.ReactNode) => <span className="text-gray-700">{chunks}</span>
  const br = () => <br />
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = ["/images/landing/3.png", "/images/landing/2.png", "/images/landing/4.png", "/images/landing/1.png", "/images/landing/5.png"]

  const projectInfo = [
    {
      category: t("catParking"),
      title: "삼성전자 부품연구동 (DSR)",
      link: "/projects/321",
    },
    {
      category: t("catOfficeParking"),
      title: "삼성전자 화성 캠퍼스",
      link: "/projects/320",
    },
    {
      category: t("catParking"),
      title: "삼성전자 기흥 캠퍼스",
      link: "/projects/322",
    },
    {
      category: t("catLogistics"),
      title: "CJ 대한통운 용인남사",
      link: "/projects/348",
    },
    {
      category: t("catLogistics"),
      title: "CJ 대한통운 동탄",
      link: "/projects/349",
    },
  ]

  // 자동 슬라이드 기능
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
    }, 5000) // 5초마다 자동 슬라이드

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <FadeInUp delay={200}>
      <section className="min-h-screen relative">
        <div className="flex flex-col lg:grid lg:grid-cols-10 min-h-[70vh]">
          {/* 텍스트 섹션 */}
          <div className="lg:col-span-4 flex items-center justify-center lg:justify-end px-4 sm:px-6 lg:px-8 xl:pr-16 2xl:pr-0 py-8 lg:py-0">
            <div className="text-gray-900 text-center lg:text-left max-w-2xl lg:max-w-none.,">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-[#583CF2] to-gray-700">
                  {t.rich("heroStart", { gray })}
              </h1>
              <div className="mb-4 flex justify-center lg:justify-start">
                <img src="/images/brand/logo.png" alt={t("logoAlt")} className="h-8 sm:h-10 lg:h-12" />
              </div>
              {/* 접근성 숨김: 스니펫용 문구 */}
              <p className="sr-only">
                {t("srDescription")}
              </p>
              <p className="text-base sm:text-xl lg:text-2xl text-gray-800 mt-6 lg:mt-10 mb-8 lg:mb-16 leading-relaxed">
                {t.rich("heroSubtitle", { br })}
              </p>
              <Link href="/cases" className="inline-block">
                <button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  <span className="flex items-center gap-2">
                    {t("moreCases")}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </span>
                </button>
              </Link>
            </div>
          </div>

          {/* 이미지 슬라이더 섹션 */}
          <div className="lg:col-span-6 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-0">
            <div className="relative w-full max-w-[600px] lg:max-w-[700px] xl:max-w-[800px] 2xl:max-w-[800px] aspect-[16/10] overflow-hidden rounded-xl shadow-2xl">
              <div
                className="flex transition-transform duration-700 ease-out h-full"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0 h-full relative">
                    <Image
                      src={image || "/images/placeholder.svg"}
                      alt={t("slideAlt", { index: index + 1 })}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 xl:p-12">
                      <div className="space-y-1 sm:space-y-2">
                        <span className="text-xs sm:text-sm lg:text-base font-medium text-white/90">
                          {projectInfo[index]?.category || t("solutionFallback")}
                        </span>
                        <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white leading-tight">
                          <a
                            href={projectInfo[index]?.link || "#"}
                            className="hover:text-gray-200 transition-colors duration-300"
                          >
                            {projectInfo[index]?.title || t("solutionTitleFallback", { index: index + 1 })}
                          </a>
                        </h2>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 네비게이션 버튼 */}
              <button
                onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                disabled={currentImageIndex === 0}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white group-hover:text-gray-200 transition-colors drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => setCurrentImageIndex(Math.min(images.length - 1, currentImageIndex + 1))}
                disabled={currentImageIndex === images.length - 1}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white group-hover:text-gray-200 transition-colors drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* 인디케이터 */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === index ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 로고 캐러셀 - 반응형 개선 */}
        <div className="mt-8 lg:mt-16">
          <LogoCarouselMain />
        </div>
      </section>
    </FadeInUp>
  )
}
