"use client"

import Image from "next/image"

export default function InvestmentCompanies() {
  const companies = [
    {
      name: "한국동서발전",
      logo: "/swf-red.png",
      alt: "한국동서발전 로고",
    },
    {
      name: "한국남동발전",
      logo: "/koen.png",
      alt: "한국남동발전 로고",
    },
    {
      name: "한국수력원자력",
      logo: "/green-logo.png",
      alt: "한국수력원자력 로고",
    },
    {
      name: "한국남부발전",
      logo: "/blue-logo.png",
      alt: "한국남부발전 로고",
    },
    {
      name: "한국중부발전",
      logo: "/blue-radial.png",
      alt: "한국중부발전 로고",
    },
    {
      name: "캡코이에스",
      logo: "/kes-yellow.png",
      alt: "캡코이에스 로고",
    },
    {
      name: "한국서부발전",
      logo: "/cwp.png",
      alt: "한국서부발전 로고",
    },
    {
      name: "한국서부발전",
      logo: "/swf-red-alt.png",
      alt: "한국서부발전 로고",
    },
  ]

  // Duplicate companies for seamless loop
  const duplicatedCompanies = [...companies, ...companies]

  return (
    <div className="w-full max-w-[1150px] mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">투자지원사</h2>
        
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
            // 한국중부발전만 크기를 10px 줄임
            const isKoreaMiddlePower = company.name === "한국중부발전"
            const imgBox = "w-24 h-24"
            const imgSize = isKoreaMiddlePower ? 70 : 96

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
        <p className="text-sm text-gray-500">신뢰할 수 있는 투자 지원사와 함께 성장하고 있습니다</p>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-${companies.length * 160}px, 0, 0);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
          will-change: transform;
        }
        .pause-animation:hover .animate-scroll {
          animation-play-state: paused;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
