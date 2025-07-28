"use client"

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface BusinessInquiryFormProps {
  selectedInquiry: "business" | "quote";
  setSelectedInquiry: (value: "business" | "quote") => void;
  selectedBusinessType: string;
  setSelectedBusinessType: (value: string) => void;
}

export default function BusinessInquiryForm({
  selectedInquiry,
  setSelectedInquiry,
  selectedBusinessType,
  setSelectedBusinessType,
}: BusinessInquiryFormProps) {
  const isPersonal = selectedBusinessType === "개인"
  const [formData, setFormData] = useState({
    companyName: "",
    region: "",
    managerName: "",
    phone: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // 🔥 입력 핸들러
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // 🔥 폼 제출 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 기본 필수 필드 검증
  if (!selectedBusinessType || !formData.managerName || !formData.phone || !formData.email || !formData.message) {
    alert('필수 항목을 모두 입력해주세요.')
    setIsSubmitting(false)
    return
  }

  // 🔥 NEW: 개인이 아닌 경우 기관명 검증
  if (!isPersonal && (!formData.companyName || formData.companyName.trim() === "")) {
    alert('기관명을 입력해주세요.')
    setIsSubmitting(false)
    return
  }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inquiryType: selectedInquiry,
          businessType: selectedBusinessType,
          companyName: isPersonal ? null : formData.companyName,
          region: isPersonal ? null : formData.region,
          managerName: formData.managerName,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        alert('문의가 성공적으로 접수되었습니다!')
        // 폼 리셋
        setFormData({
          companyName: "",
          region: "",
          managerName: "",
          phone: "",
          email: "",
          message: "",
        })
      } else {
        const errorData = await response.json()
        alert(errorData.error || '접수 중 오류가 발생했습니다.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('접수 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
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
              문의 기관 유형 <span className="text-red-500">*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {["개인", "사업자", "공공 기관", "비영리기관", "기타"].map((type) => (
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

          {/* 기본 정보 */}
          <div className="space-y-4 sm:space-y-6">
            <Label className="text-base sm:text-lg font-semibold text-gray-700">기본 정보</Label>
            <div className={`grid grid-cols-1 ${isPersonal ? "md:grid-cols-1" : "md:grid-cols-2"} gap-4 sm:gap-6`}>
              {/* 기관명 - 개인이 아닐 때만 표시 */}
              {!isPersonal && (
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm sm:text-base text-gray-700 font-medium">
                    기관명 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="메를로랩"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    className="h-10 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#583CF2] focus:ring-0"
                  />
                </div>
              )}

              {/* 지역 - 개인이 아닐 때만 표시 */}
              {!isPersonal && (
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-sm sm:text-base text-gray-700 font-medium">
                    지역
                  </Label>
                  <Input
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                    placeholder="서울"
                    className="h-10 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#583CF2] focus:ring-0"
                  />
                </div>
              )}

              {/* 담당자/성함 */}
              <div className="space-y-2">
                <Label htmlFor="manager" className="text-sm sm:text-base text-gray-700 font-medium">
                  {isPersonal ? "성함" : "담당자(직책/성명)"} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="manager"
                  name="managerName"
                  value={formData.managerName}
                  onChange={(e) => handleInputChange("managerName", e.target.value)}
                  placeholder={isPersonal ? "홍길동" : "대리 홍길동"}
                  className="h-10 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#583CF2] focus:ring-0"
                />
              </div>

              {/* 전화번호 */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm sm:text-base text-gray-700 font-medium">
                  전화번호 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="02-1234-5678"
                  className="h-10 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#583CF2] focus:ring-0"
                />
              </div>

              {/* 이메일 */}
              <div className={`space-y-2 ${isPersonal ? "md:col-span-1" : "md:col-span-2"}`}>
                <Label htmlFor="email" className="text-sm sm:text-base text-gray-700 font-medium">
                  이메일 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  type="email"
                  placeholder="example@email.com"
                  className="h-10 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#583CF2] focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* 문의 내용 */}
          <div className="space-y-4">
            <Label htmlFor="message" className="text-base sm:text-lg font-semibold text-gray-700">
              문의 내용 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="사업장의 유형, 면적 등 상세한 정보를 주시면 더 자세한 견적을 제공해드립니다."
              className="min-h-[100px] sm:min-h-[120px] rounded-xl border-2 border-gray-200 focus:border-[#583CF2] focus:ring-0 resize-none"
            />
          </div>

          {/* 제출 */}
          <div className="space-y-4 sm:space-y-6 pt-4">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              양식을 제출하면 개인정보 제공 및 제 3자 정보 제공 활용에 동의하는 것으로 간주합니다.
            </p>
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full bg-[#583CF2] hover:bg-[#583CF2]/90 h-12 sm:h-14 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {isSubmitting ? '전송 중...' : '문의 보내기'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
