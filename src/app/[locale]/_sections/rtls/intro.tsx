"use client"

import { useTranslations } from "next-intl"
import ProductIntro from "@/components/section/product-intro"

// "Merlot RTLS란?" (docs/renewal/RTLS 솔루션.png §2)
export default function RtlsIntro() {
  const t = useTranslations("rtls")
  const hl = (chunks: React.ReactNode) => <span className="text-primary">{chunks}</span>
  return (
    <ProductIntro
      title={t.rich("introTitle", { hl })}
      subtitle={t.rich("introSubtitle", { br: () => <br /> })}
      chips={[t("introChip1"), t("introChip2"), t("introChip3"), t("introChip4")]}
      image="/images/rtls/2-device.webp"
      imageAlt={t("heroEyebrow")}
    />
  )
}
