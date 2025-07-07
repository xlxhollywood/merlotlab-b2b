"use client"

import { useEffect, useRef, useState } from "react"

interface FadeInUpProps {
  children: React.ReactNode
  delay?: number
  className?: string
  threshold?: number
  rootMargin?: string
}

export default function FadeInUp({
  children,
  delay = 300,
  className = "",
  threshold = 0.3,
  rootMargin = "0px",
}: FadeInUpProps) {
  const [inView, setInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setHasTriggered(true)
            setTimeout(() => {
              setInView(true)
            }, delay)
          }
        })
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [delay, hasTriggered, threshold, rootMargin])

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  )
}
