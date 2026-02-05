export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <h1 className="font-display text-3xl font-semibold text-white">소개</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">
        이코노미 나우는 한국과 글로벌 경제 뉴스를 분리 제공하고, 종목별
        커뮤니티와 투자 고민 정리 기능을 제공하는 정보 중심 플랫폼입니다.
      </p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
        - 뉴스 전문을 저장하지 않으며 요약과 링크만 제공합니다.
        <br />- 투자 판단을 돕기 위한 사고 정리 목적의 서비스입니다.
      </div>
    </div>
  );
}
