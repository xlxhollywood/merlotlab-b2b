"use client"
import { useState } from "react"
import { useEffect } from "react"
import { getNotices, type Notice } from "@/sanity/lib/sanity"
import FadeInUp from "@/components/animation/fade-in-up"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import IrHero from "@/components/hero/ir-hero" // IrHero 컴포넌트 임포트
import IrTabs from "@/components/ir/ir-tabs"
import IrPagination from "@/components/ir/ir-pagination"
import IrMessage from "@/components/ir/ir-message"

export default function NoticesPage() {
  const t = useTranslations("ir")
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
    return <IrMessage text={t("loading")} />
  }

  return (
    <div className="min-h-screen bg-white">
      <IrHero /> {/* IrHero 컴포넌트 사용 */}
      {/* Main Content */}
      <FadeInUp delay={300}>
        <section className="bg-white mb-6 sm:mb-8 lg:mb-12 sm:mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-20">
              <IrTabs
                activeTab={activeTab}
                onDisclosureClick={handleDisclosureTabClick}
                onAnnouncementClick={() => setActiveTab("announcement")}
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
                  {/* Notice List */}
                  <div className="space-y-3 lg:space-y-4">
                    {currentData.length === 0 ? (
                      <div className="text-center py-12 text-gray-500">
                        <p>{t("noResults")}</p>
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
