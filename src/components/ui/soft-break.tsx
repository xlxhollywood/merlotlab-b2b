// 반응형 줄바꿈: 모바일/태블릿에선 공백으로 이어 붙이고, lg(데스크톱)에선 줄바꿈.
// 메시지의 `<br></br>` 양옆에 공백이 없어도 모바일에서 단어가 붙지 않도록 공백을 채운다.
export default function SoftBreak() {
  return (
    <>
      <span className="lg:hidden">{" "}</span>
      <br className="hidden lg:inline" />
    </>
  )
}
