import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-4xl font-semibold text-white">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        주소를 다시 확인하거나 홈으로 이동해주세요.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[#04101b]"
      >
        홈으로
      </Link>
    </div>
  );
}
