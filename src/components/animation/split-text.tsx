// components/animations/SplitText.tsx
"use client"

import { useEffect, useRef, useState } from "react"

interface SplitTextProps {
  text: string
  delay?: number
  staggerDelay?: number
  className?: string
}

const SplitText = ({ text, delay = 0, staggerDelay = 50, className = "" }: SplitTextProps) => {
  const [inView, setInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

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
      { threshold: 0.6 },
    )

    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [delay, hasTriggered])

  return (
    <span ref={elementRef} className={className}>
      {text.split("").map((char: string, index: number) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ease-out ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: inView ? `${index * staggerDelay}ms` : "0ms",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  )
}

export default SplitText
