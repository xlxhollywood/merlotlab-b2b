"use client"
import { useState } from "react"
import { useEffect } from "react"
import { getNotices, type Notice } from "@/sanity/lib/sanity"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FadeInUp from "@/components/animation/fade-in-up"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import IrHero from "@/components/hero/ir-hero" // IrHero 컴포넌트 임포트

export default function NoticesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("announcement") // 이 페이지는 '공고 사항'이므로 기본 탭은 announcement
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const itemsPerPage = 10
  const [notices, setNotices] = useState<Notice[]>([])
  const totalPages = Math.ceil(notices.length / itemsPerPage)
  const filteredData = notices.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // '공시 정보' 탭으로 이동하는 함수 (정확한 경로로 수정)
  const handleDisclosureTabClick = () => {
    router.push("/ir/disclosures") // 공시 정보 페이지 경로로 정확히 이동
  }

  const handleNoticeClick = (id: string) => {
    router.push(`/ir/notices/${id}`)
  }

  // handleDownload 함수는 이 페이지에서 사용되지 않으므로 제거합니다.
  // const handleDownload = (url: string, title: string) => {
  //   window.open(url, "_blank")
  // }

  useEffect(() => {
    async function fetchNotices() {
      try {
        const data = await getNotices()
        setNotices(data)
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchNotices()
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
      <IrHero /> {/* IrHero 컴포넌트 사용 */}
      {/* Main Content */}
      <FadeInUp delay={300}>
        <section className="bg-white mb-6 sm:mb-8 lg:mb-12 sm:mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-20">
              {/* Mobile Tabs - 모바일에서는 상단에 탭으로 표시 */}
              <div className="lg:hidden">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={handleDisclosureTabClick} // 공시 정보 탭으로 정확히 이동
                    className={`flex-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "disclosure" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800"}`}
                  >
                    공시 정보
                  </button>
                  <button
                    onClick={() => setActiveTab("announcement")} // 현재 페이지이므로 탭 상태만 변경
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
                    onClick={handleDisclosureTabClick} // 공시 정보 탭으로 정확히 이동
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === "disclosure" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}
                  >
                    공시 정보
                  </button>
                  <button
                    onClick={() => setActiveTab("announcement")} // 현재 페이지이므로 탭 상태만 변경
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
                  {/* Notice List */}
                  <div className="space-y-3 lg:space-y-4">
                    {currentData.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <p>검색 결과가 없습니다.</p>
                      </div>
                    ) : (
                      currentData.map((item) => (
                        <div
                          key={item._id}
                          onClick={() => handleNoticeClick(item._id)}
                          className="block p-4 sm:p-5 lg:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 break-words leading-tight">
                                {item.title}
                              </h3>
                              <span className="text-xs sm:text-sm text-gray-500">{item.date}</span>
                            </div>
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
