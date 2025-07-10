import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Network, Settings, Leaf } from "lucide-react"

const strengths = [
  {
    icon: Network,
    title: "세계 최고 수준의 독자 기술력",
    description:
      "메쉬 네트워크와 Dual-Stack 통신 기술을 자체 개발하여 수천, 수만 대의 기기를 단일 네트워크로 연결합니다. 기존 Zigbee, BLE 대비 수백 배 뛰어난 성능으로 스마트 빌딩 IoT의 새로운 표준을 제시합니다.",
  },
  {
    icon: Lightbulb,
    title: "국내 DR·VPP 분야 선도 기업",
    description:
      "국내 최초 조명 기반 수요반응(DR) 시스템 구축과 가상발전소(VPP) 운영 경험을 보유하고 있습니다. 전력계통 주파수추종 성공으로 검증된 기술력과 1.2GW 규모의 전력자원 확보 가능성을 입증했습니다.",
  },
  {
    icon: Settings,
    title: "통합 솔루션 기반 원스톱 서비스",
    description:
      "IC 설계부터 하드웨어 개발, 네트워크 구축, 소프트웨어 운영까지 전 과정을 자체 개발/관리합니다. 고객 요구사항에 맞춘 맞춤형 솔루션과 신속한 기술 지원으로 프로젝트 성공을 보장합니다.",
  },
  {
    icon: Leaf,
    title: "경제성과 환경 가치의 동시 실현",
    description:
      "별도 배선 공사 없이 기존 조명 교체만으로 스마트 빌딩 전환이 가능합니다. 기존 메탈등·형광등 대비 58~78% 전력 절감과 탄소 배출 감소를 달성하며, 혁신적 비용 효율성으로 투자 대비 최대 수익을 창출합니다.",
  },
]

export default function CompanyStrengths() {
  return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {strengths.map((strength, index) => {
            const IconComponent = strength.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-[#583CF2]/10 flex items-center justify-center group-hover:bg-[#583CF2]/20 transition-colors duration-300">
                        <IconComponent className="w-7 h-7 text-[#583CF2]" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#583CF2] transition-colors duration-300">
                        {strength.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{strength.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
  )
}
