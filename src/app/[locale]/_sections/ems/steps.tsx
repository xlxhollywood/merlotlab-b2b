"use client"

import { useTranslations } from "next-intl"
import StepProcess from "@/components/section/step-process"
import SoftBreak from "@/components/ui/soft-break"

// STEP 프로세스 (docs/renewal/EMS 솔루션.png §3)
export default function EmsSteps() {
  const t = useTranslations("ems")
  const br = () => <SoftBreak />
  const hl = (chunks: React.ReactNode) => <span className="text-primary">{chunks}</span>
  return (
    <StepProcess
      heading={t.rich("stepsHeading", { hl, br })}
      subtitle={t.rich("stepsSubtitle", { br })}
      steps={[
        { no: "STEP 1", title: t("step1Title"), desc: t.rich("step1Desc", { br }) },
        { no: "STEP 2", title: t("step2Title"), desc: t.rich("step2Desc", { br }) },
        { no: "STEP 3", title: t("step3Title"), desc: t.rich("step3Desc", { br }) },
      ]}
    />
  )
}
