export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-5 py-10">
      <h1 className="font-display text-3xl font-semibold text-white">
        개인정보처리방침
      </h1>
      <p className="mt-4 text-sm text-[var(--muted)]">
        본 서비스는 최소한의 개인정보만을 수집하며, 회원 인증과 커뮤니티 기능
        제공을 위해 Firebase Auth를 사용합니다.
      </p>
      <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
        <p>1. 수집 항목: 이메일, 닉네임(선택), 기본 로그인 정보</p>
        <p>2. 이용 목적: 계정 관리, 커뮤니티 운영, 서비스 개선</p>
        <p>3. 보관 기간: 회원 탈퇴 시 또는 법령 기준에 따라 보관</p>
        <p>4. 문의: support@economy-now.example</p>
      </div>
    </div>
  );
}
