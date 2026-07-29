"use client"

import { Mail, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useTranslations } from "next-intl"

// 기관 유형: 값(한글)은 로직(isPersonal 체크·API 전송)에 그대로 쓰고, 표시만 번역.
const TYPE_KEY: Record<string, string> = {
  "개인": "individual",
  "사업자": "business",
  "공공 기관": "public",
  "비영리기관": "nonprofit",
  "기타": "other",
}

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
  const t = useTranslations("businessForm")
  const tQuote = useTranslations("quoteForm")
  const tType = useTranslations("businessType")
  const typeLabel = (ko: string) => tType(TYPE_KEY[ko] ?? "individual")
  const isPersonal = selectedBusinessType === "개인"
  const [formData, setFormData] = useState({
    companyName: "",
    region: "",
    managerName: "",
    phone: "",
    email: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const emailValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  // 인라인 검증: 제출 시도(submitted) 시에만 각 필드 에러 노출
  const errors = {
    businessType: !selectedBusinessType ? t("fieldRequired") : "",
    companyName: !isPersonal && !formData.companyName.trim() ? t("fieldRequired") : "",
    managerName: !formData.managerName.trim() ? t("fieldRequired") : "",
    phone: !formData.phone.trim() ? t("fieldRequired") : "",
    email: !formData.email.trim() ? t("fieldRequired") : !emailValid(formData.email) ? t("invalidEmail") : "",
    message: !formData.message.trim() ? t("fieldRequired") : "",
  }
  const hasErrors = Object.values(errors).some(Boolean)
  const err = (field: keyof typeof errors) => (submitted ? errors[field] : "")

  // 🔥 입력 핸들러 (입력 재개 시 결과 패널 dismiss)
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (status === "success" || status === "error") setStatus("idle")
  }

  // 🔥 폼 제출 함수
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    // 검증 실패 시 인라인 에러가 노출됨 (alert 없음)
    if (hasErrors) {
      setStatus("idle")
      return
    }

    setStatus("submitting")
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
        setStatus("success")
        setSubmitted(false)
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
        const errorData = await response.json().catch(() => ({}))
        setErrorMsg(errorData.error || t("alertError"))
        setStatus("error")
      }
    } catch (error) {
      console.error('Error:', error)
      setErrorMsg(t("alertError"))
      setStatus("error")
    }
  }

  const isSubmitting = status === "submitting"

  return (
    <Card className="border-0 shadow-lg bg-white">
      <CardContent className="p-4 sm:p-6 md:p-8 lg:p-12">
        <form onSubmit={handleSubmit} noValidate className="space-y-6 sm:space-y-8">
          {/* 문의 구분 */}
          <div className="space-y-4">
            <Label className="text-base sm:text-lg font-semibold text-gray-700">
              {tQuote("inquiryType")} <span className="text-red-500">*</span>
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
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-zinc-800">{tQuote("quoteTitle")}</h3>
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-500">
                      {tQuote("quoteDesc")}
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
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-zinc-800">{tQuote("businessInquiryTitle")}</h3>
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-500">
                    {tQuote("businessInquiryDesc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 사업장 유형 */}
          <div className="space-y-4">
            <Label className="text-base sm:text-lg font-semibold text-gray-700">
              {t("orgTypeLabel")} <span className="text-red-500">*</span>
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
                  <span className="font-medium text-sm sm:text-base text-center">{typeLabel(type)}</span>
                </div>
              ))}
            </div>
            {err("businessType") && (
              <p className="text-sm text-red-500">{err("businessType")}</p>
            )}
          </div>

          {/* 기본 정보 */}
          <div className="space-y-4 sm:space-y-6">
            <Label className="text-base sm:text-lg font-semibold text-gray-700">{t("basicInfo")}</Label>
            <div className={`grid grid-cols-1 ${isPersonal ? "md:grid-cols-1" : "md:grid-cols-2"} gap-4 sm:gap-6`}>
              {/* 기관명 - 개인이 아닐 때만 표시 */}
              {!isPersonal && (
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm sm:text-base text-gray-700 font-medium">
                    {t("orgName")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder={t("orgNamePlaceholder")}
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    aria-invalid={!!err("companyName")}
                    aria-describedby={err("companyName") ? "err-companyName" : undefined}
                    className={`h-10 sm:h-12 rounded-xl border-2 focus:ring-0 ${err("companyName") ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#583CF2]"}`}
                  />
                  {err("companyName") && (
                    <p id="err-companyName" className="text-sm text-red-500">{err("companyName")}</p>
                  )}
                </div>
              )}

              {/* 지역 - 개인이 아닐 때만 표시 */}
              {!isPersonal && (
                <div className="space-y-2">
                  <Label htmlFor="region" className="text-sm sm:text-base text-gray-700 font-medium">
                    {t("region")}
                  </Label>
                  <Input
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                    placeholder={t("regionPlaceholder")}
                    className="h-10 sm:h-12 rounded-xl border-2 border-gray-200 focus:border-[#583CF2] focus:ring-0"
                  />
                </div>
              )}

              {/* 담당자/성함 */}
              <div className="space-y-2">
                <Label htmlFor="manager" className="text-sm sm:text-base text-gray-700 font-medium">
                  {isPersonal ? t("nameLabel") : t("managerLabel")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="manager"
                  name="managerName"
                  value={formData.managerName}
                  onChange={(e) => handleInputChange("managerName", e.target.value)}
                  placeholder={isPersonal ? t("namePlaceholder") : t("managerPlaceholder")}
                  aria-invalid={!!err("managerName")}
                  aria-describedby={err("managerName") ? "err-manager" : undefined}
                  className={`h-10 sm:h-12 rounded-xl border-2 focus:ring-0 ${err("managerName") ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#583CF2]"}`}
                />
                {err("managerName") && (
                  <p id="err-manager" className="text-sm text-red-500">{err("managerName")}</p>
                )}
              </div>

              {/* 전화번호 */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm sm:text-base text-gray-700 font-medium">
                  {t("phone")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder={t("phonePlaceholder")}
                  aria-invalid={!!err("phone")}
                  aria-describedby={err("phone") ? "err-phone" : undefined}
                  className={`h-10 sm:h-12 rounded-xl border-2 focus:ring-0 ${err("phone") ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#583CF2]"}`}
                />
                {err("phone") && (
                  <p id="err-phone" className="text-sm text-red-500">{err("phone")}</p>
                )}
              </div>

              {/* 이메일 */}
              <div className={`space-y-2 ${isPersonal ? "md:col-span-1" : "md:col-span-2"}`}>
                <Label htmlFor="email" className="text-sm sm:text-base text-gray-700 font-medium">
                  {t("email")} <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  type="email"
                  placeholder="example@email.com"
                  aria-invalid={!!err("email")}
                  aria-describedby={err("email") ? "err-email" : undefined}
                  className={`h-10 sm:h-12 rounded-xl border-2 focus:ring-0 ${err("email") ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#583CF2]"}`}
                />
                {err("email") && (
                  <p id="err-email" className="text-sm text-red-500">{err("email")}</p>
                )}
              </div>
            </div>
          </div>

          {/* 문의 내용 */}
          <div className="space-y-4">
            <Label htmlFor="message" className="text-base sm:text-lg font-semibold text-gray-700">
              {t("messageLabel")} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder={t("messagePlaceholder")}
              aria-invalid={!!err("message")}
              aria-describedby={err("message") ? "err-message" : undefined}
              className={`min-h-[100px] sm:min-h-[120px] rounded-xl border-2 focus:ring-0 resize-none ${err("message") ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-[#583CF2]"}`}
            />
            {err("message") && (
              <p id="err-message" className="text-sm text-red-500">{err("message")}</p>
            )}
          </div>

          {/* 제출 결과 패널 */}
          {status === "success" && (
            <div role="status" aria-live="polite" className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 sm:p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
              <div>
                <p className="font-semibold text-green-800">{t("successHeading")}</p>
                <p className="mt-0.5 text-sm text-green-700">{t("alertSuccess")}</p>
              </div>
            </div>
          )}
          {status === "error" && (
            <div role="alert" aria-live="assertive" className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:p-5">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <div>
                <p className="font-semibold text-red-800">{t("errorHeading")}</p>
                <p className="mt-0.5 text-sm text-red-700">{errorMsg || t("alertError")}</p>
              </div>
            </div>
          )}

          {/* 제출 */}
          <div className="space-y-4 sm:space-y-6 pt-4">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t("consent")}
            </p>
            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full bg-[#583CF2] hover:bg-[#583CF2]/90 h-12 sm:h-14 rounded-xl text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {isSubmitting ? t("submitting") : t("submit")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
