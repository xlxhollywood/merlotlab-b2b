"use client"

import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

// 홈 CTA: 단일 헤드라인 + 도입 문의 → /contact (docs/renewal/메인.png §6)
export default function HomeCtaSection() {
  const t = useTranslations("home")

  return (
    <section className="w-full bg-primary py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 sm:gap-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-bold">
          {t("ctaQuestion")}
        </h2>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-medium text-zinc-800 shadow-sm transition-colors hover:bg-gray-50"
        >
          {t("ctaButton")}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </section>
  )
}
