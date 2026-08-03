import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/config/site";
import AboutHeroSection from "../_sections/about/hero";
import AboutIntro from "../_sections/about/intro";
import CompanyOverview from "../_sections/about/company-overview";
import DirectionsSection from "../_sections/about/directions";
import AboutHistory from "../_sections/about/history";
import CertificationsSection from "../_sections/about/certifications";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const koUrl = `${SITE_URL}/about`;
  const enUrl = `${SITE_URL}/en/about`;
  return {
    title: t("heroTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: locale === "en" ? enUrl : koUrl,
      languages: { ko: koUrl, en: enUrl },
    },
  };
}

export default function About() {
  return (
    <div>
      <AboutHeroSection />
      <AboutIntro />
      <CompanyOverview />
      <DirectionsSection />
      <AboutHistory />
      <CertificationsSection />
    </div>
  );
}
