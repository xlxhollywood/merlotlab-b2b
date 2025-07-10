"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import LogoCarouselContact from "@/components/carousel/logo-carousel-contact"

interface AnimationPhase {
  investment: boolean
  firstArrow: boolean
  repaymentEnergyCost: boolean
  repaymentSavings: boolean
  secondArrow: boolean
  postRepaymentEnergyCost: boolean
  postRepaymentBenefit: boolean
}

export default function AnimatedEnergyChart() {
  const [phase, setPhase] = useState<AnimationPhase>({
    investment: false,
    firstArrow: false,
    repaymentEnergyCost: false,
    repaymentSavings: false,
    secondArrow: false,
    postRepaymentEnergyCost: false,
    postRepaymentBenefit: false,
  })

  const [isAnimating, setIsAnimating] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  const startAnimation = () => {
    if (hasAnimated) return // Prevent re-animation

    setHasAnimated(true)
    setIsAnimating(true)

    // Reset all phases
    setPhase({
      investment: false,
      firstArrow: false,
      repaymentEnergyCost: false,
      repaymentSavings: false,
      secondArrow: false,
      postRepaymentEnergyCost: false,
      postRepaymentBenefit: false,
    })

    // Animation sequence with delays
    setTimeout(() => {
      setPhase((prev) => ({ ...prev, investment: true }))
    }, 300)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, firstArrow: true }))
    }, 1000)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, repaymentEnergyCost: true }))
    }, 1500)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, repaymentSavings: true }))
    }, 2500)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, secondArrow: true }))
    }, 3400)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, postRepaymentEnergyCost: true }))
    }, 3900)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, postRepaymentBenefit: true }))
      setIsAnimating(false)
      setAnimationComplete(true)
    }, 4900)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated && !isAnimating) {
            startAnimation()
          }
        })
      },
      { threshold: 0.3 },
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated, isAnimating])

  // Show final state if animation is complete
  const displayPhase = animationComplete
    ? {
        investment: true,
        firstArrow: true,
        repaymentEnergyCost: true,
        repaymentSavings: true,
        secondArrow: true,
        postRepaymentEnergyCost: true,
        postRepaymentBenefit: true,
      }
    : phase

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-4">
      <CardContent className="">
        <div ref={chartRef} className="relative">
          <div className="flex justify-center items-end gap-20 h-96 px-4 relative z-10 mb-0">
            {/* Investment Phase */}
            <div className="flex flex-col items-center space-y-8">
              <div className="relative w-28 h-80 bg-white rounded-t-lg overflow-hidden border-2 border-gray-300 shadow-xl drop-shadow-lg">
                <div
                  className={`absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.investment ? "h-full" : "h-0"
                  }`}
                  style={{
                    boxShadow: "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-base text-center px-2 drop-shadow-sm">
                    에너지 비용
                  </div>
                </div>

                {/* Value indicator */}
                {displayPhase.investment && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    100%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-700 drop-shadow-sm"></div>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-blue-700 text-lg drop-shadow-sm">투자 전</h3>
              </div>
            </div>

            {/* First Arrow */}
            <div className="flex items-center justify-center h-80 mb-8">
              <div
                className={`transition-all duration-500 ease-out ${
                  displayPhase.firstArrow ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-75 -translate-x-4"
                }`}
              >
                <ArrowRight className="w-12 h-12 text-gray-600 drop-shadow-lg" strokeWidth={2.5} />
              </div>
            </div>

            {/* Repayment Period */}
            <div className="flex flex-col items-center space-y-8">
              <div className="relative w-28 h-80 bg-white rounded-t-lg overflow-hidden border-2 border-gray-300 shadow-xl drop-shadow-lg">
                {/* Energy Cost Base */}
                <div
                  className={`absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.repaymentEnergyCost ? "h-48" : "h-0"
                  }`}
                  style={{
                    boxShadow: "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-base text-center px-2 drop-shadow-sm">
                    에너지 비용
                  </div>
                </div>

                {/* Energy Savings Overlay */}
                <div
                  className={`absolute w-full bg-gradient-to-t from-[#FFBF54] to-[#FED82D] transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.repaymentSavings ? "bottom-48 h-32" : "bottom-48 h-0"
                  }`}
                  style={{
                    boxShadow: "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full text-white font-semibold text-base text-center px-2 drop-shadow-sm">
                    <span>에너지</span>
                    <span>비용절감</span>
                    <span className="text-sm">(=투자회수)</span>
                  </div>
                </div>

                {/* 상환 기간 */}
                {displayPhase.repaymentEnergyCost && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    50%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-600 drop-shadow-sm"></div>
                  </div>
                )}

                {displayPhase.repaymentSavings && (
                  <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-[#FEAA1E] text-white text-sm font-bold px-3 py-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    +50%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#FEAA1E] drop-shadow-sm"></div>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 text-lg drop-shadow-sm">상환 기간</h3>
              </div>
            </div>

            {/* Second Arrow */}
            <div className="flex items-center justify-center h-80 mb-8">
              <div
                className={`transition-all duration-500 ease-out ${
                  displayPhase.secondArrow ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-75 -translate-x-4"
                }`}
              >
                <ArrowRight className="w-12 h-12 text-gray-600 drop-shadow-lg" strokeWidth={2.5} />
              </div>
            </div>

            {/* Post-Repayment Period */}
            <div className="flex flex-col items-center space-y-8">
              <div className="relative w-28 h-80 bg-white rounded-t-lg overflow-hidden border-2 border-gray-300 shadow-xl drop-shadow-lg">
                {/* Energy Cost Base */}
                <div
                  className={`absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.postRepaymentEnergyCost ? "h-48" : "h-0"
                  }`}
                  style={{
                    boxShadow: "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-base text-center px-2 drop-shadow-sm">
                    에너지 비용
                  </div>
                </div>

                {/* User Benefit Overlay */}
                <div
                  className={`absolute w-full bg-gradient-to-t from-green-500 to-green-400 transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.postRepaymentBenefit ? "bottom-48 h-32" : "bottom-48 h-0"
                  }`}
                  style={{
                    boxShadow: "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.3)",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-base text-center px-2 drop-shadow-sm">
                    사업 이익
                  </div>
                </div>

                {/* Value indicators */}
                {displayPhase.postRepaymentEnergyCost && (
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    60%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-700 drop-shadow-sm"></div>
                  </div>
                )}

                {displayPhase.postRepaymentBenefit && (
                  <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    +40%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-600 drop-shadow-sm"></div>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-green-700 text-lg drop-shadow-sm">상환 후</h3>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* 3개 카드 섹션 */}
      <div className="flex flex-col md:flex-row px-16 md:px-16">
        {/* 첫 번째 카드 */}
        <Card className="w-full max-w-[220px] mx-auto border-none bg-white shadow-none">
          <CardContent className="p-0 flex flex-col items-center justify-center text-center">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#583CF2] rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">에너지 비용 발생</p>
                  <p className="text-sm text-gray-600">- 인위적 절감에 한계</p>
                  <p className="text-sm text-gray-600">- 투자비 부담</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#583CF2] rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-semibold text-gray-900">에너지 효율화 필요</p>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* 두 번째 카드 */}
        <Card className="w-full max-w-[220px] mx-auto border-none bg-white shadow-none">
          <CardContent className="p-0 flex flex-col items-center justify-center text-center">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#583CF2] rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-semibold text-gray-900">에너지 절약시설 설치</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#583CF2] rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-semibold text-gray-900">투자비 부담 없음</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#583CF2] rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-semibold text-gray-900">절감액으로 투자비 상환</p>
              </div>
            </div>
          </CardContent>
        </Card>


        {/* 세 번째 카드 */}
        <Card className="w-full max-w-[220px] mx-auto border-none bg-white shadow-none">
          <CardContent className="p-0 flex flex-col items-center justify-center text-center">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#583CF2] rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-semibold text-gray-900">에너지 비용절감 지속
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#583CF2] rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-semibold text-gray-900">사용자 수익으로 실현</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <LogoCarouselContact />
    </div>
  )
}