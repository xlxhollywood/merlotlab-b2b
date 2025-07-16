import { MeshGradientComponent } from "@/components/background/mesh-gradient"
import Header from "@/components/header"
import Timeline from "@/components/card/timeline"
import Footer from "@/components/footer"

export default function About() {
  return (
    <div>
      <Header/>
      {/* 
      <section className="relative h-screen flex items-center justify-center">
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

        <div className="relative z-10 text-center text-white">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">에너지 절감의</h1>
          </div>
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">새로운 기준을 만듭니다</h1>
          </div>
        </div>
      </section>
      */}
      {/* 타임라인 섹션 */}
      <Timeline />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}