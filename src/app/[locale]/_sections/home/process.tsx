"use client"

import { useTranslations } from "next-intl"
import { Card, CardContent } from "@/components/ui/card"
import FadeInUp from "@/components/animation/fade-in-up"

export default function ProcessSection() {
  const t = useTranslations("home")

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <FadeInUp delay={300}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-700 mb-4 sm:mb-6">
              {t("processTitle")}
            </h2>
          </FadeInUp>
          <FadeInUp delay={600}>
            <p className="text-lg sm:text-xl text-gray-600">{t("processSubtitle")}</p>
          </FadeInUp>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {[
            { step: "01", title: t("step1Title"), description: t("step1Desc") },
            { step: "02", title: t("step2Title"), description: t("step2Desc") },
            { step: "03", title: t("step3Title"), description: t("step3Desc") },
            { step: "04", title: t("step4Title"), description: t("step4Desc") },
            { step: "05", title: t("step5Title"), description: t("step5Desc") },
          ].map((item, idx) => (
            <FadeInUp key={item.step /* 또는 key={idx} */} delay={600}>
              <Card className="border border-gray-100 shadow-lg transition-all duration-300 bg-white group">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <div className="text-[#583CF2] text-xl sm:text-2xl lg:text-3xl font-bold">{item.step}</div>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-700">{item.title}</h3>
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
