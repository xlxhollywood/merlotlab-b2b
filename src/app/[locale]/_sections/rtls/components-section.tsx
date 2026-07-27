"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"

// 구성 요소 (docs/renewal/RTLS 솔루션.png §5): 회색 배경 + 2 하드웨어 카드
export default function RtlsComponents() {
  const t = useTranslations("rtls")
  const br = () => <br />

  const cards = [
    { image: "/images/rtls/4-component-1.png", name: t("comp1Name"), desc: t.rich("comp1Desc", { br }) },
    { image: "/images/rtls/4-component-2.png", name: t("comp2Name"), desc: t.rich("comp2Desc", { br }) },
  ]

  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeInUp delay={200}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">{t("componentsTitle")}</h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-500">{t("componentsSubtitle")}</p>
          </div>
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {cards.map((card) => (
              <div key={card.name} className="rounded-2xl bg-white p-6 lg:p-8 shadow-sm">
                <div className="relative mx-auto h-40 w-full">
                  <Image src={card.image} alt={card.name} fill className="object-contain" />
                </div>
                <h3 className="mt-4 text-lg sm:text-xl font-bold text-gray-800">{card.name}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
