"use client"

import type React from "react"

export const dynamic = "force-dynamic"

import { Package, Factory, Car, Users, ArrowRight } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import SplitText from "@/components/animation/split-text"
import FadeInUp from "@/components/animation/fade-in-up"
import Image from "next/image"
import CompanyStrengths from "@/components/card/company-strength"

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

function SolutionItem({
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

function SmartphoneSection() {
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

export default function Solutions() {
  const t = useTranslations("solutions")
  const tCta = useTranslations("cta")

  const br = () => <br />
  const solutionData = [
    {
      title: t("logisticsTitle"),
      description: t.rich("logisticsDesc", { br }),
      imageSrc: "/images/solutions/logistics.png",
      imageAlt: t("logisticsAlt"),
      imageWidth: 450,
      badgeText: t("logisticsBadge"),
      badgeIcon: <Package className="w-4 h-4 text-primary" />,
    },
    {
      title: t("factoryTitle"),
      description: t.rich("factoryDesc", { br }),
      imageSrc: "/images/solutions/factory.png",
      imageAlt: t("factoryAlt"),
      imageWidth: 450,
      reverse: true,
      badgeText: t("factoryBadge"),
      badgeIcon: <Factory className="w-4 h-4 text-primary" />,
    },
    {
      title: t("parkingTitle"),
      description: t.rich("parkingDesc", { br }),
      imageSrc: "/images/solutions/parking.png",
      imageAlt: t("parkingAlt"),
      imageWidth: 450,
      badgeText: t("parkingBadge"),
      badgeIcon: <Car className="w-4 h-4 text-primary" />,
    },
    {
      title: t("officeTitle"),
      description: t.rich("officeDesc", { br }),
      imageSrc: "/images/solutions/office.png",
      imageAlt: t("officeAlt"),
      imageWidth: 450,
      reverse: true,
      badgeText: t("officeBadge"),
      badgeIcon: <Users className="w-4 h-4 text-primary" />,
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      {/* 사업장 유형별 솔루션: 물류센터, 제조시설, 주차장, 사무실 */}
      <section className="mb-12 sm:mb-16 md:mb-24 lg:mb-8 px-4 sm:px-5 rounded">
        <div className="max-w-[1120px] mt-32 mx-auto flex flex-col gap-40 sm:gap-40 md:gap-40">
          <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[50px] md:leading-[60px] text-center text-gray-700">
              <FadeInUp delay={300}>
                <div className="m-0">{t("heading1")}</div>
              </FadeInUp>
              <FadeInUp delay={600}>
                <div className="m-0">
                  <span className="text-primary">{t("heading2")}</span>
                </div>
              </FadeInUp>
            </div>
          </div>

          <div>
            {solutionData.map((item, index) => (
              <FadeInUp key={index} delay={200 + index * 80}>
                <SolutionItem
                  title={item.title}
                  description={item.description}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  imageWidth={item.imageWidth}
                  reverse={item.reverse}
                  badgeText={item.badgeText}
                  badgeIcon={item.badgeIcon}
                />
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* 스마트폰 섹션: 에너지 손실 최소화 */}
      <SmartphoneSection />

      {/* 핵심 가치 섹션: 회사 강점 */}
      <section className="bg-white sm:py-20 md:py-24 lg:py-32 px-4 sm:px-5 pb-16">
        <div className="text-center mb-24 sm:mb-32 md:mb-40 gap-32 pt-16 sm:pt-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight sm:leading-[50px] md:leading-[60px] text-center text-gray-700">
            <FadeInUp delay={200}>
              <span className="block">{t("valuesHeading1")}</span>
            </FadeInUp>
            <FadeInUp delay={400}>
              <span className="text-primary">{t("valuesHeading2")}</span>
            </FadeInUp>
          </h2>
        </div>
        <FadeInUp delay={600}>
          <CompanyStrengths />
        </FadeInUp>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-white bg-primary">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{tCta("title")}</div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                {tCta("subtitle")}
              </h2>
            </div>
            <Link href="/?tab=business" className="no-underline">
              <button className="shadow-sm rounded-lg bg-white border border-gray-200 h-12 sm:h-14 flex items-center justify-center py-2 px-6 sm:px-8 gap-2 text-sm sm:text-base md:text-lg text-zinc-800 hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="leading-7 font-medium">{tCta("button")}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
