"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import FadeInUp from "@/components/animation/fade-in-up"

// "~란?" 제품 소개 (rtls/ems 공용): 중앙 제목(보라) + 부제 + 체크칩 + 중앙 디바이스 목업.
export default function ProductIntro({
  title,
  subtitle,
  chips,
  image,
  imageAlt,
  imageMaxW = "820px",
}: {
  title: React.ReactNode
  subtitle: React.ReactNode
  chips: string[]
  image: string
  imageAlt: string
  imageMaxW?: string
}) {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <FadeInUp delay={200}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 break-keep">{title}</h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed break-keep">{subtitle}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {chips.map((chip) => (
                <span key={chip} className="inline-flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <span className="text-sm text-gray-600">{chip}</span>
                </span>
              ))}
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="mt-10 sm:mt-12 mx-auto" style={{ maxWidth: imageMaxW }}>
            <Image src={image} alt={imageAlt} width={894} height={409} className="w-full h-auto" sizes={`(max-width: 768px) 100vw, ${imageMaxW}`} />
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
