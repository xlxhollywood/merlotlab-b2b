"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"

// Grid(user-web)의 LanguageToggle 디자인을 재현하되, 동작은 next-intl 서브패스 전환으로 이식.
// - 저장 방식: localStorage(X) → URL locale 전환(O)
// - 국기: flag-icons 패키지(260여 개국 CSS) 대신 kr·us 2개만 인라인 SVG(data URI 배경)로 → 번들 축소.
const FLAG_SVG: Record<string, string> = {
  kr: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 640 480"><defs><clipPath id="kr-a"><path fill-opacity=".7" d="M-95.8-.4h682.7v512H-95.8z"/></clipPath></defs><g fill-rule="evenodd" clip-path="url(#kr-a)" transform="translate(89.8 .4)scale(.9375)"><path fill="#fff" d="M-95.8-.4H587v512H-95.8Z"/><g transform="rotate(-56.3 361.6 -101.3)scale(10.66667)"><g id="kr-c"><path id="kr-b" fill="#000001" d="M-6-26H6v2H-6Zm0 3H6v2H-6Zm0 3H6v2H-6Z"/><use xlink:href="#kr-b" width="100%" height="100%" y="44"/></g><path stroke="#fff" d="M0 17v10"/><path fill="#cd2e3a" d="M0-12a12 12 0 0 1 0 24Z"/><path fill="#0047a0" d="M0-12a12 12 0 0 0 0 24A6 6 0 0 0 0 0Z"/><circle cy="-6" r="6" fill="#cd2e3a"/></g><g transform="rotate(-123.7 191.2 62.2)scale(10.66667)"><use xlink:href="#kr-c" width="100%" height="100%"/><path stroke="#fff" d="M0-23.5v3M0 17v3.5m0 3v3"/></g></g></svg>',
  us: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><path fill="#bd3d44" d="M0 0h640v480H0"/><path stroke="#fff" stroke-width="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/><path fill="#192f5d" d="M0 0h364.8v258.5H0"/><marker id="us-a" markerHeight="30" markerWidth="30"><path fill="#fff" d="m14 0 9 27L0 10h28L5 27z"/></marker><path fill="none" marker-mid="url(#us-a)" d="m0 0 16 11h61 61 61 61 60L47 37h61 61 60 61L16 63h61 61 61 61 60L47 89h61 61 60 61L16 115h61 61 61 61 60L47 141h61 61 60 61L16 166h61 61 61 61 60L47 192h61 61 60 61L16 218h61 61 61 61 60z"/></svg>',
}

const LANGUAGE_OPTIONS = [
  { value: "ko", labelKey: "korean", code: "kr" },
  { value: "en", labelKey: "english", code: "us" },
] as const

const FlagIcon = ({ code }: { code: "kr" | "us" }) => (
  <span
    aria-hidden
    className="w-6 h-[18px] rounded-[4px] shrink-0 bg-center bg-cover"
    style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(FLAG_SVG[code])}")` }}
  />
)

export default function LocaleToggle() {
  const t = useTranslations("language")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const current =
    LANGUAGE_OPTIONS.find((o) => o.value === locale) ?? LANGUAGE_OPTIONS[0]

  const change = (next: string) => {
    setOpen(false)
    if (next === locale) return
    // 현재 경로 유지하며 locale만 교체 (usePathname은 locale 접두어가 제거된 경로를 반환)
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={t("toggleLanguage")}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 bg-gray-500/[0.08] hover:bg-gray-500/[0.16] transition-colors"
      >
        <FlagIcon code={current.code} />
        <span className="hidden sm:inline text-[13px] font-semibold uppercase text-gray-500 leading-none">
          {locale === "ko" ? "KO" : "EN"}
        </span>
        <ChevronDown className="w-[18px] h-[18px] text-gray-400 -ml-0.5" />
      </button>

      {open && (
        <>
          {/* 바깥 클릭 시 닫기 */}
          <div
            className="fixed inset-0 z-[1100]"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <ul
            role="listbox"
            className="absolute right-0 mt-2.5 min-w-[120px] rounded-[10px] bg-white p-1 z-[1200] shadow-[0_0_2px_0_rgba(145,158,171,0.24),0_20px_40px_-4px_rgba(145,158,171,0.24)]"
          >
            {LANGUAGE_OPTIONS.map((o) => {
              const selected = o.value === locale
              return (
                <li key={o.value} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => change(o.value)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-left transition-colors hover:bg-gray-500/[0.08] ${
                      selected ? "font-semibold" : "font-normal"
                    }`}
                  >
                    <FlagIcon code={o.code} />
                    <span>{t(o.labelKey)}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
