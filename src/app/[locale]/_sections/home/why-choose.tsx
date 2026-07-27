"use client"

import { TrendingUp } from "lucide-react"
import { useTranslations } from "next-intl"
import SplitText from "@/components/animation/split-text"

export default function WhyChooseSection({ onQuoteClick }: { onQuoteClick: () => void }) {
  const t = useTranslations("home")
  const br = () => <br />

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center space-y-6 sm:space-y-8">
          <div className="space-y-4 pt-12 sm:pt-16 lg:pt-20">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-700 leading-tight">
              {t.rich("whyChoose", {
                brand: () => (
                  <span className="text-[#583CF2]">
                    <SplitText text={t("brandName")} delay={400} />
                  </span>
                ),
                br,
              })}
            </h1>
          </div>
          <div className="max-w-2xl lg:max-w-4xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed px-4 sm:px-0">
              {t("whyDesc1")}<br />
              <span className="block mt-10 text-sm sm:inline sm:mt-0 sm:text-xl">{t("whyDesc2")}</span>
            </p>


            <button
              onClick={onQuoteClick}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-5 bg-[#583CF2]/5 rounded-xl sm:rounded-2xl hover:bg-[#583CF2]/10 transition-colors duration-300"
            >
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#583CF2]" />
              <span className="text-[#583CF2] font-semibold text-sm sm:text-base">{t("quoteButton")}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
