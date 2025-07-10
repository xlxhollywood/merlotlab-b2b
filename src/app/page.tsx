"use client"

import { useCallback } from "react"
import Footer from "@/components/footer"
import Link from "next/link"
import LogoCarouselMain from "@/components/carousel/logo-carousel-main"
import Image from "next/image"
import TimelineCards from '@/components/card/timeline';
import { Card, CardContent } from "@/components/ui/card"
import ExpandingCard from "@/components/card/expanding-card"
import Statistics from "@/components/statistics/statistics"
import PortfolioCardMain from "@/components/card/portfolio-main"
import CompanyStrengths from "@/components/card/company-strength"
import { ArrowRight } from "lucide-react"
import SplitText from "@/components/animation/split-text"
import FadeInUp from "@/components/animation/fade-in-up"

export default function Landing() {
  const cards = [
    {
      title: "초기 비용 없이 시작",
      description: "설치비 0원, 조명 인프라를 스마트하게 전환",
      image: "/image 70.png",
      icon: "dollar" as const,
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "IoT 기반 지능형 조명 제어",
      description: "어플로 조도·사용 실시간 감지 & 자동 제어",
      image: "/image 72.png",
      icon: "lightbulb" as const,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "에너지 절감 + 전기요금 절약",
      description: "전력 낭비 방지 및 피크 시간대 요금 전략 대응",
      image: "/image 73.png",
      icon: "trending-down" as const,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

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

  const onButtonContainerClick = useCallback(() => {
    // 버튼 클릭 로직
  }, [])

  return (
    <div className="w-full">
      {/* Header */}
      <header>{/* 기존 Header 컴포넌트 */}</header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-black text-white h-[1200px] overflow-hidden text-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/placeholder.svg?height=1200&width=1920')" }}
        >
          <div className="absolute top-[557px] left-[910px] bg-black w-[330px] h-[85px]" />
          <Image
            className="absolute top-[575.5px] left-[928.29px] object-cover"
            width={240}
            height={40}
            alt="메를로랩 로고"
            src="/메를로랩 로고.png"
          />
        </div>
        <div className="absolute top-[540px] left-[528.3px] flex items-center px-5">
          <div className="border-r-4 border-gray-200 flex flex-col items-end pr-9">
            <h1 className="text-5xl font-bold leading-[60px] text-right">
              <p className="m-0">메를로랩의</p>
              <p className="m-0">에너지 솔루션</p>
            </h1>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-20">
          <div className="text-5xl font-bold leading-[60px] text-center text-gray-700">
            <h1 className="text-primary m-0">
              <SplitText text="높아지는 전기 요금" delay={100} />
            </h1>
            <div className="m-0">어떻게 관리할 수 있을까요?</div>
          </div>
          <div className="h-[512px] flex flex-col items-center justify-center relative">
            <Image
              className="w-full max-w-[1120px] h-[539px] object-cover"
              width={1120}
              height={539}
              alt="공장 이미지"
              src="/factory.png"
            />
            {/* Problem Cards */}
            <div className="absolute inset-0 z-10">
              {/* Problem 1 - macOS Style Alert */}
              <div className="absolute top-[-40px] left-16 w-[400px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20">
                {/* macOS Window Controls */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-600 text-sm font-medium">PROBLEM 1</div>
                  <div className="w-6"></div>
                </div>
                <div className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src="/warn.png" alt="경고 아이콘" />
                  </div>
                  <div className="flex-1 text-gray-700 text-base leading-6">
                    <p className="m-0 font-medium">예측 없이 사용하는 설비 전력으로 불필요한</p>
                    <p className="m-0 font-medium">에너지 비용이 지속적으로 발생</p>
                  </div>
                </div>
              </div>

              {/* Problem 2 - macOS Style Alert */}
              <div className="absolute top-[173px] right-20 w-[400px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20">
                {/* macOS Window Controls */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-600 text-sm font-medium">PROBLEM 2</div>
                  <div className="w-6"></div>
                </div>
                <div className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src="/warn.png" alt="경고 아이콘" />
                  </div>
                  <div className="text-gray-700 text-base leading-6">
                    <p className="m-0 font-medium">이상 상황 발생 시, 인력 의존적 대응으로</p>
                    <p className="m-0 font-medium">조치의 낮은 효율성과 어려움</p>
                  </div>
                </div>
              </div>

              {/* Problem 3 - macOS Style Alert */}
              <div className="absolute bottom-[-40px] left-[280px] w-[400px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20">
                {/* macOS Window Controls */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-gray-600 text-sm font-medium">PROBLEM 3</div>
                  <div className="w-6"></div>
                </div>
                <div className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img className="w-full h-full object-cover" src="/warn.png" alt="경고 아이콘" />
                  </div>
                  <div className="text-gray-700 text-base leading-6">
                    <p className="m-0 font-medium">계약전력 초과, 피크 시간 사용 등</p>
                    <p className="m-0 font-medium">요금 체계에 대한 무지로 불필요 비용 발생</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 px-5">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-20">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold leading-[60px] text-center text-gray-700">
              <div className="m-0">메를로랩의 에너지 솔루션으로</div>
              <div className="m-0">
                <span className="text-primary">
                  <SplitText text="전기 요금을 절약" delay={100} />
                </span>
                <span>하세요</span>
              </div>
            </div>
          </div>
          <FadeInUp>
            <div className="h-[476px] flex items-center justify-center gap-10">
              {/* Grid 3.0 Card */}
              <Card
                className="w-[720px] h-full shadow-lg border border-gray-200 rounded-[10px] cursor-pointer overflow-hidden relative"
                onClick={onButtonContainerClick}
              >
                <div className="absolute top-[21.01%] left-[0.14%] right-[0.14%] bottom-[-20.66%] rounded-lg overflow-hidden">
                  <Image
                    className="w-full h-full object-center"
                    width={718}
                    height={574}
                    alt="Grid 3.0"
                    quality={100}
                    src="/Grid 3.0.png"
                  />
                </div>
                <CardContent className="relative z-10 absolute top-0 left-[0.14%] rounded-[10px] p-10 flex justify-between items-start gap-[311.4px]">
                  <div className="flex flex-col gap-3 min-w-[286.59px]">
                    <h3 className="text-3xl font-bold text-primary">그리드 3.0</h3>
                    <p className="text-gray-500 text-base">
                      <span className="block">공장, 건물 등 다양한 환경에 최적화된</span>
                      <span className="block text-primary">자동화 시스템 솔루션</span>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* IoT LED Card */}
              <Card className="w-[720px] h-full shadow-lg border border-gray-200 rounded-[10px] overflow-hidden relative">
                <div className="absolute top-[21.01%] left-[0.14%] right-[0.14%] bottom-[-20.66%] rounded-lg overflow-hidden">
                  <Image
                    className="w-full h-full object-center"
                    width={500}
                    height={400}
                    alt="IoT LED"
                    quality={100}
                    src="/메를로랩 IoT LED.png"
                  />
                </div>
                <CardContent className="relative z-10 absolute top-0 left-[0.14%] rounded-[10px] p-10 flex justify-between items-start gap-[311.4px]">
                  <div className="flex flex-col gap-3 min-w-[286.59px]">
                    <h3 className="text-3xl font-bold text-primary">레시피</h3>
                    <p className="text-gray-500 text-base">
                      <span className="block">집안 곳곳을 손쉽게 관리할 수 있는</span>
                      <span className="block text-primary">가정용 IoT 원격 제어 솔루션</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeInUp>
        </div>
      </section>

      <section className="bg-gray-50 py-24 px-5">
      <TimelineCards cards={cards} />

      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-20">
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold leading-[60px] text-center text-gray-700">
              <p className="m-0">최적의 상태로 끌어올리는</p>
              <p className="m-0 text-primary">
                <SplitText text="그룹 단위 관리 솔루션" delay={100} />
              </p>
            </h2>
          </div>

          


          <FadeInUp>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {cards.map((card, index) => (
                <ExpandingCard
                  key={index}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  icon={card.icon}
                  iconColor={card.iconColor}
                  bgColor={card.bgColor}
                />
              ))}
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative w-full px-5 mt-24 mb-10 bg-white text-center">
        <div className="inner-container relative max-w-[1120px] mx-auto">
          <div className="text-center text-gray-700">
            <h2 className="text-5xl font-bold leading-[60px] text-center text-gray-700">
              에너지 문제를
              <br />
              <span className="text-primary block mb-2">
                <SplitText text="효율적으로 해결합니다" delay={100} />
              </span>
            </h2>
          </div>
          <Statistics stats={stats} />
          <PortfolioCardMain />
          {/* More Cases Button */}
          <Link href="/use-cases" className="no-underline">
            <button className="focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-sm rounded-md px-8 mt-10 h-14">
              <svg
                className="!size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              <span className="md:text-lg font-medium">더 많은 사례 보기</span>
            </button>
          </Link>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-19 overflow-hidden">
        <LogoCarouselMain />
      </section>

      {/* Company Strengths Section */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold leading-[60px] text-center text-gray-700">
            <span className="text-primary block">
              <SplitText text="품질, 기술, 경제성" delay={100} />
            </span>
            <span className="text-gray-700">어느 하나 놓치지 않습니다</span>
          </h2>
          <div className="mt-8">
            <p className="text-xl font-medium text-gray-600 max-w-3xl mx-auto">
              메를로랩은 국내 에너지 절감 산업을 주도하는 에너지 컨설팅 전문 기업입니다
            </p>
          </div>
        </div>
        <FadeInUp>
          <CompanyStrengths />
        </FadeInUp>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 text-white" style={{ backgroundColor: "#583CF2" }}>
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="text-3xl font-bold text-center">내 사업장에 가장 알맞은 관리</div>
              <h2 className="text-5xl font-bold text-center">전기요금 최적화 지금 시작하세요</h2>
            </div>
            <button className="shadow-sm rounded-lg bg-white border border-gray-200 h-12 sm:h-14 flex items-center justify-center py-2 px-6 sm:px-8 gap-2 text-base sm:text-lg text-zinc-800 hover:bg-gray-50 transition-colors cursor-pointer">
              <Link href="/contact?tab=business" className="no-underline">
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
