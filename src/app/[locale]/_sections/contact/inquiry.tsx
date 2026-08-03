"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { SectionHeader } from "@/components/layout/section"
import FadeInUp from "@/components/animation/fade-in-up"
import QuoteForm from "@/components/form/quote-form"
import BusinessInquiryForm from "@/components/form/business-inquiry-form"

// 도입 문의 (docs/renewal/문의.png): 헤딩 + 문의 폼 카드.
// 폼은 기존 QuoteForm(모의 견적)/BusinessInquiryForm(견적 문의)을 그대로 재사용.
export default function ContactInquiry() {
  const t = useTranslations("contact")
  const [selectedInquiry, setInquiry] = useState<"business" | "quote">("quote")
  const [selectedBusinessType, setSelectedBusinessType] = useState("")
  
  const setSelectedInquiry = (value: "business" | "quote") => {
    setInquiry(value)
    setSelectedBusinessType("")
  }

  return (
    <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeInUp delay={200}>
          <SectionHeader as="h1" headingVariant="hero" title={t("title")} subtitle={t("subtitle")} />
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="mt-10 sm:mt-14">
            {selectedInquiry === "quote" ? (
              <QuoteForm
                selectedInquiry={selectedInquiry}
                setSelectedInquiry={setSelectedInquiry}
                selectedBusinessType={selectedBusinessType}
                setSelectedBusinessType={setSelectedBusinessType}
              />
            ) : (
              <BusinessInquiryForm
                selectedInquiry={selectedInquiry}
                setSelectedInquiry={setSelectedInquiry}
                selectedBusinessType={selectedBusinessType}
                setSelectedBusinessType={setSelectedBusinessType}
              />
            )}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
