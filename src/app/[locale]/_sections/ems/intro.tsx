"use client"

import { useTranslations } from "next-intl"
import ProductIntro from "@/components/section/product-intro"
import SoftBreak from "@/components/ui/soft-break"

// "Merlot EMS란?" (docs/renewal/EMS 솔루션.png §2)
export default function EmsIntro() {
  const t = useTranslations("ems")
  const hl = (chunks: React.ReactNode) => <span className="text-primary">{chunks}</span>
  return (
    <ProductIntro
      title={t.rich("introTitle", { hl })}
      subtitle={t.rich("introSubtitle", { br: () => <SoftBreak /> })}
      chips={[t("introChip1"), t("introChip2"), t("introChip3"), t("introChip4")]}
      image="/images/ems/2-device.webp"
      imageAlt={t("heroEyebrow")}
    />
  )
}
