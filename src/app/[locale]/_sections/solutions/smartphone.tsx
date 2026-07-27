"use client"

import { useEffect, useState, useRef } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import SplitText from "@/components/animation/split-text"

export default function SmartphoneSection() {
  const t = useTranslations("solutions")
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-5 bg-gray-50 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div
          className="text-center mb-16 lg:mb-20"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(-20px)",
            transitionDuration: "600ms",
            transitionDelay: "100ms",
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[50px] md:leading-[60px] text-center text-gray-700">
            <div className="m-0">{t("phoneHeading1")}</div>
            <div className="m-0">
              <span className="text-primary">
                <SplitText text={t("phoneHeading2")} delay={100} />
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="flex justify-center items-center mb-4 lg:mb-0"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(40px)",
              transitionDuration: "800ms",
              transitionDelay: "300ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <div className="relative">
              <Image
                src="/images/solutions/grid-phone.png"
                alt={t("phoneAlt")}
                width={600}
                height={1200}
                className="max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] h-auto drop-shadow-2xl"
                draggable={false}
              />
            </div>
          </div>

          <div
            className="absolute left-24 top-1/2 transform -translate-y-1/2 hidden lg:block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(-50%)" : "translate(-30px, -50%)",
              transitionDuration: "700ms",
              transitionDelay: "400ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <p className="text-xl xl:text-2xl font-bold text-gray-800 leading-relaxed max-w-[250px]">
              <span className="block">{t("phoneLeft1")}</span>
              <span className="block">{t("phoneLeft2")}</span>
              <span className="block text-primary">{t("phoneLeft3")}</span>
            </p>
          </div>

          <div
            className="absolute right-40 top-1/4 transform -translate-y-1/2 hidden lg:block"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(-50%)" : "translate(30px, -50%)",
              transitionDuration: "700ms",
              transitionDelay: "500ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <p className="text-xl xl:text-2xl font-bold text-gray-800 leading-relaxed max-w-[250px] text-right">
              <span className="block">{t("phoneRight1")}</span>
              <span className="block">{t("phoneRight2")}</span>
              <span className="block text-primary">{t("phoneRight3")}</span>
            </p>
          </div>

          <div
            className="text-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "none" : "translateY(20px)",
              transitionDuration: "600ms",
              transitionDelay: "500ms",
              transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              <span className="block">{t("phoneBottom1")}</span>
              <span className="block font-semibold">{t("phoneBottom2")}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
