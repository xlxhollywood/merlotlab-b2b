// IR 페이지 공통 전체화면 중앙 메시지(로딩 / 없음 등).
export default function IrMessage({ text }: { text: string }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-gray-500">{text}</div>
    </div>
  );
}
