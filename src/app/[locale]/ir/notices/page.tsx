import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { SITE_URL } from "@/config/site"
import NoticesClient from "./page.client"

// client 페이지(page.client.tsx)는 metadata를 export할 수 없어, server 래퍼에서 generateMetadata 제공.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  const koUrl = `${SITE_URL}/ir/notices`
  const enUrl = `${SITE_URL}/en/ir/notices`
  return {
    title: t("ir.tabAnnouncement"),
    description: t("metadata.description"),
    alternates: {
      canonical: locale === "en" ? enUrl : koUrl,
      languages: { ko: koUrl, en: enUrl },
    },
  }
}

export default function Page() {
  return <NoticesClient />
}
