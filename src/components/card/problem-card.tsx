

export default function ProblemCards() {
  return (
    <div className="absolute inset-0 z-10">
      {/* Problem 1 - macOS Style Alert */}
      <div className="absolute top-[-40px] left-16 w-[400px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 animate-fade-in-up opacity-0 [animation-delay:1.2s] [animation-fill-mode:forwards]">
        {/* macOS Window Controls */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-600 text-sm font-medium">WARNING</div>
          <div className="w-6"></div>
        </div>
        <div className="p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src="/warn.png"
              alt="경고 아이콘"
            />
          </div>
          <div className="flex-1 text-gray-700 text-base leading-6">
            <p className="m-0 font-medium">예측 없이 사용하는 설비 전력으로 불필요한</p>
            <p className="m-0 font-medium">에너지 비용이 지속적으로 발생</p>
          </div>
        </div>
      </div>

      {/* Problem 2 - macOS Style Alert */}
      <div className="absolute top-[173px] right-20 w-[400px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 animate-fade-in-up opacity-0 [animation-delay:1.9s] [animation-fill-mode:forwards]">
        {/* macOS Window Controls */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-600 text-sm font-medium">WARNING</div>
          <div className="w-6"></div>
        </div>
        <div className="p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src="/warn.png"
              alt="경고 아이콘"
            />
          </div>
          <div className="text-gray-700 text-base leading-6">
            <p className="m-0 font-medium">이상 상황 발생 시, 인력 의존적 대응으로</p>
            <p className="m-0 font-medium">조치의 낮은 효율성과 어려움</p>
          </div>
        </div>
      </div>

      {/* Problem 3 - macOS Style Alert */}
      <div className="absolute bottom-[-40px] left-[280px] w-[400px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 animate-fade-in-up opacity-0 [animation-delay:2.7s] [animation-fill-mode:forwards]">
        {/* macOS Window Controls */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-600 text-sm font-medium">WARNING</div>
          <div className="w-6"></div>
        </div>
        <div className="p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src="/warn.png"
              alt="경고 아이콘"
            />
          </div>
          <div className="text-gray-700 text-base leading-6">
            <p className="m-0 font-medium">계약전력 초과, 피크 시간 사용 등</p>
            <p className="m-0 font-medium">요금 체계에 대한 무지로 불필요 비용 발생</p>
          </div>
        </div>
      </div>
    </div>
  )
}
