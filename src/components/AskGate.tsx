"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import AskForm from "@/components/AskForm";

export default function AskGate() {
  const [isReady, setIsReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setIsAuthed(Boolean(user));
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
        로그인 상태를 확인 중입니다.
      </div>
    );
  }

  if (!isAuthed) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6 text-sm text-[var(--muted)]">
        투자 고민 정리 기능은 로그인 후 이용할 수 있습니다.
      </div>
    );
  }

  return <AskForm />;
}
