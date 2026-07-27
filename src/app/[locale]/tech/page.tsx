import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { SITE_URL } from "@/config/site"
import TechHero from "../_sections/tech/hero"
import TechVideo from "../_sections/tech/video"
import TechAlgorithms from "../_sections/tech/algorithms"
import TechCta from "../_sections/tech/cta"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "tech" })
  const koUrl = `${SITE_URL}/tech`
  const enUrl = `${SITE_URL}/en/tech`
  return {
    title: t("heroTitle"),
    description: t("heroSubtitle"),
    alternates: {
      canonical: locale === "en" ? enUrl : koUrl,
      languages: { ko: koUrl, en: enUrl },
    },
  }
}

export default function TechPage() {
  return (
    <div className="w-full">
      <TechHero />
      <TechVideo />
      <TechAlgorithms />
      <TechCta />
    </div>
  )
}
