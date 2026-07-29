"use client"

import { useEffect, useRef, useState } from "react"

interface FadeInUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
  /** @deprecated 비율(threshold)은 뷰포트보다 큰 블록에서 발동하지 않음. 기본 가장자리 트리거를 사용. */
  threshold?: number
  rootMargin?: string
}

export default function FadeInUp({
  children,
  delay = 300,
  className = "",
  // 가장자리 트리거: 요소 크기와 무관하게 상단이 화면에 들어오면 발동 (tall-block 안전).
  // 이전 기본값(0.3)은 뷰포트보다 큰 블록을 영영 숨기는 버그가 있어 제거.
  rootMargin = "0px 0px -12% 0px",
}: FadeInUpProps) {
  const [inView, setInView] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 모션 축소 선호 시 애니메이션 없이 즉시 표시 (접근성 + 영구숨김 폴백)
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true)
      return
    }

    const el = elementRef.current
    if (!el) return

    // IntersectionObserver 미지원 환경 폴백: 즉시 표시
    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }

    let timer: ReturnType<typeof setTimeout> | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timer = setTimeout(() => setInView(true), delay)
            observer.disconnect()
          }
        })
      },
      { threshold: 0, rootMargin }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timer) clearTimeout(timer)
    }
  }, [delay, rootMargin])

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  )
}
