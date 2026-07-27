"use client"

import type React from "react"
import { useCallback, useState } from "react" // useEffect, handleScroll 제거
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/navigation"
import { Button } from "@/components/ui/button" // Button 컴포넌트 임포트
import LocaleToggle from "@/components/ui/locale-toggle"

// 데스크톱 nav 공통 pill: hover 시 연한 회색 라운드 배경 (리뉴얼 헤더)
const navPill =
  "inline-flex items-center px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 hover:bg-gray-100"

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const t = useTranslations("nav")
  const tCommon = useTranslations("common")
  const onContainerClick = useCallback(() => {
    // Add your code here
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div
      // scrolled 상태에 따른 조건부 클래스 제거, 항상 흰색 배경과 테두리 적용
      className="sticky top-0 left-0 w-full p-0 z-[1000] transition-all duration-300 bg-white border-b border-gray-200 shadow-sm"
      onClick={onContainerClick }
    >
      <div className="max-w-[1880px] mx-auto flex items-center justify-between lg:justify-start px-4 md:px-6 h-16">
        {/* 로고 */}
        <div className="sm:ml-2 md:m-2 lg:ml-2 xl:ml-2 2xl:ml-48">
          <div className="flex items-center relative">
            <Link href="/" className="flex items-center relative">
              <Image
                className="h-auto w-36"
                width={150}
                height={25}
                alt={tCommon("logoAlt")}
                src="/images/brand/logo.png"
                unoptimized
              />
            </Link>
          </div>
        </div>
        {/* 데스크톱 네비게이션 메뉴 */}
        <div className="hidden lg:flex items-center gap-8 ml-32">
          {/* 솔루션 드롭다운 (EMS / RTLS) — group-hover라 드롭다운 열림 상태에서도 pill 유지 */}
          <div className="relative group">
            <button
              type="button"
              className={`${navPill} gap-1 cursor-pointer group-hover:bg-gray-100 ${
                pathname.startsWith("/solutions") ? "text-[#583CF2]" : "text-gray-700 group-hover:text-[#583CF2]"
              }`}
            >
              {t("solutions")}
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#583CF2] transition-colors" />
            </button>
            <div className="absolute left-0 top-full pt-3 hidden group-hover:block">
              <div className="min-w-[160px] rounded-lg bg-white p-1 shadow-[0_0_2px_0_rgba(145,158,171,0.24),0_12px_24px_-4px_rgba(145,158,171,0.24)]">
                <Link
                  href="/solutions/ems"
                  className={`block px-4 py-2.5 rounded-md text-sm transition-colors hover:bg-gray-50 ${
                    pathname === "/solutions/ems" ? "text-[#583CF2] font-semibold" : "text-gray-700 hover:text-[#583CF2]"
                  }`}
                >
                  {t("solutionsEms")}
                </Link>
                <Link
                  href="/solutions/rtls"
                  className={`block px-4 py-2.5 rounded-md text-sm transition-colors hover:bg-gray-50 ${
                    pathname === "/solutions/rtls" ? "text-[#583CF2] font-semibold" : "text-gray-700 hover:text-[#583CF2]"
                  }`}
                >
                  {t("solutionsRtls")}
                </Link>
              </div>
            </div>
          </div>
          {/* 도입 사례 */}
          <Link
            href="/cases"
            className={`${navPill} ${pathname === "/cases" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"}`}
          >
            {t("cases")}
          </Link>
          {/* 기술 소개 */}
          <Link
            href="/tech"
            className={`${navPill} ${pathname === "/tech" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"}`}
          >
            {t("tech")}
          </Link>
          {/* 회사 소개 */}
          <Link
            href="/about"
            className={`${navPill} ${pathname === "/about" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"}`}
          >
            {t("about")}
          </Link>
          {/* IR Center */}
          <Link
            href="/ir/disclosures"
            className={`${navPill} ${pathname.startsWith("/ir") ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"}`}
          >
            {t("ir")}
          </Link>
          {/* 도입 문의 */}
          <Link
            href="/contact"
            className={`${navPill} ${pathname === "/contact" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"}`}
          >
            {t("contact")}
          </Link>
        </div>

        {/* 우측: 언어 토글 + (모바일) 햄버거 */}
        <div className="flex items-center gap-2 ml-auto 2xl:mr-36 xl:mr-10">
          <LocaleToggle />
          <button
            className="lg:hidden text-gray-700 hover:text-[#583CF2] transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* 모바일 메뉴 */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white ${
          isMobileMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-4">
          {/* 솔루션: EMS / RTLS */}
          <Link href="/solutions/ems" className="block" onClick={toggleMobileMenu}>
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname === "/solutions/ems" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"
              }`}
            >
              {t("solutionsEms")}
            </div>
          </Link>
          <Link href="/solutions/rtls" className="block" onClick={toggleMobileMenu}>
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname === "/solutions/rtls" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"
              }`}
            >
              {t("solutionsRtls")}
            </div>
          </Link>
          {/* 도입 사례 */}
          <Link href="/cases" className="block" onClick={toggleMobileMenu}>
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname === "/cases" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"
              }`}
            >
              {t("cases")}
            </div>
          </Link>
          {/* 기술 소개 */}
          <Link href="/tech" className="block" onClick={toggleMobileMenu}>
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname === "/tech" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"
              }`}
            >
              {t("tech")}
            </div>
          </Link>
          {/* 회사 소개 */}
          <Link href="/about" className="block" onClick={toggleMobileMenu}>
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname === "/about" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"
              }`}
            >
              {t("about")}
            </div>
          </Link>
          {/* IR Center */}
          <Link href="/ir/disclosures" className="block" onClick={toggleMobileMenu}>
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname.startsWith("/ir") ? "text-[#583CF2]" : "text-gray-700 group-hover:text-[#583CF2]"
              }`}
            >
              {t("ir")}
            </div>
          </Link>
          {/* 모바일 문의하기 버튼 */}
          <Link href="/contact" className="block" onClick={toggleMobileMenu}>
            <Button className="w-full bg-[#583CF2] hover:bg-[#4a32d0] text-white py-2">{tCommon("inquiry")}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
