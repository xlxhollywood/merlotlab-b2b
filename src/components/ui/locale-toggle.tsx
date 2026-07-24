"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "@/i18n/navigation"
import "flag-icons/css/flag-icons.min.css"

// Grid(user-web)의 LanguageToggle 디자인을 재현하되, 동작은 next-intl 서브패스 전환으로 이식.
// - 저장 방식: localStorage(X) → URL locale 전환(O)
// - UI: MUI Popover(X) → Tailwind + lucide ChevronDown + flag-icons(O)
const LANGUAGE_OPTIONS = [
  { value: "ko", labelKey: "korean", flag: "fi-kr" },
  { value: "en", labelKey: "english", flag: "fi-us" },
] as const

const FlagIcon = ({ flag }: { flag: string }) => (
  <span
    aria-hidden
    className="w-6 h-[18px] rounded-[4px] overflow-hidden flex items-center justify-center shrink-0"
  >
    <span className={`fi ${flag} !text-2xl leading-none`} />
  </span>
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
        <FlagIcon flag={current.flag} />
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
                    <FlagIcon flag={o.flag} />
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
