import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { SITE_URL } from "@/config/site"
import ContactInquiry from "../_sections/contact/inquiry"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "contact" })
  const koUrl = `${SITE_URL}/contact`
  const enUrl = `${SITE_URL}/en/contact`
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: locale === "en" ? enUrl : koUrl,
      languages: { ko: koUrl, en: enUrl },
    },
  }
}

export default function ContactPage() {
  return (
    <div className="w-full">
      <ContactInquiry />
    </div>
  )
}
