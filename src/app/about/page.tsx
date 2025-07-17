"use client"

import { MeshGradientComponent } from "@/components/background/mesh-gradient"
import Header from "@/components/header"
import Timeline from "@/components/card/timeline"
import Footer from "@/components/footer"
import FadeInUp from "@/components/animation/fade-in-up"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import Link from "next/link"

const certifications = [
  {
    title: "ISO 9001:2015 품질경영시스템 인증",
    image: "/about/인증서1.png"
  },
  {
    title: "고효율에너지기자재 인증 (스마트LED조명제어시스템)",
    image: "/about/인증서2.png"
  },
  {
    title: "고효율에너지기자재 인증 (스마트LED등기구)",
    image: "/about/인증서3.png"
  },
  {
    title: "환경표지 인증 (한국환경산업기술원)",
    image: "/about/인증서4.png"
  },
  {
    title: "브랜드K 인증 (중소벤처기업부장관)",
    image: "/about/인증서5.png"
  },
  {
    title: "상생협력제품 확인서 (중소벤처기업부장관)",
    image: "/about/인증서6.png"
  }
]

const domesticPatents = [
  { number: "특허 #1", title: "발광소자를 이용한 조명장치의 디밍 시스템", country: "한국", flag: "🇰🇷" },
  { number: "특허 #2", title: "전류원의 시간지연 기능을 갖는 엘이디 구동회로", country: "한국", flag: "🇰🇷" },
  { number: "특허 #3", title: "엘이디 조명 구동회로", country: "한국", flag: "🇰🇷" },
  { number: "특허 #4", title: "전원전압 변화 시의 광량 보상 기능을 갖는 엘이디 조명 구동회로", country: "한국", flag: "🇰🇷" },
  { number: "특허 #5", title: "이동통신 단말기를 이용한 통신 기능 조명기기의 탐색 시스템 및 이를 이용한 조명기기의 조명 기능 조절 방법", country: "한국", flag: "🇰🇷" },
  { number: "특허 #6", title: "플리커 저감 기능을 갖는 교류 다이렉트 방식의 LED 구동회로", country: "한국", flag: "🇰🇷" },
  { number: "특허 #7", title: "캐스코드 구조의 전류원을 갖는 교류 LED 구동회로", country: "한국", flag: "🇰🇷" },
  { number: "특허 #8", title: "광 편차의 조정 기능을 갖는 교류 LED 구동회로", country: "한국", flag: "🇰🇷" },
  { number: "특허 #9", title: "안정적인 전원 공급이 가능한 교류 LED 구동회로", country: "한국", flag: "🇰🇷" },
  { number: "특허 #10", title: "교류 LED 구동회로", country: "한국", flag: "🇰🇷" },
  { number: "특허 #11", title: "교류 LED 구동회로", country: "한국", flag: "🇰🇷" },
  { number: "특허 #12", title: "LED 조명용 기판 구조", country: "한국", flag: "🇰🇷" },
  { number: "특허 #13", title: "이동통신 단말기를 이용한 무선 조명장치 및 전기전자기기 제어 시스템", country: "한국", flag: "🇰🇷" },
  { number: "특허 #14", title: "이동통신 단말기를 이용한 무선 조명장치 및 전기전자기기 제어 시스템", country: "한국", flag: "🇰🇷" },
  { number: "특허 #15", title: "색온도 제어를 위한 LED 조명장치", country: "한국", flag: "🇰🇷" },
  { number: "특허 #16", title: "이기종 무선 네트워크 기반의 무선통신 디바이스 관리 시스템", country: "한국", flag: "🇰🇷" },
  { number: "특허 #17", title: "스마트 조명기기의 조명 등록을 위한 제어 시스템 및 그 방법", country: "한국", flag: "🇰🇷" },
  { number: "특허 #18", title: "상용 교류 전원의 주파수를 이용한 LED 조명 제어 장치", country: "한국", flag: "🇰🇷" },
  { number: "특허 #19", title: "다채널 디밍 LED 조명 장치", country: "한국", flag: "🇰🇷" }
]

const internationalPatents = [
  { number: "특허 #1", title: "DIMMING SYSTEM OF LAMP USING LIGHT-EMITTING DEVICE", country: "미국", flag: "🇺🇸" },
  { number: "특허 #2", title: "DIMMING SYSTEM OF LAMP USING LIGHT-EMITTING DEVICE", country: "중국", flag: "🇨🇳" },
  { number: "특허 #3", title: "DIMMING SYSTEM OF LAMP USING LIGHT-EMITTING DEVICE", country: "일본", flag: "🇯🇵" },
  { number: "특허 #4", title: "AC LED DRIVING CIRCUIT", country: "미국", flag: "🇺🇸" },
  { number: "특허 #5", title: "AC LED DRIVING CIRCUIT", country: "중국", flag: "🇨🇳" },
  { number: "특허 #6", title: "AC LED DRIVING CIRCUIT", country: "미국", flag: "🇺🇸" },
  { number: "특허 #7", title: "AC LED DRIVING CIRCUIT", country: "중국", flag: "🇨🇳" },
  { number: "특허 #8", title: "SYSTEM FOR INTEGRATED REMOTE CONTROL OF WIRELESS LIGHTING DEVICE AND WIRELESS ELECTRIC AND ELECTRONIC DEVICES IN WIRELESS NETWORK ENVIRONMENT", country: "미국", flag: "🇺🇸" },
  { number: "특허 #9", title: "SUBSTRATE STRUCTURE FOR LED LIGHTING", country: "미국", flag: "🇺🇸" }
]

