import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// 디자인 시스템 타이포 프리미티브 (docs/design-system/01-tokens.md).
// 값 변경은 여기 한 곳만 고치면 전역 반영. 한글 어절 유지(break-keep) 기본 내장.
// ⚠️ 정확 px는 파일럿(P2)에서 Figma Dev Mode로 확정 예정.

const headingVariants = cva("font-bold break-keep", {
  variants: {
    variant: {
      display: "text-4xl sm:text-5xl lg:text-6xl", // 페이지 인트로 대제목 (~60px)
      hero: "text-3xl sm:text-4xl lg:text-5xl", // 배너형 히어로 H1 (hero-overlay·contact 공통)
      section: "text-3xl/snug sm:text-4xl/snug lg:text-5xl/snug", // 표준 섹션 제목 (~48px, 줄바꿈 대비 line-height 내장)
      subSection: "text-2xl/snug sm:text-3xl/snug lg:text-4xl/snug", // 서브섹션 제목 (feature-row 등, ~36px)
      card: "text-xl sm:text-2xl", // 카드 h3
      cardSmall: "text-lg sm:text-xl", // 카드 h4
    },
    color: {
      default: "text-content",
      strong: "text-content-strong",
      brand: "text-primary",
      white: "text-white",
    },
  },
  defaultVariants: { variant: "section", color: "default" },
})

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3" | "h4"
  }

function Heading({ className, variant, color, as: Tag = "h2", ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ variant, color }), className)} {...props} />
}

const textVariants = cva("break-keep", {
  variants: {
    variant: {
      "subtitle-lg": "text-lg/loose sm:text-xl/loose lg:text-2xl/loose", // home/인트로 부제 (~24px, line-height 내장)
      subtitle: "text-base/loose sm:text-lg/loose lg:text-xl/loose", // 표준 부제 (~18-20px)
      body: "text-base sm:text-lg leading-relaxed", // 본문 문단
      "body-sm": "text-base leading-relaxed", // 카드 본문
      eyebrow: "text-base font-semibold", // STEP·라벨
    },
    color: {
      default: "text-content",
      muted: "text-content-muted",
      subtle: "text-content-subtle",
      faint: "text-content-faint",
      brand: "text-primary",
      white: "text-white",
    },
  },
  defaultVariants: { variant: "body", color: "muted" },
})

type TextProps = React.HTMLAttributes<HTMLParagraphElement> &
  VariantProps<typeof textVariants> & {
    as?: "p" | "span" | "div"
  }

function Text({ className, variant, color, as: Tag = "p", ...props }: TextProps) {
  return <Tag className={cn(textVariants({ variant, color }), className)} {...props} />
}

export { Heading, Text, headingVariants, textVariants }
