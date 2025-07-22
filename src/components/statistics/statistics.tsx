"use client"

import { CountUp } from "@/components/animation/count-up"

export interface Statistic {
  label: string
  value: number
  unit: string
  description: string
  decimals?: number
}

interface StatisticsProps {
  stats: Statistic[]
  duration?: number
}

export default function Statistics({ stats, duration = 2500 }: StatisticsProps) {
  return (
    <div className="grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-6 sm:gap-y-8 text-center md:grid-cols-4 mt-12 sm:mt-16 md:mt-20">
      {stats.map((stat, index) => (
        <div key={index} className="flex flex-col items-center">
          <span className="text-center font-medium text-gray-500 text-xs sm:text-sm">{stat.label}</span>
          <div className="text-xl sm:text-2xl md:text-3xl flex items-center justify-center mt-1 sm:mt-2 w-full font-bold text-gray-700">
            <CountUp end={stat.value} duration={duration} />
            <span className="font-inherit ml-1">{stat.unit}</span>
          </div>
          <span className="text-xs sm:text-sm mt-1 text-center text-gray-400">{stat.description}</span>
        </div>
      ))}
    </div>
  )
}