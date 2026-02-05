import SectionHeader from "@/components/SectionHeader";
import NewsCarousel from "@/components/NewsCarousel";
import { getNewsByRegion } from "@/lib/news";

export default async function Home() {
  const [krNews, globalNews] = await Promise.all([
    getNewsByRegion("KR", 10),
    getNewsByRegion("GLOBAL", 10),
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <section className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            경제 인사이트
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
            한국과 글로벌 경제 흐름을
            <br />
            분리해서 빠르게 파악하세요.
          </h1>
          <p className="mt-4 text-sm text-[var(--muted)]">
            카드형 뉴스 요약, 종목 커뮤니티, 투자 고민 정리를 한 곳에서.
            원문 전문 저장 없이 안전한 방식으로 업데이트됩니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs text-[var(--muted)]">
            <span className="rounded-full border border-white/10 px-3 py-2">
              한국/세계 분리 피드
            </span>
            <span className="rounded-full border border-white/10 px-3 py-2">
              종목 커뮤니티 토론
            </span>
            <span className="rounded-full border border-white/10 px-3 py-2">
              투자 고민 정리 도구
            </span>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-[var(--surface)] p-6">
          <p className="text-sm font-semibold">오늘의 키포인트</p>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            <li>- 한국/글로벌 뉴스 흐름을 지역별로 정렬</li>
            <li>- 종목별 토론과 뉴스 연결</li>
            <li>- 투자 판단 대신 사고 정리 지원</li>
          </ul>
          <div className="mt-6 rounded-2xl border border-white/10 bg-[#0b1220] p-4 text-xs text-[var(--muted)]">
            로그인 없이 열람 가능 · 작성/반응은 로그인 필요
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <SectionHeader
          title="한국 주요 뉴스"
          description="국내 경제 흐름을 최신순으로 확인합니다."
        />
        <NewsCarousel items={krNews} />
      </section>

      <section className="mt-12 space-y-4">
        <SectionHeader
          title="세계 주요 뉴스"
          description="미국 중심 글로벌 경제 뉴스를 정리합니다."
        />
        <NewsCarousel items={globalNews} />
      </section>
    </div>
  );
}
