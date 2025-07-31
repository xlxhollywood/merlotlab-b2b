import { Titillium_Web } from "next/font/google"

// Titillium Web 폰트 import
const titilliumWeb = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
  variable: "--font-titillium-web",
})

export default function IrHero() {
  return (
    <section className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>
      {/* White Gradient Overlay - 아래에서 위로 올라오는 그라디언트 */}
      <div className="absolute inset-x-0 bottom-0 h-1/6 bg-gradient-to-t from-white via-white/60 via-white/30 to-transparent z-10 pointer-events-none" />
      {/* Content */}
      <div className="relative z-20 max-w-[1510px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center pb-8">
        <div className="text-start">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-[#333132] ${titilliumWeb.className}`}
          >
            IR
            <span className="inline-block w-1 h-1 sm:w-2 sm:h-2 rounded-full bg-primary align-baseline translate-y-[2px] ml-0.5 mr-0.4 sm:ml-1 sm:mr-1" />
            <span className="text-[#605d5f]">Center</span>
          </h1>
        </div>
      </div>
    </section>
  )
}
