"use client"

import { useTranslations } from "next-intl"
import ReasonsGrid from "@/components/section/reasons-grid"

// 선택 이유 (docs/renewal/RTLS 솔루션.png §6)
export default function RtlsReasons() {
  const t = useTranslations("rtls")
  const br = () => <br />
  return (
    <ReasonsGrid
      heading={t("reasonsHeading")}
      items={[
        { icon: "/images/rtls/5-reason-1.webp", title: t("reason1Title"), desc: t.rich("reason1Desc", { br }) },
        { icon: "/images/rtls/5-reason-2.webp", title: t("reason2Title"), desc: t.rich("reason2Desc", { br }) },
        { icon: "/images/rtls/5-reason-3.webp", title: t("reason3Title"), desc: t.rich("reason3Desc", { br }) },
        { icon: "/images/rtls/5-reason-4.webp", title: t("reason4Title"), desc: t.rich("reason4Desc", { br }) },
      ]}
    />
  )
}
