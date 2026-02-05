"use client";

import { useState } from "react";
import { AskResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/client";

const RISK_MAP: Record<string, string[]> = {
  보수적: ["손실 허용 범위를 명확히 기록", "현금 비중 점검", "변동성 큰 이벤트 체크"],
  중립적: ["기술/실적 지표 균형 점검", "손익비 목표 설정", "리스크 이벤트 일정 확인"],
  공격적: ["레버리지·변동성 노출 평가", "손절 기준 사전 정의", "유동성 리스크 체크"],
};

export default function AskForm() {
  const [symbol, setSymbol] = useState("");
  const [period, setPeriod] = useState("중기(3~12개월)");
  const [risk, setRisk] = useState("중립적");
  const [content, setContent] = useState("");
  const [result, setResult] = useState<AskResult | null>(null);

  const handleSubmit = async () => {
    const checklist = RISK_MAP[risk] ?? RISK_MAP["중립적"];
    const summary = `관심 종목 ${symbol || "미지정"}에 대해 ${period} 관점으로 고민 중이며, 리스크 성향은 ${risk}입니다. 고민 내용은 핵심 변수와 타임라인을 다시 정리할 필요가 있습니다.`;
    const nextResult: AskResult = {
      summary,
      checklist,
      bullScenario: [
        "실적/지표가 기대치를 상회하며 센티먼트 개선",
        "정책/금리 환경이 우호적으로 전개",
        "관련 섹터 수급이 유입되며 밸류에이션 재평가",
      ],
      bearScenario: [
        "매크로 지표 둔화로 실적 추정치 하향",
        "정책 불확실성 확대 및 변동성 증가",
        "리스크 이벤트 발생 시 유동성 위축",
      ],
    };
    setResult(nextResult);

    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "asks"), {
        userId: user.uid,
        symbol,
        period,
        risk,
        content,
        result: nextResult,
        createdAt: serverTimestamp(),
      });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
      <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6">
        <h2 className="font-display text-xl font-semibold text-white">
          고민 입력
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          매수/매도 지시가 아닌, 생각을 구조화하기 위한 입력입니다.
        </p>
        <div className="mt-4 grid gap-4">
          <div>
            <label className="text-xs text-[var(--muted)]">관심 종목</label>
            <input
              value={symbol}
              onChange={(event) => setSymbol(event.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm"
              placeholder="예: KRX:005930"
            />
          </div>
          <div>
            <label className="text-xs text-[var(--muted)]">투자 기간</label>
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm"
            >
              <option>단기(1~3개월)</option>
              <option>중기(3~12개월)</option>
              <option>장기(1년 이상)</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-[var(--muted)]">리스크 성향</label>
            <select
              value={risk}
              onChange={(event) => setRisk(event.target.value)}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm"
            >
              <option>보수적</option>
              <option>중립적</option>
              <option>공격적</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-[var(--muted)]">고민 내용</label>
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={5}
              className="mt-1 w-full rounded-xl border border-white/10 bg-[#0b1220] px-3 py-2 text-sm"
              placeholder="고민의 핵심 변수, 기대와 우려 요인을 적어주세요."
            />
          </div>
          <Button type="button" onClick={handleSubmit}>
            고민 정리 시작
          </Button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6">
        <h2 className="font-display text-xl font-semibold text-white">
          고민 정리 결과
        </h2>
        {result ? (
          <div className="mt-4 space-y-4 text-sm">
            <div>
              <p className="text-xs text-[var(--muted)]">요약</p>
              <p className="mt-1 text-[var(--foreground)]">{result.summary}</p>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">리스크 체크리스트</p>
              <ul className="mt-2 space-y-2 text-[var(--foreground)]">
                {result.checklist.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Bull 시나리오</p>
              <ul className="mt-2 space-y-2 text-[var(--foreground)]">
                {result.bullScenario.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-[var(--muted)]">Bear 시나리오</p>
              <ul className="mt-2 space-y-2 text-[var(--foreground)]">
                {result.bearScenario.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-dashed border-white/10 p-3 text-xs text-[var(--muted)]">
              이 결과는 투자 조언이 아닌 생각 정리 보조 도구입니다. 결정은 사용자
              책임입니다.
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-[var(--muted)]">
            입력을 완료하면 고민 정리 결과가 표시됩니다.
          </p>
        )}
      </div>
    </div>
  );
}
