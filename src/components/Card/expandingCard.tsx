import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Lightbulb, TrendingDown } from "lucide-react"

interface ExpandingCardProps {
  title: string
  description: string
  image: string
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
    <Card className="w-[346.7px] h-[560px] shadow-lg border-2 border-gray-200 rounded-[10px] overflow-hidden">
      <CardContent className="flex flex-col h-full p-0">
        <div className="flex flex-col items-center justify-center p-10">
          <div className={`w-12 h-12 relative mb-4 ${bgColor} rounded-full flex items-center justify-center`}>
            <IconComponent className={`w-6 h-6 ${iconColor}`} />
          </div>
          <h3 className="text-xl font-medium text-gray-800 text-center mb-2">{title}</h3>
          <p className="text-gray-700 text-center text-sm whitespace-nowrap">{description}</p>
        </div>
        <Image
          className="w-full flex-1 object-cover"
          width={343}
          height={368}
          alt={title}
          src={image || "/placeholder.svg?height=368&width=343"}
        />
      </CardContent>
    </Card>
  )
}
