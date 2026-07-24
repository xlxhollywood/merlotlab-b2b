// app/studio/layout.tsx
// Sanity Studio 전용 루트 레이아웃 (비-로컬라이즈드).
// [locale] 라우팅으로 이전하며 공용 app/layout.tsx를 제거했기 때문에,
// studio는 자체 <html>/<body>를 갖는 별도 루트 레이아웃이 필요하다.
export default function StudioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
