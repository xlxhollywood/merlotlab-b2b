"use client"

import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import { getNotice, Notice } from "@/sanity/lib/sanity"
import { useParams } from "next/navigation"
import { useEffect } from "react"

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


export default function IRDetailPage() {
  const router = useRouter()
  const params = useParams() // 추가
  const [activeTab, setActiveTab] = useState("announcement") // "disclosure"에서 "announcement"로 변경

  const [notice, setNotice] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(true)

    // 추가: 데이터 가져오기
    // useEffect 안에 로그 추가해서 디버깅
useEffect(() => {
  async function fetchNotice() {
    console.log('params.id:', params.id) // ID가 제대로 들어오는지 확인
    if (params.id) {
      try {
        console.log('Fetching notice...') // API 호출 시작
        const data = await getNotice(params.id as string)
        console.log('Fetched data:', data) // 받은 데이터 확인
        setNotice(data)
      } catch (error) {
        console.error('Error fetching notice:', error)
      } finally {
        setLoading(false)
      }
    }
  }
  fetchNotice()
}, [params.id])

  const handleAnnouncementClick = () => {
    router.push("/ir/disclosures")
  }

  const handleBackToList = () => {
    // 실제로는 router.back() 또는 특정 경로로 이동
    router.push("/ir/notices")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    )
  }

  // 데이터가 없을 때
  if (!notice) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">공고를 찾을 수 없습니다.</div>
      </div>
    )
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
                        {notice?.title}
                      </h1>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-[#8b95a1]">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#4e5968]">작성일</span>
                          <span>{notice?.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#4e5968]">작성자</span>
                          <span>{notice?.author}</span>
                        </div>
                      </div>
                    </div>
                  </header>

                  {/* Article Body */}
                  <div className="prose prose-gray max-w-none mb-8">
                    <div className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                      <p>{notice?.content}</p>
                    </div>
                  </div>

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
