"use client"
import type React from "react"
import { useCallback, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

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
    <div className="fixed top-0 left-0 w-full bg-black p-0 z-[1000]">
      <div
        className="max-w-[1200px] mx-auto flex items-center justify-between lg:justify-start px-4 md:px-5 h-[60px] md:h-[70px]"
        onClick={onContainerClick}
      >
        {/* 로고 */}
        <div className="flex items-center">
          <div className="flex items-center relative">
            <Link href="/" className="flex items-center relative">
              <Image
                className="h-auto w-[120px] md:w-[150px]"
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
        <div className="hidden lg:flex items-center gap-12 xl:gap-[70px] ml-20">
          {/* 솔루션 메뉴 */}
          <Link href="/contact" className="relative cursor-pointer transition-colors duration-200 group">
            <div className="flex items-center">
              <div
                className={`text-sm xl:text-base font-medium transition-colors duration-200 ${
                  pathname === "/contact" ? "text-[#583CF2]" : "text-zinc-200 group-hover:text-[#583CF2]"
                }`}
              >
                솔루션
              </div>
            </div>
          </Link>

          {/* 도입 사례 - 수정된 부분 */}
          <Link href="/use-cases" className="relative cursor-pointer transition-colors duration-200 group">
            <div className="flex items-center">
              <div
                className={`text-sm xl:text-base font-medium transition-colors duration-200 ${
                  pathname === "/use-cases" ? "text-[#583CF2]" : "text-zinc-200 group-hover:text-[#583CF2]"
                }`}
              >
                도입 사례
              </div>
            </div>
          </Link>

          {/* 고객지원 */}
          <div className="relative cursor-pointer transition-colors duration-200 group">
            <div className="flex items-center">
              <div className="text-sm xl:text-base font-medium text-zinc-200 group-hover:text-[#583CF2] transition-colors duration-200">
                회사소개
              </div>
            </div>
          </div>

          {/* 회사소개 */}
          <div className="relative cursor-pointer transition-colors duration-200 group">
            <div className="flex items-center">
              <div className="text-sm xl:text-base font-medium text-zinc-200 group-hover:text-[#583CF2] transition-colors duration-200">
                탄소배출권
              </div>
            </div>
          </div>
        </div>

        {/* 데스크톱 문의하기 버튼 */}
        <div className="hidden md:flex items-center ml-auto">
          <Link href="/contact?tab=business" className="no-underline">
            <div className="bg-[#583CF2] text-zinc-200 py-2 md:py-3 px-4 md:px-6 rounded-md cursor-pointer transition-all duration-200 hover:bg-[#4b2fec] group">
              <span className="text-xs md:text-sm font-semibold group-hover:text-zinc-300">문의하기</span>
            </div>
          </Link>
        </div>

        {/* 모바일 햄버거 메뉴 버튼 */}
        <button
          className="lg:hidden text-zinc-200 hover:text-[#583CF2] transition-colors duration-200"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* 모바일 메뉴 */}
      <div
        className={`lg:hidden bg-black border-t border-zinc-800 transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-4">
          {/* 솔루션 */}
          <Link href="/contact" className="block">
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname === "/contact" ? "text-[#583CF2]" : "text-zinc-200 hover:text-[#583CF2]"
              }`}
            >
              솔루션
            </div>
          </Link>

          {/* 도입 사례 - 모바일에서도 수정 */}
          <Link href="/use-cases" className="block">
            <div
              className={`text-base font-medium cursor-pointer transition-colors duration-200 py-2 ${
                pathname === "/use-cases" ? "text-[#583CF2]" : "text-zinc-200 hover:text-[#583CF2]"
              }`}
            >
              도입 사례
            </div>
          </Link>

          <div className="text-base font-medium text-zinc-200 hover:text-[#583CF2] cursor-pointer transition-colors duration-200 py-2">
            고객지원
          </div>
          <div className="text-base font-medium text-zinc-200 hover:text-[#583CF2] cursor-pointer transition-colors duration-200 py-2">
            회사소개
          </div>

          {/* 모바일 문의하기 버튼 */}
          <div className="pt-4">
            <Link href="/contact?tab=business" className="no-underline">
              <div className="bg-[#583CF2] text-zinc-200 py-3 px-6 rounded-md cursor-pointer transition-all duration-200 hover:bg-[#4b2fec] w-full text-center">
                <span className="text-sm font-semibold">문의하기</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
