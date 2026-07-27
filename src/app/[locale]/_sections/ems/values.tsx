"use client"

import { useTranslations } from "next-intl"
import ReasonsGrid from "@/components/section/reasons-grid"

// 핵심 가치 (docs/renewal/EMS 솔루션.png §9)
export default function EmsValues() {
  const t = useTranslations("ems")
  const br = () => <br />
  const hl = (chunks: React.ReactNode) => <span className="text-primary">{chunks}</span>
  return (
    <ReasonsGrid
      heading={t.rich("valuesHeading", { hl, br })}
      items={[
        { icon: "/images/ems/5-value-1.png", title: t.rich("value1Title", { hl }), desc: t.rich("value1Desc", { br }) },
        { icon: "/images/ems/5-value-2.png", title: t.rich("value2Title", { hl }), desc: t.rich("value2Desc", { br }) },
        { icon: "/images/ems/5-value-3.png", title: t.rich("value3Title", { hl }), desc: t.rich("value3Desc", { br }) },
        { icon: "/images/ems/5-value-4.png", title: t.rich("value4Title", { hl }), desc: t.rich("value4Desc", { br }) },
      ]}
    />
  )
}
