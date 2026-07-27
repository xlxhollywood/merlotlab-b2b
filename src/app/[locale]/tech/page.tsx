import { getTranslations } from "next-intl/server"

// placeholder — 03-tech 스텝에서 실제 기술소개 페이지로 교체.
export default async function TechPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "nav" })
  const tc = await getTranslations({ locale, namespace: "common" })
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-700">{t("tech")}</h1>
      <p className="text-gray-500">{tc("comingSoon")}</p>
    </div>
  )
}
