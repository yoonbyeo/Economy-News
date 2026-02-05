import type { Metadata } from "next";
import { Noto_Sans_KR, Space_Grotesk } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "이코노미 나우 | 한국·세계 경제 뉴스와 종목 커뮤니티",
    template: "%s | 이코노미 나우",
  },
  description:
    "한국과 글로벌 경제 뉴스를 분리 제공하고, 종목별 커뮤니티와 투자 고민 정리를 돕는 정보 플랫폼.",
  keywords: [
    "경제뉴스",
    "주식",
    "한국경제",
    "글로벌경제",
    "종목커뮤니티",
    "투자 고민",
  ],
  openGraph: {
    title: "이코노미 나우",
    description:
      "한국/글로벌 경제 뉴스를 분리 제공하고 종목 커뮤니티를 지원하는 정보 중심 플랫폼.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${notoSansKr.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <TopNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
