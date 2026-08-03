import { permanentRedirect } from "@/i18n/navigation"

// /solutions 는 EMS 솔루션(/solutions/ems)으로 이관됨. 기존 URL·링크 하위호환을 위해 영구 리다이렉트(308).
// 임시(307)면 구글이 색인을 이관하지 않으므로 permanentRedirect 사용.
export default async function SolutionsIndex({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  permanentRedirect({ href: "/solutions/ems", locale })
}
