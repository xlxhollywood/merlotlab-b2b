"use client"

import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/typography"

// 홈 CTA: 단일 헤드라인 + 도입 문의 → /contact (docs/renewal/메인.png §6)
export default function HomeCtaSection() {
  const t = useTranslations("home")

  return (
    <section className="w-full bg-primary py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 sm:gap-8">
        <Heading as="h2" variant="section" color="white">
          {t.rich("ctaQuestion", { br: () => <br /> })}
        </Heading>
        <Button asChild variant="pill" size="xl" >
          <Link href="/contact">
            {t("ctaButton")}
            <ArrowRight className="size-4 sm:size-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
