"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

const items = [
  { image: "/images/icons/network-cable.png", key: "1" },
  { image: "/images/icons/flash.png", key: "2" },
  { image: "/images/icons/gear-white.png", key: "3" },
  { image: "/images/icons/eco.png", key: "4" },
]

export default function FloatingCards() {
  const t = useTranslations("strengths")
  const hl = (chunks: React.ReactNode) => (
    <span className="text-primary">{chunks}</span>
  )
  const br = () => <br />

  return (
    <div className="max-w-[1550px] mx-auto px-6">
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .float-1 {
          animation: float 3s ease-in-out infinite;
        }
        .float-2 {
          animation: float 3s ease-in-out infinite;
        }
        .float-3 {
          animation: float 3s ease-in-out infinite;
        }
        .float-4 {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div key={index} className="group transition-all duration-300 p-2">
            <div className="flex flex-col items-center text-center ">
              <div className={`mb-10 float-${index + 1}`}>
                <Image
                  src={item.image || "/images/placeholder.svg"}
                  alt={t(`alt${item.key}`)}
                  width={120}
                  height={120}
                  className="w-28 h-28 drop-shadow-lg"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                {t.rich(`title${item.key}`, { hl })}
              </h3>
              <div className="w-3/4 h-0.5 bg-gray-100 my-1 mb-4"></div>
              <p className="text-base text-gray-600 leading-relaxed">
                {t.rich(`desc${item.key}`, { br })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
