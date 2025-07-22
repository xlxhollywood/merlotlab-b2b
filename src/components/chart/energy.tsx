"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowRight, ArrowDown, Circle } from "lucide-react"
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
  shadows: boolean
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
    shadows: false,
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
      shadows: false,
    })

    // Animation sequence with delays
    setTimeout(() => {
      setPhase((prev) => ({ ...prev, investment: true }))
    }, 1000)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, firstArrow: true }))
    }, 1700)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, repaymentEnergyCost: true }))
    }, 2200)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, repaymentSavings: true }))
    }, 3200)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, secondArrow: true }))
    }, 4100)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, postRepaymentEnergyCost: true }))
    }, 4600)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, postRepaymentBenefit: true }))
    }, 5600)

    setTimeout(() => {
      setPhase((prev) => ({ ...prev, shadows: true }))
      setIsAnimating(false)
      setAnimationComplete(true)
    }, 6600)
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
        shadows: true,
      }
    : phase

  return (
    <div className="w-full max-w-6xl mx-auto p-0 space-y-0">
      <CardContent className="sm:p-4 p-0">
        <div ref={chartRef} className="relative">
          {/* Desktop Layout (sm and up) */}
          <div className="hidden sm:flex justify-center items-end gap-12 xl:gap-20 h-80 xl:h-96 px-4 relative z-10 mb-0">
            {/* Investment Phase */}
            <div className="flex flex-col items-center space-y-6 md:space-y-8">
              <div className="relative w-24 xl:w-28 h-64 xl:h-80 bg-white rounded-t-lg overflow-hidden border-2 border-gray-300 shadow-xl drop-shadow-lg">
                <div
                  className={`absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.investment ? "h-full" : "h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.2)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-sm xl:text-base text-center px-2 drop-shadow-sm">
                    에너지 비용
                  </div>
                </div>

                {/* Value indicator */}
                {displayPhase.investment && (
                  <div className="absolute -top-10 xl:-top-12 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white text-xs xl:text-sm font-bold px-2 xl:px-3 py-1 xl:py-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    100%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 xl:border-l-4 border-r-3 xl:border-r-4 border-t-3 xl:border-t-4 border-transparent border-t-blue-700 drop-shadow-sm"></div>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-blue-700 text-base xl:text-lg drop-shadow-sm">설치 전</h3>
              </div>
            </div>

            {/* First Arrow */}
            <div className="flex items-center justify-center h-64 xl:h-80 mb-8">
              <div
                className={`transition-all duration-500 ease-out ${
                  displayPhase.firstArrow ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-75 -translate-x-4"
                }`}
              >
                <ArrowRight className="w-10 xl:w-12 h-10 xl:h-12 text-gray-600 drop-shadow-lg" strokeWidth={2.5} />
              </div>
            </div>

            {/* Repayment Period */}
            <div className="flex flex-col items-center space-y-6 md:space-y-8">
              <div className="relative w-24 xl:w-28 h-64 xl:h-80 bg-white rounded-t-lg overflow-hidden border-2 border-gray-300 shadow-xl drop-shadow-lg">
                {/* Energy Cost Base */}
                <div
                  className={`absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.repaymentEnergyCost ? "h-40 xl:h-48" : "h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.2)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-sm xl:text-base text-center px-2 drop-shadow-sm">
                    에너지 비용
                  </div>
                </div>

                {/* Investment Repayment Overlay */}
                <div
                  className={`absolute w-full bg-gradient-to-t from-[#FFBF54] to-[#FED82D] transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.repaymentSavings ? "bottom-40 xl:bottom-48 h-12 xl:h-16" : "bottom-40 xl:bottom-48 h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.3)" : "none",
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full text-white font-semibold text-xs xl:text-sm text-center px-2 drop-shadow-sm">
                    <span>투자 회수</span>
                  </div>
                </div>

                {/* Customer Profit Overlay */}
                <div
                  className={`absolute w-full bg-gradient-to-t from-green-500 to-green-400 transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.repaymentSavings ? "bottom-52 xl:bottom-64 h-12 xl:h-16" : "bottom-52 xl:bottom-64 h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.3)" : "none",
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full text-white font-semibold text-xs xl:text-sm text-center px-2 drop-shadow-sm">
                    <span>사업 이익</span>
                  </div>
                </div>

                {/* 상환 기간 */}
                {displayPhase.repaymentEnergyCost && (
                  <div className="absolute -top-10 xl:-top-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs xl:text-sm font-bold px-2 xl:px-3 py-1 xl:py-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    50%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 xl:border-l-4 border-r-3 xl:border-r-4 border-t-3 xl:border-t-4 border-transparent border-t-blue-600 drop-shadow-sm"></div>
                  </div>
                )}

              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 text-base xl:text-lg drop-shadow-sm">상환 기간</h3>
              </div>
            </div>

            {/* Second Arrow */}
            <div className="flex items-center justify-center h-64 xl:h-80 mb-8">
              <div
                className={`transition-all duration-500 ease-out ${
                  displayPhase.secondArrow ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-75 -translate-x-4"
                }`}
              >
                <ArrowRight className="w-10 xl:w-12 h-10 xl:h-12 text-gray-600 drop-shadow-lg" strokeWidth={2.5} />
              </div>
            </div>

            {/* Post-Repayment Period */}
            <div className="flex flex-col items-center space-y-6 md:space-y-8">
              <div className="relative w-24 xl:w-28 h-64 xl:h-80 bg-white rounded-t-lg overflow-hidden border-2 border-gray-300 shadow-xl drop-shadow-lg">
                {/* Energy Cost Base */}
                <div
                  className={`absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.postRepaymentEnergyCost ? "h-40 xl:h-48" : "h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.2)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-sm xl:text-base text-center px-2 drop-shadow-sm">
                    에너지 비용
                  </div>
                </div>

                {/* User Benefit Overlay */}
                <div
                  className={`absolute w-full bg-gradient-to-t from-green-500 to-green-400 transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.postRepaymentBenefit ? "bottom-40 xl:bottom-48 h-24 xl:h-32" : "bottom-40 xl:bottom-48 h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.3)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-sm xl:text-base text-center px-2 drop-shadow-sm">
                    사업 이익
                  </div>
                </div>

                {/* Value indicators */}
                {displayPhase.postRepaymentEnergyCost && (
                  <div className="absolute -top-10 xl:-top-12 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs xl:text-sm font-bold px-2 xl:px-3 py-1 xl:py-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    60%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 xl:border-l-4 border-r-3 xl:border-r-4 border-t-3 xl:border-t-4 border-transparent border-t-blue-700 drop-shadow-sm"></div>
                  </div>
                )}

                {displayPhase.postRepaymentBenefit && (
                  <div className="absolute -top-20 xl:-top-24 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs xl:text-sm font-bold px-2 xl:px-3 py-1 xl:py-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    +40%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 xl:border-l-4 border-r-3 xl:border-r-4 border-t-3 xl:border-t-4 border-transparent border-t-green-600 drop-shadow-sm"></div>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-green-700 text-base xl:text-lg drop-shadow-sm">상환 후</h3>
              </div>
            </div>
          </div>

         {/* Mobile Layout (sm 미만) */}
          <div className="sm:hidden flex flex-row items-end justify-between px-0 gap-0 z-10">
            {/* Investment Phase */}
            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="relative w-12 h-32 bg-white rounded-t-lg overflow-hidden border-2 border-gray-300 shadow-xl drop-shadow-lg">
                <div
                  className={`absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.investment ? "h-full" : "h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.2)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-xs text-center px-1 drop-shadow-sm">
                    에너지<br/>비용
                  </div>
                </div>

                {/* Value indicator */}
                {displayPhase.investment && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-700 text-white text-xs font-bold px-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    100%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-blue-700 drop-shadow-sm"></div>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-blue-700 text-xs drop-shadow-sm">투자 전</h3>
              </div>
              
              {/* 투자 전 설명 */}
              <div className="w-full text-center h-24 flex flex-col justify-center">
                <div className="space-y-1">
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-gray-900 text-[12px] mb-0.5">에너지 비용 발생</p>
                    <p className="text-[11px] text-gray-600">- 인위적 절감에 한계</p>
                    <p className="text-[11px] text-gray-600">- 투자비 부담</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-gray-900 text-[12px]">에너지 효율화 필요</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Repayment Period */}
            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="relative w-12 h-32 bg-white rounded-t-lg overflow-hidden border-2 border-gray-300 shadow-xl drop-shadow-lg">
                {/* Energy Cost Base */}
                <div
                  className={`absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.repaymentEnergyCost ? "h-16" : "h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.2)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-xs text-center px-1 drop-shadow-sm">
                    에너지<br/>비용
                  </div>
                </div>

                {/* Investment Repayment Overlay */}
                <div
                  className={`absolute w-full bg-gradient-to-t from-[#FFBF54] to-[#FED82D] transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.repaymentSavings ? "bottom-16 h-8" : "bottom-16 h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.3)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-[10px] leading-tight text-center px-1 pt-1 drop-shadow-sm">
                    <span>투자<br/>회수</span>
                  </div>
                </div>

                {/* Customer Profit Overlay */}
                <div
                  className={`absolute w-full bg-gradient-to-t from-green-500 to-green-400 transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.repaymentSavings ? "bottom-22 h-8" : "bottom-22 h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.3)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-[10px] text-center px-1 drop-shadow-sm">
                    <span>사업<br/>이익</span>
                  </div>
                </div>

                {/* 상환 기간 */}
                {displayPhase.repaymentEnergyCost && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    50%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-blue-600 drop-shadow-sm"></div>
                  </div>
                )}

              </div>
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 text-xs drop-shadow-sm">상환 기간</h3>
              </div>
              
              {/* 상환 기간 설명 */}
              <div className="w-full text-center h-24 flex flex-col justify-center">
                <div className="space-y-1">
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-gray-900 text-[12px]">EMS 솔루션 설치</p>
                  </div>
                  <div className="flex flex-col items-center">
                  <p className="text-[11px] text-gray-600">- 초기 비용 부담 없음</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-gray-900 text-[12px]">투자비 상환</p>
                    <p className="text-[11px] text-gray-600">- 절감액으로 상환</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Post-Repayment Period */}
            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="relative w-12 h-32 bg-white rounded-t-lg overflow-hidden border-2 border-gray-300 shadow-xl drop-shadow-lg">
                {/* Energy Cost Base */}
                <div
                  className={`absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.postRepaymentEnergyCost ? "h-16" : "h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.2)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-xs text-center px-1 drop-shadow-sm">
                    에너지<br/>비용
                  </div>
                </div>

                {/* User Benefit Overlay */}
                <div
                  className={`absolute w-full bg-gradient-to-t from-green-500 to-green-400 transition-all duration-1000 ease-out shadow-inner ${
                    displayPhase.postRepaymentBenefit ? "bottom-16 h-16" : "bottom-16 h-0"
                  }`}
                  style={{
                    boxShadow: displayPhase.shadows ? "inset 0 -4px 8px rgba(0, 0, 0, 0.1), inset 2px 0 6px rgba(255, 255, 255, 0.3)" : "none",
                  }}
                >
                  <div className="flex items-center justify-center h-full text-white font-semibold text-xs text-center px-1 drop-shadow-sm">
                    <span>사업<br/>이익</span>
                  </div>
                </div>

                {/* Value indicators */}
                {displayPhase.postRepaymentEnergyCost && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    60%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-blue-700 drop-shadow-sm"></div>
                  </div>
                )}

                {displayPhase.postRepaymentBenefit && (
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-2 rounded-lg shadow-xl border-2 border-white drop-shadow-md">
                    +40%
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-green-600 drop-shadow-sm"></div>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-green-700 text-xs drop-shadow-sm">상환 후</h3>
              </div>
              
              {/* 상환 후 설명 */}
              <div className="w-full text-center h-24 flex flex-col justify-center">
                <div className="space-y-1">
                  <div className="flex flex-col items-center">
                    <p className="font-semibold text-gray-900 text-[12px]">지속적 절감</p>
                  </div>
                  <div className="flex flex-col items-center mt-2">
                  <p className="font-semibold text-gray-900 text-[12px]">수익으로 실현</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/*3카드 섹션 - PC용 (lg 이상) */}
      <div className="hidden lg:flex flex-col md:flex-row px-4 md:px-16 gap-6 sm:gap-8">
        
        {/* 첫 번째 카드 */}
        <Card className="w-full max-w-[220px] mx-auto border-none bg-white shadow-none">
          <CardContent className="p-0 flex flex-col items-center justify-center text-center">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start space-x-2">
                <Circle className="w-2 h-2 text-primary mt-1.5 sm:mt-2 flex-shrink-0 fill-current" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1 sm:text-base">에너지 비용 발생</p>
                  <p className="text-xs sm:text-sm text-gray-600">- 인위적 절감에 한계</p>
                  <p className="text-xs sm:text-sm text-gray-600">- 투자비 부담</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Circle className="w-2 h-2 text-primary mt-1.5 sm:mt-2 flex-shrink-0 fill-current" />
                <p className="font-semibold text-gray-900 sm:text-base">에너지 효율화 필요</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 두 번째 카드 */}
        <Card className="w-full max-w-[220px] mx-auto border-none bg-white shadow-none">
          <CardContent className="p-0 flex flex-col items-center justify-center text-center">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start space-x-2">
                <Circle className="w-2 h-2 text-primary mt-1.5 sm:mt-2 flex-shrink-0 fill-current" />
                <p className="font-semibold text-gray-900 sm:text-base">에너지 절약시설 설치</p>
              </div>
              <div className="flex items-start space-x-2">
                <Circle className="w-2 h-2 text-primary mt-1.5 sm:mt-2 flex-shrink-0 fill-current" />
                <p className="font-semibold text-gray-900 sm:text-base">투자비 부담 없음</p>
              </div>
              <div className="flex items-start space-x-2">
                <Circle className="w-2 h-2 text-primary mt-1.5 sm:mt-2 flex-shrink-0 fill-current" />
                <p className="font-semibold text-gray-900 sm:text-base">절감액으로 투자비 상환</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 세 번째 카드 */}
        <Card className="w-full max-w-[220px] mx-auto border-none bg-white shadow-none">
          <CardContent className="p-0 flex flex-col items-center justify-center text-center">
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start space-x-2">
                <Circle className="w-2 h-2 text-primary mt-1.5 sm:mt-2 flex-shrink-0 fill-current" />
                <p className="font-semibold text-gray-900 sm:text-base">에너지 비용 지속적 절감
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <Circle className="w-2 h-2 text-primary mt-1.5 sm:mt-2 flex-shrink-0 fill-current" />
                <p className="font-semibold text-gray-900 sm:text-base">사용자 수익으로 실현</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}