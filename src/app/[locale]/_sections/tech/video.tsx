"use client"

import { useState } from "react"
import { flushSync } from "react-dom"
import Image from "next/image"
import { Play } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import FadeInUp from "@/components/animation/fade-in-up"

// 기술 소개 영상 ID (로케일별)
const VIDEO_ID: Record<string, string> = {
  ko: "JWa9QTN-gUE",
  en: "GjCbFwqHvaI",
}

// 기술 소개 영상 섹션 (docs/renewal/기술.png §2)
export default function TechVideo() {
  const t = useTranslations("tech")
  const locale = useLocale()
  const videoId = VIDEO_ID[locale] ?? VIDEO_ID.ko
  const [playing, setPlaying] = useState(false)

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <FadeInUp delay={200}>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">{t("videoTitle")}</h2>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-500">{t("videoSubtitle")}</p>
          </div>
        </FadeInUp>

        <FadeInUp delay={300}>
          <div className="mt-10 sm:mt-12 relative mx-auto w-full max-w-[820px] aspect-[1036/571] overflow-hidden rounded-xl bg-black">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1`}
                title={t("videoTitle")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => flushSync(() => setPlaying(true))}
                aria-label={t("videoTitle")}
                className="group absolute inset-0 h-full w-full cursor-pointer"
              >
                <Image
                  src="/images/tech/2-youtube.webp"
                  alt={t("videoTitle")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 820px) 100vw, 820px"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-white/85 shadow-lg transition-transform group-hover:scale-105">
                    <Play className="h-7 w-7 sm:h-8 sm:w-8 text-primary fill-primary translate-x-0.5" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
