"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

// IR 목록 페이지 공통 페이지네이션(이전/다음 + 페이지 번호). totalPages<=1이면 렌더 안 함.
export default function IrPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  return (
    <nav className="flex justify-center pt-4">
      <ul className="flex items-center space-x-1">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
                onClick={() => onPageChange(pageNum)}
                className={`px-2.5 sm:px-3 py-2 text-sm rounded-lg border transition-colors ${currentPage === pageNum ? "bg-primary text-white border-primary" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
              >
                {pageNum}
              </button>
            </li>
          ))
        })()}
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </li>
      </ul>
    </nav>
  )
}
