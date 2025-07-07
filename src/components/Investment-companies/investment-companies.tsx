"use client"

import Image from "next/image"

export default function InvestmentCompanies() {
  const companies = [
    {
      name: "삼성전자",
      logo: "/삼성전자.png",
      alt: "삼성전자 로고",
    },
    {
      name: "현대모비스",
      logo: "/현대모비스.png",
      alt: "현대모비스 로고",
    },
    {
      name: "SK텔레콤",
      logo: "/SKT.png",
      alt: "SK텔레콤 로고",
    },
    {
      name: "GS리테일",
      logo: "/GS리테일.png",
      alt: "GS리테일 로고",
    },
    {
      name: "GS네트웍스",
      logo: "/GS네트웍스.png",
      alt: "GS네트웍스 로고",
    },
    {
      name: "CJ대한통운",
      logo: "/CJ대한통운.png",
      alt: "CJ대한통운 로고",
    },
    {
      name: "이마트",
      logo: "/이마트.png",
      alt: "이마트 로고",
    },
    {
      name: "BGF로지스",
      logo: "/BGF로지스.png",
      alt: "BGF로지스 로고",
    },
    {
      name: "NH투자증권",
      logo: "/NH투자증권.png",
      alt: "NH투자증권 로고",
    },
    {
      name: "신한은행",
      logo: "/신한은행.png",
      alt: "신한은행 로고",
    },
  ]

  // Duplicate companies for seamless loop
  const duplicatedCompanies = [...companies, ...companies]

  return (
    <div className="w-full max-w-[1150px] mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">솔루션 도입사</h2>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl py-6">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div
          className="flex items-center gap-24 animate-scroll hover:pause-animation"
          style={{
            width: `${duplicatedCompanies.length * 160}px`,
          }}
        >
          {duplicatedCompanies.map((company, index) => {
            // 각 회사별로 적절한 크기 설정
            let imgSize = 118 // 기본 크기
            if (company.name === "NH투자증권") imgSize = 150
            if (company.name === "GS리테일") imgSize = 110
            if (company.name === "이마트") imgSize = 100
            if (company.name === "GS네트웍스") imgSize = 200
            if (company.name === "CJ대한통운") imgSize = 140

            const imgBox = "w-36 h-36"

            return (
              <div key={`${company.name}-${index}`} className="flex flex-col items-center flex-shrink-0 h-32">
                {/* ① 이미지 박스만 고정 크기 - 완전한 가운데 정렬 */}
                <div className={`flex items-center justify-center ${imgBox} relative mb-2`}>
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    alt={company.alt}
                    width={imgSize}
                    height={imgSize}
                    className="object-contain absolute inset-0 m-auto"
                  />
                </div>
                {/* ② 텍스트는 박스 아래에 - 고정 너비와 높이로 일관성 유지 */}
                <div className="mt-2 w-24 h-10 flex items-center justify-center">
                  <h3 className="text-sm font-medium text-gray-600 text-center leading-tight">{company.name}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">메를로랩은 고객사의 지속적인 성장을 지원합니다</p>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
          will-change: transform;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
