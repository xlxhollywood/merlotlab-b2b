"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import FadeInUp from "@/components/animation/fade-in-up"

export default function CertificationsSection() {
  const t = useTranslations("about")

  const certifications = [
    { title: t("cert1"), image: "/images/about/3-cert-1.png" },
    { title: t("cert2"), image: "/images/about/3-cert-2.png" },
    { title: t("cert3"), image: "/images/about/3-cert-3.png" },
  ]

  const [mobileCertIndex, setMobileCertIndex] = useState(0)
  const certScrollRef = useRef<HTMLDivElement>(null)

  // 모바일 인증서 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (certScrollRef.current) {
        const scrollLeft = certScrollRef.current.scrollLeft
        const itemWidth = 320 + 16 // w-80 (320px) + gap-4 (16px)
        const currentIndex = Math.round(scrollLeft / itemWidth)
        setMobileCertIndex(currentIndex)
      }
    }

    const scrollContainer = certScrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
      <section className="relative w-full px-4 sm:px-6 lg:px-8 bg-gray-50 pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto">
          <FadeInUp delay={300}>
            <div className="text-center text-gray-700 py-8 mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                {t("certSectionTitle")}
              </h2>
              <p className="text-base sm:text-lg text-gray-600 px-4">
                {t("certSectionDesc")}
              </p>
            </div>
          </FadeInUp>

          {/* 특허 및 인증서 통계 */}
          <FadeInUp delay={600}>
            <div className="mb-12 sm:mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* 국내 특허 */}
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-2xl sm:text-3xl mr-2">🇰🇷</div>
                    <div className="text-base sm:text-lg font-semibold text-gray-700">
                      {t("patentDomestic")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="text-3xl sm:text-4xl font-bold text-[#583CF2]">
                      21
                    </div>
                    <div className="text-sm text-gray-700">{t("unitCase")}</div>
                  </div>
                </div>

                {/* 해외 특허 */}
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-2xl sm:text-3xl mr-2">🌍</div>
                    <div className="text-base sm:text-lg font-semibold text-gray-700">
                      {t("patentInternational")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="text-3xl sm:text-4xl font-bold text-[#583CF2]">
                      9
                    </div>
                    <div className="text-sm text-gray-700">{t("unitCase")}</div>
                  </div>
                </div>

                {/* 인증서 */}
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-2xl sm:text-3xl mr-2">📑</div>
                    <div className="text-base sm:text-lg font-semibold text-gray-700">
                      {t("certLabel")}
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="text-3xl sm:text-4xl font-bold text-[#583CF2]">
                      {certifications.length}
                    </div>
                    <div className="text-sm text-gray-700">{t("unitCount")}</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* 인증서 */}
          <FadeInUp delay={600}>
            <div className="relative pt-20 pb-32">
              {/* 데스크톱 버전 - 화살표 버튼 제거 */}
              <div className="hidden lg:block">
                {/* 인증서 그리드 */}
                <div className="grid grid-cols-3 gap-6 px-16">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="w-full h-96 relative overflow-hidden"
                    >
                      <Image
                        src={cert.image || "/images/placeholder.svg"}
                        alt={cert.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* 모바일 버전 - 터치 스와이프 */}
              <div className="lg:hidden">
                <div
                  ref={certScrollRef}
                  className="overflow-x-auto scrollbar-hide"
                >
                  <div
                    className="flex gap-4 px-4"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-80 h-96 relative overflow-hidden rounded-lg"
                        style={{ scrollSnapAlign: "start" }}
                      >
                        <Image
                          src={cert.image || "/images/placeholder.svg"}
                          alt={cert.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 모바일 인디케이터 - 3개 */}
                <div className="flex justify-center mt-6 gap-2">
                  {certifications.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (certScrollRef.current) {
                          const itemWidth = 320 + 16; // w-80 (320px) + gap-4 (16px)
                          certScrollRef.current.scrollTo({
                            left: index * itemWidth,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        mobileCertIndex === index
                          ? "bg-[#583CF2]"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
  )
}
