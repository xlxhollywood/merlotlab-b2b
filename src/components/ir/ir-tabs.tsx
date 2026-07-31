"use client"

import { useTranslations } from "next-intl"

// IR 공시/공고 페이지 공통 탭(모바일 상단 탭 + 데스크톱 좌측 사이드바).
// activeTab로 강조 표시, 두 버튼의 동작은 페이지가 핸들러로 주입한다.
// (목록 페이지: 자기 탭=상태 변경, 상대 탭=이동 / 상세 페이지: 자기 탭=상태 변경, 상대 탭=목록 이동)
export default function IrTabs({
  activeTab,
  onDisclosureClick,
  onAnnouncementClick,
}: {
  activeTab: string
  onDisclosureClick: () => void
  onAnnouncementClick: () => void
}) {
  const t = useTranslations("ir")

  return (
    <>
      {/* Mobile Tabs - 모바일에서는 상단에 탭으로 표시 */}
      <div className="lg:hidden">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={onDisclosureClick}
            className={`flex-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "disclosure" ? "bg-primary text-white" : "text-gray-600 hover:text-gray-800"}`}
          >
            {t("tabDisclosure")}
          </button>
          <button
            onClick={onAnnouncementClick}
            className={`flex-1 px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === "announcement" ? "bg-primary text-white" : "text-gray-600 hover:text-gray-800"}`}
          >
            {t("tabAnnouncement")}
          </button>
        </div>
      </div>
      {/* Desktop Sidebar - 데스크톱에서만 표시 */}
      <div className="hidden lg:block lg:w-64 flex-shrink-0">
        <div className="space-y-4">
          <button
            onClick={onDisclosureClick}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === "disclosure" ? "bg-primary text-white" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}
          >
            {t("tabDisclosure")}
          </button>
          <button
            onClick={onAnnouncementClick}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === "announcement" ? "bg-primary text-white" : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"}`}
          >
            {t("tabAnnouncement")}
          </button>
        </div>
      </div>
    </>
  )
}
