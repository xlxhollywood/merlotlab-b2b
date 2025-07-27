"use client"

import Image from "next/image"
import {
  Check,
  X,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Zap,
  Shield,
  Cpu,
  TrendingUp,
  ArrowRight,
  Building,
  Factory,
  Warehouse,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"

export default function MerlotlabTossStyle() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-sm text-gray-600">
                <div className="w-2 h-2 bg-[#583CF2] rounded-full animate-pulse" />
                메를로랩 IoT 솔루션
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                사업장에 맞춰
                <br />
                <span className="text-[#583CF2]">더 경제적</span>으로
              </h1>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed">
                메를로랩은 사업장 환경에 따라 IoT 조명을 조합설치하여 약 30% 경제적인 절감이 가능합니다.
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#583CF2]/5 rounded-2xl">
                <TrendingUp className="w-5 h-5 text-[#583CF2]" />
                <span className="text-[#583CF2] font-semibold">평균 30% 에너지 절감 효과</span>
              </div>
            </div>

            <div className="pt-8">
              <Button
                size="lg"
                className="bg-[#583CF2] hover:bg-[#583CF2]/90 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                무료 견적 받기
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">솔루션 비교</h2>
            <p className="text-xl text-gray-600">왜 메를로랩을 선택해야 할까요?</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ESS */}
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-500 bg-white">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                      <X className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">ESS</h3>
                      <p className="text-gray-500">Energy Storage System</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <X className="w-3 h-3 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">초기 비용 매우 높음</h4>
                          <p className="text-xs text-gray-600 mt-1">설치비·장비비가 크고 투자 회수 기간이 김</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <X className="w-3 h-3 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">배터리 수명 관리 필요</h4>
                          <p className="text-xs text-gray-600 mt-1">정기 점검 및 교체 주기 관리 필수</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <X className="w-3 h-3 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">비용 절감 외 부가가치 없음</h4>
                          <p className="text-xs text-gray-600 mt-1">감축 외의 추가적인 분석·운영 기능 제한적</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Merlotlab - Featured */}
            <Card className="border-2 border-[#583CF2] shadow-lg hover:shadow-xl transition-all duration-500 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#583CF2] text-white px-4 py-2 text-sm font-semibold rounded-bl-2xl">
                추천
              </div>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-[#583CF2]/10 rounded-2xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-[#583CF2]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">메를로랩 IoT LED</h3>
                      <p className="text-gray-500">Merlotlab Internet of Things LED</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#583CF2]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3 h-3 text-[#583CF2]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">초기 비용 없음</h4>
                          <p className="text-xs text-gray-600 mt-1">정부 에너지 효율화 정책 연계 무상 전환</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#583CF2]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3 h-3 text-[#583CF2]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">전구 단위 교체로 유지관리 용이</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            자체 개발한 칩으로 설계된 IoT 조명으로 배선 공사 없이 교체/관리 간편
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#583CF2]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3 h-3 text-[#583CF2]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">조명·냉난방 통합 제어 가능</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            AMI, 점유, 조도, 온습도, 시간대까지 반영한 통합 지능형 제어
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-[#583CF2]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3 h-3 text-[#583CF2]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">비용 절감 외 부가가치</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            조도 최적화, 사용패턴 분석, ESG 지표화 등 SW 솔루션 제공
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LED */}
            <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-500 bg-white">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                      <div className="w-6 h-6 bg-gray-400 rounded-lg" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">LED 조명</h3>
                      <p className="text-gray-500">LED</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3 h-3 text-green-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">초기 비용 낮음</h4>
                          <p className="text-xs text-gray-600 mt-1">제어 장치 없이 단순 LED 교체로 절감 적용</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <X className="w-3 h-3 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">제어 기능 없음</h4>
                          <p className="text-xs text-gray-600 mt-1">실시간 점멸·디밍·DR 대응 등 스마트 기능 미탑재</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <X className="w-3 h-3 text-red-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-sm">비용 절감 외 부가가치 없음</h4>
                          <p className="text-xs text-gray-600 mt-1">실시간 전력 변환 수행</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">제품 라인업</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              가드와 부스터, 통신장비(CA-Edge)로 구성되는 솔루션은 1MW 노지에 신규 도입하는 경우 다음과 같은 가격이
              산출됩니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "IoT LED 면조명",
                install: "모듈 2장당 1개 부착",
                power: "50W",
                warranty: "무상 8년",
                icon: Building,
              },
              {
                name: "IoT LED 레일등",
                install: "모듈 1장당 1개 부착",
                power: "50W",
                warranty: "무상 8년",
                icon: Warehouse,
              },
              {
                name: "IoT LED 공장등",
                install: "모듈 300장당 1개",
                power: "150W",
                warranty: "무상 3년",
                icon: Factory,
              },
            ].map((product, idx) => (
              <Card key={idx} className="border-0 shadow-sm hover:shadow-lg transition-all duration-500 bg-white group">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Product Icon & Image */}
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-[#583CF2]/10 rounded-3xl flex items-center justify-center group-hover:bg-[#583CF2]/20 transition-colors duration-300">
                        <product.icon className="w-8 h-8 text-[#583CF2]" />
                      </div>
                      <div className="w-full h-48 bg-gray-50 rounded-2xl flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=200&width=300"
                          alt={product.name}
                          width={300}
                          height={200}
                          className="rounded-xl opacity-60"
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">{product.name}</h3>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600">설치 형태</span>
                          <span className="text-gray-900 font-medium">{product.install}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600">정격 전력</span>
                          <span className="text-gray-900 font-medium">{product.power}</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-600">보증 기간</span>
                          <span className="text-[#583CF2] font-semibold">{product.warranty}</span>
                        </div>
                      </div>

                      {/* Pricing */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">일반가</p>
                            <p className="text-lg text-gray-400 line-through">26,200원</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">특가</p>
                            <p className="text-3xl font-bold text-[#583CF2]">0원</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">도입 비용</h2>
            <p className="text-xl text-gray-600">투명하고 합리적인 가격 정책</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "제품 공급가", subtitle: "(모델 별 상이)", price: "약 0원/kW", icon: Cpu },
              { title: "시공비", subtitle: "", price: "0원/kW", icon: Shield },
              { title: "SW 솔루션비", subtitle: "(Grid 3.0)", price: "0원", icon: Zap },
            ].map((item, idx) => (
              <Card key={idx} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white group">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-[#583CF2]/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-[#583CF2]/20 transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-[#583CF2]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      {item.subtitle && <p className="text-sm text-gray-500">{item.subtitle}</p>}
                    </div>
                    <p className="text-2xl font-bold text-[#583CF2]">{item.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-12">*부가세 미포함 가격입니다</p>
        </div>
      </section>

      {/* Dashboard Preview */}

      {/* Process Section */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">도입 프로세스</h2>
            <p className="text-xl text-gray-600">간단하고 체계적인 5단계 프로세스</p>
          </div>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "사업장 정보 전달",
                description: "첫 문의 후 안내에 따라 발전소 주소, 발전 용량 등의 정보를 전달해주세요.",
              },
              {
                step: "02",
                title: "검토 및 견적 회신",
                description: "효과적인 솔루션 배치와 경제적인 서비스 구성 제안과 함께 견적을 드립니다.",
              },
              {
                step: "03",
                title: "도입 일정 확인",
                description: "발전소의 규모와 재고 상황에 따라 선금일 기준 30일 이내에 설치 일자 확정이 가능합니다.",
              },
              {
                step: "04",
                title: "현장 방문 설치",
                description:
                  "발전소 위치와 유형, 규모에 따라 전문 협력사가 시공을 진행합니다. 100kW 기준 1~2일 내 작업이 가능합니다.",
              },
              {
                step: "05",
                title: "실측 확인 및 검수",
                description:
                  "14일간 집중 모니터링을 통해 적합한 초기값을 조절합니다. 세팅이 완료된 시스템은 모니터링 매뉴얼과 함께 제공드립니다.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#583CF2] text-white rounded-2xl flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                내 사업장에도 적용되는지
                <br />
                <span className="text-[#583CF2]">궁금하시다면?</span>
              </h2>
              <p className="text-xl text-gray-600">전문가가 직접 상담해드립니다</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[#583CF2] hover:bg-[#583CF2]/90 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                도입 사례 보기
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-200 hover:border-[#583CF2] hover:text-[#583CF2] px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 bg-transparent"
              >
                무료 상담 받기
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">편하게 연락하세요</h2>
            <p className="text-xl text-gray-600">자세히 상담해드립니다</p>
          </div>

          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-12">
              <form className="space-y-8">
                {/* 문의 구분 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-900">
                    문의 구분 <span className="text-red-500">*</span>
                  </Label>
                  <RadioGroup defaultValue="business" className="space-y-3">
                    <div className="flex items-center space-x-4 border-2 border-[#583CF2] bg-[#583CF2]/5 rounded-2xl p-6">
                      <RadioGroupItem value="business" id="business" />
                      <div className="flex-1">
                        <Label htmlFor="business" className="font-semibold text-gray-900 cursor-pointer text-lg">
                          사업 문의
                        </Label>
                        <p className="text-gray-600 mt-1">귀사의 니즈에 맞춘 컨설팅을 진행합니다</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 border-2 border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-colors">
                      <RadioGroupItem value="quote" id="quote" />
                      <div className="flex-1">
                        <Label htmlFor="quote" className="font-semibold text-gray-900 cursor-pointer text-lg">
                          모의 견적
                        </Label>
                        <p className="text-gray-600 mt-1">모의 견적은 실제 견적과 다를 수 있습니다</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* 사업장 유형 */}
                <div className="space-y-4">
                  <Label className="text-lg font-semibold text-gray-900">
                    사업장 유형 <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["일반 빌딩", "물류 창고", "제조 시설", "공공 기관", "생활 시설", "기타"].map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        className="justify-center border-2 border-gray-200 hover:border-[#583CF2] hover:bg-[#583CF2]/5 bg-transparent rounded-xl p-4 h-auto"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* 기본 정보 */}
                <div className="space-y-6">
                  <Label className="text-lg font-semibold text-gray-900">기본 정보</Label>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-gray-700 font-medium">
                        기업명 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="company"
                        placeholder="메를로랩"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#583CF2]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region" className="text-gray-700 font-medium">
                        지역
                      </Label>
                      <Input
                        id="region"
                        placeholder="서울"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#583CF2]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager" className="text-gray-700 font-medium">
                        담당자(직책/성명) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="manager"
                        placeholder="대리 홍길동"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#583CF2]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 font-medium">
                        전화번호 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="02-1234-5678"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#583CF2]"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="email" className="text-gray-700 font-medium">
                        이메일 <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="example@email.com"
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-[#583CF2]"
                      />
                    </div>
                  </div>
                </div>

                {/* 문의 내용 */}
                <div className="space-y-4">
                  <Label htmlFor="message" className="text-lg font-semibold text-gray-900">
                    문의 내용 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="문의하실 내용을 작성해주세요"
                    className="min-h-[120px] rounded-xl border-2 border-gray-200 focus:border-[#583CF2]"
                  />
                </div>

                {/* 제출 */}
                <div className="space-y-6 pt-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    양식을 제출하면 개인정보 제공 및 제 3자 정보 제공 활용에 동의하는 것으로 간주합니다.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-[#583CF2] hover:bg-[#583CF2]/90 h-14 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    문의 보내기
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#583CF2] rounded-2xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">메를로랩</span>
              </div>
              <p className="text-gray-600 leading-relaxed max-w-md">
                발전 자산의 디지털 전환부터 데이터 공유형 관리, 객관적 자산 교류까지
                <br />
                <span className="font-semibold text-gray-900">전기 에너지의 디지털 생태계를 구축합니다</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#583CF2] mt-1 flex-shrink-0" />
                  <p className="text-gray-600">
                    서울특별시 금천구 디지털로9길 68 (가산동)
                    <br />
                    대륭포스트 타워 5차 2002~2005호
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#583CF2]" />
                  <p className="text-gray-600">문의전화 : 02-862-1700</p>
                </div>
                <p className="text-sm text-gray-500">사업장 등록번호 : 119-86-57418</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8">
            <p className="text-center text-gray-500">© Copyright merlot.lab All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
