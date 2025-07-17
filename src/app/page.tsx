"use client"

import type React from "react"
import { useCallback, useState, useEffect, useRef } from "react"
import { Package, Factory, Car, Users } from "lucide-react"
import Footer from "@/components/footer"
import Header from "@/components/header"
import Link from "next/link"
import Image from "next/image"
import LogoCarouselMain from "@/components/carousel/logo-carousel-main"
import Statistics from "@/components/statistics/statistics"
import PortfolioCardMain from "@/components/card/portfolio-main"
import CompanyStrengths from "@/components/card/company-strength"
import { ArrowRight } from "lucide-react"
import SplitText from "@/components/animation/split-text"
import FadeInUp from "@/components/animation/fade-in-up"

interface SolutionItemProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  imageWidth: number
  reverse?: boolean
  badgeText: string
  badgeIcon: React.ReactNode
}

function SolutionItem({
  title,
  description,
  imageSrc,
  imageAlt,
  imageWidth,
  reverse = false,
  badgeText,
  badgeIcon,
}: SolutionItemProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mb-16 sm:mb-20 md:mb-24">
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "none" : "translateY(20px)",
          transitionDuration: "500ms",
          transitionDelay: "0ms",
          transitionTimingFunction: "linear",
        }}
      >
        <div
          className={`flex flex-col lg:flex-row items-center gap-32 lg:gap-32 xl:gap-56 ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1 flex justify-center">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={imageAlt}
              width={imageWidth}
              height={300}
              draggable={false}
              className="max-w-full h-auto rounded-3xl"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            {/* 작은 배지 추가 */}
            <div className="flex items-center gap-2 mb-2 sm:mb-3 justify-center lg:justify-start">
              {badgeIcon}
              <span className="text-primary text-sm sm:text-base font-medium">{badgeText}</span>
            </div>
            <h3
              style={{ color: "#333d4b" }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
              style={{ color: "#4e5968" }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// 토스 스타일 섹션 컴포넌트
function TossStyleSection() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-5 bg-gray-50 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* 상단 헤더 텍스트 */}
        <div
          className="text-center mb-16 lg:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(-20px)",
            transitionDuration: "600ms",
            transitionDelay: "100ms",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[50px] md:leading-[60px] text-center text-gray-700">
            <div className="m-0">손쉬운 자동화 시스템으로</div>
            <div className="m-0">
              <span className="text-primary">
                <SplitText text="에너지 손실 최소화" delay={100} />
              </span>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="relative">
          {/* 중앙 스마트폰 이미지 */}
          <div
            className="flex justify-center items-center mb-8 lg:mb-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(40px)",
              transitionDuration: "800ms",
              transitionDelay: "300ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <div className="relative">
              <Image
                src="/grid phone.png"
                alt="전력 관리 앱 화면"
                width={600}
                height={1200}
                className="max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] h-auto drop-shadow-2xl"
                draggable={false}
              />
            </div>
          </div>

          {/* 좌측 텍스트 */}
          <div
            className="absolute left-24 top-1/2 transform -translate-y-1/2 hidden lg:block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(-50%)" : "translate(-30px, -50%)",
              transitionDuration: "700ms",
              transitionDelay: "400ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <p className="text-xl xl:text-2xl font-bold text-gray-800 leading-relaxed max-w-[250px]">
              <span className="block">이해하기 쉬운 용어</span>
              <span className="block">설명이 필요 없는</span>
              <span className="block text-primary">직관적인 화면 구성</span>
            </p>
          </div>

          {/* 우측 텍스트 - 새로 추가 */}
          <div
            className="absolute right-40 top-1/4 transform -translate-y-1/2 hidden lg:block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(-50%)" : "translate(30px, -50%)",
              transitionDuration: "700ms",
              transitionDelay: "450ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <p className="text-xl xl:text-2xl font-bold text-gray-800 leading-relaxed max-w-[250px]">
              <span className="block">현장 실태에 맞춘</span>
              <span className="block text-primary">맞춤형 제안부터</span>
              <span className="block">실행까지 한 번에</span>
            </p>
          </div>

          {/* 모바일용 텍스트들 */}
          <div
            className="text-center lg:hidden mb-8 space-y-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(20px)",
              transitionDuration: "700ms",
              transitionDelay: "400ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <p className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed">
              <span className="block">이해하기 쉬운 용어</span>
              <span className="block">설명이 필요 없는</span>
              <span className="block text-primary">직관적인 화면 구성</span>
            </p>
            <p className="text-lg sm:text-xl font-bold text-gray-800 leading-relaxed">
              <span className="block">송금처럼 쉬운</span>
              <span className="block text-primary">구매 경험</span>
              <span className="block">그리고 투자 판단에</span>
              <span className="block">도움을 주는 콘텐츠까지</span>
            </p>
          </div>
        </div>

        {/* 하단 설명 텍스트 */}
        <div
          className="text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(20px)",
            transitionDuration: "600ms",
            transitionDelay: "500ms",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
            <span className="block">유선 공사 없이 지금 시설 그대로</span>
            <span className="block font-semibold">맞춤형 자동화 운영 방식을 컨설팅합니다.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default function Landing() {
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

  // 토스 스타일 스마트 조명 솔루션 데이터
  const solutionData = [
    {
      title: "물류 센터",
      description:
        "대대형 창고와 물류 시설의 운영 효율성을 높여, 에너지 비용을 절감하는 맞춤형 솔루션을 <br> 제공합니다.",
      imageSrc: "/물류.png",
      imageAlt: "물류센터 스마트 조명",
      imageWidth: 450,
      badgeText: "물류 동선 최적화",
      badgeIcon: <Package className="w-4 h-4 text-primary" />,
    },
    {
      title: "제조 시설",
      description:
        "제조 환경에 최적화된 조도로 작업 정확도를 <br>높이고, 불필요한 에너지 낭비를 줄이는 <br> 컨설팅을 제공합니다.",
      imageSrc: "/공장3.png",
      imageAlt: "제조시설 조명",
      imageWidth: 450,
      reverse: true,
      badgeText: "생산성 중심 설계",
      badgeIcon: <Factory className="w-4 h-4 text-primary" />,
    },
    {
      title: "주차장",
      description:
        "차량 이동과 사람의 통행이 빈번한 주차장 환경에 맞춰, 감지 기반 조명 스케줄과 밝기 설정을 최적화합니다.",
      imageSrc: "/주차장.png",
      imageAlt: "주차장",
      imageWidth: 450,
      badgeText: "감지 기반 운영",
      badgeIcon: <Car className="w-4 h-4 text-primary" />,
    },
    {
      title: "사무실",
      description:
        "눈의 피로를 줄이고 집중력을 높이는 설계로, <br> 쾌적한 근무 환경과 에너지 절감 효과를 동시에 누리세요.",
      imageSrc: "/사무실.png",
      imageAlt: "사무실 스마트 조명",
      imageWidth: 450,
      reverse: true,
      badgeText: "업무 집중도 향상",
      badgeIcon: <Users className="w-4 h-4 text-primary" />,
    },
  ]

  const onButtonContainerClick = useCallback(() => {
    // 버튼 클릭 로직
  }, [])

  return (
    <div className="w-full">
      {/* Header 추가 */}
      <Header />

      {/* 1st section */}
      <section className="relative bg-white text-white overflow-hidden text-center pt-2 sm:pt-[10px]">
        {/* Background Image - 반응형 */}
        <div className="relative w-full h-screen bg-cover bg-center bg-no-repeat hero-bg">
          {/* Gradient Overlay */}
          <div className="relative z-10 flex justify-center absolute top-14 sm:top-14 h-full px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight sm:leading-[58px] md:leading-[58px] lg:leading-[58px] text-center text-gray-700 drop-shadow-lg">
              <FadeInUp delay={300}>
                <p>
                  에너지 절감의 시작
                </p>
              </FadeInUp>
              <FadeInUp delay={600}>
                <p className="m-0 text-primary">
                  메를로랩
                </p>
              </FadeInUp>
            </h1>
          </div>
          
          {/* 스크롤 버튼 */}
          <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20">
            <button
              onClick={() => {
                const nextSection = document.querySelector('section:nth-of-type(2)');
                if (nextSection) {
                  nextSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group hover:animate-none transition-all duration-300"
              style={{
                animation: 'customBounce 2s infinite',
              }}
            >
              <svg 
                width="40" 
                height="40" 
                viewBox="0 0 200 200" 
                className="text-gray-700 group-hover:text-primary transition-colors duration-300"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
                }}
              >
                <g transform="matrix(0.31151700019836426,0,0,0.31151700019836426,11.684928894042969,90.30802154541016)" opacity="0.8">
                  <path 
                    fill="currentColor" 
                    d="M283.4639892578125,274.375 C273.343994140625,274.375 263.2250061035156,272.17498779296875 253.79800415039062,267.7760009765625 C253.79800415039062,267.7760009765625 16.750999450683594,157.16299438476562 16.750999450683594,157.16299438476562 C4.238999843597412,151.32400512695312 -1.1710000038146973,136.447998046875 4.668000221252441,123.93599700927734 C10.505999565124512,111.42400360107422 25.381999969482422,106.01499938964844 37.89400100708008,111.85399627685547 C37.89400100708008,111.85399627685547 274.9410095214844,222.46600341796875 274.9410095214844,222.46600341796875 C280.3580017089844,224.9929962158203 286.5710144042969,224.99200439453125 291.98699951171875,222.46600341796875 C291.98699951171875,222.46600341796875 529.0349731445312,111.85399627685547 529.0349731445312,111.85399627685547 C541.5469970703125,106.01399993896484 556.4219970703125,111.42400360107422 562.260986328125,123.93599700927734 C568.0989990234375,136.447998046875 562.6890258789062,151.32400512695312 550.177001953125,157.16299438476562 C550.177001953125,157.16299438476562 313.1300048828125,267.7760009765625 313.1300048828125,267.7760009765625 C303.7040100097656,272.17498779296875 293.5840148925781,274.375 283.4639892578125,274.375z"
                  />
                </g>
              </svg>
            </button>
          </div>
          
          <div className="absolute top-0 left-0 w-full h-[70%] bg-gradient-to-b from-white/100 via-white/10 to-transparent z-[1]" />
          <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-white/100 via-white/10 to-transparent z-[1]" />
        </div>
        <style jsx>{`
          .hero-bg {
            background-image: url(/hero-image.png);
          }
          @media (min-width: 1024px) {
            .hero-bg {
              background-image: url(/hero-image2.jpg);
            }
          }
          
          @keyframes customBounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
        `}</style>
      </section>

      {/* 2nd section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-8 px-4 sm:px-5 rounded">
        <div className="max-w-[1120px] mt-32 mx-auto flex flex-col gap-40 sm:gap-40 md:gap-40">
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[50px] md:leading-[60px] text-center text-gray-700">
              <FadeInUp delay={300}>
                <div className="m-0">사업장 유형에 알맞은</div>
              </FadeInUp>
              <FadeInUp delay={600}>
                <div className="m-0">
                  <span className="text-primary">
                    전기 요금 솔루션
                  </span>
                </div>
              </FadeInUp>
            </div>
          </div>
          <div>
            {solutionData.map((item, index) => (
              <FadeInUp key={index} delay={200 + (index * 80)}>
                <SolutionItem
                  title={item.title}
                  description={item.description}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  imageWidth={item.imageWidth}
                  reverse={item.reverse}
                  badgeText={item.badgeText}
                  badgeIcon={item.badgeIcon}
                />
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* 토스 스타일 섹션 추가 */}
      <TossStyleSection />

      {/* 3rd section */}
      <section className="bg-white sm:py-20 md:py-24 lg:py-32 px-4 sm:px-5">
        <div className="text-center mb-24 sm:mb-32 md:mb-40 gap-32">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[50px] md:leading-[60px] text-center text-gray-700">
            <FadeInUp delay={200}>
              <span className="block">
                핵심 가치를 모두 만족 시키는
              </span>
            </FadeInUp>
            <FadeInUp delay={400}>
              <span className="text-primary">
                에너지 솔루션
              </span>
            </FadeInUp>
          </h2>
        </div>
        <FadeInUp delay={600}>
          <CompanyStrengths />
        </FadeInUp>
      </section>

      {/* Portfolio Section */}
      <section className="relative w-full px-4 sm:px-5 sm:py-20 md:py-24 lg:py-32 bg-gray-50 text-center">
        <div className="inner-container relative max-w-[1120px] mx-auto">
          <div className="text-center text-gray-700 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[50px] md:leading-[60px] text-center text-gray-700">
              수많은 사업장의 변화를
              <br />
              <span className="text-primary block mb-2">
                <SplitText text="함께하고 있습니다" delay={100} />
              </span>
            </h2>
          </div>
          <Statistics stats={stats} />
          <FadeInUp delay={200}>
            <PortfolioCardMain />
          </FadeInUp>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-gray-50 overflow-hidden">
        <LogoCarouselMain />
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 text-white bg-primary">
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-center px-4">
                내 사업장에 가장 알맞은 관리
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center px-4">
                전기요금 최적화 지금 시작하세요
              </h2>
            </div>
            <button className="shadow-sm rounded-lg bg-white border border-gray-200 h-12 sm:h-14 flex items-center justify-center py-2 px-4 sm:px-6 md:px-8 gap-2 text-sm sm:text-base md:text-lg text-zinc-800 hover:bg-gray-50 transition-colors cursor-pointer">
              <Link href="/solutions?tab=business" className="no-underline">
                <div className="flex items-center gap-2">
                  <span className="leading-7 font-medium">문의 하기</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Link>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
