import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { SITE_URL } from "@/config/site"
import EmsHero from "../../_sections/ems/hero"
import EmsIntro from "../../_sections/ems/intro"
import EmsSteps from "../../_sections/ems/steps"
import EmsFeatures from "../../_sections/ems/features"
import EmsSiteTypes from "../../_sections/ems/site-types"
import EmsCostBars from "../../_sections/ems/cost-bars"
import EmsPricingZero from "../../_sections/ems/pricing-zero"
import EmsProcessSteps from "../../_sections/ems/process-steps"
import EmsValues from "../../_sections/ems/values"
import EmsCta from "../../_sections/ems/cta"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "ems" })
  const koUrl = `${SITE_URL}/solutions/ems`
  const enUrl = `${SITE_URL}/en/solutions/ems`
  return {
    title: t("heroTitle"),
    description: t("heroEyebrow"),
    alternates: {
      canonical: locale === "en" ? enUrl : koUrl,
      languages: { ko: koUrl, en: enUrl },
    },
  }
}

export default function EmsPage() {
  return (
    <div className="w-full">
      <EmsHero />
      <EmsIntro />
      <EmsSteps />
      <EmsFeatures />
      <EmsSiteTypes />
      <EmsCostBars />
      <EmsPricingZero />
      <EmsProcessSteps />
      <EmsValues />
      <EmsCta />
    </div>
  )
}
