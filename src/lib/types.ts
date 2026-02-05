export type Region = "KR" | "GLOBAL";

export type NewsItem = {
  id: string;
  title: string;
  summary: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt: string;
  thumbnailUrl?: string | null;
  region: Region;
  tags?: string[];
  symbolKeys?: string[];
};

export type PostItem = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  likeCount: number;
};

export type AskResult = {
  summary: string;
  checklist: string[];
  bullScenario: string[];
  bearScenario: string[];
};
