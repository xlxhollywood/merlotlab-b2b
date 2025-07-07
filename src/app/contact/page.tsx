"use client"

import type React from "react"
import { Zap, Shield, Cpu, TrendingUp, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"
import Footer from "@/components/Footer"
import QuoteForm from "@/components/QuoteForm"
import BusinessInquiryForm from "@/components/BusinessInquiryForm"
import AnimatedEnergyChart from "@/components/Chart/energy"
import dynamic from "next/dynamic"
import { useInView } from "react-intersection-observer"
import SplitText from "@/components/Animation/SplitText"
import FadeInUp from "@/components/Animation/FadeInUp"


const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
})

export default function MerlotlabTossStyle() {
  const { ref: costRef, inView: costInView } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  })

  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const pricingData = [
    { title: "제품 공급가", subtitle: "(모델 별 상이)", price: "0원", icon: Cpu },
    { title: "설치 공사비", subtitle: " ", price: "0원", icon: Shield },
    { title: "무선 통신비", subtitle: " ", price: "0원", icon: Zap },
    { title: "시스템 구축비", subtitle: " ", price: "0원", icon: Cpu },
    { title: "컨설팅 및 설계비", subtitle: "(에너지 진단, 설계 컨설팅 포함)", price: "0원", icon: Shield },
  ]
  const quoteFormRef = useRef<HTMLDivElement>(null)
  const [selectedInquiry, setSelectedInquiry] = useState<"business"|"quote">("business")

// inquiry 타입에 따라 default 값을 초기화
const [selectedBusinessType, setSelectedBusinessType] = useState<string>(
  selectedInquiry === "business" ? "개인" : "주거 시설"
)

