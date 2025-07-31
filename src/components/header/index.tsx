"use client"

import type React from "react"
import { useCallback, useState } from "react" // useEffect, handleScroll 제거
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button" // Button 컴포넌트 임포트

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
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
      onClick={onContainerClick}
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
                alt="메를로랩 로고"
                src="/메를로랩 로고.png"
                unoptimized
              />
            </Link>
          </div>
        </div>
        {/* 데스크톱 네비게이션 메뉴 */}
        <div className="hidden lg:flex items-center gap-16 ml-32">
          {/* 솔루션 메뉴 */}
          <Link href="/solutions" className="relative cursor-pointer transition-colors duration-200 group">
            <div className="flex items-center">
              <div
                className={`text-base font-medium transition-colors duration-200 ${
                  pathname === "/solutions" ? "text-[#583CF2]" : "text-gray-700 group-hover:text-[#583CF2]"
                }`}
              >
                EMS 솔루션
              </div>
            </div>
          </Link>
          {/* 도입 사례 */}
          <Link href="/cases" className="relative cursor-pointer transition-colors duration-200 group">
            <div className="flex items-center">
              <div
                className={`text-base font-medium transition-colors duration-200 ${
                  pathname === "/cases" ? "text-[#583CF2]" : "text-gray-700 group-hover:text-[#583CF2]"
                }`}
              >
                도입 사례
              </div>
            </div>
          </Link>
          {/* 회사 소개 */}
          <Link href="/about" className="relative cursor-pointer transition-colors duration-200 group">
            <div className="flex items-center">
              <div
                className={`text-base font-medium transition-colors duration-200 ${
                  pathname === "/about" ? "text-[#583CF2]" : "text-gray-700 group-hover:text-[#583CF2]"
                }`}
              >
                회사 소개
              </div>
            </div>
          </Link>
          {/* IR Center */}
          <Link href="/ir/disclosures" className="relative cursor-pointer transition-colors duration-200 group">
            <div className="flex items-center">
              <div
                className={`text-base font-medium transition-colors duration-200 ${
                  pathname.startsWith("/ir") ? "text-[#583CF2]" : "text-gray-700 group-hover:text-[#583CF2]"
                }`}
              >
                IR Center
              </div>
            </div>
          </Link>
        </div>
        {/* 데스크톱 문의하기 버튼 */}
        
        {/* 모바일 햄버거 메뉴 버튼 */}
        <button
          className="lg:hidden text-gray-700 hover:text-[#583CF2] transition-colors duration-200"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {/* 모바일 메뉴 */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-4">
          {/* 솔루션 */}
          <Link href="/solutions" className="block" onClick={toggleMobileMenu}>
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname === "/solutions" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"
              }`}
            >
              솔루션
            </div>
          </Link>
          {/* 도입 사례 */}
          <Link href="/cases" className="block" onClick={toggleMobileMenu}>
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname === "/cases" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"
              }`}
            >
              도입 사례
            </div>
          </Link>
          {/* 회사 소개 */}
          <Link href="/about" className="block" onClick={toggleMobileMenu}>
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname === "/about" ? "text-[#583CF2]" : "text-gray-700 hover:text-[#583CF2]"
              }`}
            >
              회사 소개
            </div>
          </Link>
          {/* IR Center */}
          <Link href="/ir/disclosures" className="block" onClick={toggleMobileMenu}>
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname.startsWith("/ir") ? "text-[#583CF2]" : "text-gray-700 group-hover:text-[#583CF2]"
              }`}
            >
              IR Center
            </div>
          </Link>
          {/* 모바일 문의하기 버튼 */}
          <Link href="/?tab=business" className="block" onClick={toggleMobileMenu}>
            <Button className="w-full bg-[#583CF2] hover:bg-[#4a32d0] text-white py-2">문의하기</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
