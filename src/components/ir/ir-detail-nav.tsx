"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import type { NavigationItem } from "@/sanity/lib/sanity"

// IR 상세(공시/공고) 공통 하단 네비게이션: 이전글/다음글 + 목록으로.
export default function IrDetailNav({
  prev,
  next,
  onPrev,
  onNext,
  onBack,
}: {
  prev: NavigationItem | null
  next: NavigationItem | null
  onPrev: () => void
  onNext: () => void
  onBack: () => void
}) {
  const t = useTranslations("ir")

  return (
    <>
      {/* 이전글/다음글 네비게이션 */}
      <div className="border-t border-gray-200 pt-8 mt-8">
        <div className="space-y-4">
          {/* 이전글 */}
          {prev && (
            <div
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={onPrev}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <ChevronLeft className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm text-gray-500 mb-1">{t("prevPost")}</div>
                  <div className="text-gray-800 hover:text-primary transition-colors truncate">
                    {prev.title}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* 다음글 */}
          {next && (
            <div
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={onNext}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-gray-500 mb-1">{t("nextPost")}</div>
                  <div className="text-gray-800 hover:text-primary transition-colors truncate">
                    {next.title}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>
            </div>
          )}
          {/* 이전글/다음글이 모두 없는 경우 */}
          {!prev && !next && (
            <div className="text-center text-gray-500 py-4">{t("noAdjacent")}</div>
          )}
        </div>
      </div>
      {/* Bottom Actions */}
      <div className="border-t border-gray-200 pt-8 mt-8">
        <div className="flex justify-center">
          <button
            onClick={onBack}
            className="inline-flex items-center px-6 py-3 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {t("backToList")}
          </button>
        </div>
      </div>
    </>
  )
}
