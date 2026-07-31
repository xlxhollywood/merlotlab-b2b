"use client"

import { useTranslations } from "next-intl"
import Image from "next/image"
import KakaoMap from "@/components/ui/kakao-map"
import FadeInUp from "@/components/animation/fade-in-up"
import { Heading, Text } from "@/components/ui/typography"

export default function DirectionsSection() {
  const t = useTranslations("about")
  const tCommon = useTranslations("common")

  return (
      <section className="py-16 lg:py-24">
        <FadeInUp delay={300}>
          <div className="text-center mb-16">
            <Heading as="h2" variant="section" className="mb-4">
              {t("directionsTitle")}
            </Heading>
            <Text as="p" variant="subtitle" color="subtle">
              {t("directionsDesc")}
            </Text>
          </div>
        </FadeInUp>

        {/* 지도 */}
        <FadeInUp delay={400}>
          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] bg-gray-100">
            <KakaoMap
              lat={37.480965293745}
              lng={126.88634586912}
              level={3}
              width="100%"
              height="100%"
            />
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
                        alt={tCommon("logoAlt")}
                        src="/images/brand/logo-white.svg"
                        unoptimized
                      />
                      <div className="w-px bg-[#404040] h-32"></div>
                    </div>
                  </div>

                  {/* 상세 정보 섹션 */}
                  <div className="space-y-3 ml-16">
                    <div className="flex">
                      <div className="font-bold text-gray-50 w-20">{t("labelAddress")}</div>
                      <div className="text-zinc-300 ml-2">
                        {t("address")}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="font-bold text-gray-50 w-20">
                        {t("labelHours")}
                      </div>
                      <div className="text-zinc-300 ml-2">
                        {t("hours")}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="font-bold text-gray-50 w-20">{t("labelEmail")}</div>
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
                      <div className="font-bold text-gray-50 w-20">{t("labelPhone")}</div>
                      <div className="text-zinc-300 ml-2">{t("phone")}</div>
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
                      alt={tCommon("logoAlt")}
                      src="/images/brand/logo-white.svg"
                      unoptimized
                    />
                  </div>
                  <div className="hidden sm:block w-px bg-[#404040] h-16 lg:h-32"></div>
                </div>

                {/* 상세 정보 섹션 */}
                <div className="space-y-3 sm:space-y-4 w-full">
                  <div className="flex items-center gap-2 h-12">
                    <div className="font-bold text-gray-50 w-16 flex-shrink-0 h-full items-center p-0">
                      {t("labelAddress")}
                    </div>
                    <div className="text-zinc-300 text-sm sm:text-base leading-relaxed h-full items-center p-0">
                      {t("address")}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 h-6">
                    <div className="font-bold text-gray-50 w-16 flex-shrink-0 items-center p-0">
                      {t("labelHours")}
                    </div>
                    <div className="text-zinc-300 text-sm sm:text-base">
                      {t("hours")}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 h-6">
                    <div className="font-bold text-gray-50 w-16 flex-shrink-0 items-center p-0">
                      {t("labelEmail")}
                    </div>
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
                    <div className="font-bold text-gray-50 w-16 flex-shrink-0 items-center p-0">
                      {t("labelPhone")}
                    </div>
                    <div className="text-zinc-300 text-sm sm:text-base items-center p-0">
                      {t("phone")}
                    </div>
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
                  <h5 className="text-lg font-bold text-gray-900">
                    {t("subwayTitle")}
                  </h5>
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
                  <div className="font-semibold text-gray-900 mr-2">
                    {t("station")}
                  </div>
                  <div className="w-px bg-gray-300 h-3 mt-1.5 mr-2"></div>
                  <div className="text-gray-600">
                    {t("subwayDesc")}
                  </div>
                </div>
              </article>

              {/* 버스 */}
              <article className="pb-6 border-b border-dashed border-gray-300">
                <div className="mb-4">
                  <h5 className="text-lg font-bold text-gray-900">
                    {t("busTitle")}
                  </h5>
                </div>
                <div className="flex">
                  <div className="flex space-x-1 mr-2">
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                      <span>{t("busTrunk")} </span>
                      <span className="font-bold">643, 651</span>
                    </div>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                      <span>{t("busBranch")} </span>
                      <span className="font-bold">5528</span>
                    </div>
                    <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs">
                      <span>{t("busGeneral")} </span>
                      <span className="font-bold">388</span>
                    </div>
                  </div>
                  <div className="font-semibold text-gray-900 mr-2">
                    {t("station")}
                  </div>
                  <div className="w-px bg-gray-300 h-3 mt-1.5 mr-2"></div>
                  <div className="text-gray-600">
                    {t("busDesc")}
                  </div>
                </div>
              </article>

              {/* 자가용 */}
              <article className="pb-6">
                <div className="mb-4">
                  <h5 className="text-lg font-bold text-gray-900">
                    {t("carTitle")}
                  </h5>
                </div>
                <div className="flex">
                  <div className="font-semibold text-gray-900 mr-2">
                    {t("tower")}
                  </div>
                  <div className="w-px bg-gray-300 h-3 mt-1.5 mr-2"></div>
                  <div className="text-gray-600">
                    {t("carDesc")}
                  </div>
                </div>
              </article>
            </div>

            {/* 모바일 버전 - 반응형 레이아웃 */}
            <div className="lg:hidden mt-8 sm:mt-12 px-4 sm:px-6 lg:px-12 space-y-6 sm:space-y-8">
              {/* 지하철 */}
              <article className="pb-6 border-b border-dashed border-gray-300">
                <div className="mb-3 sm:mb-4 text-center sm:text-left">
                  <h5 className="text-base sm:text-lg font-bold text-gray-900">
                    {t("subwayTitle")}
                  </h5>
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
                    <div className="font-semibold text-gray-900">
                      {t("station")}
                    </div>
                  </div>
                  <div className="hidden sm:block w-px bg-gray-300 h-4"></div>
                  <div className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                    {t("subwayDesc")}
                  </div>
                </div>
              </article>

              {/* 버스 */}
              <article className="pb-6 border-b border-dashed border-gray-300">
                <div className="mb-3 sm:mb-4 text-center sm:text-left">
                  <h5 className="text-base sm:text-lg font-bold text-gray-900">
                    {t("busTitle")}
                  </h5>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4 items-center sm:items-start">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <div className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs">
                      <span>{t("busTrunk")} </span>
                      <span className="font-bold">643, 651</span>
                    </div>
                    <div className="bg-green-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs">
                      <span>{t("busBranch")} </span>
                      <span className="font-bold">5528</span>
                    </div>
                    <div className="bg-gray-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs">
                      <span>{t("busGeneral")} </span>
                      <span className="font-bold">388</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 items-center sm:items-start">
                    <div className="font-semibold text-gray-900">
                      {t("station")}
                    </div>
                    <div className="hidden sm:block w-px bg-gray-300 h-4"></div>
                    <div className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                      {t("busDesc")}
                    </div>
                  </div>
                </div>
              </article>

              {/* 자가용 */}
              <article className="pb-6">
                <div className="mb-3 sm:mb-4 text-center sm:text-left">
                  <h5 className="text-base sm:text-lg font-bold text-gray-900">
                    {t("carTitle")}
                  </h5>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 items-center sm:items-start">
                  <div className="font-semibold text-gray-900">
                    {t("tower")}
                  </div>
                  <div className="hidden sm:block w-px bg-gray-300 h-4"></div>
                  <div className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
                    {t("carDesc")}
                  </div>
                </div>
              </article>
            </div>
          </FadeInUp>
        </div>
      </section>
  )
}
