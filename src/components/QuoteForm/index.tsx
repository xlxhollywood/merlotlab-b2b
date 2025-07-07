"use client"

import type React from "react"

import { Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
    electricityRate: "",
  })

  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null)

  const businessTypeSavings = {
    "주거 시설": 0.2,
    "물류 창고": 0.5,
    "제조 시설": 0.3,
    "주차장": 0.5,
    "사무실": 0.3,
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

 const calculateQuote = (e: React.FormEvent) => {
  e.preventDefault();

  const { generalCount, generalPower, generalHours, annualDays, electricityRate } = formData;
  // (입력값 검증 생략…)

  const count       = parseFloat(generalCount);
  const power       = parseFloat(generalPower);      // W
  const hoursPerDay = parseFloat(generalHours);      // h/day
  const daysPerYear = parseFloat(annualDays);        // days
  const rate        = parseFloat(electricityRate);   // 원/kWh

  // 1) 연간 사용 시간
  const annualHours = hoursPerDay * daysPerYear;

  // 2) 교체 전 전기비용 (Wh → kWh)
  const beforeCost = (count * power * annualHours * rate) / 1000;

  // 3) 사업장 유형별 절감율 조회
  const savingsRate =
    businessTypeSavings[selectedBusinessType as keyof typeof businessTypeSavings] ?? 0;

  // 4) 교체 후 비용과 절감액
  const afterCost = beforeCost * (1 - savingsRate);
  const savings   = beforeCost - afterCost;

  setCalculationResult({
    beforeCost,
    afterCost,
    savings,
    savingsRate: savingsRate * 100,  // % 단위로 변환
    annualHours,
  });
};



  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.round(amount))
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
                      귀사 환경에 최적화된 솔루션을 제안해 드립니다
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {["주거 시설", "사무실", "물류 창고", "제조 시설", "주차장"].map((type) => (
                <div
                  key={type}
                  onClick={() => setSelectedBusinessType(type)}
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
          </div>

          {/* 1. 조명 정보 입력 */}
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-600">1. 조명 정보 입력</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="general-count" className="text-sm font-medium text-zinc-800">
                  일반 조명 개수
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
                  일반 조명 평균 소비 전력 (W)
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="general-hours" className="text-sm font-medium text-zinc-800">
                  일반 조명 일일 사용 시간 (시간) <span className="text-red-500">*</span>
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
              <div className="space-y-2">
                <Label htmlFor="electricity-rate" className="text-sm font-medium text-zinc-800">
                  전기 요금 단가 (원/kWh) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="electricity-rate"
                  placeholder="ex) 170"
                  value={formData.electricityRate}
                  onChange={(e) => handleInputChange("electricityRate", e.target.value)}
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
              disabled={!selectedBusinessType}
              size="lg"
              className="w-full bg-[#583CF2] hover:bg-[#583CF2]/90 h-12 sm:h-14 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              모의 견적 계산하기
            </Button>
          </div>
        </form>

        {/* 계산 결과 - 토스 스타일 */}
        {calculationResult && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">견적 결과</h2>
              <p className="text-gray-600">LED 조명으로 교체하면 이만큼 절약할 수 있어요</p>
            </div>

            {/* 메인 절감 효과 */}
            <div className="bg-gradient-to-br from-[#583CF2]/5 to-[#583CF2]/10 border border-[#583CF2]/20 rounded-2xl p-6 mb-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">연간 절약 금액</div>
                <div className="text-4xl font-bold text-[#583CF2] mb-2">
                  {formatCurrency(calculationResult.savings)}원
                </div>
                <div className="text-sm text-gray-500">
                  월 평균 {formatCurrency(calculationResult.savings / 12)}원 절약
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
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(calculationResult.beforeCost)}원</div>
                <div className="text-xs text-gray-500 mt-1">연간 전기 비용</div>
              </div>

              <div className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">교체 후</span>
                  <div className="w-3 h-3 bg-[#583CF2] rounded-full"></div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(calculationResult.afterCost)}원</div>
                <div className="text-xs text-gray-500 mt-1">연간 전기 비용</div>
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">상세 정보</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">사업장 유형</span>
                  <span className="font-medium text-[#583CF2]">{selectedBusinessType}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">연간 사용 시간</span>
                  <span className="font-medium text-gray-900">{formatCurrency(calculationResult.annualHours)}시간</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
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
