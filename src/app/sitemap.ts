// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE = "https://www.merlotlab.com";

// as-needed 전략: 기본어(ko)는 접두어 없음, 영문은 /en 접두어.
// 각 경로마다 alternates.languages로 hreflang을 선언한다.
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: Array<{
    path: string;
    changeFrequency: "daily" | "weekly" | "monthly";
    priority: number;
  }> = [
    { path: "", changeFrequency: "daily", priority: 1.0 },
    { path: "/solutions", changeFrequency: "weekly", priority: 0.9 }, // EMS 솔루션
    { path: "/cases", changeFrequency: "weekly", priority: 0.8 }, // 도입 사례
    { path: "/about", changeFrequency: "monthly", priority: 0.7 }, // 회사 소개
    { path: "/ir/disclosures", changeFrequency: "monthly", priority: 0.7 }, // IR Center
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
