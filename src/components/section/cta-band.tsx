"use client"

import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/navigation"

// eyebrow + heading 2줄형 CTA 밴드 (tech/ems/rtls 공용). 문구는 props로 받아 재사용.
export default function CtaBand({
  eyebrow,
  heading,
  buttonLabel,
  href,
}: {
  eyebrow?: string
  heading: string
  buttonLabel: string
  href: string
}) {
  return (
    <section className="w-full bg-primary py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-5 sm:gap-6">
        {eyebrow && <p className="text-lg sm:text-3xl font-bold text-white/90">{eyebrow}</p>}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight font-bold break-keep">{heading}</h2>
        <Link
          href={href}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 sm:px-8 h-12 sm:h-14 text-base sm:text-lg font-medium text-zinc-800 shadow-sm transition-colors hover:bg-gray-50"
        >
          {buttonLabel}
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
      </div>
    </section>
  )
}
