import { MeshGradientComponent } from "@/components/background/mesh-gradient"
import Header from "@/components/header"

export default function About() {
  return (
    <div>
      <Header/>
      {/* 히어로 섹션 - 화면 전체 높이 */}
      <section className="relative h-screen flex items-center justify-center">
        {/* 배경 그라디언트 - 보라색 톤 */}
        <MeshGradientComponent
          colors={[
            "#A68FFF", // 더 연한 보라색\
            "#EBE7FF", // 매우 연한 보라색
            "#583CF2", // 보라색
            "#6D54F9", // 연한 보라색
            "#FFFFFF"
          ]}
          speed={3.0}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 0,
            width: "100%",
            height: "100%",
          }}
        />

        {/* 콘텐츠 */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">메를로랩</h1>
          <p className="text-xl md:text-2xl opacity-90">
            혁신적인 기술로 미래를 만들어갑니다
          </p>
        </div>
      </section>

      
    </div>
  )
}