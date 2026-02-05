"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthPanel from "@/components/AuthPanel";

const navItems = [
  { href: "/", label: "홈" },
  { href: "/news", label: "뉴스" },
  { href: "/stocks/KRX:005930", label: "종목" },
  { href: "/ask", label: "투자 고민" },
  { href: "/about", label: "소개" },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0b0f16]/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)]/20 text-lg font-bold text-[var(--accent)]">
            EN
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">
              이코노미 나우
            </p>
            <p className="text-xs text-[var(--muted)]">
              한국·세계 경제 뉴스 & 종목 커뮤니티
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 text-sm font-medium text-[var(--muted)] md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 transition ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <AuthPanel />
      </div>
    </header>
  );
}
