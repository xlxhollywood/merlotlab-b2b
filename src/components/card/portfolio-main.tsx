"use client"

import Link from "next/link"

interface PortfolioCard {
  title: string
  subtitle: string
  tags: string[]
  image: string
}

// 기존 PortfolioCard 컴포넌트
export default function PortfolioCard() {

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
      tags: ["물류 센터", "사무실"],
      image: "/물류센터2.jpg",
    },
  ]

  return (
    <div className="mt-10 relative bg-gray-50">
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
                src={caseStudy.image || "/placeholder.svg"}
                className="h-full w-full rounded-md object-cover brightness-100"
              />
            </div>
          </div>
        </div>
      ))}

      {/* More Cases Button */}
      <div className="text-center mt-6 sm:mt-8 md:mt-10 pb-12 sm:pb-0">
        <Link href="/cases" className="no-underline">
                      <button className="focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 overflow-hidden border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-sm rounded-md px-4 sm:px-6 md:px-8 h-12 sm:h-14">
              <span className="text-sm sm:text-base md:text-lg font-medium">더 많은 사례 보기</span>
              <svg
                className="!size-4 sm:!size-5 md:!size-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
        </Link>
      </div>
      
      {/* <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50 via-gray-50/95 via-gray-50/80 via-gray-50/60 via-gray-50/40 via-gray-50/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 via-gray-50/90 to-transparent pointer-events-none" /> */}
    </div>
  )
}
