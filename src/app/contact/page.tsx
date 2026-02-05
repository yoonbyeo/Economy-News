export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <h1 className="font-display text-3xl font-semibold text-white">문의</h1>
      <p className="mt-4 text-sm text-[var(--muted)]">
        서비스 문의는 아래 메일로 연락해주세요.
      </p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
        문의 이메일: support@economy-now.example
      </div>
    </div>
  );
}
