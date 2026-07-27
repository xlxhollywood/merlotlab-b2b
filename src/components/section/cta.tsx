"use client"

import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

// 여러 페이지(about, solutions 등)가 공유하는 CTA 섹션.
// `cta` 네임스페이스(title/subtitle/button)를 사용하고 문의 폼(/?tab=business)으로 이동.
export default function CtaSection() {
  const tCta = useTranslations("cta")

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-white bg-primary">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{tCta("title")}</div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              {tCta("subtitle")}
            </h2>
          </div>
          <Link href="/?tab=business" className="no-underline">
            <button className="shadow-sm rounded-lg bg-white border border-gray-200 h-12 sm:h-14 flex items-center justify-center py-2 px-6 sm:px-8 gap-2 text-sm sm:text-base md:text-lg text-zinc-800 hover:bg-gray-50 transition-colors cursor-pointer">
              <span className="leading-7 font-medium">{tCta("button")}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
