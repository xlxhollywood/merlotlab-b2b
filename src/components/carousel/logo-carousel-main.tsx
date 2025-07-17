"use client"
import Image from "next/image"

export default function LogoCarouselMain() {
  // 갭 조절 변수들
  const logoContainerWidth = 256 // w-64 = 256px
  const logoGap = 14 // mx-4 = 16px * 2 = 32px 간격
  const totalItemWidth = logoContainerWidth + logoGap // 288px

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

  // 매끄러운 무한 루프를 위해 3번 복제
  const triplicatedCompanies = [...companies, ...companies, ...companies]

  return (
    <div className="w-full bg-white py-12 sm:py-16 overflow-hidden">
      <div className="relative">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div
          className="flex items-center animate-scroll hover:pause-animation"
          style={{
            width: `${triplicatedCompanies.length * totalItemWidth}px`,
          }}
        >
          {triplicatedCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex items-center justify-center flex-shrink-0 h-18 sm:h-24"
              style={{
                width: `${logoContainerWidth}px`,
                marginLeft: `${logoGap / 2}px`,
                marginRight: `${logoGap / 2}px`,
              }}
            >
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={company.alt}
                width={company.width}
                height={company.height}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </div>

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
