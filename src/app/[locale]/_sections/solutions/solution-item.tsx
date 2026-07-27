"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import Image from "next/image"

interface SolutionItemProps {
  title: string
  description: React.ReactNode
  imageSrc: string
  imageAlt: string
  imageWidth: number
  reverse?: boolean
  badgeText: string
  badgeIcon: React.ReactNode
}

export default function SolutionItem({
  title,
  description,
  imageSrc,
  imageAlt,
  imageWidth,
  reverse = false,
  badgeText,
  badgeIcon,
}: SolutionItemProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mb-16 sm:mb-20 md:mb-24">
      <div
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "none" : "translateY(20px)",
          transitionDuration: "500ms",
          transitionDelay: "0ms",
          transitionTimingFunction: "linear",
        }}
      >
        <div
          className={`flex flex-col lg:flex-row items-center gap-32 lg:gap-32 xl:gap-56 ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1 flex justify-center">
            <Image
              src={imageSrc || "/images/placeholder.svg"}
              alt={imageAlt}
              width={imageWidth}
              height={300}
              draggable={false}
              className="max-w-full h-auto rounded-3xl"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center gap-2 mb-2 sm:mb-3 justify-center lg:justify-start">
              {badgeIcon}
              <span className="text-primary text-sm sm:text-base font-medium">{badgeText}</span>
            </div>
            <h3
              style={{ color: "#333d4b" }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <p
              style={{ color: "#4e5968" }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 leading-relaxed"
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
