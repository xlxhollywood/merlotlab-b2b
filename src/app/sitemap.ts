// app/sitemap.ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.merlotlab.com", changeFrequency: "daily", priority: 1.0 },
    { url: "https://www.merlotlab.com/solutions", changeFrequency: "weekly", priority: 0.9 },        // EMS 솔루션
    { url: "https://www.merlotlab.com/cases",     changeFrequency: "weekly", priority: 0.8 },        // 도입 사례
    { url: "https://www.merlotlab.com/about",     changeFrequency: "monthly", priority: 0.7 },       // 회사 소개
    { url: "https://www.merlotlab.com/ir/disclosures", changeFrequency: "monthly", priority: 0.7 },  // IR Center
  ];
}
