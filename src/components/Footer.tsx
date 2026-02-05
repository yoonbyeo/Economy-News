import Link from "next/link";

const items = [
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의" },
  { href: "/privacy-policy", label: "개인정보처리방침" },
  { href: "/terms", label: "이용약관" },
  { href: "/disclaimer", label: "면책조항" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0b0f16]/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-base font-semibold text-white">
            이코노미 나우
          </p>
          <p className="mt-1 text-xs">
            경제 뉴스 요약 및 종목 커뮤니티. 투자 조언이 아닌 정보 제공 목적의
            서비스입니다.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 text-xs">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
