"use client"

import { useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/Header"
import { ArrowRight } from "lucide-react"
import { AlertCircle } from "lucide-react"
import { DollarSign, Lightbulb, TrendingDown } from "lucide-react"

export default function MerlotLabLanding() {
  const onButtonContainerClick = useCallback(() => {
    // Add your code here
  }, [])

  return (
    <div className="w-full">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-black text-white h-[1200px] overflow-hidden text-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/placeholder.svg?height=1200&width=1920')" }}
        >
          <div className="absolute top-[557px] left-[910px] bg-black w-[330px] h-[85px]" />
          <Image
            className="absolute top-[575.5px] left-[928.29px] object-cover"
            width={240}
            height={40}
            alt="메를로랩 로고"
            src="/메를로랩 로고.png"
          />
        </div>
        <div className="absolute top-[540px] left-[528.3px] flex items-center px-5">
          <div className="border-r-4 border-gray-200 flex flex-col items-end pr-9">
            <h1 className="text-5xl font-bold leading-[60px] text-right">
              <p className="m-0">메를로랩의</p>
              <p className="m-0">에너지 솔루션</p>
            </h1>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-20">
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold leading-[60px] text-center text-gray-700">
              <p className="m-0">점점 높아지는 전기요금,</p>
              <p className="m-0">어떻게 관리할 수 있을까요?</p>
            </h2>
          </div>

          <div className="h-[512px] flex flex-col items-center justify-center relative">
            <Image
              className="w-full max-w-[1120px] h-[539px] object-cover"
              width={1120}
              height={539}
              alt="공장 이미지"
              src="/factory.png"
            />

            {/* Problem Cards */}
            <div className="absolute inset-0 z-10">
            {/* Problem 1 - macOS Style Alert */}
            <div className="absolute top-[-40px] left-16 w-[400px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20">
              {/* macOS Window Controls */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-600 text-sm font-medium">PROBLEM 1</div>
                <div className="w-6"></div>
              </div>
              <div className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" src="/warn.png" alt="경고 아이콘" />
                </div>
                <div className="flex-1 text-gray-700 text-base leading-6">
                  <p className="m-0 font-medium">예측 없이 사용하는 설비 전력으로 불필요한</p>
                  <p className="m-0 font-medium">에너지 비용이 지속적으로 발생</p>
                </div>
              </div>
            </div>

            {/* Problem 2 - macOS Style Alert */}
            <div className="absolute top-[173px] right-20 w-[400px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20">
              {/* macOS Window Controls */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-600 text-sm font-medium">PROBLEM 2</div>
                <div className="w-6"></div>
              </div>
              <div className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" src="/warn.png" alt="경고 아이콘" />
                </div>
                <div className="text-gray-700 text-base leading-6">
                  <p className="m-0 font-medium">이상 상황 발생 시, 인력 의존적 대응으로</p>
                  <p className="m-0 font-medium">조치의 낮은 효율성과 어려움</p>
                </div>
              </div>
            </div>

            {/* Problem 3 - macOS Style Alert */}
            <div className="absolute bottom-[-40px] left-[280px] w-[400px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20">
              {/* macOS Window Controls */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-600 text-sm font-medium">PROBLEM 3</div>
                <div className="w-6"></div>
              </div>
              <div className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover" src="/warn.png" alt="경고 아이콘" />
                </div>
                <div className="text-gray-700 text-base leading-6">
                  <p className="m-0 font-medium">계약전력 초과, 피크 시간 사용 등</p>
                  <p className="m-0 font-medium">요금 체계에 대한 무지로 불필요 비용 발생</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 px-5">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-20">
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold leading-[60px] text-center text-gray-700">
              <p className="m-0">메를로랩의 에너지 솔루션으로</p>
              <p className="m-0">
                <span className="text-primary">전기 요금을 절약</span>
                <span>하세요</span>
              </p>
            </h2>
          </div>

          <div className="h-[476px] flex items-center justify-center gap-10">
            {/* Grid 3.0 Card */}
            <Card
              className="w-[720px] h-full shadow-lg border border-gray-200 rounded-[10px] cursor-pointer overflow-hidden relative"
              onClick={onButtonContainerClick}
            >
              <div className="absolute top-[21.01%] left-[0.14%] right-[0.14%] bottom-[-20.66%] rounded-lg overflow-hidden">
                <Image
                  className="w-full h-full object-center"
                  width={718}
                  height={574}
                  alt="Grid 3.0"
                  quality={100} 
                  src="/Grid 3.0.png"
                />
              </div>
              <CardContent className="relative z-10 absolute top-0 left-[0.14%]rounded-[10px] p-10 flex justify-between items-start gap-[311.4px]">
                <div className="flex flex-col gap-3 min-w-[286.59px]">
                  <h3 className="text-3xl font-bold text-primary">그리드 3.0</h3>
                  <p className="text-gray-500 text-base">
                    <span className="block">공장, 건물 등 다양한 환경에 최적화된</span>
                    <span className="block text-primary">자동화 시스템 솔루션</span>
                  </p>
                </div>
                  
              </CardContent>
            </Card>

            {/* IoT LED Card */}
            <Card className="w-[720px] h-full shadow-lg border border-gray-200 rounded-[10px] overflow-hidden relative">
              <div className="absolute top-[21.01%] left-[0.14%] right-[0.14%] bottom-[-20.66%] rounded-lg overflow-hidden">
                <Image
                  className="w-full h-full object-center"
                  width={500}
                  height={400}
                  alt="IoT LED"
                  quality={100} 
                  src="/메를로랩 IoT LED.png"
                />
              </div>
              <CardContent className="relative z-10 absolute top-0 left-[0.14%]rounded-[10px] p-10 flex justify-between items-start gap-[311.4px]">
                <div className="flex flex-col gap-3 min-w-[286.59px]">
                  <h3 className="text-3xl font-bold text-primary">레시피</h3>
                  <p className="text-gray-500 text-base">
                    <span className="block">집안 곳곳을 손쉽게 관리할 수 있는</span>
                    <span className="block text-primary">가정용 IoT 원격 제어 솔루션</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-20">
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold leading-[60px] text-center text-gray-700">
              <p className="m-0">최적의 상태로 끌어올리는</p>
              <p className="m-0 text-primary">그룹 단위 관리 솔루션</p>
            </h2>
          </div>

          <div className="flex justify-center gap-10">
            {/* Feature 1 */}
            <Card className="w-[346.7px] h-[560px] shadow-lg border-2 border-gray-200 rounded-[10px] overflow-hidden">
              <CardContent className="flex flex-col items-center p-2">
                <div className="flex flex-col items-center justify-center p-10">
                  <div className="w-12 h-12 relative mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 text-center mb-2">초기 비용 없이 시작</h3>
                  <p className="text-gray-700 text-center text-sm whitespace-nowrap">
                    설치비 0원, 조명 인프라를 스마트하게 전환
                  </p>
                </div>
                <Image
                  className="w-full flex-1 object-cover"
                  width={343}
                  height={368}
                  alt="초기 비용 없이 시작"
                  src="/placeholder.svg?height=368&width=343"
                />
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="w-[346.7px] h-[560px] shadow-lg border-2 border-gray-200 rounded-[10px] overflow-hidden">
              <CardContent className="flex flex-col items-center p-2">
                <div className="flex flex-col items-center justify-center p-10">
                  <div className="w-12 h-12 relative mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 text-center mb-2">IoT 기반 지능형 조명 제어</h3>
                  <p className="text-gray-700 text-center text-sm whitespace-nowrap">
                    어플로 조도·사용 실시간 감지 & 자동 제어
                  </p>
                </div>
                <Image
                  className="w-full flex-1 object-cover"
                  width={343}
                  height={368}
                  alt="IoT 기반 지능형 조명 제어"
                  src="/placeholder.svg?height=368&width=343"
                />
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="w-[346.7px] h-[560px] shadow-lg border-2 border-gray-200 rounded-[10px] overflow-hidden">
              <CardContent className="flex flex-col items-center p-2">
                <div className="flex flex-col items-center justify-center p-10">
                  <div className="w-12 h-12 relative mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-800 text-center mb-2">에너지 절감 + 전기요금 절약</h3>
                  <p className="text-gray-700 text-center text-sm whitespace-nowrap">
                    전력 낭비 방지 및 피크 시간대 요금 전략 대응
                  </p>
                </div>
                <Image
                  className="w-full flex-1 object-cover"
                  width={343}
                  height={368}
                  alt="에너지 절감 및 전기요금 절약"
                  src="/placeholder.svg?height=368&width=343"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-20">
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-bold leading-[60px] text-center text-gray-700">
              <p className="m-0">에너지 문제를</p>
              <p className="m-0 text-primary">효율적으로 해결합니다</p>
            </h2>
          </div>

          <div className="flex flex-col gap-10">
            {/* Stats Grid */}
            <div className="flex justify-center gap-3">
              {/* Stat 1 */}
              <div className="w-[271px] flex flex-col items-center">
                <div className="text-gray-500 text-base font-medium">도입 사업장</div>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-5xl font-bold text-gray-700">1034</span>
                  <span className="text-5xl font-bold text-gray-700 ml-2">개소</span>
                </div>
                <div className="text-gray-400 text-sm mt-1">`24.01 ~`25.02, 17MW</div>
              </div>

              {/* Stat 2 */}
              <div className="w-[271px] flex flex-col items-center">
                <div className="text-gray-500 text-base font-medium">누적 절감 전력량</div>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-5xl font-bold text-gray-700">21,500TWh</span>
                </div>
                <div className="text-gray-400 text-sm mt-1">커널로그 MLPE 전 기종</div>
              </div>

              {/* Stat 3 */}
              <div className="w-[271px] flex flex-col items-center">
                <div className="text-gray-500 text-base font-medium">평균 설치 소요 기간</div>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-5xl font-bold text-gray-700">11.4</span>
                  <span className="text-5xl font-bold text-gray-700 ml-2">일</span>
                </div>
                <div className="text-gray-400 text-sm mt-1">위험 모듈 교체 및 발전 정지 개선</div>
              </div>

              {/* Stat 4 */}
              <div className="w-[271px] flex flex-col items-center">
                <div className="text-gray-500 text-base font-medium">사업장 전력량 절감 평균</div>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-[46.5px] font-bold text-gray-700">52.5</span>
                  <span className="text-5xl font-bold text-gray-700 ml-2">%</span>
                </div>
                <div className="text-gray-400 text-sm mt-1">BSTR 제품 설치 개수 기준</div>
              </div>
            </div>

            {/* Case Studies */}
            <div className="flex flex-col items-center gap-10">
              {/* Case Study 1 */}
              <Card className="w-full border-t border-gray-200 cursor-pointer" onClick={onButtonContainerClick}>
                <CardContent className="flex items-center justify-center gap-10 p-6">
                  <div className="w-[520px] flex flex-col gap-6 pt-6">
                    <div className="flex flex-col gap-6">
                      <h3 className="text-2xl font-bold text-gray-600">
                        <p className="m-0">CJ대한통운 동탄 현장 실증 결과</p>
                        <p className="m-0">전력량 52% 절감</p>
                      </h3>
                      <div className="flex gap-2">
                        <span className="bg-primary text-white text-sm px-3 py-1.5 rounded-lg">물류 센터</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[520px] h-[250px] rounded-lg overflow-hidden">
                    <Image
                      className="w-full h-full object-cover"
                      width={520}
                      height={250}
                      alt="CJ 동탄"
                      src="/placeholder.svg?height=250&width=520"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Case Study 2 */}
              <Card className="w-full border-t border-gray-200 cursor-pointer" onClick={onButtonContainerClick}>
                <CardContent className="flex items-center justify-center gap-10 p-6">
                  <div className="w-[520px] flex flex-col gap-6 pt-6">
                    <div className="flex flex-col gap-6">
                      <h3 className="text-2xl font-bold text-gray-600">
                        <p className="m-0">GS네트웍스 양산 물류센터 일/평균</p>
                        <p className="m-0">전력사용량 62.9% 절감</p>
                      </h3>
                      <div className="flex gap-2">
                        <span className="bg-primary text-white text-sm px-3 py-1.5 rounded-lg">물류센터</span>
                        <span className="bg-primary text-white text-sm px-3 py-1.5 rounded-lg">사무실</span>
                      </div>
                    </div>
                  </div>
                  <Image
                    className="w-[520px] h-[250px] rounded-lg object-cover"
                    width={520}
                    height={250}
                    alt="GS 네트웍스"
                    src="/placeholder.svg?height=250&width=520"
                  />
                </CardContent>
              </Card>

              {/* More Cases Button */}
              <Button variant="outline" className="shadow-sm border border-gray-300 h-14 px-8 gap-2 bg-transparent">
                <div className="w-6 h-6 relative">
                  <Image width={24} height={24} alt="" src="/placeholder.svg?height=24&width=24" />
                </div>
                <span className="text-lg text-gray-800">더 많은 사례 보기</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-white py-19 overflow-hidden">
        <div className="flex items-center justify-center">
          <div className="flex gap-25">
            <Image width={310} height={46} alt="한전" src="/placeholder.svg?height=46&width=310" />
            <Image width={225} height={75} alt="삼성" src="/placeholder.svg?height=75&width=225" />
            <Image width={290} height={100} alt="현대모비스" src="/placeholder.svg?height=100&width=290" />
            <Image width={275} height={95} alt="GS 네트웍스" src="/placeholder.svg?height=95&width=275" />
            <Image width={199} height={92} alt="CJ 대한통운" src="/placeholder.svg?height=92&width=199" />
            <Image width={195} height={195} alt="BGF 로지스" src="/placeholder.svg?height=195&width=195" />
            <Image width={165} height={47} alt="이마트" src="/placeholder.svg?height=47&width=165" />
          </div>
        </div>
      </section>

      {/* Company Strengths Section */}
      <section className="bg-gray-50 py-24 px-5">
        <div className="max-w-[1120px] mx-auto flex flex-col gap-20">
          <div className="flex flex-col gap-2">
            <h2 className="text-5xl font-bold leading-[60px] text-center">
              <p className="m-0 text-primary">품질, 기술, 가격</p>
              <p className="m-0 text-gray-700">어느 하나 놓치지 않습니다</p>
            </h2>
            <div className="flex flex-col items-center pt-4">
              <p className="text-xl font-medium text-gray-700 text-center">
                메를로랩은 국내 전력 절감 산업을 주도하는 HW/SW 융복합 전문 업체입니다.
              </p>
            </div>
          </div>

          <div className="relative h-[452px]">
            {/* Strength 1 */}
            <Card className="absolute top-0 left-0 w-[540px] h-[198px] shadow-md border border-gray-300 rounded-[10px] p-10 flex items-center gap-7">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-primary rounded"></div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-medium text-gray-800">
                  <p className="m-0">국내 개발 및 생산 기반의 빠른 기술</p>
                  <p className="m-0">지원</p>
                </h3>
                <p className="text-gray-700">
                  <span className="block">HW개발과 Infra 구축, SW운영까지 직접 개발/</span>
                  <span className="block">관리하고 있습니다. 서비스 개선과 프로젝트 협력까지</span>
                  <span className="block">빠르고 편리하게 대응해드립니다.</span>
                </p>
              </div>
            </Card>

            {/* Strength 2 */}
            <Card className="absolute top-0 right-0 w-[540px] h-[198px] shadow-md border border-gray-300 rounded-[10px] p-10 flex items-center gap-7">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-primary rounded"></div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-medium text-gray-800">국내 MLPE 산업의 선도기업</h3>
                <p className="text-gray-700">
                  <span className="block">국내 최다, 4건의 MLPE R&D 경험과 조달 수의계약</span>
                  <span className="block">조건(혁신제품, 성과공유제), 정책 연계 사업</span>
                  <span className="block">(온실가스감축, ZEB) 프로젝트 경험을 보유하고</span>
                  <span className="block">있습니다.</span>
                </p>
              </div>
            </Card>

            {/* Strength 3 */}
            <Card className="absolute bottom-0 left-0 w-[540px] h-[198px] shadow-md border border-gray-300 rounded-[10px] p-10 flex items-center gap-7">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-primary rounded"></div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-medium text-gray-800">글로벌 표준 인증-성능 준수</h3>
                <p className="text-gray-700">
                  <span className="block">글로벌 표준 인증(UL/ISO)과 안전 규격(NEC)을</span>
                  <span className="block">준수한 제품으로, 국내를 넘어 글로벌 프로젝트에도</span>
                  <span className="block">커널로그와 함께 참여해보세요.</span>
                </p>
              </div>
            </Card>

            {/* Strength 4 */}
            <Card className="absolute bottom-0 right-0 w-[540px] h-[198px] shadow-md border border-gray-300 rounded-[10px] p-10 flex items-center gap-7">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-primary rounded"></div>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-medium text-gray-800">국내외 초저가 가격실현</h3>
                <p className="text-gray-700">
                  <span className="block">제품을 넘어, 설치, 운영, 관리의 총 소유비용(TCO)</span>
                  <span className="block">최적화를 실현하고 있습니다. 경제적인 도입 비용으로</span>
                  <span className="block">자산의 수익과 운영 안정성을 높여보세요</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-5 text-white" style={{ backgroundColor: "#583CF2" }}>
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="text-3xl font-bold text-center">내 사업장에 가장 알맞은 관리</div>
              <h2 className="text-5xl font-bold text-center">전기요금 최적화 지금 시작하세요</h2>
            </div>
            <Button
              variant="outline"
              className="shadow-sm border border-gray-300 h-14 px-8 gap-2 bg-white text-gray-800 hover:bg-gray-50"
              onClick={onButtonContainerClick}
            >
              <div className="w-6 h-6 relative">
                <Image width={24} height={24} alt="" src="/placeholder.svg?height=24&width=24" />
              </div>
              <span className="text-lg">문의하기</span>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
