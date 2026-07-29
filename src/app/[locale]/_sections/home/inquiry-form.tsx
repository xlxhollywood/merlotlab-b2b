"use client"

import { useTranslations } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"
import QuoteForm from "@/components/form/quote-form"
import BusinessInquiryForm from "@/components/form/business-inquiry-form"

interface InquiryFormSectionProps {
  selectedInquiry: "business" | "quote"
  setSelectedInquiry: React.Dispatch<React.SetStateAction<"business" | "quote">>
  selectedBusinessType: string
  setSelectedBusinessType: React.Dispatch<React.SetStateAction<string>>
  quoteFormRef: React.RefObject<HTMLDivElement | null>
}

export default function InquiryFormSection({
  selectedInquiry,
  setSelectedInquiry,
  selectedBusinessType,
  setSelectedBusinessType,
  quoteFormRef,
}: InquiryFormSectionProps) {
  const t = useTranslations("home")
  const br = () => <br />

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <FadeInUp>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 mb-4 sm:mb-6 leading-tight">
              {t.rich("formTitle", { br })}
            </h2>
            <p className="text-base sm:text-xl text-gray-600">{t("formSubtitle")}</p>
          </div>
        </FadeInUp>

        {selectedInquiry === "quote" ? (
          <FadeInUp>
            <div ref={quoteFormRef}>
              <QuoteForm
                selectedInquiry={selectedInquiry}
                setSelectedInquiry={setSelectedInquiry}
                selectedBusinessType={selectedBusinessType}
                setSelectedBusinessType={setSelectedBusinessType}
              />
            </div>
          </FadeInUp>
        ) : (
          <FadeInUp rootMargin="150px 0px" delay={100}>
            <div ref={quoteFormRef}>
              <BusinessInquiryForm
                selectedInquiry={selectedInquiry}
                setSelectedInquiry={setSelectedInquiry}
                selectedBusinessType={selectedBusinessType}
                setSelectedBusinessType={setSelectedBusinessType}
              />
            </div>
          </FadeInUp>
        )}
      </div>
    </section>
  )
}
