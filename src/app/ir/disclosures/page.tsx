"use client"
import { useState } from "react"
import type React from "react"

import { useEffect } from "react"
import { getDisclosures, type Disclosure } from "@/sanity/lib/sanity" // getDisclosures 및 Disclosure 타입 임포트
import Header from "@/components/header"
import Footer from "@/components/footer"
import FadeInUp from "@/components/animation/fade-in-up"
import { Search, ChevronLeft, ChevronRight, Download } from "lucide-react" // Download 아이콘 임포트
import { useRouter } from "next/navigation"
import IrHero from "@/components/hero/ir-hero" // IrHero 컴포넌트 임포트

export default function IRPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("disclosure") // 이 페이지는 '공시 정보'이므로 기본 탭은 disclosure
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const itemsPerPage = 10
  const [disclosures, setDisclosures] = useState<Disclosure[]>([]) // notices를 disclosures로 변경
  const totalPages = Math.ceil(disclosures.length / itemsPerPage)
  const filteredData = disclosures.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
      alert("다운로드할 파일이 없습니다.")
      return
    }

    try {
      // fetch로 파일 가져오기
      const response = await fetch(url)
      if (!response.ok) throw new Error("파일을 가져올 수 없습니다.")

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
      alert("파일 다운로드 중 오류가 발생했습니다.")
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <IrHero /> {/* Render the IrHero component here */}
      {/* Main Content */}
      <FadeInUp delay={300}>
        <section className="bg-white mb-6 sm:mb-8 lg:mb-12 sm:mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-20">
              {/* Mobile Tabs - 모바일에서는 상단에 탭으로 표시 */}
              <div className="lg:hidden">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab("disclosure")} // 현재 페이지이므로 탭 상태만 변경
                    className={`flex-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "disclosure" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800"}`}
                  >
                    공시 정보
                  </button>
                  <button
                    onClick={handleAnnouncementTabClick} // 공고 사항 페이지로 이동
                    className={`flex-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "announcement" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800"}`}
                  >
                    공고 사항
                  </button>
                </div>
              </div>
              {/* Desktop Sidebar - 데스크톱에서만 표시 */}
              <div className="hidden lg:block lg:w-64 flex-shrink-0">
                <div className="space-y-4">
                  <button
                    onClick={() => setActiveTab("disclosure")} // 현재 페이지이므로 탭 상태만 변경
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === "disclosure" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}
                  >
                    공시 정보
                  </button>
                  <button
                    onClick={handleAnnouncementTabClick} // 공고 사항 페이지로 이동
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === "announcement" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}
                  >
                    공고 사항
                  </button>
                </div>
              </div>
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
                        placeholder="찾으시는 내용을 검색해보세요"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#583CF2] focus:border-[#583CF2] text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  {/* Disclosure List */}
                  <div className="space-y-3 lg:space-y-4">
                    {currentData.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <p>검색 결과가 없습니다.</p>
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
                                title="이미지 다운로드"
                                type="button"
                              >
                                <Download className="h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform" />
                              </button>
                            ) : (
                              <div
                                className="flex-shrink-0 p-2 sm:p-2.5 text-gray-300 cursor-not-allowed"
                                title="다운로드할 이미지가 없습니다"
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
                  {totalPages > 1 && (
                    <nav className="flex justify-center pt-4">
                      <ul className="flex items-center space-x-1">
                        <li>
                          <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="p-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                        </li>
                        {/* 페이지 번호들 - 모바일에서는 더 적게 표시 */}
                        {(() => {
                          const maxVisible = typeof window !== "undefined" && window.innerWidth < 640 ? 3 : 5
                          const pages = []
                          if (totalPages <= maxVisible) {
                            for (let i = 1; i <= totalPages; i++) {
                              pages.push(i)
                            }
                          } else {
                            const half = Math.floor(maxVisible / 2)
                            let start = Math.max(1, currentPage - half)
                            const end = Math.min(totalPages, start + maxVisible - 1)
                            if (end - start + 1 < maxVisible) {
                              start = Math.max(1, end - maxVisible + 1)
                            }
                            for (let i = start; i <= end; i++) {
                              pages.push(i)
                            }
                          }
                          return pages.map((pageNum) => (
                            <li key={pageNum}>
                              <button
                                onClick={() => setCurrentPage(pageNum)}
                                className={`px-2.5 sm:px-3 py-2 text-sm rounded-lg border transition-colors ${currentPage === pageNum ? "bg-[#583CF2] text-white border-[#583CF2]" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                              >
                                {pageNum}
                              </button>
                            </li>
                          ))
                        })()}
                        <li>
                          <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="p-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeInUp>
      <Footer />
    </div>
  )
}
