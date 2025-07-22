"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface FadeInUpProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}

export default function FadeInUpText({ children, delay = 0, duration = 0.6, className = "" }: FadeInUpProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay * 1000)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay])

  return (
    <span
      ref={ref}
      className={`inline-block transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </span>
  )
}