useEffect(() => {
  if (selectedInquiry === "business") {
    setSelectedBusinessType("개인")
  } else {
    setSelectedBusinessType("주거 시설")
  }
}, [selectedInquiry])

  

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-4 pt-12 sm:pt-16 lg:pt-20">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                왜{" "}
                <span className="text-[#583CF2]">
                  <SplitText text="메를로랩" delay={400} />
                </span>
                을
                <br />
                선택할까요?
              </h1>
            </div>
            <div className="max-w-2xl lg:max-w-4xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed px-4 sm:px-0">
                <span className="text-[#583CF2]">에너지 효율화</span> 사업을 통해 초기 비용 부담 없이, IoT 조명을 최적
                조합으로 설치하여 <br className="hidden sm:block" /> 30% 이상의 전기요금 절감 효과를 기대할 수 있습니다.
              </p>
              <button
                onClick={() => {
                  quoteFormRef.current?.scrollIntoView({ behavior: "smooth" })
                }}
                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-5 bg-[#583CF2]/5 rounded-xl sm:rounded-2xl"
              >
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#583CF2]" />
                <span className="text-[#583CF2] font-semibold text-sm sm:text-base">모의 견적 계산하기</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 에너지 효율화 사업이란 섹션 */}
      <section className="py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                <span className="text-[#583CF2]">
                  <SplitText text="에너지 효율화" delay={400} />
                </span>{" "}
                사업이란?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed px-4 sm:px-0">
                기존 설비를 고효율 설비로 교체하여 에너지 비용을 절감하는 것을 목표로 투자사가 초기 투자 비용을 전액
                부담하여 <br className="hidden lg:block" /> 에너지 절감액으로 투자금을 회수하는 방식으로 진행됩니다.
              </p>
            </div>
          </div>
          <AnimatedEnergyChart />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full relative bg-[#583cf2] flex flex-col items-center justify-start py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="w-full max-w-4xl flex flex-col items-center justify-start">
          <div className="flex flex-col items-center justify-start gap-6 sm:gap-8">
            <div className="flex flex-col items-center justify-start">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-bold px-4">
                내 사업장에도 적용되는지 궁금하시다면?
              </h2>
            </div>
            <button className="shadow-sm rounded-lg bg-white border border-gray-200 h-12 sm:h-14 flex items-center justify-center py-2 px-6 sm:px-8 gap-2 text-base sm:text-lg text-zinc-800 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="leading-7 font-medium">도입 사례 보기</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto py-16 sm:py-24 lg:py-32">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2
            ref={costRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
          >
            초기 투자 비용 {costInView && <CountUp start={1000000} end={0} duration={2} separator="," />}원
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">투명하고 합리적인 가격 정책</p>
        </div>

        {/* Cards Grid - 6 column grid for offset positioning */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-4">
          {pricingData.map((item, idx) => (
            <Card
              key={idx}
              className={`
                border border-gray-200 shadow-lg transition-all duration-300 bg-white group
                hover:shadow-xl hover:scale-105 hover:border-[#583CF2]/20
                ${
                  // 첫 번째 행: 각각 2열씩 차지
                  idx === 0
                    ? "lg:col-span-2"
                    : idx === 1
                      ? "lg:col-span-2"
                      : idx === 2
                        ? "lg:col-span-2"
                        : // 두 번째 행: 첫 번째 행 카드들 사이에 배치
                          idx === 3
                          ? "lg:col-start-2 lg:col-span-2"
                          : idx === 4
                            ? "lg:col-start-4 lg:col-span-2"
                            : ""
                }
              `}
            >
              <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col justify-between">
                <div className="space-y-3 sm:space-y-4">
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#583CF2]/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto group-hover:bg-[#583CF2]/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#583CF2] group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Title and Subtitle */}
                  <div className="min-h-[3rem] sm:min-h-[3.5rem] flex flex-col justify-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">{item.title}</h3>
                    {item.subtitle && item.subtitle.trim() && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-tight">{item.subtitle}</p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="pt-2">
                    <p className="text-xl sm:text-2xl font-bold text-[#583CF2] group-hover:text-[#4c35d1] transition-colors duration-300">
                      {item.price}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <p className="text-xs sm:text-sm text-gray-500">*부가세 미포함 가격입니다</p>
        </div>
      </div>
    </section>

      {/* Process Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <FadeInUp>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">도입 프로세스</h2>
              <p className="text-lg sm:text-xl text-gray-600">간단하고 체계적인 5단계 프로세스</p>
            </div>
          </FadeInUp>
          <div className="space-y-6 sm:space-y-8">
            {[
              {
                step: "01",
                title: "사업장 정보 전달",
                description: "첫 문의 후 안내에 따라 발전소 주소, 발전 용량 등의 정보를 전달해주세요.",
              },
              {
                step: "02",
                title: "검토 및 견적 회신",
                description: "효과적인 솔루션 배치와 경제적인 서비스 구성 제안과 함께 견적을 드립니다.",
              },
              {
                step: "03",
                title: "도입 일정 확인",
                description: "발전소의 규모와 재고 상황에 따라 선금일 기준 30일 이내에 설치 일자 확정이 가능합니다.",
              },
              {
                step: "04",
                title: "현장 방문 설치",
                description:
                  "발전소 위치와 유형, 규모에 따라 전문 협력사가 시공을 진행합니다. 100kW 기준 1~2일 내 작업이 가능합니다.",
              },
              {
                step: "05",
                title: "실측 확인 및 검수",
                description:
                  "14일간 집중 모니터링을 통해 적합한 초기값을 조절합니다. 세팅이 완료된 시스템은 모니터링 매뉴얼과 함께 제공드립니다.",
              },
            ].map((item, idx) => (
              <FadeInUp key={item.step /* 또는 key={idx} */}>
                <Card className="border border-gray-100 shadow-lg transition-all duration-300 bg-white group">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-start gap-4 sm:gap-6">
                        <div className="flex-shrink-0">
                          <div className="text-[#583CF2] text-xl sm:text-2xl lg:text-3xl font-bold">{item.step}</div>
                        </div>
                        <div className="space-y-2 flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{item.title}</h3>
                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                </Card>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <FadeInUp> 
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                편하게 연락주세요, 자세히 상담해드립니다
              </h2>
              <p className="text-lg sm:text-xl text-gray-600">궁금하신 점을 언제든 편하게 문의해 주세요</p>
            </div>
          </FadeInUp>
          {selectedInquiry === "quote" ? (
            <FadeInUp>
            <QuoteForm
              selectedInquiry={selectedInquiry}
              setSelectedInquiry={setSelectedInquiry}
              selectedBusinessType={selectedBusinessType}
              setSelectedBusinessType={setSelectedBusinessType}
            />
            </FadeInUp> 
          ) : (
            <FadeInUp threshold={0.3} rootMargin="150px 0px" delay={100}>
              <div ref={quoteFormRef}>
            <BusinessInquiryForm
              selectedInquiry={selectedInquiry}
              setSelectedInquiry={setSelectedInquiry}
              selectedBusinessType={selectedBusinessType}
              setSelectedBusinessType={setSelectedBusinessType}
            />
              </div>
            </FadeInUp>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
