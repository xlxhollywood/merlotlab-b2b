"use client"

import Image from "next/image"

const strengths = [
  {
    image: "/network cable.png",
    title: "세계 최고 수준의 독자 기술력",
    description: (
      <>
        메쉬 네트워크와 Dual-Stack 통신 기술로 수만 대 <br />
        기기를 단일 네트워크로 연결하여 기존 Zigbee, BLE <br />
        대비 수백 배 뛰어난 성능을 자랑합니다.
      </>
    ),
  },
  {
    image: "/flash.png",
    title: "국내 DR·VPP 분야 선도 기업",
    description: (
      <>
        국내 최초 조명 기반 수요반응(DR) 시스템 구축과 <br />
        가상발전소(VPP) 운영 경험 보유. 1.2GW 규모의 <br />
        전력자원 확보 가능성을 입증했습니다.
      </>
    ),
  },
  {
    image: "/white gear.png",
    title: "통합 솔루션 기반 원스톱 서비스",
    description: (
      <>
        IC 설계부터 하드웨어 개발, 네트워크 구축, <br />
        소프트웨어 운영까지 전 과정을 자체 개발/관리하여 <br />
        맞춤형 솔루션을 제공합니다.
      </>
    ),
  },
  {
    image: "/eco.png",
    title: "경제성과 환경 가치의 동시 실현",
    description: (
      <>
        별도 배선 공사 없이 기존 조명 교체만으로 <br />
        스마트 빌딩 전환 가능하여 58~78% 전력 절감과 <br />
        탄소 배출 감소를 동시에 달성합니다.
      </>
    ),
  },
]

export default function FloatingCards() {
  return (
    <div className="max-w-6xl mx-auto p-6">
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
          animation: float 4s ease-in-out infinite;
        }
        .float-4 {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
        {strengths.map((strength, index) => (
          <div key={index} className="group transition-all duration-300 p-8">
            <div className="flex flex-col items-center text-center">
              <div className={`mb-6 p-4 float-${index + 1}`}>
                <Image
                  src={strength.image || "/placeholder.svg"}
                  alt={strength.title}
                  width={140}
                  height={140}
                  className="w-30 h-30 drop-shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {index === 0 && (
                  <>
                    세계 <span className="text-primary">최고 수준</span>의 독자 기술력
                  </>
                )}
                {index === 1 && (
                  <>
                    국내 DR·VPP 분야 <span className="text-primary">선도 기업</span>
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
              <p className="text-xl text-gray-600 leading-relaxed">{strength.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
