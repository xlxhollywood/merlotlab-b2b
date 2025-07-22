"use client"

import type React from "react"

export const dynamic = "force-dynamic"

import { Package, Factory, Car, Users, ArrowRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import SplitText from "@/components/animation/split-text"
import FadeInUp from "@/components/animation/fade-in-up"
import Image from "next/image"
import CompanyStrengths from "@/components/card/company-strength"

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

function SmartphoneSection() {
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

        <div className="relative">
          <div
            className="flex justify-center items-center mb-4 lg:mb-0"
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

          <div
            className="absolute right-40 top-1/4 transform -translate-y-1/2 hidden lg:block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(-50%)" : "translate(30px, -50%)",
              transitionDuration: "700ms",
              transitionDelay: "500ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <p className="text-xl xl:text-2xl font-bold text-gray-800 leading-relaxed max-w-[250px] text-right">
              <span className="block">실시간 모니터링으로</span>
              <span className="block">즉시 대응 가능한</span>
              <span className="block text-primary">스마트한 시스템</span>
            </p>
          </div>

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
      </div>
    </section>
  )
}

export default function Solutions() {
  const solutionData = [
    {
      title: "물류 센터",
      description:
        "대형 창고와 물류 시설의 운영 효율성을 높여,  <br> 에너지 비용을 절감하는 맞춤형 솔루션을 <br> 제공합니다.",
      imageSrc: "/물류.png",
      imageAlt: "물류센터 스마트 조명",
      imageWidth: 450,
      badgeText: "물류 동선 최적화",
      badgeIcon: <Package className="w-4 h-4 text-primary" />,
    },
    {
      title: "제조 시설",
      description: "제조 환경에 최적화된 조도로 작업 정확도를 <br>높이고, 불필요한 에너지 낭비를 줄여드립니다.",
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
        "차량 이동과 사람의 통행이 빈번한 주차장 환경에 맞춰, 감지 기반 조명의 스케줄링과  <br>  밝기 설정을 통해 에너지를 최적화합니다.",
      imageSrc: "/주차장.png",
      imageAlt: "주차장",
      imageWidth: 450,
      badgeText: "감지 기반 운영",
      badgeIcon: <Car className="w-4 h-4 text-primary" />,
    },
    {
      title: "사무실",
      description:
        "눈의 피로를 줄이고 집중력을 높일 수 있는 <br> 쾌적한 근무 환경과 에너지 절감 효과를  <br> 동시에 누리세요.",
      imageSrc: "/사무실.png",
      imageAlt: "사무실 스마트 조명",
      imageWidth: 450,
      reverse: true,
      badgeText: "업무 집중도 향상",
      badgeIcon: <Users className="w-4 h-4 text-primary" />,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 사업장 유형별 솔루션: 물류센터, 제조시설, 주차장, 사무실 */}
      <section className="mb-12 sm:mb-16 md:mb-24 lg:mb-8 px-4 sm:px-5 rounded">
        <div className="max-w-[1120px] mt-32 mx-auto flex flex-col gap-40 sm:gap-40 md:gap-40">
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[50px] md:leading-[60px] text-center text-gray-700">
              <FadeInUp delay={300}>
                <div className="m-0">사업장 유형에 알맞은</div>
              </FadeInUp>
              <FadeInUp delay={600}>
                <div className="m-0">
                  <span className="text-primary">에너지 절약 솔루션</span>
                </div>
              </FadeInUp>
            </div>
          </div>

          <div>
            {solutionData.map((item, index) => (
              <FadeInUp key={index} delay={200 + index * 80}>
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

      {/* 스마트폰 섹션: 에너지 손실 최소화 */}
      <SmartphoneSection />

      {/* 핵심 가치 섹션: 회사 강점 */}
      <section className="bg-white sm:py-20 md:py-24 lg:py-32 px-4 sm:px-5 pb-16">
        <div className="text-center mb-24 sm:mb-32 md:mb-40 gap-32 pt-16 sm:pt-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[50px] md:leading-[60px] text-center text-gray-700">
            <FadeInUp delay={200}>
              <span className="block">핵심 가치를 만족 시키는</span>
            </FadeInUp>
            <FadeInUp delay={400}>
              <span className="text-primary">에너지 솔루션</span>
            </FadeInUp>
          </h2>
        </div>
        <FadeInUp delay={600}>
          <CompanyStrengths />
        </FadeInUp>
      </section>

      {/* CTA 섹션: 도입 사례 보기 */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 text-white bg-primary">
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-center px-4">
                내 사업장에 가장 알맞은 관리
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center px-4">
                전기요금 최적화 지금 시작하세요
              </h2>
            </div>
                         <button className="shadow-sm rounded-md bg-white border border-gray-200 h-12 sm:h-14 flex items-center justify-center py-2 px-4 sm:px-6 md:px-8 gap-2 text-sm sm:text-base md:text-lg text-zinc-800 hover:bg-gray-50 transition-colors cursor-pointer">
               <Link href="/?tab=form" className="no-underline">
                 <div className="flex items-center gap-2">
                   <span className="leading-7 font-medium">문의하기</span>
                   <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                 </div>
               </Link>
             </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
