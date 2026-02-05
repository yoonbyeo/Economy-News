import { NewsItem, PostItem } from "@/lib/types";

export const sampleKrNews: NewsItem[] = [
  {
    id: "kr-001",
    title: "한국은행, 기준금리 동결 기조 유지",
    summary:
      "한국은행이 기준금리를 동결하며 물가 안정과 성장 둔화 사이 균형을 강조했습니다. 금융권은 다음 분기 정책 방향을 주시하고 있습니다.",
    sourceName: "국내경제일보",
    sourceUrl: "https://example.com/kr-001",
    publishedAt: new Date().toISOString(),
    thumbnailUrl: null,
    region: "KR",
    tags: ["금리", "통화정책"],
    symbolKeys: ["KRX:005930", "KRX:000660"],
  },
  {
    id: "kr-002",
    title: "반도체 수출 회복세, 3개월 연속 증가",
    summary:
      "반도체 수출이 3개월 연속 증가하며 제조업 심리가 개선됐습니다. 주요 기업 실적 전망도 상향되고 있습니다.",
    sourceName: "산업포커스",
    sourceUrl: "https://example.com/kr-002",
    publishedAt: new Date().toISOString(),
    thumbnailUrl: null,
    region: "KR",
    tags: ["수출", "반도체"],
    symbolKeys: ["KRX:005930"],
  },
];

export const sampleGlobalNews: NewsItem[] = [
  {
    id: "gl-001",
    title: "미국 소비 지표 완만한 둔화, 연준 발언 주목",
    summary:
      "미국 소비 지표가 둔화 조짐을 보이며 금리 경로에 대한 관심이 높아졌습니다. 시장은 연준 위원의 코멘트를 주시하고 있습니다.",
    sourceName: "Global Macro Today",
    sourceUrl: "https://example.com/gl-001",
    publishedAt: new Date().toISOString(),
    thumbnailUrl: null,
    region: "GLOBAL",
    tags: ["미국", "소비"],
    symbolKeys: ["NASDAQ:AAPL", "NASDAQ:MSFT"],
  },
  {
    id: "gl-002",
    title: "원자재 가격 혼조세, 에너지 섹터 변동성 확대",
    summary:
      "원유와 금속 가격이 혼조세를 보이며 에너지·소재 섹터의 변동성이 확대되고 있습니다.",
    sourceName: "Commodities Desk",
    sourceUrl: "https://example.com/gl-002",
    publishedAt: new Date().toISOString(),
    thumbnailUrl: null,
    region: "GLOBAL",
    tags: ["원자재", "에너지"],
    symbolKeys: ["NYSE:XOM"],
  },
];

export const samplePosts: PostItem[] = [
  {
    id: "post-001",
    title: "삼성전자 분기 실적, 시장 기대치 분석",
    content:
      "매출 성장률 대비 영업이익 개선 폭이 제한적입니다. 환율 효과와 재고 조정 흐름을 어떻게 보시나요?",
    authorName: "투자자K",
    createdAt: new Date().toISOString(),
    likeCount: 24,
  },
  {
    id: "post-002",
    title: "AAPL 신제품 사이클이 매출에 미치는 영향",
    content:
      "최근 공급망 동향과 서비스 매출 비중을 고려하면 단기 변동보다 장기 트렌드가 중요해 보입니다.",
    authorName: "macro_lee",
    createdAt: new Date().toISOString(),
    likeCount: 17,
  },
];
