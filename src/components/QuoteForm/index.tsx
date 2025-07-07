"use client"

import type React from "react"
import { Calculator, Lightbulb, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

interface QuoteFormProps {
  selectedInquiry: "business" | "quote"
  setSelectedInquiry: (value: "business" | "quote") => void
  selectedBusinessType: string
  setSelectedBusinessType: (value: string) => void
}

interface CalculationResult {
  beforeCost: number
  afterCost: number
  savings: number
  savingsRate: number
  annualHours: number
  electricityRate: number
  // 전력절감 관련 추가
  beforePowerConsumption: number // kWh
  afterPowerConsumption: number // kWh
  powerSavings: number // kWh
}

interface CostComparison {
  generalLED: {
    productCost: number
    installationCost: number
    communicationCost: number
    systemCost: number
    consultingCost: number
    total: number
  }
  ourProduct: {
    productCost: number
    installationCost: number
    communicationCost: number
    systemCost: number
    consultingCost: number
    total: number
  }
}

export default function QuoteForm({
  selectedInquiry,
  setSelectedInquiry,
  selectedBusinessType,
  setSelectedBusinessType,
}: QuoteFormProps) {
  const [formData, setFormData] = useState({
    generalCount: "",
    generalPower: "",
    generalHours: "",
    annualDays: "",
  })

  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)
  const [costComparison, setCostComparison] = useState<CostComparison | null>(null)

  const businessTypeSavings = {
    "물류 창고": 0.5,
    "제조 시설": 0.3,
    주차장: 0.5,
    사무실: 0.3,
  }

  const businessTypeElectricityRates = {
    "물류 창고": 160,
    "제조 시설": 170,
    주차장: 150,
    사무실: 160,
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculateCostComparison = (count: number) => {
    // 일반 LED 비용 (개당)
    const generalLEDUnitCosts = {
      productCost: 50000, // 제품 공급가
      installationCost: 30000, // 설치 공사비
      communicationCost: 0, // 무선 통신비 (일반 LED는 없음)
      systemCost: 0, // 시스템 구축비 (일반 LED는 없음)
      consultingCost: 5000, // 컨설팅 및 설계비
    }

    // 우리 제품 비용 (개당)
    const ourProductUnitCosts = {
      productCost: 0, // 제품 공급가 (스마트 기능 포함)
      installationCost: 0, // 설치 공사비 (더 간편한 설치)
      communicationCost: 0, // 무선 통신비
      systemCost: 0, // 시스템 구축비
      consultingCost: 0, // 컨설팅 및 설계비
    }

    const generalLED = {
      productCost: generalLEDUnitCosts.productCost * count,
      installationCost: generalLEDUnitCosts.installationCost * count,
      communicationCost: generalLEDUnitCosts.communicationCost * count,
      systemCost: generalLEDUnitCosts.systemCost * count,
      consultingCost: generalLEDUnitCosts.consultingCost * count,
      total: 0,
    }
    generalLED.total = Object.values(generalLED).reduce((sum, cost) => sum + cost, 0) - generalLED.total

    const ourProduct = {
      productCost: ourProductUnitCosts.productCost * count,
      installationCost: ourProductUnitCosts.installationCost * count,
      communicationCost: ourProductUnitCosts.communicationCost * count,
      systemCost: ourProductUnitCosts.systemCost * count,
      consultingCost: ourProductUnitCosts.consultingCost * count,
      total: 0,
    }
    ourProduct.total = Object.values(ourProduct).reduce((sum, cost) => sum + cost, 0) - ourProduct.total

    return { generalLED, ourProduct }
  }

  const calculateQuote = (e: React.FormEvent) => {
    e.preventDefault()

    const { generalCount, generalPower, generalHours, annualDays } = formData

    // 입력값 검증
    if (!generalCount || !generalPower || !generalHours || !annualDays || !selectedBusinessType) {
      return
    }

    const count = Number.parseFloat(generalCount)
    const power = Number.parseFloat(generalPower) // W
    const hoursPerDay = Number.parseFloat(generalHours) // h/day
    const daysPerYear = Number.parseFloat(annualDays) // days

    // 사업장 유형별 전기 요금 단가 자동 설정
    const rate = businessTypeElectricityRates[selectedBusinessType as keyof typeof businessTypeElectricityRates] ?? 150 // 원/kWh

    // 1) 연간 사용 시간
    const annualHours = hoursPerDay * daysPerYear

    // 2) 전력 소비량 계산 (kWh)
    const beforePowerConsumption = (count * power * annualHours) / 1000 // kWh

    // 3) 교체 전 전기비용
    const beforeCost = beforePowerConsumption * rate

    // 4) 사업장 유형별 절감율 조회
    const savingsRate = businessTypeSavings[selectedBusinessType as keyof typeof businessTypeSavings] ?? 0

    // 5) 교체 후 전력 소비량 및 비용
    const afterPowerConsumption = beforePowerConsumption * (1 - savingsRate)
    const afterCost = beforeCost * (1 - savingsRate)

    // 6) 절감량 계산
    const savings = beforeCost - afterCost
    const powerSavings = beforePowerConsumption - afterPowerConsumption

    setCalculationResult({
      beforeCost,
      afterCost,
      savings,
      savingsRate: savingsRate * 100, // % 단위로 변환
      annualHours,
      electricityRate: rate,
      beforePowerConsumption,
      afterPowerConsumption,
      powerSavings,
    })

    // 비용 비교 계산
    const comparison = calculateCostComparison(count)
    setCostComparison(comparison)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.round(amount))
  }

  const formatPower = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 1,
    }).format(amount)
  }

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
        <form onSubmit={calculateQuote} className="space-y-6 sm:space-y-8">
          {/* 문의 구분 */}
          <div className="space-y-4">
            <Label className="text-base sm:text-lg font-semibold text-gray-900">
              문의 구분 <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10">
              {/* 사업 문의 */}
              <div className="flex-1">
                <div
                  className={`rounded-xl sm:rounded-2xl bg-white border-2 h-auto sm:h-[120px] lg:h-[143px] p-4 sm:p-6 lg:p-10 cursor-pointer transition-all ${
                    selectedInquiry === "business"
                      ? "border-[#583cf2] opacity-100"
                      : "border-zinc-300 opacity-50 hover:opacity-75"
                  }`}
                  onClick={() => setSelectedInquiry("business")}
                >
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-zinc-800">사업 문의</h3>
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-500">
                      환경에 최적화된 솔루션을 제안해 드립니다
                    </p>
                  </div>
                </div>
              </div>

              {/* 모의 견적 */}
              <div className="flex-1">
                <div
                  className={`rounded-xl sm:rounded-2xl bg-white border-2 h-auto sm:h-[120px] lg:h-[143px] p-4 sm:p-6 lg:p-10 cursor-pointer transition-all ${
                    selectedInquiry === "quote"
                      ? "border-[#583cf2] opacity-100"
                      : "border-zinc-300 opacity-50 hover:opacity-75"
                  }`}
                  onClick={() => setSelectedInquiry("quote")}
                >
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-zinc-800">모의 견적</h3>
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-500">
                      모의 견적은 실제 견적과 다를 수 있습니다
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 사업장 유형 */}
          <div className="space-y-4">
            <Label className="text-base sm:text-lg font-semibold text-gray-900">
              사업장 유형 <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {["주차장", "사무실", "물류 창고", "제조 시설"].map((type) => (
                <div
                  key={type}
                  onClick={() => setSelectedBusinessType(type)}
                  className={`justify-center border-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 h-auto cursor-pointer transition-all flex items-center ${
                    selectedBusinessType === type || (selectedBusinessType === "" && type === "주차장")
                      ? "border-[#583CF2] opacity-100"
                      : "border-gray-200 opacity-50 hover:opacity-75"
                  } bg-transparent`}
                >
                  <span className="font-medium text-sm sm:text-base text-center">{type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 1. 조명 정보 입력 */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-600">1. 조명 정보 입력</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="general-count" className="text-sm font-medium text-zinc-800">
                  조명 개수
                </Label>
                <Input
                  id="general-count"
                  placeholder="ex) 50"
                  value={formData.generalCount}
                  onChange={(e) => handleInputChange("generalCount", e.target.value)}
                  className="h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-[#583CF2] focus:ring-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="general-power" className="text-sm font-medium text-zinc-800">
                  조명 평균 소비 전력 (W)
                </Label>
                <Input
                  id="general-power"
                  placeholder="ex) 40"
                  value={formData.generalPower}
                  onChange={(e) => handleInputChange("generalPower", e.target.value)}
                  className="h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-[#583CF2] focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* 2. 사용 조건 입력 */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-600">2. 사용 조건 입력</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="general-hours" className="text-sm font-medium text-zinc-800">
                  조명 일일 사용 시간 (시간) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="general-hours"
                  placeholder="ex) 12"
                  value={formData.generalHours}
                  onChange={(e) => handleInputChange("generalHours", e.target.value)}
                  className="h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-[#583CF2] focus:ring-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annual-days" className="text-sm font-medium text-zinc-800">
                  연간 사용일수 (일) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="annual-days"
                  placeholder="ex) 250"
                  value={formData.annualDays}
                  onChange={(e) => handleInputChange("annualDays", e.target.value)}
                  className="h-10 sm:h-12 border-2 border-gray-200 rounded-xl focus:border-[#583CF2] focus:ring-0"
                  required
                />
              </div>
            </div>
          </div>

          {/* 계산 버튼 */}
          <div className="space-y-4 sm:space-y-6 pt-4">
            <Button
              type="submit"
              disabled={!selectedBusinessType && selectedBusinessType !== "주차장"}
              size="lg"
              className="w-full bg-[#583CF2] hover:bg-[#583CF2]/90 h-12 sm:h-14 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              모의 견적 계산하기
            </Button>
          </div>
        </form>

        {/* 계산 결과 - 탭 구조 */}
        {calculationResult && costComparison && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Tabs defaultValue="savings" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 rounded-lg p-1">
                <TabsTrigger value="savings" className="flex items-center gap-2 rounded-md">
                  <Zap className="w-4 h-4" />
                  절감 효과
                </TabsTrigger>
                <TabsTrigger value="comparison" className="flex items-center gap-2 rounded-md">
                  <Lightbulb className="w-4 h-4" />
                  비용 비교
                </TabsTrigger>
              </TabsList>

              {/* 절감 효과 탭 */}
              <TabsContent value="savings" className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">견적 결과</h2>
                  <p className="text-gray-600">메를로랩 시스템으로 교체하면 이만큼 절약할 수 있어요</p>
                </div>

                {/* 메인 절감 효과 - 2개 카드로 분리 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* 비용 절감 */}
                  <div className="bg-gradient-to-br from-[#583CF2]/5 to-[#583CF2]/10 border border-[#583CF2]/20 rounded-2xl p-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">연간 절약 금액</div>
                      <div className="text-3xl font-bold text-[#583CF2] mb-2">
                        {formatCurrency(calculationResult.savings)}원
                      </div>
                      <div className="text-sm text-gray-500">
                        월 평균 {formatCurrency(calculationResult.savings / 12)}원 절약
                      </div>
                    </div>
                  </div>

                  {/* 전력 절감 */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">연간 전력 절감량</div>
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {formatPower(calculationResult.powerSavings)} kWh
                      </div>
                      <div className="text-sm text-gray-500">
                        월 평균 {formatPower(calculationResult.powerSavings / 12)} kWh 절약
                      </div>
                    </div>
                  </div>
                </div>

                {/* 비교 카드들 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">교체 전</span>
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(calculationResult.beforeCost)}원
                    </div>
                    <div className="text-xs text-gray-500 mt-1">연간 전기 비용</div>
                    <div className="text-sm text-gray-600 mt-2">
                      {formatPower(calculationResult.beforePowerConsumption)} kWh/년
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">교체 후</span>
                      <div className="w-3 h-3 bg-[#583CF2] rounded-full"></div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(calculationResult.afterCost)}원
                    </div>
                    <div className="text-xs text-gray-500 mt-1">연간 전기 비용</div>
                    <div className="text-sm text-gray-600 mt-2">
                      {formatPower(calculationResult.afterPowerConsumption)} kWh/년
                    </div>
                  </div>
                </div>

                {/* 상세 정보 */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">상세 정보</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">사업장 유형</span>
                      <span className="font-medium text-[#583CF2]">{selectedBusinessType || "주차장"}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">전기 요금 단가</span>
                      <span className="font-medium text-gray-900">{calculationResult.electricityRate}원/kWh</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">연간 사용 시간</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(calculationResult.annualHours)}시간
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 비용 비교 탭 */}
              <TabsContent value="comparison" className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">비용 비교</h2>
                  <p className="text-gray-600">일반 LED 조명과 메를로랩 시스템의 비용을 비교해보세요</p>
                </div>

                {/* 총 비용 비교 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-gray-700">일반 LED</span>
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {formatCurrency(costComparison.generalLED.total)}원
                    </div>
                    <div className="text-sm text-gray-500">총 도입 비용</div>
                  </div>

                  <div className="border border-[#583CF2] rounded-xl p-6 bg-[#583CF2]/5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-[#583CF2]">메를로랩 시스템</span>
                      <div className="w-4 h-4 bg-[#583CF2] rounded-full"></div>
                    </div>
                    <div className="text-3xl font-bold text-[#583CF2] mb-2">
                      {formatCurrency(costComparison.ourProduct.total)}원
                    </div>
                    <div className="text-sm text-gray-500">총 도입 비용</div>
                  </div>
                </div>

                {/* 상세 비용 비교표 */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">상세 비용 분석</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[
                        { key: "productCost", label: "제품 공급가" },
                        { key: "installationCost", label: "설치 공사비" },
                        { key: "communicationCost", label: "무선 통신비" },
                        { key: "systemCost", label: "시스템 구축비" },
                        { key: "consultingCost", label: "컨설팅 및 설계비" },
                      ].map((item) => (
                        <div
                          key={item.key}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="font-medium text-gray-700">{item.label}</div>
                          <div className="text-right">
                            <span className="text-gray-900 font-semibold">
                              {formatCurrency(
                                costComparison.generalLED[item.key as keyof typeof costComparison.generalLED],
                              )}
                              원
                            </span>
                            <div className="text-xs text-gray-500">일반 LED</div>
                          </div>
                          <div className="text-right">
                            <span className="text-[#583CF2] font-semibold">
                              {formatCurrency(
                                costComparison.ourProduct[item.key as keyof typeof costComparison.ourProduct],
                              )}
                              원
                            </span>
                            <div className="text-xs text-gray-500">메를로랩 시스템</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 차액 표시 */}
                <div className="bg-[#583CF2]/5 border border-[#583CF2] rounded-xl p-6">
                  <div className="text-center">
                    <div className="text-sm text-[#583CF2] mb-1">초기 도입비용 차액</div>
                    <div className="text-2xl font-bold text-[#583CF2]">
                      {costComparison.ourProduct.total > costComparison.generalLED.total ? "-" : ""}
                      {formatCurrency(costComparison.ourProduct.total - costComparison.generalLED.total)}원
                    </div>
                    <div className="text-sm text-[#583CF2] mt-2">
                      {costComparison.ourProduct.total > costComparison.generalLED.total
                        ? "도입 비용 없이 메를로랩 시스템으로 에너지 비용을 절감해보세요"
                        : "도입 비용 없이 메를로랩 시스템으로 에너지 비용을 절감해보세요"}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <Button
                type="button"
                onClick={() => setSelectedInquiry("business")}
                className="w-full bg-[#583CF2] hover:bg-[#583CF2]/90 h-12 rounded-xl text-base font-semibold transition-all duration-300"
              >
                정확한 견적 문의하기
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
