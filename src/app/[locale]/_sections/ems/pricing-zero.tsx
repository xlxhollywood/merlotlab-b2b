"use client"

import { Cpu, Wrench, Wifi, Server, ShieldCheck } from "lucide-react"
import { useTranslations } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"

// 초기 투자 비용 0원 (docs/renewal/EMS 솔루션.png §7): 5카드(3+2) + 각 0원
export default function EmsPricingZero() {
  const t = useTranslations("ems")

  const items = [
    { icon: Cpu, title: t("price1Title"), sub: t("price1Sub") },
    { icon: Wrench, title: t("price2Title") },
    { icon: Wifi, title: t("price3Title") },
    { icon: Server, title: t("price4Title") },
    { icon: ShieldCheck, title: t("price5Title"), sub: t("price5Sub") },
  ]

  const Card = ({ item }: { item: (typeof items)[number] }) => {
    const Icon = item.icon
    return (
      <div className="flex flex-col items-center rounded-2xl bg-white p-6 lg:p-8 text-center shadow-sm">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </span>
        <h3 className="mt-4 text-base sm:text-lg font-bold text-gray-800">{item.title}</h3>
        {item.sub && <p className="mt-1 text-xs text-gray-400">{item.sub}</p>}
        <p className="mt-4 text-xl font-bold text-primary">{t("priceZero")}</p>
      </div>
    )
  }

  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <FadeInUp delay={200}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">{t("pricingTitle")}</h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-500">{t("pricingSubtitle")}</p>
          </div>
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {items.slice(0, 3).map((item) => (
              <Card key={item.title} item={item} />
            ))}
          </div>
          <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 sm:max-w-[calc(66.666%-0.5rem)] sm:mx-auto">
            {items.slice(3).map((item) => (
              <Card key={item.title} item={item} />
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-gray-400">{t("pricingNote")}</p>
        </FadeInUp>
      </div>
    </section>
  )
}
