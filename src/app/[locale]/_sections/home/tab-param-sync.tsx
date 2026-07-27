"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"

// `?tab=` 파라미터로 폼 탭을 설정하고 폼으로 스크롤하는 부수효과만 담당.
// useSearchParams는 정적 라우트에서 상위 트리를 클라이언트 렌더로 deopt 시키므로,
// 이 컴포넌트만 <Suspense>로 격리해 나머지 홈 섹션은 정상 SSR 되게 한다. (렌더 결과 없음)
export default function TabParamSync({
  setSelectedInquiry,
  quoteFormRef,
}: {
  setSelectedInquiry: React.Dispatch<React.SetStateAction<"business" | "quote">>
  quoteFormRef: React.RefObject<HTMLDivElement | null>
}) {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  // URL 파라미터 변경 감지
  useEffect(() => {
    if (tabParam === "business") {
      setSelectedInquiry("business")
      // 문의 폼으로 스크롤 (200px 오프셋)
      setTimeout(() => {
        quoteFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center", // 또는 "start", "end", "nearest"
        })
      }, 100)
    } else if (tabParam === "quote") {
      setSelectedInquiry("quote")
      // 모의 견적 폼으로 스크롤
      setTimeout(() => {
        quoteFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 100)
    } else if (tabParam === "form") {
      // 기본적으로 모의견적 폼으로 설정하고 스크롤
      setSelectedInquiry("quote")
      setTimeout(() => {
        quoteFormRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }, 100)
    }
  }, [tabParam, setSelectedInquiry, quoteFormRef])

  return null
}