export default function About() {
  const [currentCertIndex, setCurrentCertIndex] = useState(0)
  const [activePatentTab, setActivePatentTab] = useState<'domestic' | 'international'>('domestic')
  const [isHeroVisible, setIsHeroVisible] = useState(false)
  const [mobileCertIndex, setMobileCertIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const certScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // 화면 크기 감지
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // 모바일 인증서 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (certScrollRef.current) {
        const scrollLeft = certScrollRef.current.scrollLeft
        const itemWidth = 320 + 16 // w-80 (320px) + gap-4 (16px)
        const currentIndex = Math.round(scrollLeft / itemWidth)
        setMobileCertIndex(currentIndex)
      }
    }

    const scrollContainer = certScrollRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const nextCert = () => {
    setCurrentCertIndex((prev) => Math.min(prev + 3, certifications.length - 3))
  }

  const prevCert = () => {
    setCurrentCertIndex((prev) => Math.max(prev - 3, 0))
  }

  return (
    <div>
      <Header/>
      
        <section ref={heroRef} className="relative h-screen flex items-center justify-center">
        {isHeroVisible && (
          <MeshGradientComponent
            colors={[
              "#A68FFF", // 더 연한 보라색\
              "#EBE7FF", // 매우 연한 보라색
              "#583CF2", // 보라색
              "#6D54F9", // 연한 보라색
              "#FFFFFF"
            ]}
            speed={1.0}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
              width: "100%",
              height: "100%",
            }}
          />
        )}

        <div className="relative z-10 text-center text-white">
          <FadeInUp delay={300}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">에너지 절감의</h1>
          </FadeInUp>
          <FadeInUp delay={600}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">새로운 기준을 만듭니다</h1>
          </FadeInUp>
        </div>
      </section>
      

      {/* 타임라인 섹션 */}
      <Timeline />
      
      {/* 특허 및 인증서 섹션 */}
      <section className="relative w-full px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <FadeInUp delay={300}>
            <div className="text-center text-gray-700 py-8 mb-16 pt-16 sm:pt-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">특허 및 인증서</h2>
            </div>
          </FadeInUp>
          
          {/* 특허 */}
          <FadeInUp delay={600} threshold={0.1}>
            <div className="mb-16">
              
              {/* 탭 버튼 */}
              <div className="flex justify-center mb-16">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActivePatentTab('domestic')}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                      activePatentTab === 'domestic'
                        ? 'bg-[#583CF2] text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    국내 특허 ({domesticPatents.length}건)
                  </button>
                  <button
                    onClick={() => setActivePatentTab('international')}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                      activePatentTab === 'international'
                        ? 'bg-[#583CF2] text-white'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    해외 특허 ({internationalPatents.length}건)
                  </button>
                </div>
              </div>

              {/* 특허 목록 */}
              <div className="space-y-4">
                {(activePatentTab === 'domestic' ? domesticPatents : internationalPatents).map((patent, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{patent.flag}</span>
                      <div className="flex items-center gap-3">
                        <span className="bg-[#583CF2] text-white px-3 py-1 rounded-full text-sm font-medium">
                          {patent.number}
                        </span>
                        <span className="text-gray-700 font-medium">{patent.country}</span>
                      </div>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-700 mt-4">{patent.title}</h4>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>
          
          {/* 인증서 */}
          <div className="relative pt-20 pb-32">
            {/* 데스크톱 버전 - 화살표 버튼 */}
            <div className="hidden lg:block">
              {/* 이전 버튼 */}
              <button
                onClick={prevCert}
                disabled={currentCertIndex === 0}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              {/* 인증서 그리드 */}
              <div className="grid grid-cols-3 gap-6 px-16">
                {certifications.slice(currentCertIndex, currentCertIndex + 3).map((cert, index) => (
                  <div key={currentCertIndex + index} className="w-full h-96 relative overflow-hidden">
                    <Image
                      src={cert.image}
                      alt={cert.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* 다음 버튼 */}
              <button
                onClick={nextCert}
                disabled={currentCertIndex >= certifications.length - 3}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>
            </div>

            {/* 모바일 버전 - 터치 스와이프 */}
            <div className="lg:hidden">
              <div ref={certScrollRef} className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 px-4" style={{ scrollSnapType: 'x mandatory' }}>
                  {certifications.map((cert, index) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0 w-80 h-96 relative overflow-hidden rounded-lg"
                      style={{ scrollSnapAlign: 'start' }}
                    >
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 인디케이터 */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(certifications.length / 3) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentCertIndex(index * 3)
                    // 모바일에서 스크롤 위치도 함께 업데이트
                    if (certScrollRef.current) {
                      const itemWidth = 320 + 16 // w-80 (320px) + gap-4 (16px)
                      certScrollRef.current.scrollTo({
                        left: index * 3 * itemWidth,
                        behavior: 'smooth'
                      })
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    // 데스크톱에서는 currentCertIndex 기반, 모바일에서는 mobileCertIndex 기반
                    (isDesktop ? Math.floor(currentCertIndex / 3) : Math.floor(mobileCertIndex / 3)) === index 
                      ? 'bg-[#583CF2]' 
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-5 text-white bg-primary">
        <div className="max-w-[1120px] mx-auto">
          <div className="flex flex-col items-center gap-6 sm:gap-8">
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-center px-4">
                내 사업장에 가장 알맞은 관리
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center px-4">
                전기요금 최적화 지금 시작하세요
              </h2>
            </div>
            <button className="shadow-sm rounded-lg bg-white border border-gray-200 h-12 sm:h-14 flex items-center justify-center py-2 px-4 sm:px-6 md:px-8 gap-2 text-sm sm:text-base md:text-lg text-zinc-800 hover:bg-gray-50 transition-colors cursor-pointer">
              <Link href="/solutions?tab=business" className="no-underline">
                <div className="flex items-center gap-2">
                  <span className="leading-7 font-medium">문의 하기</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Link>
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}