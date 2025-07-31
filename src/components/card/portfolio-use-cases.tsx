"use client"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import { supabase, type LocationData } from "@/components/lib/supabase"
import Image from "next/image"

interface PortfolioCard {
  id: string
  title: string
  subtitle: string
  tags: string[]
  images: string[]
  description: string | null
}

interface PortfolioInfiniteScrollProps {
  activeFilter?: string
}

const itemsPerLoad = 5

export default function PortfolioInfiniteScroll({ activeFilter = "all" }: PortfolioInfiniteScrollProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [displayedItems, setDisplayedItems] = useState<PortfolioCard[]>([])
  const [allCaseStudies, setAllCaseStudies] = useState<PortfolioCard[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [imageIndexes, setImageIndexes] = useState<{ [key: string]: number }>({})
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())
  const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: string]: boolean }>({})
  const observerRef = useRef<HTMLDivElement>(null)
  const [newlyAddedItems, setNewlyAddedItems] = useState<Set<string>>(new Set())

  // 카테고리 한글 변환 함수
  const getCategoryInKorean = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      logistics_center: "물류센터",
      parking_lot: "주차장",
      factory: "공장",
      office: "사무실",
      warehouse: "창고",
      retail: "소매점",
      hospital: "병원",
      school: "학교",
      apartment: "아파트",
      hotel: "호텔",
    }
    return categoryMap[category] || category
  }

  // 이미지 프리로딩 함수
  const preloadImages = useCallback(
    (imageUrls: string[]) => {
      imageUrls.forEach((url) => {
        if (!preloadedImages.has(url) && url) {
          setImageLoadingStates((prev) => ({ ...prev, [url]: true }))
          const img = document.createElement("img") // new Image() 대신
          img.crossOrigin = "anonymous"
          img.onload = () => {
            setPreloadedImages((prev) => new Set([...prev, url]))
            setImageLoadingStates((prev) => ({ ...prev, [url]: false }))
          }
          img.onerror = () => {
            setImageLoadingStates((prev) => ({ ...prev, [url]: false }))
          }
          img.src = url
        }
      })
    },
    [preloadedImages],
  )

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

        // 데이터 변환 부분에서 카테고리를 한글로 변환
        const transformedData: PortfolioCard[] = data.map((item: LocationData) => ({
          id: item.id,
          title: item.korean_name || item.place_name,
          subtitle: item.description || "시스템 도입 사례",
          tags: [getCategoryInKorean(item.category)],
          images: item.image_urls || [],
          description: item.description,
        }))

        // 모든 이미지 URL 수집 및 프리로딩
        const allImageUrls = transformedData.flatMap((item) => item.images).filter(Boolean)
        preloadImages(allImageUrls)
        setAllCaseStudies(transformedData)
        setIsInitialLoading(false)
      } catch (error) {
        console.error("Error:", error)
        setIsInitialLoading(false)
      }
    }
    fetchData()
  }, [])

  // 검색어에 따라 필터링된 데이터
  const filteredCaseStudies = useMemo(() => {
    let filtered = allCaseStudies

    // 카테고리 필터 적용
    if (activeFilter && activeFilter !== "all") {
      // filterToKorean을 getCategoryInKorean과 동일하게 수정
      const filterToKorean: { [key: string]: string } = {
        logistics_center: "물류센터",
        parking_lot: "주차장",
        factory: "공장",
        office: "사무실",
        warehouse: "창고",
        retail: "소매점",
        hospital: "병원",
        school: "학교",
        apartment: "아파트",
        hotel: "호텔",
      }
      const targetCategory = filterToKorean[activeFilter]
      if (targetCategory) {
        filtered = filtered.filter((item) => {
          return item.tags.some((tag) => tag === targetCategory)
        })
      }
    }

    // 검색어 필터 적용
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((item) => {
        return (
          item.title.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query))
        )
      })
    }
    return filtered
  }, [searchQuery, allCaseStudies, activeFilter])

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
          <p className="mt-4 text-gray-600">데이터를 불러오는 중...</p>
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
              {'"'}
              {searchQuery}
              {'"'}에 대한 검색 결과: {filteredCaseStudies.length}개
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
        <div className="space-y-4">
          {displayedItems.map((caseStudy, index) => {
            const currentImageIndex = imageIndexes[caseStudy.id] || 0
            const hasMultipleImages = caseStudy.images.length > 1
            const currentImageUrl = caseStudy.images[currentImageIndex]
            const isImageLoading = imageLoadingStates[currentImageUrl]
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
                  <div className="relative rounded-md w-full md:w-[80%] md:mx-auto" style={{ height: "250px" }}>
                    {caseStudy.images.length > 0 ? (
                      <>
                        {isImageLoading && (
                          <div className="absolute inset-0 bg-gray-200 rounded-md flex items-center justify-center z-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#583CF2]"></div>
                          </div>
                        )}
                        <Image
                          alt={`${caseStudy.title} 이미지 ${currentImageIndex + 1}`}
                          src={currentImageUrl || "/placeholder.svg"}
                          width={400}
                          height={250}
                          className={`h-full w-full rounded-md object-cover brightness-100 transition-all duration-300 ${isImageLoading ? "opacity-0" : "opacity-100"}`}
                          style={{
                            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
                          }}
                          priority={index < 2}
                        />
                        {/* 이미지 슬라이더 컨트롤 */}
                        {hasMultipleImages && (
                          <>
                            {/* 이전 버튼 */}
                            <button
                              onClick={() => prevImage(caseStudy.id, caseStudy.images.length)}
                              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-white/20 text-white p-2 rounded-full transition-all duration-200"
                              aria-label="이전 이미지"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            {/* 다음 버튼 */}
                            <button
                              onClick={() => nextImage(caseStudy.id, caseStudy.images.length)}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-white/20 text-white p-2 rounded-full transition-all duration-200"
                              aria-label="다음 이미지"
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
                        <span className="text-gray-500">이미지 없음</span>
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
