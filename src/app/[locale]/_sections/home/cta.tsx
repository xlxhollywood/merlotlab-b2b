"use client"

import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export default function HomeCtaSection() {
  const t = useTranslations("home")

  return (
    <section className="w-full relative bg-[#583cf2] flex flex-col items-center justify-start py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
      <div className="w-full max-w-4xl flex flex-col items-center justify-start">
        <div className="flex flex-col items-center justify-start gap-6 sm:gap-8">
          <div className="flex flex-col items-center justify-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-bold px-4">
              {t("ctaQuestion")}
            </h2>
          </div>
          <button className="shadow-sm rounded-lg bg-white border border-gray-200 h-12 sm:h-14 flex items-center justify-center py-2 px-6 sm:px-8 gap-2 text-base sm:text-lg text-zinc-800 hover:bg-gray-50 transition-colors cursor-pointer">
            <Link href="/cases" className="no-underline">
              <div className="flex items-center gap-2">
                <span className="leading-7 font-medium">{t("viewCases")}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </Link>
          </button>
        </div>
      </div>
    </section>
  )
}
