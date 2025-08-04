// src/app/page.tsx  ✅ 서버 컴포넌트 (use client 없음)
import type { Metadata } from "next";
import Script from "next/script";
import LandingClient from "./page.client";

export const metadata: Metadata = {
  title: "메를로랩",
  description:
    "EMS 솔루션 · 도입 사례 · 회사 소개 · IR Center — 설비 환경 분석부터 현장 최적화된 에너지 운영까지, 절감의 패러다임을 바꿉니다.",
  alternates: { canonical: "https://www.merlotlab.com" },
};

export default function Page() {
  return (
    <>
      {/* sitelinks를 4개로 신호 */}
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
      <LandingClient />
    </>
  );
}
