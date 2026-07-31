"use client"

import { Zap, Shield, Cpu } from "lucide-react"
import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { headingVariants, Text } from "@/components/ui/typography"
import nextDynamic from "next/dynamic"

const CountUp = nextDynamic(() => import("react-countup"), {
  ssr: false,
})

export default function PricingSection() {
  const t = useTranslations("home")

  const { ref: costRef, inView: costInView } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  })

  // 카드 섹션을 위한 별도의 useInView 추가
  const { ref: cardsRef, inView: cardsInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  // 실제 가격 데이터로 변경 (애니메이션 효과를 보기 위해)
  const pricingData = [
    { title: t("price1Title"), subtitle: t("price1Sub"), price: 1500000, unit: t("wonUnit"), icon: Cpu },
    { title: t("price2Title"), subtitle: " ", price: 800000, unit: t("wonUnit"), icon: Shield },
    { title: t("price3Title"), subtitle: " ", price: 200000, unit: t("wonUnit"), icon: Zap },
    { title: t("price4Title"), subtitle: " ", price: 1200000, unit: t("wonUnit"), icon: Cpu },
    { title: t("price5Title"), subtitle: t("price5Sub"), price: 500000, unit: t("wonUnit"), icon: Shield },
  ]

  return (
    <section className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto py-16 sm:py-24 lg:py-32">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2
            ref={costRef}
            className={cn(headingVariants({ variant: "section" }), "mb-4 sm:mb-6")}
          >
            {t("costPrefix")}{costInView && <CountUp start={1000000} end={0} duration={2} separator="," />}{t("wonUnit")}
          </h2>
          <Text as="p" variant="subtitle-lg" color="muted">{t("pricingSubtitle")}</Text>
        </div>

        {/* Cards Grid - 6 column grid for offset positioning */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-4">
          {pricingData.map((item, idx) => {
            return (
              <Card
                key={idx}
                className={`
                  border border-gray-200 shadow-lg transition-all duration-300 bg-white group
                  hover:shadow-xl hover:scale-105 hover:border-[#583CF2]/20
                  ${
                    idx <= 2
                      ? "lg:col-span-2"
                      : idx === 3
                        ? "lg:col-start-2 lg:col-span-2"
                        : "lg:col-start-4 lg:col-span-2"
                  }
                `}
              >
                <CardContent className="p-6 sm:p-8 text-center h-full flex flex-col justify-between">
                  <div className="space-y-3 sm:space-y-4">
                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#583CF2]/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto group-hover:bg-[#583CF2]/20 transition-colors duration-300">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Title and Subtitle */}
                    <div className="min-h-[3rem] sm:min-h-[3.5rem] flex flex-col justify-center">
                      <h3 className="text-base sm:text-lg font-semibold text-content-strong leading-tight">{item.title}</h3>
                      {item.subtitle && item.subtitle.trim() && (
                        <p className="text-xs sm:text-sm text-content-subtle mt-1 leading-tight">{item.subtitle}</p>
                      )}
                    </div>

                    {/* Price with Animation */}
                    <div className="pt-2">
                      <p className="text-xl sm:text-2xl font-bold text-primary group-hover:text-[#4c35d1] transition-colors duration-300">
                        {cardsInView ? (
                          <CountUp
                            start={item.price}
                            end={0}
                            duration={2} // 2.5에서 2로 변경 (헤더와 동일하게)
                            delay={0} // idx * 0.2에서 0으로 변경 (동시 시작)
                            separator=","
                          />
                        ) : (
                          item.price.toLocaleString()
                        )}
                        {item.unit}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 sm:mt-12 lg:mt-16">
          <p className="text-xs sm:text-sm text-content-subtle">{t("priceNote")}</p>
        </div>
      </div>
    </section>
  )
}
