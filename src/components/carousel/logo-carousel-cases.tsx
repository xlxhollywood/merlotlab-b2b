"use client"
import Image from "next/image"

export default function LogoCarouselMain() {
  // 애니메이션 계산을 위한 기준 너비 (가장 큰 화면 기준)
  // md:w-48 (192px) + md:mx-8 (총 32px 갭) = 224px
  const baseItemWidthForAnimation = 192 + 32

  const companies = [
    {
      name: "삼성전자",
      logo: "/삼성전자.png",
      alt: "삼성전자 로고",
      width: 180,
      height: 26,
    },
    {
      name: "삼성 디스플레이",
      logo: "/삼성 디스플레이.svg",
      alt: "삼성전자 디스플레이",
      width: 160,
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

  // 매끄러운 무한 루프를 위해 3번 복제 (유지)
  const triplicatedCompanies = [...companies, ...companies, ...companies]

  return (
    <div className="w-full py-0 sm:py-8 overflow-hidden border-t border-gray-100">
      {/* 로고 캐러셀을 아래로 이동 */}
      <div className="relative mt-8 sm:mt-16">
        {/* Left gradient overlay - 모바일에서 숨김 */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 hidden sm:block" />
        {/* Right gradient overlay - 모바일에서 숨김 */}
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 hidden sm:block" />

        <div
          className="flex items-center animate-scroll hover:pause-animation"
          // 애니메이션 속도 일관성을 위해 전체 너비를 고정 (가장 큰 화면 기준)
          style={{
            width: `${triplicatedCompanies.length * baseItemWidthForAnimation}px`,
          }}
        >
          {triplicatedCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              // 로고 컨테이너의 높이와 너비를 조정하여 이미지 크기를 줄였습니다.
              // 반응형 너비 및 마진 적용: 모바일(기본)은 작게, sm 이상에서는 크게
              // 간격을 더 넓게 조정했습니다.
              className="flex items-center justify-center flex-shrink-0 h-14 sm:h-16 w-24 sm:w-32 md:w-48 mx-4 sm:mx-6 md:mx-8"
            >
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={company.alt}
                width={company.width}
                height={company.height}
                className="object-contain max-w-full max-h-full opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
      {/* 스타일은 그대로 유지 */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.333%, 0, 0);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite; /* 속도를 30s로 변경 */
          will-change: transform;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
