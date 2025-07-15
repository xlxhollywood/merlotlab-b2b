"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Warehouse, Factory, Car, Building2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface BusinessType {
  id: string
  title: string
  description: string
  image: string
  icon: React.ReactNode
}

export default function FeaturedGrid() {
  const [selectedType, setSelectedType] = useState<string>("logistics")

  const businessTypes: BusinessType[] = [
    {
      id: "logistics",
      title: "물류 센터",
      description: "대규모 창고와 물류 시설을 위한 스마트 조명 솔루션으로 운영 효율성을 극대화하세요",
      image: "/image 70.png",
      icon: <Warehouse className="w-5 h-5" />,
    },
    {
      id: "manufacturing",
      title: "제조 시설",
      description: "생산성 향상을 위한 정밀한 조명 환경 구축",
      image: "/image 69.png",
      icon: <Factory className="w-5 h-5" />,
    },
    {
      id: "parking",
      title: "주차장",
      description: "보안과 편의성을 동시에 제공하는 스마트 주차장 조명",
      image: "/image 75.png",
      icon: <Car className="w-5 h-5" />,
    },
    {
      id: "office",
      title: "사무실",
      description: "직원 만족도와 업무 효율성을 높이는 오피스 조명",
      image: "/image 74.png",
      icon: <Building2 className="w-5 h-5" />,
    },
  ]

  const featuredType = businessTypes.find((type) => type.id === selectedType) || businessTypes[0]
  const sideTypes = businessTypes.filter((type) => type.id !== selectedType)

  return (
    
      <div className="max-w-6xl mx-auto">
        {/* Featured Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Card - Large */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              <div className="aspect-video relative">
                <Image
                  src={featuredType.image || "/placeholder.svg"}
                  alt={featuredType.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: "#583CF2" }}>{featuredType.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-900">{featuredType.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">{featuredType.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Side Cards - Small */}
          <div className="space-y-6">
            {sideTypes.map((type) => (
              <Card
                key={type.id}
                className={`border transition-all duration-200 cursor-pointer ${
                  selectedType === type.id
                    ? "border-[#583CF2] shadow-md"
                    : "border-gray-200 hover:border-[#583CF2] hover:shadow-md"
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="w-16 h-12 relative flex-shrink-0 rounded overflow-hidden">
                      <Image src={type.image || "/placeholder.svg"} alt={type.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span style={{ color: "#583CF2" }}>{type.icon}</span>
                        <h3 className="font-medium text-gray-900 text-sm">{type.title}</h3>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2">{type.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    
  )
}
