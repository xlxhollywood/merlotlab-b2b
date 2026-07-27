import { redirect } from "@/i18n/navigation"

// /solutions 는 EMS 솔루션(/solutions/ems)으로 이관됨. 기존 URL·링크 하위호환을 위해 redirect.
export default async function SolutionsIndex({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect({ href: "/solutions/ems", locale })
}
