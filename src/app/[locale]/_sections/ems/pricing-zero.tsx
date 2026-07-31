"use client"

import { Cpu, Wrench, Wifi, Server, ShieldCheck } from "lucide-react"
import { useTranslations } from "next-intl"
import { useInView } from "react-intersection-observer"
import nextDynamic from "next/dynamic"
import FadeInUp from "@/components/animation/fade-in-up"

// react-countup는 클라이언트 전용 — SSR/최초엔 정적 금액을 보여주고, 뷰 진입 시 0으로 카운트다운
const CountUp = nextDynamic(() => import("react-countup"), { ssr: false })

// 초기 투자 비용 0원 (docs/renewal/EMS 솔루션.png §7): 5카드(3+2), 각 항목 금액 → 0원 카운트 애니메이션
export default function EmsPricingZero() {
  const t = useTranslations("ems")
  // 단위("원" / " KRW")는 "0원" / "0 KRW"에서 선두 0을 뗀 값
  const unit = t("priceZero").replace("0", "")

  const items = [
    { icon: Cpu, title: t("price1Title"), sub: t("price1Sub"), amount: 1500000 },
    { icon: Wrench, title: t("price2Title"), amount: 800000 },
    { icon: Wifi, title: t("price3Title"), amount: 200000 },
    { icon: Server, title: t("price4Title"), amount: 1200000 },
    { icon: ShieldCheck, title: t("price5Title"), sub: t("price5Sub"), amount: 500000 },
  ]

  // 카드 묶음이 뷰에 들어오면 모든 금액이 동시에 0원으로 카운트
  const { ref: cardsRef, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  const Card = ({ item }: { item: (typeof items)[number] }) => {
    const Icon = item.icon
    return (
      <div className="flex flex-col items-center rounded-2xl bg-white p-6 lg:p-8 text-center shadow-[0_12px_24px_-8px_rgba(17,17,26,0.16),0_2px_8px_-2px_rgba(17,17,26,0.06)]">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </span>
        <h3 className="mt-4 text-base sm:text-lg font-bold text-content">{item.title}</h3>
        {item.sub && <p className="mt-1 text-xs text-content-faint">{item.sub}</p>}
        <p className="mt-auto pt-4 text-xl font-bold text-primary">
          {inView ? (
            <CountUp start={item.amount} end={0} duration={2} separator="," suffix={unit} />
          ) : (
            <>
              {item.amount.toLocaleString()}
              {unit}
            </>
          )}
        </p>
      </div>
    )
  }

  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <FadeInUp delay={200}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-content">{t("pricingTitle")}</h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-content-subtle break-keep">{t("pricingSubtitle")}</p>
          </div>
        </FadeInUp>

        <FadeInUp delay={300}>
          {/* 카드 하단 포커스 그림자가 다음 카드에 가려지지 않도록 간격 확보 */}
          <div ref={cardsRef}>
            <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {items.slice(0, 3).map((item) => (
                <Card key={item.title} item={item} />
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:max-w-[calc(66.666%-0.5rem)] sm:mx-auto">
              {items.slice(3).map((item) => (
                <Card key={item.title} item={item} />
              ))}
            </div>
          </div>
          <p className="mt-8 text-center text-xs text-content-faint">{t("pricingNote")}</p>
        </FadeInUp>
      </div>
    </section>
  )
}
