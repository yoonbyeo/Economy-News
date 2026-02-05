export default function DisclaimerPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <h1 className="font-display text-3xl font-semibold text-white">면책조항</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">
        이코노미 나우는 투자 조언을 제공하지 않습니다. 모든 정보는 참고용이며,
        투자 판단과 책임은 사용자에게 있습니다.
      </p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
        - 매수/매도 지시 및 수익 보장 표현을 제공하지 않습니다.
        <br />- 뉴스 요약은 RSS 기반 스니펫을 재구성한 요약입니다.
        <br />- 원문 전문은 저장/노출하지 않습니다.
      </div>
    </div>
  );
}
