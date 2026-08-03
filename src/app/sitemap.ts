// app/sitemap.ts
import type { MetadataRoute } from "next";
import { SITE_URL as BASE } from "@/config/site";

// as-needed 전략: 기본어(ko)는 접두어 없음, 영문은 /en 접두어.
// 각 경로마다 alternates.languages로 hreflang을 선언한다.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
  }> = [
    { path: "", changeFrequency: "daily", priority: 1.0 }, // 홈
    { path: "/solutions/ems", changeFrequency: "weekly", priority: 0.9 }, // EMS 솔루션 (/solutions는 여기로 308)
    { path: "/solutions/rtls", changeFrequency: "weekly", priority: 0.9 }, // RTLS 솔루션
    { path: "/tech", changeFrequency: "monthly", priority: 0.8 }, // 기술 소개
    { path: "/cases", changeFrequency: "weekly", priority: 0.8 }, // 도입 사례
    { path: "/about", changeFrequency: "monthly", priority: 0.7 }, // 회사 소개
    { path: "/contact", changeFrequency: "monthly", priority: 0.6 }, // 도입 문의
    { path: "/ir/disclosures", changeFrequency: "monthly", priority: 0.7 }, // IR - 공시정보
    { path: "/ir/notices", changeFrequency: "monthly", priority: 0.7 }, // IR - 공고사항
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE}${path}`,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        ko: `${BASE}${path}`,
        en: `${BASE}/en${path}`,
      },
    },
  }));
}
