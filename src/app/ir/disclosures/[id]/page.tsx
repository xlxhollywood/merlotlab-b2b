"use client"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import { useEffect } from "react"
import {
  getDisclosure,
  getPrevDisclosure,
  getNextDisclosure,
  type Disclosure,
  type NavigationItem,
} from "@/sanity/lib/sanity"
import { useParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import IrHero from "@/components/hero/ir-hero" // IrHero 컴포넌트 임포트

export default function IRDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("disclosure") // 이 페이지는 '공시 정보' 상세이므로 기본 탭은 disclosure
  const [disclosure, setDisclosure] = useState<Disclosure | null>(null)
  const [loading, setLoading] = useState(true)
  const [prevDisclosure, setPrevDisclosure] = useState<NavigationItem | null>(null)
  const [nextDisclosure, setNextDisclosure] = useState<NavigationItem | null>(null)

  useEffect(() => {
    async function fetchDisclosure() {
      console.log("params.id:", params.id)
      if (params.id) {
        try {
          console.log("Fetching disclosure...")
          const data = await getDisclosure(params.id as string)
          console.log("Fetched data:", data)
          setDisclosure(data)
          // 실제 이전글/다음글 가져오기
          if (data) {
            const [prev, next] = await Promise.all([
              getPrevDisclosure(params.id as string, data.date),
              getNextDisclosure(params.id as string, data.date),
            ])
            setPrevDisclosure(prev)
            setNextDisclosure(next)
          }
        } catch (error) {
          console.error("Error fetching disclosure:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchDisclosure()
  }, [params.id])

  // '공고 사항' 탭으로 이동하는 함수 (원래 로직 유지)
  const handleAnnouncementClick = () => {
    router.push("/ir/notices")
  }

  const handleBackToList = () => {
    router.push("/ir/disclosures")
  }

  const handlePrevDisclosure = () => {
    if (prevDisclosure) {
      router.push(`/ir/disclosures/${prevDisclosure._id}`)
    }
  }

  const handleNextDisclosure = () => {
    if (nextDisclosure) {
      router.push(`/ir/disclosures/${nextDisclosure._id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    )
  }

  if (!disclosure) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">공고를 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <IrHero /> {/* IrHero 컴포넌트 사용 */}
      {/* Main Content */}
      <section className="bg-white mb-6 sm:mb-8 lg:mb-16 sm:mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-20">
            {/* Mobile Tabs */}
            <div className="lg:hidden">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {/* '공시 정보' 탭: 현재 페이지이므로 탭 상태만 변경 */}
                <button
                  onClick={() => setActiveTab("disclosure")}
                  className={`flex-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "disclosure" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800"}`}
                >
                  공시 정보
                </button>
                {/* '공고 사항' 탭: 공고 사항 목록 페이지로 이동 (원래 로직 유지) */}
                <button
                  onClick={handleAnnouncementClick}
                  className={`flex-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "announcement" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800"}`}
                >
                  공고 사항
                </button>
              </div>
            </div>
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="space-y-4">
                {/* '공시 정보' 탭: 현재 페이지이므로 탭 상태만 변경 */}
                <button
                  onClick={() => setActiveTab("disclosure")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === "disclosure" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}
                >
                  공시 정보
                </button>
                {/* '공고 사항' 탭: 공고 사항 목록 페이지로 이동 (원래 로직 유지) */}
                <button
                  onClick={handleAnnouncementClick}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === "announcement" ? "bg-[#583CF2] text-white" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}
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
                        {disclosure?.title}
                      </h1>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-[#8b95a1]">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#4e5968]">작성일</span>
                          <span>{disclosure?.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#4e5968]">작성자</span>
                          <span>{disclosure?.author}</span>
                        </div>
                      </div>
                    </div>
                  </header>
                  {/* Article Body */}
                  <div className="prose prose-gray max-w-none mb-8">
                    <div className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                      <p>{disclosure?.content}</p>
                    </div>
                    {/* 대표 이미지 표시 */}
                    {disclosure?.featuredImage && (
                      <div className="mb-8 not-prose">
                        <Image
                          src={urlFor(disclosure.featuredImage).width(800).url() || "/placeholder.svg"}
                          alt={disclosure.featuredImage.alt || disclosure.title || "대표 이미지"}
                          width={800}
                          height={600}
                          className="w-full h-auto"
                          priority
                        />
                      </div>
                    )}
                    {/* 첨부파일 갤러리 */}
                    {disclosure?.attachments && disclosure.attachments.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">첨부파일</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {disclosure.attachments.map((attachment: any, index: number) => (
                            <Image
                              key={index}
                              src={urlFor(attachment).width(400).height(192).url() || "/placeholder.svg"}
                              alt={attachment.alt || `첨부파일 ${index + 1}`}
                              width={400}
                              height={192}
                              className="w-full h-48 object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* 이전글/다음글 네비게이션 */}
                  <div className="border-t border-gray-200 pt-8 mt-8">
                    <div className="space-y-4">
                      {/* 이전글 */}
                      {prevDisclosure && (
                        <div
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={handlePrevDisclosure}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <ChevronLeft className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <div className="min-w-0">
                              <div className="text-sm text-gray-500 mb-1">이전글</div>
                              <div className="text-gray-800 hover:text-[#583CF2] transition-colors truncate">
                                {prevDisclosure.title}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {/* 다음글 */}
                      {nextDisclosure && (
                        <div
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={handleNextDisclosure}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="min-w-0 flex-1">
                              <div className="text-sm text-gray-500 mb-1">다음글</div>
                              <div className="text-gray-800 hover:text-[#583CF2] transition-colors truncate">
                                {nextDisclosure.title}
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          </div>
                        </div>
                      )}
                      {/* 이전글/다음글이 모두 없는 경우 */}
                      {!prevDisclosure && !nextDisclosure && (
                        <div className="text-center text-gray-500 py-4">이전글 또는 다음글이 없습니다.</div>
                      )}
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
