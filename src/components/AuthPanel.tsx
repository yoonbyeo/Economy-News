"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/client";
import { Button } from "@/components/ui/button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function AuthPanel() {
  const [user, setUser] = useState<null | { uid: string; email?: string | null }>(
    null,
  );
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    return onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleGoogle = async () => {
    setError("");
    await signInWithPopup(auth, googleProvider);
    setOpen(false);
  };

  const handleEmailSignIn = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setOpen(false);
    } catch {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        setOpen(false);
      } catch {
        setError("이메일 또는 비밀번호를 확인해주세요.");
      }
    }
  };

  return (
    <div className="relative flex items-center gap-3">
      {user ? (
        <div className="flex items-center gap-3">
          <div className="hidden text-sm text-[var(--muted)] md:block">
            {user.email ?? "로그인됨"}
          </div>
          <Button type="button" variant="outline" onClick={() => signOut(auth)}>
            로그아웃
          </Button>
        </div>
      ) : (
        <Button type="button" onClick={() => setOpen((prev) => !prev)}>
          로그인
        </Button>
      )}

      {open ? (
        <div className="absolute right-0 top-14 w-[280px] rounded-2xl border border-white/10 bg-[var(--surface)] p-4 shadow-xl">
          <p className="text-sm font-semibold">로그인 또는 회원가입</p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            글 작성과 반응은 로그인 후 이용 가능합니다.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full rounded-xl border border-white/10 px-3 py-2 text-sm transition hover:border-white/30"
            >
              Google로 시작하기
            </button>
            <div className="rounded-xl border border-white/10 p-3">
              <label className="text-xs text-[var(--muted)]">이메일</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="mt-1 w-full rounded-lg bg-[#0b1220] px-2 py-1 text-sm"
              />
              <label className="mt-2 block text-xs text-[var(--muted)]">
                비밀번호
              </label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                className="mt-1 w-full rounded-lg bg-[#0b1220] px-2 py-1 text-sm"
              />
              <button
                type="button"
                onClick={handleEmailSignIn}
                className="mt-2 w-full rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
              >
                이메일로 계속
              </button>
            </div>
            {error ? (
              <p className="text-xs text-[var(--danger)]">{error}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
