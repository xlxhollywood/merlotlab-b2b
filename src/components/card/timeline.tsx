"use client"

import { useState } from "react"
import FadeInUp from "@/components/animation/fade-in-up"

interface TimelineEvent {
  month: string
  description: string
  isHighlighted?: boolean
}

interface TimelineYear {
  year: string
  color: string
  bgColor: string
  events: TimelineEvent[]
}

const timelineData: TimelineYear[] = [
  {
    year: "2024",
    color: "text-[#583CF2]",
    bgColor: "bg-[#583CF2]",
    events: [{ month: "04", description: "에너지 효율화동력 솔루션 위한 업무협약", isHighlighted: false }],
  },
  {
    year: "2023",
    color: "text-[#583CF2]",
    bgColor: "bg-[#583CF2]",
    events: [
      {
        month: "08",
        description: "스마트조명을 활용한 ESG리드 설정과<br />홍보 및 고객유치 업무협약",
        isHighlighted: false,
      },
      {
        month: "08",
        description: "국민DR 사업활성화 및 에지절감을 위한 실증재제 공동 추진 업무협약",
        isHighlighted: false,
      },
      { month: "07", description: "우수제품지정(중소청)", isHighlighted: false },
      { month: "06", description: "CPS 64억 투자유치성공", isHighlighted: true },
      { month: "06", description: "전기산업진흥사 에너지수요효율화투자위한 업무협약", isHighlighted: false },
      {
        month: "06",
        description: "스마트조명을 통한 건축물 에너지 절약<br />효율화 비즈니스를 위한 업무 협약",
        isHighlighted: false,
      },
      {
        month: "04",
        description: "상업시설 대상 DR제도 연계 에너지 절약<br />실증을 위한 MOU체결(전력거래소외)",
        isHighlighted: false,
      },
      {
        month: "03",
        description: "편의점 대상 AMI-스마트기기 기반<br />Auto DR실증 MOU체결(전력거래소외)",
        isHighlighted: false,
      },
    ],
  },
  {
    year: "2022",
    color: "text-[#6D4CF5]",
    bgColor: "bg-[#6D4CF5]",
    events: [
      { month: "12", description: "제4차 전력수급 활용한 주민신재생에너지<br />협동조합 상생 수익", isHighlighted: false },
      { month: "11", description: "IoT 스마트조명을 활용한 주민수익형<br />실증사업 상생 수익", isHighlighted: false },
      { month: "11", description: "LH 인천부평 홈 IoT 명동 남부", isHighlighted: false },
      {
        month: "05",
        description: "ICT 기술기반 에너지효율화사업<br />보급활성화 MOU체결(컬리아이스)",
        isHighlighted: false,
      },
      { month: "02", description: "고효율에너지기자재 인증획득(스마트LED조명제어시스템)", isHighlighted: false },
      { month: "01", description: "고효율에너지기자재 인증획득(스마트LED등기구)", isHighlighted: false },
      { month: "01", description: "25억 투자유치성공", isHighlighted: true },
    ],
  },
  {
    year: "2021",
    color: "text-[#7C3AED]",
    bgColor: "bg-[#7C3AED]",
    events: [
      { month: "12", description: "LH 광주아파트를 통한 IoT 명동 남부", isHighlighted: false },
      {
        month: "11",
        description: "IoT 스마트 조명을 활용한 주민수익형<br />실증 MOU체결(전력거래소)",
        isHighlighted: false,
      },
      { month: "07", description: "RCPS 7억 투자유치성공", isHighlighted: true },
      { month: "06", description: "소재부품위원전기업협인사", isHighlighted: false },
      { month: "06", description: "RCPS 30억 투자유치성공", isHighlighted: true },
      { month: "05", description: "제5회 CB 27.4억 발행", isHighlighted: false },
      {
        month: "03",
        description: "ICT기술 기반의 시스템 공동개발 및<br />상호협력 MOU체결(한전산업개발)",
        isHighlighted: false,
      },
      {
        month: "01",
        description: "2020년도 우수연구개발 혁신제품 지정<br />인증서(중소벤처기업부장관)",
        isHighlighted: false,
      },
    ],
  },
  {
    year: "2020",
    color: "text-[#8B5CF6]",
    bgColor: "bg-[#8B5CF6]",
    events: [
      { month: "08", description: "상생협력제품 확인서(중소벤처기업부장관)", isHighlighted: false },
      { month: "07", description: "ISO 9001:2015(품질인증)", isHighlighted: false },
      { month: "05", description: "브랜드K 인증서(중소벤처기업부장관)<br />IoT공구", isHighlighted: false },
      { month: "05", description: "상생협력 혁신제품 선정<br />(중소벤처기업부장관)", isHighlighted: false },
      { month: "04", description: "환경표지 인증서(한국환경산업기술원)", isHighlighted: false },
      { month: "03", description: "자동형전력량 시업자 등록<br />(산업자원부장관)", isHighlighted: false },
      { month: "02", description: "제5회 CB 7.4억(NH)", isHighlighted: false },
    ],
  },
  {
    year: "2019",
    color: "text-[#8B5CF6]",
    bgColor: "bg-[#8B5CF6]",
    events: [
      { month: "11", description: "제3회 CB 30억(엔터)", isHighlighted: false },
      {
        month: "11",
        description: "세계최초 완전 무선기반 발열, 공정 전용<br />IoT 모집 시스템 출시 'Grid'",
        isHighlighted: true,
      },
      { month: "07", description: "스마트조명 '스승리 IoT 허브'<br />크라우드펀딩", isHighlighted: false },
      { month: "06", description: "LED&OLED EXPO 신기술 및 우수제품<br />개발상(한국에너지공단)", isHighlighted: false },
      { month: "06", description: "세계 최초 고효율 AC(125lm/W급) 공정등 출시", isHighlighted: true },
    ],
  },
  {
    year: "2018",
    color: "text-[#9F7AEA]",
    bgColor: "bg-[#9F7AEA]",
    events: [
      { month: "11", description: "KT Partner Award 스타트업분야 도전상 수상", isHighlighted: false },
      { month: "10", description: "유상증자 6차(우리은행)", isHighlighted: false },
      { month: "10", description: "2018년 Global Sources 홍콩<br />전시회 참가", isHighlighted: false },
      { month: "08", description: "IoT 전구 및 방등 출시", isHighlighted: false },
      { month: "03", description: "유상증자 5차(KT인정3차)", isHighlighted: false },
    ],
  },
  {
    year: "2017",
    color: "text-[#9F7AEA]",
    bgColor: "bg-[#9F7AEA]",
    events: [
      { month: "03", description: "RGB BULB 출시", isHighlighted: false },
      { month: "02", description: "가정용 일반등 3종, 스마트등 3종 출시", isHighlighted: false },
    ],
  },
  {
    year: "2016",
    color: "text-[#A78BFA]",
    bgColor: "bg-[#A78BFA]",
    events: [
      { month: "12", description: "이노비즈인증획득", isHighlighted: false },
      {
        month: "11",
        description: "2 Color Smart Bulb 인증/ 컴퓨터조명전시시스템<br />서울시정상 수상",
        isHighlighted: false,
      },
      { month: "09", description: "제11회 디지털이노베이션대상수상<br />(한국일보사, 마케팅조과학부)", isHighlighted: false },
      { month: "08", description: "유상증자 4차<br />(한국산업은행외2차)", isHighlighted: false },
      { month: "05", description: "스마트 시스템 발등 3종 출시", isHighlighted: false },
      { month: "02", description: "다운라이트 25W, 9W Bulb, Ball Bulb,<br />인증 및 제품 출시", isHighlighted: false },
      { month: "02", description: "유상증자 3차<br />(중소정책금융)", isHighlighted: false },
    ],
  },
  {
    year: "2015",
    color: "text-[#A78BFA]",
    bgColor: "bg-[#A78BFA]",
    events: [
      { month: "12", description: "다운라이트 18W 인증 및 제품출시", isHighlighted: false },
      { month: "11", description: "M2500 출시, 투광등인증 및<br />제품출시", isHighlighted: false },
      { month: "07", description: "발광소자를 이용한 디지털스텝 마크웨어,<br />중국특허 획득", isHighlighted: false },
      { month: "01", description: "M3000 개발", isHighlighted: false },
    ],
  },
  {
    year: "2014",
    color: "text-[#B794F6]",
    bgColor: "bg-[#B794F6]",
    events: [
      { month: "10", description: "핸스트 파트너스 (유) 3차례정<br />유상증자", isHighlighted: false },
      {
        month: "01",
        description: "엔젤세움, KB인베스트먼트, 원익투자파트너스<br />(유)3차례정 유상증자",
        isHighlighted: false,
      },
    ],
  },
  {
    year: "2013",
    color: "text-[#C4B5FD]",
    bgColor: "bg-[#C4B5FD]",
    events: [{ month: "02", description: "벤처기업인증(기술보증기금)", isHighlighted: false }],
  },
  {
    year: "2012",
    color: "text-[#DDD6FE]",
    bgColor: "bg-[#DDD6FE]",
    events: [
      { month: "11", description: "기업부설연구소인증<br />(한국산업기술진흥협회)", isHighlighted: false },
      { month: "06", description: "회사설립", isHighlighted: true },
    ],
  },
]



