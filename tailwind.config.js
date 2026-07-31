/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#583CF2",
          50: "#F4F2FF",
          100: "#E9E4FF",
          200: "#D4CAFF",
          300: "#BEB0FF",
          400: "#A996FF",
          500: "#947CFF",
          600: "#583CF2",
          700: "#4A2FE0",
          800: "#3C22CE",
          900: "#2E15BC",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 디자인 시스템 콘텐츠(텍스트) 컬러 — Figma 실측 쿨그레이(Toss류). 신규 토큰(Tailwind gray 미오버라이드).
        content: {
          DEFAULT: "#333D4B", // 제목·강조 (≈gray-800)
          strong: "#191F28", // 최강조 (≈gray-900)
          muted: "#4E5968", // 본문 (≈gray-600)
          subtle: "#6B7684", // 부제·설명 (≈gray-500)
          faint: "#8B95A1", // 힌트·메타 (≈gray-400, AA 미달이라 소형/장식 한정)
        },
        line: "#E5E8EB", // 구분선·테두리 (≈gray-200)
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F2F4F6", // 섹션 교대 배경 (≈gray-50)
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),
            require('tailwind-scrollbar-hide')],
}