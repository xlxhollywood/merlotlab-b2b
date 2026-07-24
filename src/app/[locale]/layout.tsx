// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.merlotlab.com"),
  title: {
    default: "메를로랩",
    template: "%s | 메를로랩",
  },
  description:
    "EMS 솔루션 · 도입 사례 · 회사 소개 · IR Center — 설비 환경 분석부터 현장 최적화된 에너지 운영까지, 절감의 패러다임을 바꿉니다.",
  keywords: [
    "메를로랩",
    "merlotlab",
    "MerlotLab",
    "EMS 솔루션",
    "에너지 관리",
    "도입 사례",
    "IR Center",
    "에너지 최적화",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: "https://www.merlotlab.com",
    siteName: "메를로랩",
    title: "메를로랩 | EMS 솔루션 · 도입 사례 · IR Center",
    description:
      "설비 환경 분석부터 현장 최적화된 에너지 운영까지, 절감의 패러다임을 바꿉니다.",
    images: [{ url: "/favicon.png", width: 1200, height: 630, alt: "메를로랩" }],
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "메를로랩 | EMS 솔루션 · 도입 사례 · IR Center",
    description:
      "설비 환경 분석부터 현장 최적화된 에너지 운영까지, 절감의 패러다임을 바꿉니다.",
    images: ["/favicon.png"],
  },
  robots: { index: true, follow: true }
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // 정적 렌더링을 위해 요청 locale 설정
  setRequestLocale(locale);

  return (
    <html lang={locale}>
        <head>
        <meta
          name="google-site-verification"
          content="NKQOJg90j72zxiMiwFdrHaYZOgX5mOYIN6LoRFZcC80"
        />
        <meta
          name="naver-site-verification"
          content="a3ea98909496dc26ff2182b47e9aaf493e2c217a"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
