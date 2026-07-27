export const dynamic = "force-dynamic"

import SiteTypesSection from "../../_sections/solutions/site-types"
import SmartphoneSection from "../../_sections/solutions/smartphone"
import ValuesSection from "../../_sections/solutions/values"
import CtaSection from "@/components/section/cta"

export default function Solutions() {
  return (
    <div className="min-h-screen bg-white">
      <SiteTypesSection />
      <SmartphoneSection />
      <ValuesSection />
      <CtaSection />
    </div>
  )
}
