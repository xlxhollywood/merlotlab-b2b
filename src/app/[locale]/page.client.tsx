"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import HeroSection from "./_sections/home/hero"
import WhyChooseSection from "./_sections/home/why-choose"
import EnergyBusinessSection from "./_sections/home/energy-business"
import PricingSection from "./_sections/home/pricing"
import ProcessSection from "./_sections/home/process"
import HomeCtaSection from "./_sections/home/cta"
import InquiryFormSection from "./_sections/home/inquiry-form"
import TabParamSync from "./_sections/home/tab-param-sync"

export default function LandingClient() {
  const quoteFormRef = useRef<HTMLDivElement>(null)

  const [selectedInquiry, setSelectedInquiry] = useState<"business" | "quote">("quote")

  // inquiry 타입에 따라 default 값을 초기화
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>(
    selectedInquiry === "business" ? "개인" : "제조 시설",
  )

  useEffect(() => {
    if (selectedInquiry === "business") {
      setSelectedBusinessType("개인")
    } else {
      setSelectedBusinessType("제조 시설")
    }
  }, [selectedInquiry])

  // 모의 견적 탭으로 설정하고 스크롤
  const handleQuoteClick = () => {
    setSelectedInquiry("quote")
    setTimeout(() => {
      quoteFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }, 100)
  }

  return (
    <div className="w-full">
      {/* useSearchParams는 이 컴포넌트에만 격리(Suspense) → 나머지 섹션은 SSR */}
      <Suspense>
        <TabParamSync setSelectedInquiry={setSelectedInquiry} quoteFormRef={quoteFormRef} />
      </Suspense>
      <HeroSection />
      <WhyChooseSection onQuoteClick={handleQuoteClick} />
      <EnergyBusinessSection />
      <PricingSection />
      <ProcessSection />
      <HomeCtaSection />
      <InquiryFormSection
        selectedInquiry={selectedInquiry}
        setSelectedInquiry={setSelectedInquiry}
        selectedBusinessType={selectedBusinessType}
        setSelectedBusinessType={setSelectedBusinessType}
        quoteFormRef={quoteFormRef}
      />
    </div>
  )
}
