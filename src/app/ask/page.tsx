import AskGate from "@/components/AskGate";

export default function AskPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <div>
      <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
        고민 정리
      </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-white">
          투자 고민 정리
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          매수/매도 지시 없이 사고를 구조화하는 도구입니다.
        </p>
      </div>
      <div className="mt-6">
        <AskGate />
      </div>
    </div>
  );
}
