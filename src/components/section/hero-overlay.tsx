"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/navigation"

// 풀블리드 배너형 Hero (tech·about·ems·rtls 공용). 배경 이미지에 좌측 텍스트 오버레이.
// variant: "dark" = 어두운 사진 + 흰 텍스트(tech/about), "light" = 밝은 배경 이미지 + 어두운 텍스트(ems/rtls).
export default function HeroOverlay({
  image,
  imageAlt,
  eyebrow,
  title,
  subtitle,
  action,
  variant = "dark",
  heightClass = "min-h-[440px] sm:min-h-[520px] lg:min-h-[600px]",
}: {
  image: string
  imageAlt: string
  eyebrow?: string
  title: string
  subtitle: React.ReactNode
  action?: { label: string; href: string }
  variant?: "dark" | "light"
  heightClass?: string
}) {
  const isLight = variant === "light"

  return (
    <section className={`relative w-full ${heightClass} overflow-hidden`}>
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      {!isLight && <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />}

      <div className={`relative z-10 max-w-[1880px] mx-auto flex ${heightClass} items-center px-6 sm:px-10 lg:px-20 2xl:px-48`}>
        <div className="max-w-2xl">
          {eyebrow && (
            <p className={`text-sm sm:text-base font-medium ${isLight ? "text-gray-500" : "text-white/80"}`}>{eyebrow}</p>
          )}
          <h1 className={`mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${isLight ? "text-gray-900" : "text-white"}`}>
            {title}
          </h1>
          <p className={`mt-4 text-sm sm:text-base lg:text-lg ${isLight ? "text-gray-600" : "text-white/85"}`}>{subtitle}</p>
          {action && (
            <Link
              href={action.href}
              className="mt-7 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 sm:px-6 h-11 sm:h-12 text-sm sm:text-base font-medium text-zinc-800 shadow-sm transition-colors hover:bg-gray-50"
            >
              {action.label}
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
