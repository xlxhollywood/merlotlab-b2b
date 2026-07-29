// IR 페이지 로딩 스켈레톤 (콘텐츠 모양 pulse). 기존 IrMessage 텍스트 로딩 대체.
// - IrListSkeleton / IrDetailSkeleton: 페이지 내부 로딩(클라 페칭) 콘텐츠 영역용.
// - IrPageSkeleton: loading.tsx 전용(히어로 + 탭 자리 + 콘텐츠 스켈레톤 전체 셸).
import IrHero from "@/components/hero/ir-hero"

// 목록 행 스켈레톤 (부모의 space-y 안에 배치되는 카드 조각들)
export function IrListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div aria-hidden="true" className="contents">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="p-4 sm:p-5 lg:p-6 bg-white border border-gray-200 rounded-lg"
        >
          <div className="animate-pulse space-y-3">
            <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

// 상세 본문 스켈레톤 (제목/메타 헤더 + 본문 라인)
export function IrDetailSkeleton() {
  return (
    <div aria-hidden="true" className="max-w-4xl space-y-6 sm:space-y-8">
      <div className="animate-pulse">
        <div className="border-b border-gray-200 pb-6 mb-8 space-y-6">
          <div className="h-7 sm:h-9 bg-gray-200 rounded w-3/4" />
          <div className="flex gap-6">
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    </div>
  )
}

// 탭 사이드바 자리(정적 placeholder — loading.tsx는 핸들러가 없어 실제 IrTabs 대신 사용)
function TabsPlaceholder() {
  return (
    <>
      <div className="lg:hidden">
        <div className="h-11 bg-gray-100 rounded-lg animate-pulse" />
      </div>
      <div className="hidden lg:block lg:w-64 flex-shrink-0 space-y-4">
        <div className="h-11 bg-gray-100 rounded-lg animate-pulse" />
        <div className="h-11 bg-gray-100 rounded-lg animate-pulse" />
      </div>
    </>
  )
}

// loading.tsx 전용 전체 셸 스켈레톤
export function IrPageSkeleton({ variant }: { variant: "list" | "detail" }) {
  return (
    <div className="min-h-screen bg-white">
      <IrHero />
      <section className="bg-white mb-6 sm:mb-8 lg:mb-12 sm:mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-20">
            <TabsPlaceholder />
            <div className="flex-1 min-w-0">
              {variant === "list" ? (
                <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                  <div className="w-full max-w-md h-11 sm:h-12 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="space-y-3 lg:space-y-4">
                    <IrListSkeleton />
                  </div>
                </div>
              ) : (
                <IrDetailSkeleton />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
