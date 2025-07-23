"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FadeInUp from "@/components/animation/fade-in-up"
import { Search, ChevronLeft, ChevronRight, Download } from "lucide-react"

// Titillium Web 폰트 import
import { Titillium_Web } from "next/font/google"

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  variable: "--font-titillium-web",
})

interface DisclosureItem {
  id: string
  title: string
  date: string
  category: string
  pdfUrl: string
}

const disclosureData: DisclosureItem[] = [
  {
    id: "14760",
    title: "주주명부 기준일 설정 공고",
    date: "2025.06.27",
    category: "50",
    pdfUrl: "https://example.com/disclosure1.pdf",
  },
  {
    id: "14758",
    title: "[주요 경영상황 공시] 주주총회소집 결의",
    date: "2025.06.27",
    category: "40",
    pdfUrl: "https://example.com/disclosure2.pdf",
  },
  {
    id: "14756",
    title: "임원 선임 공시",
    date: "2025.06.27",
    category: "41",
    pdfUrl: "https://example.com/disclosure3.pdf",
  },
  {
    id: "13650",
    title: "주식보상 부여 및 취소",
    date: "2025.04.30",
    category: "50",
    pdfUrl: "https://example.com/disclosure4.pdf",
  },
  {
    id: "13648",
    title: "[주요 경영상황 공시] 주식매수선택권 부여 취소",
    date: "2025.04.30",
    category: "40",
    pdfUrl: "https://example.com/disclosure5.pdf",
  },
  {
    id: "13646",
    title: "[주요 경영상황 공시] 자기주식 처분 결정",
    date: "2025.04.30",
    category: "40",
    pdfUrl: "https://example.com/disclosure6.pdf",
  },
  {
    id: "13016",
    title: "임원 선임 및 사임 공시",
    date: "2025.03.28",
    category: "41",
    pdfUrl: "https://example.com/disclosure7.pdf",
  },
  {
    id: "13014",
    title: "주주총회 결과 공시",
    date: "2025.03.28",
    category: "41",
    pdfUrl: "https://example.com/disclosure8.pdf",
  },
  {
    id: "13012",
    title: "[주요 경영상황 공시] 주식매수선택권 부여",
    date: "2025.03.28",
    category: "40",
    pdfUrl: "https://example.com/disclosure9.pdf",
  },
  {
    id: "12740",
    title: "임원 선임 공시",
    date: "2025.03.12",
    category: "41",
    pdfUrl: "https://example.com/disclosure10.pdf",
  },
]

export default function IRPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState("disclosure")
  const itemsPerPage = 10

  const totalPages = Math.ceil(disclosureData.length / itemsPerPage)

  const filteredData = disclosureData.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleDownload = (url: string, title: string) => {
    // 실제 다운로드 로직 구현
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Grid Background and White Gradient */}
      <section className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
        {/* Grid Background */}
        <svg
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gridPattern)" />
        </svg>

        {/* White Gradient Overlay - 아래에서 위로 올라오는 그라디언트 */}
        <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-white via-white/60 via-white/30 to-transparent z-10 pointer-events-none" />

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pb-8">
          <div className="text-start">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-[#333132] ${titilliumWeb.className}`}>
              IR 
              <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-primary align-baseline translate-y-[2px] ml-0.5 mr-0.4 sm:ml-1 sm:mr-1" />
              <span className="text-[#605d5f]">Center</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <FadeInUp delay={300}>
        <section className="bg-white mb-6 sm:mb-8 lg:mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-20">
              {/* Mobile Tabs - 모바일에서는 상단에 탭으로 표시 */}
              <div className="lg:hidden">
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab("disclosure")}
                    className={`flex-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === "disclosure" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    공시 정보
                  </button>
                  <button
                    onClick={() => setActiveTab("announcement")}
                    className={`flex-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === "announcement" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    공고 사항
                  </button>
                </div>
              </div>

              {/* Desktop Sidebar - 데스크톱에서만 표시 */}
              <div className="hidden lg:block lg:w-64 flex-shrink-0">
                <div className="space-y-4">
                  <button
                    onClick={() => setActiveTab("disclosure")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "disclosure"
                        ? "bg-[#583CF2] text-white"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    공시 정보
                  </button>
                  <button
                    onClick={() => setActiveTab("announcement")}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === "announcement"
                        ? "bg-[#583CF2] text-white"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
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
                          key={item.id}
                          className="block p-4 sm:p-5 lg:p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-2 break-words leading-tight">
                                {item.title}
                              </h3>
                              <span className="text-xs sm:text-sm text-gray-500">{item.date}</span>
                            </div>
                            <div className="flex-shrink-0 self-start">
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleDownload(item.pdfUrl, item.title)
                                }}
                                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-2 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors w-full sm:w-auto justify-center min-w-[80px] sm:min-w-[100px]"
                              >
                                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>다운로드</span>
                              </button>
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
                                className={`px-2.5 sm:px-3 py-2 text-sm rounded-lg border transition-colors ${
                                  currentPage === pageNum
                                    ? "bg-[#583CF2] text-white border-[#583CF2]"
                                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                                }`}
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
