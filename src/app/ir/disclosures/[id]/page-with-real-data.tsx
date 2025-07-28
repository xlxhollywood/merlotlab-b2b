"use client"

import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useState } from "react"
import {
  getDisclosure,
  getPrevDisclosure,
  getNextDisclosure,
  type Disclosure,
  type NavigationItem, // 이 줄 추가
} from "@/sanity/lib/sanity"
import { useParams } from "next/navigation"
import { useEffect } from "react"

// Titillium Web 폰트 import
import { Titillium_Web } from "next/font/google"

const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  variable: "--font-titillium-web",
})

export default function IRDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [activeTab, setActiveTab] = useState("disclosure")
  const [disclosure, setDisclosure] = useState<Disclosure | null>(null)
  const [loading, setLoading] = useState(true)
  const [prevDisclosure, setPrevDisclosure] = useState<NavigationItem | null>(null)
  const [nextDisclosure, setNextDisclosure] = useState<NavigationItem | null>(null)

  useEffect(() => {
    async function fetchDisclosure() {
      console.log("params.id:", params.id)
      if (params.id) {
        try {
          console.log("Fetching disclosure...")
          const data = await getDisclosure(params.id as string)
          console.log("Fetched data:", data)
          setDisclosure(data)

          // 실제 이전글/다음글 가져오기
          if (data) {
            const [prev, next] = await Promise.all([
              getPrevDisclosure(params.id as string, data.date),
              getNextDisclosure(params.id as string, data.date),
            ])

            setPrevDisclosure(prev)
            setNextDisclosure(next)
          }
        } catch (error) {
          console.error("Error fetching disclosure:", error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchDisclosure()
  }, [params.id])

  const handleAnnouncementClick = () => {
    router.push("/ir/notices")
  }

  const handleBackToList = () => {
    router.push("/ir/disclosures")
  }

  const handlePrevDisclosure = () => {
    if (prevDisclosure) {
      router.push(`/ir/disclosures/${prevDisclosure._id}`) // id → _id
    }
  }

  const handleNextDisclosure = () => {
    if (nextDisclosure) {
      router.push(`/ir/disclosures/${nextDisclosure._id}`) // id → _id
    }
  }

  // 나머지 코드는 동일...
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">로딩 중...</div>
      </div>
    )
  }

  if (!disclosure) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">공고를 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 기존 Hero Section과 Main Content는 동일 */}
      {/* ... */}

      <Footer />
    </div>
  )
}
