"use client"

import Image from "next/image"
import FadeInUp from "@/components/animation/fade-in-up"
import { Heading, Text } from "@/components/ui/typography"

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
      {/* 이미지:텍스트 = 5:3, 넓은 거터 (피그마 비율) — reverse 행은 트랙을 좌우 반전 */}
      <div
        className={`grid grid-cols-1 items-center gap-8 lg:gap-24 xl:gap-44 ${
          reverse ? "lg:grid-cols-[3fr_5fr]" : "lg:grid-cols-[5fr_3fr]"
        }`}
      >
        {/* 이미지 */}
        <div className={`relative w-full aspect-[650/432] overflow-hidden rounded-2xl ${reverse ? "lg:order-2" : ""}`}>
          <Image src={image} alt={imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
        {/* 텍스트: reverse 행은 블록을 이미지 쪽(우측)으로 붙이고 바깥쪽에 여백을 남김 (피그마) */}
        <div className={reverse ? "lg:order-1 lg:ml-auto lg:w-fit lg:max-w-full" : ""}>
          <Text as="p" variant="eyebrow" color="brand">{eyebrow}</Text>
          <Heading as="h3" variant="subSection" className="mt-2">{title}</Heading>
          <ul className="mt-5 space-y-2.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-lg text-content-muted">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                <Text as="p" variant="subtitle-lg" color="default">{b}</Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FadeInUp>
  )
}
