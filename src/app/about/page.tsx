"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FadeInUp from "@/components/animation/fade-in-up"
import KakaoMap from "@/components/ui/kakao-map"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const certifications = [
  {
    title: "ISO 9001:2015 품질경영시스템 인증",
    image: "/about/인증서1.png",
  },
  {
    title: "고효율에너지기자재 인증 (스마트LED조명제어시스템)",
    image: "/about/인증서2.png",
  },
  {
    title: "상생협력제품 확인서 (중소벤처기업부장관)",
    image: "/about/인증서6.png",
  },
]

export default function About() {
  const [currentCertIndex, setCurrentCertIndex] = useState(0)
  const [activePatentTab, setActivePatentTab] = useState<"domestic" | "international">("domestic")
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
      { threshold: 0.1 },
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
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
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
      scrollContainer.addEventListener("scroll", handleScroll)
      return () => scrollContainer.removeEventListener("resize", handleScroll)
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
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* 배경 비디오 */}
        {isHeroVisible && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0 scale-[1.01]"
            src="/about/hero-compressed.mp4"
          />
        )}

        {/* 검정색 그라디언트 오버레이 추가 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-[1]"></div>

        {/* 텍스트 콘텐츠 */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
          <FadeInUp delay={300}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">에너지 절감의</h1>
          </FadeInUp>
          <FadeInUp delay={600}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">새로운 기준을 만듭니다</h1>
          </FadeInUp>
        </div>
      </section>

      {/* 특허 및 인증서 섹션 */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 bg-gray-50 pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
        <div className="max-w-6xl mx-auto">
          <FadeInUp delay={300}>
            <div className="text-center text-gray-700 py-8 mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">특허 및 인증서</h2>
              <p className="text-base sm:text-lg text-gray-600 px-4">
                메를로랩의 기술력과 품질을 인정받은 <br className="sm:hidden" /> 특허 및 인증서입니다
              </p>
            </div>
          </FadeInUp>

          {/* 특허 및 인증서 통계 */}
          <FadeInUp delay={600} threshold={0.1}>
            <div className="mb-12 sm:mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* 국내 특허 */}
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-2xl sm:text-3xl mr-2">🇰🇷</div>
                    <div className="text-base sm:text-lg font-semibold text-gray-700">국내 특허</div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="text-3xl sm:text-4xl font-bold text-[#583CF2]">19</div>
                    <div className="text-sm text-gray-700">건</div>
                  </div>
                </div>

                {/* 해외 특허 */}
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-2xl sm:text-3xl mr-2">🌍</div>
                    <div className="text-base sm:text-lg font-semibold text-gray-700">해외 특허</div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="text-3xl sm:text-4xl font-bold text-[#583CF2]">9</div>
                    <div className="text-sm text-gray-700">건</div>
                  </div>
                </div>

                {/* 인증서 */}
                <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-2xl sm:text-3xl mr-2">🏆</div>
                    <div className="text-base sm:text-lg font-semibold text-gray-700">인증서</div>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <div className="text-3xl sm:text-4xl font-bold text-[#583CF2]">{certifications.length}</div>
                    <div className="text-sm text-gray-700">개</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* 인증서 */}
          <FadeInUp delay={600} threshold={0.1}>
            <div className="relative pt-20 pb-32">
              {/* 데스크톱 버전 - 화살표 버튼 제거 */}
              <div className="hidden lg:block">
                {/* 인증서 그리드 */}
                <div className="grid grid-cols-3 gap-6 px-16">
                  {certifications.map((cert, index) => (
                    <div key={index} className="w-full h-96 relative overflow-hidden">
                      <Image src={cert.image || "/placeholder.svg"} alt={cert.title} fill className="object-contain" />
                    </div>
                  ))}
                </div>
              </div>

              {/* 모바일 버전 - 터치 스와이프 */}
              <div className="lg:hidden">
                <div ref={certScrollRef} className="overflow-x-auto scrollbar-hide">
                  <div className="flex gap-4 px-4" style={{ scrollSnapType: "x mandatory" }}>
                    {certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-80 h-96 relative overflow-hidden rounded-lg"
                        style={{ scrollSnapAlign: "start" }}
                      >
                        <Image
                          src={cert.image || "/placeholder.svg"}
                          alt={cert.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 모바일 인디케이터 - 3개 */}
                <div className="flex justify-center mt-6 gap-2">
                  {certifications.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (certScrollRef.current) {
                          const itemWidth = 320 + 16 // w-80 (320px) + gap-4 (16px)
                          certScrollRef.current.scrollTo({
                            left: index * itemWidth,
                            behavior: "smooth",
                          })
                        }
                      }}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        mobileCertIndex === index ? "bg-[#583CF2]" : "bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* 오시는 길 섹션 */}
      <section className="py-16 lg:py-24">
        <FadeInUp delay={300}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">오시는 길</h2>
            <p className="text-lg text-gray-600">메를로랩을 방문하시는 고객님을 위한 안내입니다.</p>
          </div>
        </FadeInUp>

        {/* 지도 */}
        <FadeInUp delay={400}>
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-100">
            <KakaoMap lat={37.480965293745} lng={126.88634586912} level={3} width="100%" height="100%" />
          </div>
        </FadeInUp>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 회사 정보 및 교통편 안내 */}
          <FadeInUp delay={500}>
            <div className="bg-[#1d1c1d] py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative -mt-8 sm:-mt-12 lg:-mt-20 z-10 -mx-4 sm:mx-0">
              {/* PC 버전 - 원래 레이아웃 */}
              <div className="hidden lg:flex flex-col mx-auto lg:flex-row gap-10">
                <div className="flex">
                  <div className="flex ml-32">
                    <div className="flex items-center justify-center space-x-32">
                      <Image
                        className="w-[204px] h-[33px]"
                        width={204}
                        height={33}
                        sizes="100vw"
                        alt="메를로랩 로고"
                        src="/메를로랩 로고2.png"
                      />
                      <div className="w-px bg-[#404040] h-32"></div>
                    </div>
                  </div>

                  {/* 상세 정보 섹션 */}
                  <div className="space-y-3 ml-16">
                    <div className="flex">
                      <div className="font-bold text-gray-50 w-20">주소</div>
                      <div className="text-zinc-300 ml-2">
                        서울특별시 금천구 디지털로9길 68 (가산동) 대륭포스트 타워 5차 2002~2005호
                      </div>
                    </div>
                    <div className="flex">
                      <div className="font-bold text-gray-50 w-20">운영시간</div>
                      <div className="text-zinc-300 ml-2">09:00 ~ 18:00 (토, 일, 공휴일 휴무)</div>
                    </div>
                    <div className="flex">
                      <div className="font-bold text-gray-50 w-20">이메일</div>
                      <div className="ml-2">
                        <a
                          className="text-zinc-300 hover:text-zinc-200"
                          href="mailto:info@merlotlab.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          info@merlotlab.com
                        </a>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="font-bold text-gray-50 w-20">연락처</div>
                      <div className="text-zinc-300 ml-2">02) 862 - 1700</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 모바일 버전 - 반응형 레이아웃 */}
              <div className="lg:hidden flex flex-col sm:flex-row items-center gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 lg:gap-12 w-full lg:w-auto">
                  <div className="flex-shrink-0">
                    <Image
                      className="w-[150px] sm:w-[180px] lg:w-[204px] h-auto"
                      width={204}
                      height={33}
                      alt="메를로랩 로고"
                      src="/메를로랩 로고2.png"
                    />
                  </div>
                  <div className="hidden sm:block w-px bg-[#404040] h-16 lg:h-32"></div>
                </div>

                {/* 상세 정보 섹션 */}
                <div className="space-y-3 sm:space-y-4 w-full">
                  <div className="flex items-center gap-2 h-12">
                    <div className="font-bold text-gray-50 w-16 flex-shrink-0 h-full items-center p-0">주소</div>
                    <div className="text-zinc-300 text-sm sm:text-base leading-relaxed h-full items-center p-0">
                      서울특별시 금천구 디지털로9길 68 (가산동) <br /> 대륭포스트 타워 5차 2002~2005호
                    </div>
                  </div>
                  <div className="flex items-center gap-2 h-6">
                    <div className="font-bold text-gray-50 w-16 flex-shrink-0 items-center p-0">운영시간</div>
                    <div className="text-zinc-300 text-sm sm:text-base">09:00 ~ 18:00 (토, 일, 공휴일 휴무)</div>
                  </div>
                  <div className="flex items-center gap-2 h-6">
                    <div className="font-bold text-gray-50 w-16 flex-shrink-0 items-center p-0">이메일</div>
                    <div>
                      <a
                        className="text-zinc-300 hover:text-zinc-200 text-sm sm:text-base"
                        href="mailto:info@merlotlab.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        info@merlotlab.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 h-6">
                    <div className="font-bold text-gray-50 w-16 flex-shrink-0 items-center p-0">연락처</div>
                    <div className="text-zinc-300 text-sm sm:text-base items-center p-0">02) 862 - 1700</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>

          {/* 교통편 안내 섹션 */}
          <FadeInUp delay={500}>
            {/* PC 버전 - 원래 레이아웃 */}
            <div className="hidden lg:block flex-1 space-y-6 mt-12 pl-12">
              {/* 지하철 */}
              <article className="pb-6 border-b border-dashed border-gray-300">
                <div className="mb-4">
                  <h5 className="text-lg font-bold text-gray-900">지하철 이용시</h5>
                </div>
                <div className="flex">
                  <div className="flex space-x-1 mr-2">
                    <div className="w-6 h-6 bg-[#2B387C] rounded-full flex items-center justify-center">
                      <div className="text-white text-xs font-bold">1</div>
                    </div>
                    <div className="w-6 h-6 bg-[#737E00] rounded-full flex items-center justify-center">
                      <div className="text-white text-xs font-bold">7</div>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900 mr-2">가산디지털단지역</div>
                  <div className="w-px bg-gray-300 h-3 mt-1.5 mr-2"></div>
                  <div className="text-gray-600">가산디지털단지역 4번 출구 도보 10분</div>
                </div>
              </article>

              {/* 버스 */}
              <article className="pb-6 border-b border-dashed border-gray-300">
                <div className="mb-4">
                  <h5 className="text-lg font-bold text-gray-900">버스 이용시</h5>
                </div>
                <div className="flex">
                  <div className="flex space-x-1 mr-2">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                      <span>간선 </span>
                      <span className="font-bold">643, 651</span>
                    </div>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                      <span>지선 </span>
                      <span className="font-bold">5528</span>
                    </div>
                    <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs">
                      <span>일반 </span>
                      <span className="font-bold">388</span>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900 mr-2">가산디지털단지역</div>
                  <div className="w-px bg-gray-300 h-3 mt-1.5 mr-2"></div>
                  <div className="text-gray-600">가산디지털단지역 입구 정류장 하차</div>
                </div>
              </article>

              {/* 자가용 */}
              <article className="pb-6">
                <div className="mb-4">
                  <h5 className="text-lg font-bold text-gray-900">자가용 이용시</h5>
                </div>
                <div className="flex">
                  <div className="font-semibold text-gray-900 mr-2">대륭포스트 타워 5차</div>
                  <div className="w-px bg-gray-300 h-3 mt-1.5 mr-2"></div>
                  <div className="text-gray-600">네비게이션 '대륭포스트 타워 5차'로 설정</div>
                </div>
              </article>
            </div>

            {/* 모바일 버전 - 반응형 레이아웃 */}
            <div className="lg:hidden mt-8 sm:mt-12 px-4 sm:px-6 lg:px-12 space-y-6 sm:space-y-8">
              {/* 지하철 */}
              <article className="pb-6 border-b border-dashed border-gray-300">
                <div className="mb-3 sm:mb-4 text-center sm:text-left">
                  <h5 className="text-base sm:text-lg font-bold text-gray-900">지하철 이용시</h5>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 items-center sm:items-start">
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <div className="flex space-x-1">
                      <div className="w-6 h-6 bg-[#2B387C] rounded-full flex items-center justify-center">
                        <div className="text-white text-xs font-bold">1</div>
                      </div>
                      <div className="w-6 h-6 bg-[#737E00] rounded-full flex items-center justify-center">
                        <div className="text-white text-xs font-bold">7</div>
                      </div>
                    </div>
                    <div className="font-semibold text-gray-900">가산디지털단지역</div>
                  </div>
                  <div className="hidden sm:block w-px bg-gray-300 h-4"></div>
                  <div className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                    가산디지털단지역 4번 출구 도보 10분
                  </div>
                </div>
              </article>

              {/* 버스 */}
              <article className="pb-6 border-b border-dashed border-gray-300">
                <div className="mb-3 sm:mb-4 text-center sm:text-left">
                  <h5 className="text-base sm:text-lg font-bold text-gray-900">버스 이용시</h5>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4 items-center sm:items-start">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <div className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs">
                      <span>간선 </span>
                      <span className="font-bold">643, 651</span>
                    </div>
                    <div className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs">
                      <span>지선 </span>
                      <span className="font-bold">5528</span>
                    </div>
                    <div className="bg-gray-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs">
                      <span>일반 </span>
                      <span className="font-bold">388</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 items-center sm:items-start">
                    <div className="font-semibold text-gray-900">가산디지털단지역</div>
                    <div className="hidden sm:block w-px bg-gray-300 h-4"></div>
                    <div className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                      가산디지털단지역 입구 정류장 하차
                    </div>
                  </div>
                </div>
              </article>

              {/* 자가용 */}
              <article className="pb-6">
                <div className="mb-3 sm:mb-4 text-center sm:text-left">
                  <h5 className="text-base sm:text-lg font-bold text-gray-900">자가용 이용시</h5>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 items-center sm:items-start">
                  <div className="font-semibold text-gray-900">대륭포스트 타워 5차</div>
                  <div className="hidden sm:block w-px bg-gray-300 h-4"></div>
                  <div className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                    네비게이션 '대륭포스트 타워 5차'로 설정
                  </div>
                </div>
              </article>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-white bg-primary">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
            <div className="flex flex-col items-center gap-2 sm:gap-4">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">내 사업장에 가장 알맞은 관리</div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                전기요금 최적화 지금 시작하세요
              </h2>
            </div>
            <Link href="/?tab=business" className="no-underline">
              <button className="shadow-sm rounded-lg bg-white border border-gray-200 h-12 sm:h-14 flex items-center justify-center py-2 px-6 sm:px-8 gap-2 text-sm sm:text-base md:text-lg text-zinc-800 hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="leading-7 font-medium">문의 하기</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
