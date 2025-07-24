"use client"

import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Download } from "lucide-react"
import { useState } from "react"

// Titillium Web 폰트 import
import { Titillium_Web } from "next/font/google"

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  variable: "--font-titillium-web",
})

interface DisclosureDetail {
  id: string
  title: string
  date: string
  author: string
  content: string
  attachments: {
    name: string
    url: string
  }[]
}

// 상세 데이터 (실제로는 API에서 가져올 데이터)
const disclosureDetail: DisclosureDetail = {
  id: "14760",
  title: "주주명부 기준일 설정 공고",
  date: "2025.06.27",
  author: "관리자",
  content:
    "상법 제354조 및 당사 정관 제15조에 의거하여 임시주주총회 주주확정을 위한 주주명부 기준일 설정을 첨부와 같이 공고합니다.",
  attachments: [
    {
      name: "(토스증권) 주주명부 기준일 공고.pdf",
      url: "https://home-files.tossinvest.com/files/disclosure/d81f3fa5-77a6-4c5b-949b-d09b4fcc48a9.pdf",
    },
  ],
}

export default function IRDetailPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("announcement") // "disclosure"에서 "announcement"로 변경

  const handleAnnouncementClick = () => {
    console.log("공고 사항 버튼 클릭됨") // 디버깅용 로그 추가
    router.push("/ir/disclosures")
  }

  const handleDownload = (url: string, filename: string) => {
    // 실제 다운로드 로직 구현
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleBackToList = () => {
    // 실제로는 router.back() 또는 특정 경로로 이동
    router.back()
  }

  return (
    <div className="min-h-screen bg-white pr-3.5">
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
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-[#333132] ${titilliumWeb.className}`}
            >
              IR
              <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-primary align-baseline translate-y-[2px] ml-0.5 mr-0.4 sm:ml-1 sm:mr-1" />
              <span className="text-[#605d5f]">Center</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white mb-6 sm:mb-8 lg:mb-16 sm:mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-20">
            {/* Mobile Tabs - 모바일에서는 상단에 탭으로 표시 */}
            <div className="lg:hidden">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={handleAnnouncementClick}
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
                  onClick={handleAnnouncementClick}
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
              <div className="max-w-4xl space-y-6 sm:space-y-8">
                <article className="bg-white">
                  {/* Article Header */}
                  <header className="border-b border-gray-200 pb-6 mb-8">
                    <div className="space-y-6">
                      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#333d4b] leading-tight">
                        {disclosureDetail.title}
                      </h1>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-[#8b95a1]">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#4e5968]">작성일</span>
                          <span>{disclosureDetail.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#4e5968]">작성자</span>
                          <span>{disclosureDetail.author}</span>
                        </div>
                      </div>
                    </div>
                  </header>

                  {/* Article Body */}
                  <div className="prose prose-gray max-w-none mb-8">
                    <div className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                      <p>{disclosureDetail.content}</p>
                    </div>
                  </div>

                  {/* Attachments Section */}
                  {disclosureDetail.attachments.length > 0 && (
                    <div className="border-t border-gray-200 pt-6">
                      <div className="space-y-4">
                        <h3 className="text-base font-semibold text-[#4e5968]">첨부파일</h3>
                        <div className="space-y-3">
                          {disclosureDetail.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm sm:text-base text-[#4e5968] truncate">{attachment.name}</p>
                              </div>
                              <button
                                onClick={() => handleDownload(attachment.url, attachment.name)}
                                className="ml-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#583CF2] hover:bg-[#4c35d1] rounded-lg transition-colors flex-shrink-0"
                              >
                                <Download className="h-4 w-4" />
                                <span>다운로드</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Bottom Actions */}
                  <div className="border-t border-gray-200 pt-8 mt-8">
                    <div className="flex justify-center">
                      <button
                        onClick={handleBackToList}
                        className="inline-flex items-center px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        목록
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
