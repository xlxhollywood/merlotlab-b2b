"use client"

import Image from "next/image"
import { Check } from "lucide-react"
import FadeInUp from "@/components/animation/fade-in-up"
import { Heading, Text } from "@/components/ui/typography"

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
          <Heading as="h2" variant="section">{title}</Heading>
          <Text as="p" variant="subtitle-lg" color="muted" className="mt-3 font-semibold">{subtitle}</Text>

          {/* 체크 칩 */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {chips.map((chip) => (
              <span key={chip} className="inline-flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Check className="h-4 w-4 text-primary" />
                </span>
                <span className="text-xl text-content-muted">{chip}</span>
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
              <Text key={i} as="p" variant="subtitle" color="subtle" className="break-keep">
                {block}
              </Text>
            ))}
          </div>
        </div>
      </FadeInUp>
    </section>
  )
}
