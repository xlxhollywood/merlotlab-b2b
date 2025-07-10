"use client"

interface PortfolioCard {
  title: string
  subtitle: string
  tags: string[]
  image: string
}

// 기존 PortfolioCard 컴포넌트
export default function PortfolioCard() {
  const stats = [
    {
      label: "도입 사업장",
      value: 1034,
      unit: "개소",
      description: "`24.01 ~`25.02, 17MW",
    },
    {
      label: "누적 절감 전력량",
      value: 21500,
      unit: "TWh",
      description: "전환 시스템을 통해 누적된 절감량",
    },
    {
      label: "평균 설치 소요 기간",
      value: 11.4,
      unit: "일",
      description: "사업장 한 곳 설치 완료 기준",
    },
    {
      label: "사업장 전력량 절감 평균",
      value: 52.5,
      unit: "%",
      description: "시스템 도입 후 절감된 평균 수치",
    },
  ]

  const caseStudies: PortfolioCard[] = [
    {
      title: "CJ대한통운 동탄 현장",
      subtitle: "전력량 52% 절감",
      tags: ["물류 센터"],
      image: "/물류센터1.png",
    },
    {
      title: "GS네트웍스 양산 물류센터",
      subtitle: "일/평균전력사용량 62.9% 절감",
      tags: ["물류센터", "사무실"],
      image: "/물류센터2.jpg",
    },
  ]

  return (
    <div className="mt-10 relative">
      {caseStudies.map((caseStudy, index) => (
        <div key={index} className="w-full border-t border-gray-200 px-2 py-6 text-left xs:px-5">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <h5 className="my-6 truncate font-bold text-gray-600">
                {caseStudy.title}
                <br />
                {caseStudy.subtitle}
              </h5>
              <div>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-sm h-fit w-fit rounded-md px-3 py-1.5 text-white"
                      style={{ backgroundColor: "#583CF2" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative rounded-md" style={{ height: "250px" }}>
              <img
                alt={`${caseStudy.title} 이미지`}
                src={caseStudy.image || "/placeholder.svg?height=250&width=400"}
                className="h-full w-full rounded-md object-cover brightness-100"
              />
            </div>
          </div>
        </div>
      ))}

      {/* 마지막 카드까지 덮는 큰 gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-white via-white/90 via-white/70 to-transparent pointer-events-none" />

      {/* 더 강한 하단 gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  )
}
