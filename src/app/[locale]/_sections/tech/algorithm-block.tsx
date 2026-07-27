"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import FadeInUp from "@/components/animation/fade-in-up"

export type AlgorithmBlockProps = {
  title: React.ReactNode
  subtitle: string
  chips: string[]
  image: { src: string; alt: string; width: number; height: number; maxW: string }
  descBlocks: React.ReactNode[]
}

// 기술 알고리즘 블록 공통 포맷 (docs/renewal/기술.png §3): 제목→부제→체크칩→다이어그램(중앙)→설명문단
export default function AlgorithmBlock({ title, subtitle, chips, image, descBlocks }: AlgorithmBlockProps) {
  return (
    <section className="w-full bg-white pt-4 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
      <FadeInUp delay={150}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h2>
          <p className="mt-3 text-base sm:text-lg font-semibold text-gray-700">{subtitle}</p>

          {/* 체크 칩 */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {chips.map((chip) => (
              <span key={chip} className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-3 w-3 text-primary" />
                </span>
                <span className="text-sm text-gray-600">{chip}</span>
              </span>
            ))}
          </div>

          {/* 다이어그램 (중앙) */}
          <div className="mt-10 mx-auto" style={{ maxWidth: image.maxW }}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="w-full h-auto"
              sizes={`(max-width: 768px) 100vw, ${image.maxW}`}
            />
          </div>

          {/* 설명 문단 (블록 간 간격) */}
          <div className="mt-10 space-y-6">
            {descBlocks.map((block, i) => (
              <p key={i} className="text-sm sm:text-base text-gray-500 leading-relaxed">
                {block}
              </p>
            ))}
          </div>
        </div>
      </FadeInUp>
    </section>
  )
}
