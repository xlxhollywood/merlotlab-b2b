import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/config/site";
import CasesShowcase from "../_sections/cases/cases-showcase";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const koUrl = `${SITE_URL}/cases`;
  const enUrl = `${SITE_URL}/en/cases`;
  return {
    title: t("nav.cases"),
    description: t("cases.metaDescription"),
    alternates: {
      canonical: locale === "en" ? enUrl : koUrl,
      languages: { ko: koUrl, en: enUrl },
    },
  };
}

export default function UseCases() {
  return (
    <main className="min-h-screen">
      <CasesShowcase />
    </main>
  );
}
