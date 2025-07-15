"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { DollarSign, Smartphone, TrendingDown } from "lucide-react"

interface TimelineCard {
  title: string
  description: string
  image: string
  icon?: React.ReactNode
}

interface TimelineCardsProps {
  cards: TimelineCard[]
  className?: string
}

const TimelineCards: React.FC<TimelineCardsProps> = ({ cards, className = "" }) => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(cards.length).fill(false))
  const [scrollProgress, setScrollProgress] = useState(0)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  // 기본 아이콘 배열 - 시그니처 컬러 적용
  const defaultIcons = [
    <DollarSign key="dollar" className="w-7 h-7" />,
    <Smartphone key="smartphone" className="w-7 h-7" />,
    <TrendingDown key="trending" className="w-7 h-7" />,
  ]

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    cardRefs.current.forEach((cardRef, index) => {
      if (cardRef) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleCards((prev) => {
                  const newVisible = [...prev]
                  newVisible[index] = true
                  return newVisible
                })
              }
            })
          },
          {
            threshold: 0.3,
            rootMargin: "-50px 0px -50px 0px",
          },
        )
        observer.observe(cardRef)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [cards.length])

  // 스크롤 진행도 추적
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const sectionHeight = sectionRef.current.offsetHeight
        const windowHeight = window.innerHeight
        const scrollStart = -rect.top
        const scrollEnd = sectionHeight + windowHeight
        const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd))
        setScrollProgress(progress)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div ref={sectionRef} className={`min-h-screen bg-gray-50 py-16 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Timeline Layout - 지그재그 배치 */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Timeline line - 중앙에 배치 */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-1 transition-all duration-300 rounded-full transform -translate-x-1/2"
              style={{
                backgroundColor: `rgba(88, 60, 242, ${0.2 + scrollProgress * 0.6})`,
              }}
            ></div>

            <div className="space-y-16">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`relative flex items-start ${index % 2 === 1 ? "flex-row-reverse" : ""}`}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                >
                  {/* Timeline dot with icon - 중앙에 배치 */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white border-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-700 shadow-lg z-10 ${
                      visibleCards[index] ? "scale-100 opacity-100" : "scale-75 opacity-50"
                    }`}
                    style={{
                      borderColor: visibleCards[index] ? "#583CF2" : "#D1D5DB",
                      transitionDelay: visibleCards[index] ? `${index * 150}ms` : "0ms",
                    }}
                  >
                    <span
                      className="transition-colors duration-500"
                      style={{
                        color: visibleCards[index] ? "#583CF2" : "#9CA3AF",
                      }}
                    >
                      {card.icon || defaultIcons[index % defaultIcons.length]}
                    </span>
                  </div>

                  {/* Card - 지그재그 배치, 중앙선에서 떨어뜨리기 */}
                  <div
                    className={`w-2/5 bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-700 overflow-hidden hover:-translate-y-2 ${
                      visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    } ${index % 2 === 1 ? "mr-16" : "ml-16"}`}
                    style={{
                      transitionDelay: visibleCards[index] ? `${index * 150 + 200}ms` : "0ms",
                    }}
                  >
                    <div className="p-8">
                      <div className={`flex items-center gap-8 ${index % 2 === 1 ? "flex-row-reverse" : ""}`}>
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{card.title}</h3>
                          <p className="text-lg text-gray-600 leading-relaxed">{card.description}</p>
                        </div>
                        <div className="w-48 h-36 relative flex-shrink-0 rounded-lg overflow-hidden">
                          <img
                            src={card.image || "/placeholder.svg"}
                            alt={card.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 사용 예시
export default function SimpleTimeline() {
  const cardData = [
    {
      title: "초기 비용 없이 시작",
      description: "설치비 0원, 조명 인프라를 스마트하게 전환",
      image: "/placeholder.svg?height=200&width=300&text=Warehouse",
    },
    {
      title: "IoT 기반 지능형 조명 제어",
      description: "어플로 조도·사용 실시간 감지 & 자동 제어",
      image: "/placeholder.svg?height=200&width=300&text=Mobile+App",
    },
    {
      title: "에너지 절감 + 전기요금 절약",
      description: "전력 낭비 방지 및 피크 시간대 요금 전략 대응",
      image: "/placeholder.svg?height=200&width=300&text=Analytics",
    },
  ]

  return <TimelineCards cards={cardData} />
}
