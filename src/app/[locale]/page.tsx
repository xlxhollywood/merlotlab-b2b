// src/app/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import LandingClient from "./page.client";
import { SITE_URL } from "@/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const koUrl = SITE_URL;
  const enUrl = `${SITE_URL}/en`;
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: locale === "en" ? enUrl : koUrl,
      languages: { ko: koUrl, en: enUrl },
    },
  };
}

export default function Page() {
  return (
    <>
      {/* Sitelinks 힌트 */}
      <Script id="ld-sitenav" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
              { "@type": "SiteNavigationElement", "name": "EMS 솔루션", "url": "https://www.merlotlab.com/solutions" },
              { "@type": "SiteNavigationElement", "name": "도입 사례", "url": "https://www.merlotlab.com/cases" },
              { "@type": "SiteNavigationElement", "name": "회사 소개", "url": "https://www.merlotlab.com/about" },
              { "@type": "SiteNavigationElement", "name": "IR Center", "url": "https://www.merlotlab.com/ir/disclosures" }
            ]
          })
        }}
      />

      {/* Organization */}
      <Script id="ld-organization" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "메를로랩",
            "url": "https://www.merlotlab.com",
            "logo": "https://www.merlotlab.com/favicon.png",
            "sameAs": []
          })
        }}
      />

      {/* WebSite + SearchAction (검색창 없으면 유지해도 무방) */}
      <Script id="ld-website" type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "메를로랩",
            "url": "https://www.merlotlab.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.merlotlab.com/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

      <LandingClient />
    </>
  );
}
