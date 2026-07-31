"use client"

import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/typography"

// eyebrow + heading 2줄형 CTA 밴드 (tech/ems/rtls 공용). 문구는 props로 받아 재사용.
export default function CtaBand({
  eyebrow,
  heading,
  buttonLabel,
  href,
}: {
  eyebrow?: string
  heading: string
  buttonLabel: string
  href: string
}) {
  return (
    <section className="w-full bg-primary py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center text-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-5 sm:gap-6">
        {eyebrow && <p className="text-xl sm:text-4xl font-bold text-white/90">{eyebrow}</p>}
        <Heading as="h2" variant="section" color="white">{heading}</Heading>
        <Button asChild variant="pill" size="xl">
          <Link href={href}>
            {buttonLabel}
            <ArrowRight className="size-4 sm:size-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
