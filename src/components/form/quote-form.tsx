"use client"

import type React from "react"
import { Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"

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

  const [isSubmitted, setIsSubmitted] = useState(false)

  const businessTypeLightMapping = {
    "물류 센터": "투광등",
    "제조 시설": "투광등",
    사무실: "면조명",
    "아파트 주차장": "레이스웨이",
  }

  const [selectedLightType, setSelectedLightType] = useState(
    businessTypeLightMapping[selectedBusinessType as keyof typeof businessTypeLightMapping] || "레이스웨이",
  )

  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)

  // selectedBusinessType이 변경될 때 selectedLightType도 자동 업데이트
  useEffect(() => {
    if (selectedBusinessType) {
      setSelectedLightType(businessTypeLightMapping[selectedBusinessType as keyof typeof businessTypeLightMapping] || "레이스웨이")
    }
  }, [selectedBusinessType])

  // 폼 유효성 검사 함수
  const isFormValid = () => {
    return selectedBusinessType && formData.generalCount && formData.generalPower && formData.generalHours && formData.annualDays
  }

  const businessTypeSavings = {
    "물류 센터": 0.4,
    "제조 시설": 0.3,
    "아파트 주차장": 0.5,
    사무실: 0.3,
  }

  const businessTypeElectricityRates = {
    "물류 센터": 152,
    "제조 시설": 180,
    "아파트 주차장": 150,
    사무실: 160,
  }



  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }



  const calculateQuote = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)

    const { generalCount, generalPower, generalHours, annualDays } = formData

    // 입력값 검증
    if (!generalCount || !generalPower || !generalHours || !annualDays || !selectedBusinessType) {
      return
    }

    const count = Number.parseFloat(generalCount)
    const power = Number.parseFloat(generalPower)
    const hoursPerDay = Number.parseFloat(generalHours) // h/day
    const daysPerYear = Number.parseFloat(annualDays) // days

    // 조명 일일 사용 시간 8시간 미만 제한
    if (hoursPerDay < 8) {
      alert("조명 일일 사용 시간은 8시간 이상이어야 합니다.")
      return
    }

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
            <Label className="text-base sm:text-lg font-semibold text-gray-700">
              문의 구분 <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10">
              {/* 모의 견적 */}
              <div className="flex-1">
                <div
                  className={`rounded-xl sm:rounded-2xl bg-white border-2 h-auto sm:h-[120px] lg:h-[143px] p-4 sm:p-6 lg:p-10 cursor-pointer transition-all ${
                    selectedInquiry === "quote"
                      ? "border-[#583cf2] opacity-100"
                      : "border-zinc-300 opacity-50 hover:opacity-75"
                  }`}
                  onClick={() => {
                    setSelectedInquiry("quote")
                    setSelectedBusinessType("아파트 주차장")
                  }}
                >
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-zinc-800">모의 견적</h3>
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-500">
                      모의 견적은 실제 견적과 다를 수 있습니다
                    </p>
                  </div>
                </div>
              </div>

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
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-zinc-800">견적 문의</h3>
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-500">
                    문의 기준으로 상세 견적을 안내합니다
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 사업장 유형 */}
          <div className="space-y-4">
            <Label className="text-base sm:text-lg font-semibold text-gray-700">
              사업장 유형 <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {["아파트 주차장", "사무실", "물류 센터", "제조 시설"].map((type) => (
                <div
                  key={type}
                  onClick={() => {
                    setSelectedBusinessType(type)
                    setSelectedLightType(businessTypeLightMapping[type as keyof typeof businessTypeLightMapping])
                  }}
                  className={`justify-center border-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 h-auto cursor-pointer transition-all flex items-center ${
                    selectedBusinessType === type
                      ? "border-[#583CF2] opacity-100"
                      : "border-gray-200 opacity-50 hover:opacity-75"
                  } bg-transparent`}
                >
                  <span className="font-medium text-sm sm:text-base text-center">{type}</span>
                </div>
              ))}
            </div>
            {isSubmitted && !selectedBusinessType && (
              <p className="text-sm text-red-500 mt-2">사업장 유형을 선택해주세요</p>
            )}
          </div>

          {/* 1. 조명 정보 입력 */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-700">1. 조명 정보 입력</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="general-count" className="text-sm font-medium text-gray-700">
                  조명 개수 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="general-count"
                  placeholder="ex) 50"
                  value={formData.generalCount}
                  onChange={(e) => handleInputChange("generalCount", e.target.value)}
                  className={`h-10 sm:h-12 border-2 rounded-xl focus:ring-0 ${
                    isSubmitted && !formData.generalCount ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#583CF2]"
                  }`}
                />
                {isSubmitted && !formData.generalCount && (
                  <p className="text-xs text-red-500">조명 개수를 입력해주세요</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="general-power" className="text-sm font-medium text-gray-700">
                  조명 평균 소비 전력 (W) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="general-power"
                  placeholder="ex) 40"
                  value={formData.generalPower}
                  onChange={(e) => handleInputChange("generalPower", e.target.value)}
                  className={`h-10 sm:h-12 border-2 rounded-xl focus:ring-0 ${
                    isSubmitted && !formData.generalPower ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#583CF2]"
                  }`}
                />
                {isSubmitted && !formData.generalPower && (
                  <p className="text-xs text-red-500">평균 소비 전력을 입력해주세요</p>
                )}
              </div>
            </div>
          </div>

          {/* 2. 사용 조건 입력 */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-700">2. 사용 조건 입력</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="general-hours" className="text-sm font-medium text-gray-700">
                  조명 일일 사용 시간 (시간) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="general-hours"
                  type="number"
                  min="8"
                  step="0.1"
                  placeholder="ex) 12 (8시간 이상)"
                  value={formData.generalHours}
                  onChange={(e) => handleInputChange("generalHours", e.target.value)}
                  className={`h-10 sm:h-12 border-2 rounded-xl focus:ring-0 ${
                    isSubmitted && !formData.generalHours ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#583CF2]"
                  }`}
                  required
                />
                <p className="text-xs text-gray-500">* 8시간 이상의 값만 입력 가능합니다</p>
                {isSubmitted && !formData.generalHours && (
                  <p className="text-xs text-red-500">일일 사용 시간을 입력해주세요</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="annual-days" className="text-sm font-medium text-gray-700">
                  연간 사용일수 (일) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="annual-days"
                  placeholder="ex) 250"
                  value={formData.annualDays}
                  onChange={(e) => handleInputChange("annualDays", e.target.value)}
                  className={`h-10 sm:h-12 border-2 rounded-xl focus:ring-0 ${
                    isSubmitted && !formData.annualDays ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#583CF2]"
                  }`}
                  required
                />
                {isSubmitted && !formData.annualDays && (
                  <p className="text-xs text-red-500">연간 사용일수를 입력해주세요</p>
                )}
              </div>
            </div>
          </div>

          {/* 계산 버튼 */}
          <div className="space-y-4 sm:space-y-6 pt-4">
            <Button
              type="submit"
              disabled={!isFormValid()}
              size="lg"
              className="w-full bg-[#583CF2] hover:bg-[#583CF2]/90 h-12 sm:h-14 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              모의 견적 계산하기
            </Button>
          </div>
        </form>

        {/* 계산 결과 */}
        {calculationResult && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="w-full">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">견적 결과</h2>
                <p className="text-gray-600">메를로 시스템으로 교체하면 이만큼 절약할 수 있어요</p>
              </div>

              {/* 절감 효과 */}
              <div className="space-y-6">

                {/* 1행: 교체 전/후 - 테두리만 색상 유지, 폰트는 일반 색상 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border-2 border-red-300 bg-white rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">교체 전</span>
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
                  <div className="border-2 border-[#583CF2] bg-white rounded-xl p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">교체 후</span>
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

                {/* 2행: 3개 카드 한 행에 - 색상 제거 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* 고객사 예상 수익 */}
                  <div className="border border-gray-200 rounded-xl p-5">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">고객사 연간 최대 예상 수익</div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {formatCurrency(calculationResult.beforeCost * ((calculationResult.savingsRate / 100) + 0.15) - (calculationResult.beforeCost * (calculationResult.savingsRate / 100) * 0.8))}원
                      </div>
                      <div className="text-sm text-gray-500">
                        월 평균 {formatCurrency((calculationResult.beforeCost * ((calculationResult.savingsRate / 100) + 0.15) - (calculationResult.beforeCost * (calculationResult.savingsRate / 100) * 0.8)) / 12)}원 수익 발생
                      </div>
                    </div>
                  </div>

                  {/* 연간 절약 금액 */}
                  <div className="border border-gray-200 rounded-xl p-5">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">연간 절약 금액</div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {formatCurrency(calculationResult.savings)}원
                      </div>
                      <div className="text-sm text-gray-500">
                        월 평균 {formatCurrency(calculationResult.savings / 12)}원 절약
                      </div>
                    </div>
                  </div>

                  {/* 연간 전력 절감량 */}
                  <div className="border border-gray-200 rounded-xl p-5">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">연간 전력 절감량</div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">
                        {formatPower(calculationResult.powerSavings)} kWh
                      </div>
                      <div className="text-sm text-gray-500">
                        월 평균 {formatPower(calculationResult.powerSavings / 12)} kWh 절약
                      </div>
                    </div>
                  </div>
                </div>

                {/* 상세 정보 */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">상세 정보</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">사업장 유형</span>
                      <span className="font-medium text-[#583CF2]">{selectedBusinessType || "아파트 주차장"}</span>
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
              </div>
            </div>

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
