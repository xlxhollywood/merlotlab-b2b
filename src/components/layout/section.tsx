import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Heading, Text } from "@/components/ui/typography"

// 디자인 시스템 레이아웃 프리미티브 (docs/design-system/01-tokens.md).
// 섹션 세로/좌우 패딩·컨테이너 폭·헤더 블록을 한 곳에서 관리.

const sectionVariants = cva("w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8", {
  variants: {
    tone: {
      white: "bg-white",
      subtle: "bg-surface-subtle",
    },
  },
  defaultVariants: { tone: "white" },
})

type SectionProps = React.HTMLAttributes<HTMLElement> & VariantProps<typeof sectionVariants>

function Section({ className, tone, ...props }: SectionProps) {
  return <section className={cn(sectionVariants({ tone }), className)} {...props} />
}

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  narrow?: boolean
}

function Container({ className, narrow = false, ...props }: ContainerProps) {
  return <div className={cn("mx-auto", narrow ? "max-w-4xl" : "max-w-6xl", className)} {...props} />
}

type SectionHeaderProps = {
  title: React.ReactNode
  subtitle?: React.ReactNode
  eyebrow?: React.ReactNode
  as?: "h1" | "h2"
  headingVariant?: "display" | "hero" | "section" | "subSection"
  subtitleVariant?: "subtitle" | "subtitle-lg"
  subtitleColor?: "subtle" | "muted" | "default"
  align?: "center" | "left"
  className?: string
}

// 섹션 타이틀+부제(+eyebrow) 공통 블록. 대부분 섹션 헤더가 이 형태.
// 제목/부제 line-height는 각 variant에 내장(/snug·/loose). 여기선 크기(subtitle-lg 기본)·색·간격만 관리.
function SectionHeader({
  title,
  subtitle,
  eyebrow,
  as = "h2",
  headingVariant = "section",
  subtitleVariant = "subtitle-lg",
  subtitleColor = "subtle",
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow ? (
        <Text as="p" variant="eyebrow" color="brand" className="mb-3">
          {eyebrow}
        </Text>
      ) : null}
      <Heading as={as} variant={headingVariant}>
        {title}
      </Heading>
      {subtitle ? (
        <Text as="p" variant={subtitleVariant} color={subtitleColor} className="mt-6 sm:mt-10">
          {subtitle}
        </Text>
      ) : null}
    </div>
  )
}

export { Section, Container, SectionHeader, sectionVariants }
