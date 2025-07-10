"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Search, X } from "lucide-react"

interface PortfolioCard {
  title: string
  subtitle: string
  tags: string[]
  image: string
}

// 데이터를 컴포넌트 외부로 이동 (또는 상단으로)
const allCaseStudies: PortfolioCard[] = [
  {
    title: "CJ대한통운 동탄 현장",
    subtitle: "전력량 52% 절감",
    tags: ["물류 센터"],
    image: "/물류센터1.png",
  },
  {
    title: "GS네트웍스 양산 물류센터",
    subtitle: "일/평균전력사용량 62.9% 절감",
    tags: ["물류센터", "사무실"],
    image: "/물류센터2.jpg",
  },
  {
    title: "현대자동차 울산공장",
    subtitle: "전력 사용량 48% 절감",
    tags: ["제조업", "공장"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "롯데마트 김포점",
    subtitle: "냉장/냉동 전력 35% 절감",
    tags: ["유통업", "마트"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "삼성전자 기흥사업장",
    subtitle: "생산라인 전력 효율 44% 향상",
    tags: ["전자제조", "반도체"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "포스코 광양제철소",
    subtitle: "제철공정 전력 28% 절감",
    tags: ["철강업", "제조업"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "SK하이닉스 이천캠퍼스",
    subtitle: "클린룸 전력 효율 39% 개선",
    tags: ["반도체", "클린룸"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "LG화학 여수공장",
    subtitle: "화학공정 전력 31% 절감",
    tags: ["화학공업", "공장"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "네이버 데이터센터",
    subtitle: "서버 냉각 전력 45% 절감",
    tags: ["데이터센터", "IT"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "신세계백화점 강남점",
    subtitle: "조명/공조 전력 42% 절감",
    tags: ["유통업", "백화점"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "한국전력공사 본사",
    subtitle: "사무용 전력 36% 절감",
    tags: ["공공기관", "사무실"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "부산항 컨테이너터미널",
    subtitle: "크레인 운영 전력 29% 절감",
    tags: ["항만", "물류"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "카카오 데이터센터",
    subtitle: "AI 서버 전력 효율 41% 개선",
    tags: ["데이터센터", "AI"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "이마트 트레이더스 월계점",
    subtitle: "대형 냉장고 전력 38% 절감",
    tags: ["유통업", "창고형마트"],
    image: "/placeholder.svg?height=250&width=400",
  },
  {
    title: "두산중공업 창원공장",
    subtitle: "생산설비 전력 33% 절감",
    tags: ["중공업", "제조업"],
    image: "/placeholder.svg?height=250&width=400",
  },
]

const itemsPerLoad = 5

export default function PortfolioInfiniteScroll() {
  const [searchQuery, setSearchQuery] = useState("")
  const [displayedItems, setDisplayedItems] = useState<PortfolioCard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const observerRef = useRef<HTMLDivElement>(null)

  // 검색어에 따라 필터링된 데이터
  const filteredCaseStudies = useMemo(() => {
    if (!searchQuery.trim()) {
      return allCaseStudies
    }

    const query = searchQuery.toLowerCase()
    return allCaseStudies.filter((item) => {
      return (
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    })
  }, [searchQuery])

  // 검색어가 변경될 때 결과 초기화
  useEffect(() => {
    setPage(1)
    setHasMore(true)
    const initialItems = filteredCaseStudies.slice(0, itemsPerLoad)
    setDisplayedItems(initialItems)
    setHasMore(filteredCaseStudies.length > itemsPerLoad)
  }, [filteredCaseStudies])

  // 데이터 로드 함수
  const loadMoreData = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    // 추가 로딩에만 지연 적용 (초기 로딩 제외)
    await new Promise((resolve) => setTimeout(resolve, 800))

    const startIndex = page * itemsPerLoad
    const endIndex = startIndex + itemsPerLoad
    const newItems = filteredCaseStudies.slice(startIndex, endIndex)

    if (newItems.length === 0) {
      setHasMore(false)
    } else {
      setDisplayedItems((prev) => [...prev, ...newItems])
      setPage((prev) => prev + 1)
      if (endIndex >= filteredCaseStudies.length) {
        setHasMore(false)
      }
    }

    setIsLoading(false)
  }, [page, isLoading, hasMore, filteredCaseStudies])

  // Intersection Observer 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !isLoading) {
          loadMoreData()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px", // 100px 전에 미리 로드
      },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [loadMoreData, hasMore, isLoading])

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="mt-10">
      {/* 검색창 */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="회사명, 업종으로 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-[#583CF2] focus:border-transparent transition-all duration-200"
          />
          {searchQuery && (
            <button onClick={clearSearch} className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </button>
          )}
        </div>

        {/* 검색 결과 정보 */}
        {searchQuery && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              "{searchQuery}"에 대한 검색 결과: {filteredCaseStudies.length}개
            </p>
          </div>
        )}
      </div>

      {/* 헤더 정보 */}
      <div className="mb-6 text-center">
        <div className="text-sm text-gray-600"></div>
      </div>

      {/* 검색 결과가 없을 때 */}
      {filteredCaseStudies.length === 0 && searchQuery && (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">검색 결과가 없습니다</p>
            <p className="text-sm mt-2">다른 키워드로 검색해보세요</p>
          </div>
        </div>
      )}

      {/* 포트폴리오 카드들 */}
      {filteredCaseStudies.length > 0 && (
        <div className="space-y-0">
          {displayedItems.map((caseStudy, index) => (
            <div
              key={`${caseStudy.title}-${index}`}
              className="w-full border-t border-gray-200 px-2 py-6 text-left xs:px-5 animate-in fade-in duration-500"
              style={{ animationDelay: `${(index % itemsPerLoad) * 100}ms` }}
            >
              <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                <div>
                  <h5 className="my-6 truncate font-bold text-gray-600">
                    {caseStudy.title}
                    <br />
                    {caseStudy.subtitle}
                  </h5>
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-sm h-fit w-fit rounded-md px-3 py-1.5 text-white"
                          style={{ backgroundColor: "#583CF2" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative rounded-md" style={{ height: "250px" }}>
                  <img
                    alt={`${caseStudy.title} 이미지`}
                    src={caseStudy.image || "/placeholder.svg?height=250&width=400"}
                    className="h-full w-full rounded-md object-cover brightness-100 transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Intersection Observer 타겟 */}
      <div ref={observerRef} className="h-10" />

      {/* 맨 위로 가기 버튼 */}
      {displayedItems.length > itemsPerLoad && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-[#583CF2] hover:bg-[#583CF2]/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="맨 위로 가기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
