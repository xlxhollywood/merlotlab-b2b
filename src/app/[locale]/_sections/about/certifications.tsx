"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import FadeInUp from "@/components/animation/fade-in-up"

const CARD_SHADOW =
  "shadow-[0_12px_24px_-8px_rgba(17,17,26,0.16),0_2px_8px_-2px_rgba(17,17,26,0.06)]"

export default function CertificationsSection() {
  const t = useTranslations("about")

  // 특허 통계 (가로형 2카드)
  const stats = [
    { flag: "🇰🇷", label: t("patentDomestic"), value: "21", unit: t("unitCase") },
    { flag: "🌍", label: t("patentInternational"), value: "9", unit: t("unitCase") },
  ]

  // 인증서 10종 (cert-1 ~ cert-10.webp), 캡션은 로케일별 cert1~cert10
  const certifications = Array.from({ length: 10 }, (_, i) => ({
    title: t(`cert${i + 1}`),
    image: `/images/about/cert-${i + 1}.webp`,
  }))

  return (
    <section className="relative w-full px-4 sm:px-6 lg:px-8 bg-gray-50 pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
      <div className="max-w-6xl mx-auto">
        <FadeInUp delay={300}>
          <div className="text-center text-gray-700 mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t("certSectionTitle")}</h2>
            <p className="text-base sm:text-lg text-gray-600 px-4 break-keep">{t("certSectionDesc")}</p>
          </div>
        </FadeInUp>

        {/* 특허 통계 — 가로형 2카드 (아이콘·라벨 좌 / 숫자 우) */}
        <FadeInUp delay={600}>
          <div className="mb-12 sm:mb-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`flex items-center justify-between rounded-xl bg-white px-6 py-5 sm:px-8 sm:py-6 ${CARD_SHADOW}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-3xl">{s.flag}</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-700">{s.label}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-bold text-[#583CF2]">{s.value}</span>
                  {s.unit && <span className="text-sm text-gray-700">{s.unit}</span>}
                </div>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* 인증서 — width에 따라 유동 반응형 그리드 (캐러셀 없음, 아래로 나열) */}
        <FadeInUp delay={600}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-10">
            {certifications.map((cert) => (
              <figure key={cert.image} className="flex flex-col">
                <div className="relative aspect-[800/1131] w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 380px"
                    className="object-contain"
                  />
                </div>
                <figcaption className="mt-3 text-center font-bold text-base text-black break-keep">{cert.title}</figcaption>
              </figure>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
