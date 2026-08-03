"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"
import { Heading, Text } from "@/components/ui/typography"
import { SectionHeader } from "@/components/layout/section"

// 확장형 플랫폼 4스텝 (docs/renewal/메인.png §2)
export default function PlatformSection() {
  const t = useTranslations("home")
  const hl = (chunks: React.ReactNode) => <span className="text-primary">{chunks}</span>
  const br = () => <br />
  // 모바일 전용 줄바꿈 (데스크톱은 한 줄)
  const mbr = () => <br className="sm:hidden" />

  const steps = [
    { no: "01", icon: "/images/main/2-platform-1.webp", title: t("platform1Title"), descKey: "platform1Desc" },
    { no: "02", icon: "/images/main/2-platform-2.webp", title: t("platform2Title"), descKey: "platform2Desc" },
    { no: "03", icon: "/images/main/2-platform-3.webp", title: t("platform3Title"), descKey: "platform3Desc" },
    { no: "04", icon: "/images/main/2-platform-4.webp", title: t("platform4Title"), descKey: "platform4Desc" },
  ] as const

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeInUp delay={200}>
          <SectionHeader
            title={t.rich("platformTitle", { hl, mbr })}
            subtitle={t.rich("platformSubtitle", { br })}
          />
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {steps.map((step) => (
              <div key={step.no} className="rounded-2xl bg-gray-50 p-6 lg:p-7 text-left">
                <div className="relative w-24 h-24 mx-auto">
                  <Image src={step.icon} alt={step.title} fill sizes="96px" className="object-contain" />
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">{step.no}</span>
                  <Text as="p" variant="subtitle" className="font-bold">{step.title}</Text>
                </div>
                <Text as="p" variant="body" color="subtle" className="mt-2">{t.rich(step.descKey, { br })}</Text>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
