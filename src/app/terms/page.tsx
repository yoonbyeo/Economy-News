export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <h1 className="font-display text-3xl font-semibold text-white">이용약관</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">
        본 약관은 이코노미 나우 서비스 이용과 관련된 기본 규칙을 규정합니다.
      </p>
      <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
        <p>1. 서비스는 정보 제공 목적이며 투자 수익을 보장하지 않습니다.</p>
        <p>2. 커뮤니티 글의 책임은 작성자에게 있습니다.</p>
        <p>3. 불법 콘텐츠 및 저작권 침해 게시물은 삭제됩니다.</p>
        <p>4. 문의: support@economy-now.example</p>
      </div>
    </div>
  );
}
