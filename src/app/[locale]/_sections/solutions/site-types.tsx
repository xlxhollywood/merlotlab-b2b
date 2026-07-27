"use client"

import { Package, Factory, Car, Users } from "lucide-react"
import { useTranslations } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"
import SolutionItem from "./solution-item"

export default function SiteTypesSection() {
  const t = useTranslations("solutions")

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
  )
}
