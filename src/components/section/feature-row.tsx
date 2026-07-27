"use client"

import Image from "next/image"
import FadeInUp from "@/components/animation/fade-in-up"

// 기능 소개 행 (rtls/ems 공용): 이미지 + 텍스트(eyebrow/title/불릿), reverse로 좌우 교대.
export default function FeatureRow({
  eyebrow,
  title,
  bullets,
  image,
  imageAlt,
  reverse = false,
}: {
  eyebrow: string
  title: string
  bullets: string[]
  image: string
  imageAlt: string
  reverse?: boolean
}) {
  return (
    <FadeInUp delay={150}>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16">
        {/* 이미지 */}
        <div className={`relative w-full aspect-[650/432] overflow-hidden rounded-2xl ${reverse ? "lg:order-2" : ""}`}>
          <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        {/* 텍스트 */}
        <div className={reverse ? "lg:order-1" : ""}>
          <p className="text-sm font-semibold text-primary">{eyebrow}</p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-800">{title}</h3>
          <ul className="mt-5 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-base text-gray-600">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeInUp>
  )
}