export default function Timeline() {
  const [showAll, setShowAll] = useState(false)
  
  // 2021년도까지만 보여줄 데이터 (인덱스 0-3)
  const visibleData = showAll ? timelineData : timelineData.slice(0, 4)

  return (
    <section className="relative w-full px-5 py-24 pb-32 sm:pb-40 md:pb-48 lg:pb-56 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center text-gray-700 py-16 mb-16">
          <FadeInUp delay={300}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-700">회사 연혁</h1>
          </FadeInUp>
        </div>

        {/* Timeline */}
        <FadeInUp delay={200}>
        <div className="relative">
          <div className="mx-auto grid w-fit grid-cols-[auto_auto_1fr] gap-x-8 sm:gap-x-10">
            {visibleData.map((yearData, yearIndex) => (
              <div key={yearData.year} className="contents">
                {/* Year */}
                <h3 className={`col-start-1 text-2xl font-bold ${yearData.color}`}>{yearData.year}</h3>

                {/* Timeline Line */}
                <div className="relative w-[3px] grow">
                  <div className={`absolute top-0 h-[calc(100%+4px)] w-[3px] rounded-full ${yearData.bgColor}`}></div>
                  <div className="absolute -left-3 translate-x-0.5">
                    <div
                      className={`flex items-center justify-center z-10 mt-2 w-6 h-6 rounded-full ${yearData.bgColor}`}
                    >
                      <div className="w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>

                {/* Events */}
                <div
                  className={`grid h-fit gap-x-10 pt-1.5 ${yearIndex === visibleData.length - 1 ? "pb-0" : "pb-20"} sm:grid-cols-[auto_1fr] sm:gap-y-6`}
                >
                  {yearData.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="contents">
                      <p className="text-sm md:text-base mt-6 leading-7 font-medium text-gray-400 first:mt-0 sm:mt-0 sm:w-9 sm:text-right">
                        {event.month}월
                      </p>
                      <p
                        className={`md:text-lg font-medium ${
                          event.isHighlighted ? "text-gray-700 font-bold" : "text-gray-400"
                        }`}
                        dangerouslySetInnerHTML={{ __html: event.description }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 페이드아웃 효과 */}
          {!showAll && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          )}

          {/* 더보기 버튼 */}
          {!showAll && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <span className="text-sm font-medium">더보기</span>
                <svg 
                  className="w-12 h-12 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}

          {/* 접기 버튼 */}
          {showAll && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setShowAll(false)}
                className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <span className="text-sm font-medium">접기</span>
                <svg 
                  className="w-12 h-12 transition-transform duration-300 rotate-180" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
        </FadeInUp>
      </div>
    </section>
  )
}
