import Image from "next/image"
import { DollarSign, Lightbulb, TrendingDown } from "lucide-react"

interface ExpandingCardProps {
  title: string
  description: string
  image?: string
  icon?: "dollar" | "lightbulb" | "trending-down"
  iconColor?: string
  bgColor?: string
}

export default function ExpandingCard({
  title,
  description,
  image,
  icon = "dollar",
  iconColor = "text-green-600",
  bgColor = "bg-green-100",
}: ExpandingCardProps) {
  const IconComponent = {
    dollar: DollarSign,
    lightbulb: Lightbulb,
    "trending-down": TrendingDown,
  }[icon]

  return (
    <div className="flex h-[400px] flex-col items-center overflow-hidden rounded-lg border-2 border-gray-200 text-center shadow-lg lg:h-[560px]">
      <div className="flex w-48 shrink-0 flex-col items-center justify-center px-3 py-4 md:w-60 lg:w-auto lg:py-10">
        <div className={`w-12 h-12 relative mb-3 ${bgColor} rounded-full flex items-center justify-center`}>
          <IconComponent className={`w-6 h-6 ${iconColor}`} />
        </div>
        <h6 className="mt-4 font-medium text-balance">{title}</h6>
        <span className="inline-block mt-2 text-gray-700">{description}</span>
      </div>
      <Image
        src={image || "/placeholder.svg?height=400&width=343"}
        className="w-full grow object-cover"
        alt={title}
        width={343}
        height={400}
        quality={100}
        priority
      />
    </div>
  )
}
