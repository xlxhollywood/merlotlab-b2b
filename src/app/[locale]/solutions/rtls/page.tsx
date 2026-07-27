import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { SITE_URL } from "@/config/site"
import RtlsHero from "../../_sections/rtls/hero"
import RtlsIntro from "../../_sections/rtls/intro"
import RtlsSteps from "../../_sections/rtls/steps"
import RtlsFeatures from "../../_sections/rtls/features"
import RtlsComponents from "../../_sections/rtls/components-section"
import RtlsReasons from "../../_sections/rtls/reasons"
import RtlsCta from "../../_sections/rtls/cta"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "rtls" })
  const koUrl = `${SITE_URL}/solutions/rtls`
  const enUrl = `${SITE_URL}/en/solutions/rtls`
  return {
    title: t("heroTitle"),
    description: t("heroEyebrow"),
    alternates: {
      canonical: locale === "en" ? enUrl : koUrl,
      languages: { ko: koUrl, en: enUrl },
    },
  }
}

export default function RtlsPage() {
  return (
    <div className="w-full">
      <RtlsHero />
      <RtlsIntro />
      <RtlsSteps />
      <RtlsFeatures />
      <RtlsComponents />
      <RtlsReasons />
      <RtlsCta />
    </div>
  )
}
