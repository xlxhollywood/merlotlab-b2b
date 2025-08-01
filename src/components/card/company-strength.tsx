"use client"

import Image from "next/image"

const strengths = [
  {
    image: "/network cable.png",
    title: "세계 최고 수준의 독자 기술력",
    description: (
      <>
        메쉬 네트워크와 Dual-Stack 기술로 <br />
        수만 대의  기기를  하나의 네트워크로 <br /> 빠르게 연결합니다.
      </>
    ),
  },
  {
    image: "/flash.png",
    title: "국내 DR 분야 선도 기업",
    description: (
      <>
        국내 최초 조명 기반 DR 시스템을 구축 <br />
        설치된 건물의 에너지를 분산 자원으로 <br /> 바꿉니다.
      </>
    ),
  },
  {
    image: "/white gear.png",
    title: "통합 솔루션 기반 원스톱 서비스",
    description: (
      <>
        IC 설계부터 H/W 개발, 네트워크 구축, <br />
        S/W 운영까지 자체 개발 및 관리하여<br /> 
        맞춤형 솔루션을 제공합니다.
      </>
    ),
  },
  {

    image: "/eco.png",
    title: "경제성과 환경 가치의 동시 실현",
    description: (
      <>
        별도 배선 공사 없이 조명 교체만으로 <br />
        전력 절감과 탄소 배출 감소를  <br /> 
        동시에  달성합니다.
      </>
    ),
  },
]

export default function FloatingCards() {
  return (
    <div className="max-w-[1550px] mx-auto px-6">
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .float-1 {
          animation: float 3s ease-in-out infinite;
        }
        .float-2 {
          animation: float 3s ease-in-out infinite;
        }
        .float-3 {
          animation: float 3s ease-in-out infinite;
        }
        .float-4 {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {strengths.map((strength, index) => (
          <div key={index} className="group transition-all duration-300 p-2">
            <div className="flex flex-col items-center text-center ">
              <div className={`mb-10 float-${index + 1}`}>
                <Image
                  src={strength.image || "/placeholder.svg"}
                  alt={strength.title}
                  width={120}
                  height={120}
                  className="w-28 h-28 drop-shadow-lg"
                />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                {index === 0 && (
                  <>
                    세계 <span className="text-primary">최고 수준</span>의 독자 기술력
                  </>
                )}
                {index === 1 && (
                  <>
                    국내 DR 분야 <span className="text-primary">선도 기업</span>
                  </>
                )}
                {index === 2 && (
                  <>
                    통합 솔루션 기반 <span className="text-primary">원스톱 서비스</span>
                  </>
                )}
                {index === 3 && (
                  <>
                    경제성과 환경 가치의 <span className="text-primary">동시 실현</span>
                  </>
                )}
              </h3>            
              <div className="w-3/4 h-0.5 bg-gray-100 my-1 mb-4"></div>
              <p className="text-base text-gray-600 leading-relaxed">{strength.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
