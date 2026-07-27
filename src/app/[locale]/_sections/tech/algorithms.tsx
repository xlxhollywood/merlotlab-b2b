"use client"

import { useTranslations } from "next-intl"
import AlgorithmBlock from "./algorithm-block"

// 3개 알고리즘 블록 데이터 + 번역 → AlgorithmBlock 렌더
export default function TechAlgorithms() {
  const t = useTranslations("tech")
  const br = () => <br />
  // 긴 제목: 모바일에서만 마지막 단어 앞에서 줄바꿈 (데스크톱은 한 줄)
  const withMobileBreak = (text: string) => {
    const i = text.lastIndexOf(" ")
    if (i < 0) return text
    return (
      <>
        {text.slice(0, i)}
        <br className="sm:hidden" /> {text.slice(i + 1)}
      </>
    )
  }

  const blocks = [
    {
      id: "mesh",
      title: t("meshTitle"),
      subtitle: t("meshSubtitle"),
      chips: [t("meshChip1"), t("meshChip2"), t("meshChip3"), t("meshChip4"), t("meshChip5")],
      image: { src: "/images/tech/3-algo-1.png", alt: t("meshTitle"), width: 930, height: 403, maxW: "900px" },
      descBlocks: [t.rich("meshDesc1", { br }), t.rich("meshDesc2", { br })],
    },
    {
      id: "flooding",
      title: withMobileBreak(t("floodingTitle")),
      subtitle: t("floodingSubtitle"),
      chips: [t("floodingChip1"), t("floodingChip2"), t("floodingChip3"), t("floodingChip4")],
      image: { src: "/images/tech/3-algo-2.png", alt: t("floodingTitle"), width: 855, height: 452, maxW: "820px" },
      descBlocks: [t.rich("floodingDesc1", { br }), t.rich("floodingDesc2", { br })],
    },
    {
      id: "anchor",
      title: t("anchorTitle"),
      subtitle: t("anchorSubtitle"),
      chips: [t("anchorChip1"), t("anchorChip2"), t("anchorChip3"), t("anchorChip4")],
      image: { src: "/images/tech/3-algo-3.png", alt: t("anchorTitle"), width: 1056, height: 369, maxW: "1000px" },
      descBlocks: [t.rich("anchorDesc1", { br }), t.rich("anchorDesc2", { br })],
    },
  ]

  return (
    <>
      {blocks.map(({ id, ...b }) => (
        <AlgorithmBlock key={id} {...b} />
      ))}
    </>
  )
}
