"use client"
import Image from "next/image"

export default function LogoCarouselContact() {
  // 갭 조절 변수들
  const itemWidth = 144 // w-36 = 144px (각 아이템의 기본 너비)
  const itemGap = 80 // gap-24 = 96px (아이템 간 간격)
  const totalItemWidth = itemWidth + itemGap // 240px

  const companies = [
    {
      name: "삼성 디스플레이",
      logo: "/삼성 디스플레이.svg",
      alt: "삼성전자 디스플레이",
      width: 150,
      height: 8,
    },
    {
      name: "현대모비스",
      logo: "/현대모비스.png",
      alt: "현대모비스 로고",
      width: 160,
      height: 10,
    },
    {
      name: "SK텔레콤",
      logo: "/SKT.png",
      alt: "SK텔레콤 로고",
      width: 175,
      height: 25,
    },
    {
      name: "GS리테일",
      logo: "/GS리테일.png",
      alt: "GS리테일 로고",
      width: 145,
      height: 85,
    },
    {
      name: "GS네트웍스",
      logo: "/GS네트웍스.png",
      alt: "GS네트웍스 로고",
      width: 200,
      height: 80,
    },
    {
      name: "CJ대한통운",
      logo: "/CJ대한통운.png",
      alt: "CJ대한통운 로고",
      width: 180,
      height: 80,
    },
    {
      name: "이마트",
      logo: "/이마트.png",
      alt: "이마트 로고",
      width: 125,
      height: 40,
    },
    {
      name: "BGF로지스",
      logo: "/BGF로지스.png",
      alt: "BGF로지스 로고",
      width: 185,
      height: 195,
    },
    {
      name: "NH투자증권",
      logo: "/NH투자증권.png",
      alt: "NH투자증권 로고",
      width: 225,
      height: 75,
    },
    {
      name: "신한은행",
      logo: "/신한은행.png",
      alt: "신한은행 로고",
      width: 175,
      height: 50,
    },
  ]

  // Duplicate companies for seamless loop
  const duplicatedCompanies = [...companies, ...companies]

  return (
    <div className="w-full max-w-[1150px] mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">솔루션 도입사</h2>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-r from-gray-50 via-white to-gray-50 rounded-xl py-6">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div
          className="flex items-center animate-scroll hover:pause-animation"
          style={{
            width: `${duplicatedCompanies.length * totalItemWidth}px`,
            gap: `${itemGap}px`,
          }}
        >
          {duplicatedCompanies.map((company, index) => {
            // 각 회사별로 적절한 크기 설정
            let imgSize = 118 // 기본 크기
            if (company.name === "NH투자증권") imgSize = 150
            if (company.name === "GS리테일") imgSize = 108
            if (company.name === "이마트") imgSize = 100
            if (company.name === "GS네트웍스") imgSize = 200
            if (company.name === "CJ대한통운") imgSize = 140

            return (
              <div
                key={`${company.name}-${index}`}
                className="flex flex-col items-center flex-shrink-0 h-32"
                style={{ width: `${itemWidth}px` }}
              >
                {/* ① 이미지 박스만 고정 크기 - 완전한 가운데 정렬 */}
                <div className="flex items-center justify-center w-36 h-36 relative mb-2">
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
          animation: scroll 30s linear infinite;
          will-change: transform;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
