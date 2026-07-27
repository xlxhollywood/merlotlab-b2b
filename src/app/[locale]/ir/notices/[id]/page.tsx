"use client"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/navigation"
import { useState } from "react"
import { useEffect } from "react"
import { getNotice, getPrevNotice, getNextNotice, type Notice, type NavigationItem } from "@/sanity/lib/sanity"
import { useParams } from "next/navigation"
import IrHero from "@/components/hero/ir-hero" // IrHero 컴포넌트 임포트
import IrTabs from "@/components/ir/ir-tabs"
import IrDetailNav from "@/components/ir/ir-detail-nav"
import IrMessage from "@/components/ir/ir-message"

export default function IRNoticeDetailPage() {
  const t = useTranslations("ir")
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("announcement") // 이 페이지는 '공고 사항' 상세이므로 기본 탭은 announcement
  const [notice, setNotice] = useState<Notice | null>(null)
  const [loading, setLoading] = useState(true)
  const [prevNotice, setPrevNotice] = useState<NavigationItem | null>(null)
  const [nextNotice, setNextNotice] = useState<NavigationItem | null>(null)

  useEffect(() => {
    async function fetchNotice() {
      console.log("params.id:", params.id)
      if (params.id) {
        try {
          console.log("Fetching notice...")
          const data = await getNotice(params.id as string)
          console.log("Fetched data:", data)
          setNotice(data)
          // 실제 이전글/다음글 가져오기
          if (data) {
            const [prev, next] = await Promise.all([
              getPrevNotice(params.id as string, data.date),
              getNextNotice(params.id as string, data.date),
            ])
            setPrevNotice(prev)
            setNextNotice(next)
          }
        } catch (error) {
          console.error("Error fetching notice:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchNotice()
  }, [params.id])

  // '공시 정보' 탭으로 이동하는 함수
  const handleDisclosureTabClick = () => {
    router.push("/ir/disclosures") // 공시 정보 페이지 경로로 이동
  }

  const handleBackToList = () => {
    router.push("/ir/notices") // 공고 사항 목록 페이지로 이동
  }

  const handlePrevNotice = () => {
    if (prevNotice) {
      router.push(`/ir/notices/${prevNotice._id}`)
    }
  }

  const handleNextNotice = () => {
    if (nextNotice) {
      router.push(`/ir/notices/${nextNotice._id}`)
    }
  }

  if (loading) {
    return <IrMessage text={t("loading")} />
  }

  if (!notice) {
    return <IrMessage text={t("notFound")} />
  }

  return (
    <div className="min-h-screen bg-white">
      <IrHero /> {/* IrHero 컴포넌트 사용 */}
      {/* Main Content */}
      <section className="bg-white mb-6 sm:mb-8 lg:mb-16 sm:mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-20">
            <IrTabs
              activeTab={activeTab}
              onDisclosureClick={handleDisclosureTabClick}
              onAnnouncementClick={() => setActiveTab("announcement")}
            />
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
                          <span className="font-medium text-[#4e5968]">{t("labelDate")}</span>
                          <span>{notice?.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#4e5968]">{t("labelAuthor")}</span>
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
                  <IrDetailNav
                    prev={prevNotice}
                    next={nextNotice}
                    onPrev={handlePrevNotice}
                    onNext={handleNextNotice}
                    onBack={handleBackToList}
                  />
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
