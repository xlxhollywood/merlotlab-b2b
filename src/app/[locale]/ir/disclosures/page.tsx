"use client"
import { useState } from "react"
import type React from "react"

import { useEffect } from "react"
import { getDisclosures, type Disclosure } from "@/sanity/lib/sanity" // getDisclosures 및 Disclosure 타입 임포트
import FadeInUp from "@/components/animation/fade-in-up"
import { Search, Download } from "lucide-react" // Download 아이콘 임포트
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import IrHero from "@/components/hero/ir-hero" // IrHero 컴포넌트 임포트
import IrTabs from "@/components/ir/ir-tabs"
import IrPagination from "@/components/ir/ir-pagination"
import { IrListSkeleton } from "@/components/ir/ir-skeletons"

export default function IRPage() {
  const t = useTranslations("ir")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("disclosure") // 이 페이지는 '공시 정보'이므로 기본 탭은 disclosure
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const itemsPerPage = 10
  const [disclosures, setDisclosures] = useState<Disclosure[]>([]) // notices를 disclosures로 변경
  const filteredData = disclosures.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // 검색어가 바뀌면 1페이지로 리셋 (필터 후 현재 페이지가 범위를 벗어나 빈 목록이 뜨는 문제 방지)
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // '공고 사항' 탭으로 이동하는 함수
  const handleAnnouncementTabClick = () => {
    router.push("/ir/notices") // 공고 사항 페이지 경로로 이동
  }

  // 공시 정보 상세 페이지로 이동하는 함수
  const handleDisclosureClick = (id: string) => {
    router.push(`/ir/disclosures/${id}`)
  }

  // 다운로드 로직 (원래 공시 정보 페이지에 있던 로직 복구)
  const handleDownload = async (e: React.MouseEvent, url: string, title: string) => {
    e.stopPropagation() // 카드 클릭 이벤트 방지

    // URL이 유효하지 않으면 리턴
    if (!url || url === "#" || !url.startsWith("http")) {
      alert(t("noFileToDownload"))
      return
    }

    try {
      // fetch로 파일 가져오기
      const response = await fetch(url)
      if (!response.ok) throw new Error(t("fetchError"))

      // blob으로 변환
      const blob = await response.blob()

      // 파일 확장자 추출 (URL에서 또는 Content-Type에서)
      const contentType = response.headers.get("content-type") || ""
      let extension = ""

      // 이미지 파일 확장자 우선 처리
      if (contentType.includes("image/jpeg")) extension = ".jpg"
      else if (contentType.includes("image/png")) extension = ".png"
      else if (contentType.includes("image/gif")) extension = ".gif"
      else if (contentType.includes("image/webp")) extension = ".webp"
      // PDF, Word, Excel 등 다른 문서 타입 처리
      else if (contentType.includes("application/pdf")) extension = ".pdf"
      else if (
        contentType.includes("application/msword") ||
        contentType.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      )
        extension = ".docx"
      else if (
        contentType.includes("application/vnd.ms-excel") ||
        contentType.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
      )
        extension = ".xlsx"
      else {
        // URL에서 확장자 추출 시도 (fallback)
        const urlExtension = url.split(".").pop()
        if (urlExtension && urlExtension.length <= 4) {
          // 간단한 확장자 길이 체크
          extension = `.${urlExtension}`
        }
      }

      // 다운로드 링크 생성
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `${title}${extension}` // 제목 + 확장자

      // 다운로드 실행
      document.body.appendChild(link)
      link.click()

      // 정리
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("다운로드 오류:", error)
      alert(t("downloadError"))
    }
  }

  useEffect(() => {
    async function fetchDisclosures() {
      try {
        const data = await getDisclosures() // getNotices를 getDisclosures로 변경
        setDisclosures(data) // setNotices를 setDisclosures로 변경
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchDisclosures()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <IrHero /> {/* Render the IrHero component here */}
      {/* Main Content */}
      <FadeInUp delay={300}>
        
        <section className="bg-white mb-6 sm:mb-8 lg:mb-12 sm:mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-20">
              <IrTabs
                activeTab={activeTab}
                onDisclosureClick={() => setActiveTab("disclosure")}
                onAnnouncementClick={handleAnnouncementTabClick}
              />
              {/* Main Content Area */}
              <div className="flex-1 min-w-0">
                <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                  {/* Search Bar */}
                  <div className="w-full max-w-md">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      </div>
                      <input
                        type="search"
                        placeholder={t("searchPlaceholder")}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#583CF2] focus:border-[#583CF2] text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  {/* Disclosure List */}
                  <div className="space-y-3 lg:space-y-4">
                    {loading ? (
                      <IrListSkeleton />
                    ) : currentData.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <p>{t("noResults")}</p>
                      </div>
                    ) : (
                      currentData.map((item) => (
                        <div
                          key={item._id}
                          onClick={() => handleDisclosureClick(item._id)} // handleNoticeClick을 handleDisclosureClick으로 변경
                          className="block p-4 sm:p-5 lg:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex justify-between items-start gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 break-words leading-tight">
                                {item.title}
                              </h3>
                              <span className="text-xs sm:text-sm text-gray-500">{item.date}</span>
                            </div>
                            {/* Download Button (원래 공시 정보 페이지에 있던 로직 복구) */}
                            {item.imageUrl ? (
                              <button
                                onClick={(e) => handleDownload(e, item.imageUrl as string, item.title)}
                                className="flex-shrink-0 p-2 sm:p-2.5 text-gray-400 hover:text-[#583CF2] hover:bg-gray-50 rounded-lg transition-colors group"
                                title={t("downloadImage")}
                                type="button"
                              >
                                <Download className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                              </button>
                            ) : (
                              <div
                                className="flex-shrink-0 p-2 sm:p-2.5 text-gray-300 cursor-not-allowed"
                                title={t("noDownloadImage")}
                              >
                                <Download className="h-4 w-4 sm:h-5 sm:w-5 opacity-30" />
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {/* Pagination */}
                  <IrPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>
    </div>
  )
}
