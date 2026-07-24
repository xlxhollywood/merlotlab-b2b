"use client"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { supabase, type LocationData } from "@/components/lib/supabase"
import Image from "next/image"

interface PortfolioCard {
  id: string
  title: string
  subtitle: string
  category: string
  images: string[]
  description: string | null
}

interface PortfolioInfiniteScrollProps {
  activeFilter?: string
}

const itemsPerLoad = 5

export default function PortfolioInfiniteScroll({ activeFilter = "all" }: PortfolioInfiniteScrollProps) {
  const t = useTranslations("portfolio")
  const tCat = useTranslations("caseCategory")

  // 카테고리 코드 → 현재 locale 라벨. 미지의 코드는 코드 그대로 노출.
  const categoryLabel = useCallback(
    (code: string) => (tCat.has(code) ? tCat(code) : code),
    [tCat],
  )

  const [searchQuery, setSearchQuery] = useState("")
  const [displayedItems, setDisplayedItems] = useState<PortfolioCard[]>([])
  const [allCaseStudies, setAllCaseStudies] = useState<PortfolioCard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [imageIndexes, setImageIndexes] = useState<{ [key: string]: number }>({})
  const observerRef = useRef<HTMLDivElement>(null)
  const [newlyAddedItems, setNewlyAddedItems] = useState<Set<string>>(new Set())

  // Supabase에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("locations")
          .select("*")
          .order("description", { ascending: false, nullsFirst: false })
        if (error) {
          console.error("Error fetching data:", error)
          return
        }

        // 카테고리는 코드(item.category)를 그대로 보관 → 표시/필터를 locale과 분리
        const transformedData: PortfolioCard[] = data.map((item: LocationData) => ({
          id: item.id,
          title: item.korean_name || item.place_name,
          subtitle: item.description || t("defaultSubtitle"),
          category: item.category,
          images: item.image_urls || [],
          description: item.description,
        }))

        setAllCaseStudies(transformedData)
        setIsInitialLoading(false)
      } catch (error) {
        console.error("Error:", error)
        setIsInitialLoading(false)
      }
    }
    fetchData()
  }, [t])

  // 검색어/필터에 따라 필터링된 데이터
  const filteredCaseStudies = useMemo(() => {
    let filtered = allCaseStudies

    // 카테고리 필터: 코드끼리 직접 비교 (locale 무관)
    if (activeFilter && activeFilter !== "all") {
      filtered = filtered.filter((item) => item.category === activeFilter)
    }

    // 검색어 필터: 제목/부제 + 현재 locale 카테고리 라벨 대상으로 매칭
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query) ||
          categoryLabel(item.category).toLowerCase().includes(query)
        )
      })
    }
    return filtered
  }, [searchQuery, allCaseStudies, activeFilter, categoryLabel])

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
    await new Promise((resolve) => setTimeout(resolve, 800))

    const startIndex = page * itemsPerLoad
    const endIndex = startIndex + itemsPerLoad
    const newItems = filteredCaseStudies.slice(startIndex, endIndex)

    if (newItems.length === 0) {
      setHasMore(false)
    } else {
      // 새로 추가되는 아이템들의 ID를 저장
      const newItemIds = new Set(newItems.map((item) => item.id))
      setNewlyAddedItems(newItemIds)
      setDisplayedItems((prev) => [...prev, ...newItems])
      setPage((prev) => prev + 1)

      // 애니메이션이 끝난 후 새로 추가된 아이템 표시 제거
      setTimeout(() => {
        setNewlyAddedItems(new Set())
      }, 1000)

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

  // 이미지 슬라이더 함수들
  const nextImage = (itemId: string, totalImages: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) + 1) % totalImages,
    }))
  }

  const prevImage = (itemId: string, totalImages: number) => {
    setImageIndexes((prev) => ({
      ...prev,
      [itemId]: ((prev[itemId] || 0) - 1 + totalImages) % totalImages,
    }))
  }

  if (isInitialLoading) {
    return (
      <div className="mt-10">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#583CF2] mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("loading")}</p>
        </div>
      </div>
    )
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
            placeholder={t("searchPlaceholder")}
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
              {t("searchResult", { query: searchQuery, count: filteredCaseStudies.length })}
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
            <p className="text-lg font-medium">{t("noResultsTitle")}</p>
            <p className="text-sm mt-2">{t("noResultsDesc")}</p>
          </div>
        </div>
      )}

      {/* 포트폴리오 카드들 */}
      {filteredCaseStudies.length > 0 && (
        <div className="space-y-4">
          {displayedItems.map((caseStudy, index) => {
            const currentImageIndex = imageIndexes[caseStudy.id] || 0
            const hasMultipleImages = caseStudy.images.length > 1
            const currentImageUrl = caseStudy.images[currentImageIndex]
            const isNewlyAdded = newlyAddedItems.has(caseStudy.id)
            // 새로 추가된 아이템의 경우 해당 배치에서의 순서를 계산
            const animationDelay = isNewlyAdded ? `${(index % itemsPerLoad) * 150}ms` : "0ms"

            return (
              <div
                key={`${caseStudy.id}-${index}`}
                className={`w-full border border-gray-200 shadow-md rounded-md py-6 pl-4 pr-4 sm:pl-12 sm:pr-0  md:pl-14 md:pr-0 text-left transition-all duration-700 ${isNewlyAdded ? "animate-in fade-in slide-in-from-bottom-4" : "opacity-100"}`}
                style={{
                  animationDelay,
                  animationFillMode: "both",
                }}
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
                        <span
                          className="text-sm h-fit w-fit rounded-md px-3 py-1.5 text-white"
                          style={{ backgroundColor: "#583CF2" }}
                        >
                          {categoryLabel(caseStudy.category)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-md w-full md:w-[80%] md:mx-auto" style={{ height: "250px" }}>
                    {caseStudy.images.length > 0 ? (
                      <>
                        <Image
                          alt={t("imageAlt", { title: caseStudy.title, index: currentImageIndex + 1 })}
                          src={currentImageUrl || "/images/placeholder.svg"}
                          width={400}
                          height={250}
                          className="h-full w-full rounded-md object-cover brightness-100 transition-all duration-300"
                          style={{
                            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                          }}
                        />
                        {/* 이미지 슬라이더 컨트롤 */}
                        {hasMultipleImages && (
                          <>
                            {/* 이전 버튼 */}
                            <button
                              onClick={() => prevImage(caseStudy.id, caseStudy.images.length)}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-white/20 text-white p-2 rounded-full transition-all duration-200"
                              aria-label={t("prevImage")}
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            {/* 다음 버튼 */}
                            <button
                              onClick={() => nextImage(caseStudy.id, caseStudy.images.length)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-white/20 text-white p-2 rounded-full transition-all duration-200"
                              aria-label={t("nextImage")}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                            {/* 이미지 카운터 */}
                            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                              {currentImageIndex + 1} / {caseStudy.images.length}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="h-full w-full rounded-md bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">{t("noImage")}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
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
            aria-label={t("scrollTop")}
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
