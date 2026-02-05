import Link from "next/link";
import { getNewsList } from "@/lib/news";
import { NewsItem } from "@/lib/types";
import NewsCard from "@/components/NewsCard";

const regions = [
  { label: "전체", value: "ALL" },
  { label: "한국", value: "KR" },
  { label: "세계", value: "GLOBAL" },
];

const sortOptions = [
  { label: "최신순", value: "latest" },
  { label: "인기순", value: "popular" },
];

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { region?: string; tag?: string; sort?: string };
}) {
  const region = (searchParams.region as "ALL" | "KR" | "GLOBAL") ?? "ALL";
  const tag = searchParams.tag;
  const sort = (searchParams.sort as "latest" | "popular") ?? "latest";

  const news = await getNewsList({ region, tag, sort });

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-display text-3xl font-semibold text-white">
            경제 뉴스
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            지역, 태그, 정렬 기준으로 뉴스 흐름을 빠르게 탐색합니다.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          {regions.map((item) => (
            <Link
              key={item.value}
              href={`/news?region=${item.value}&sort=${sort}`}
              className={`rounded-full px-3 py-2 transition ${
                region === item.value
                  ? "bg-white/10 text-white"
                  : "text-[var(--muted)] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-auto flex items-center gap-2">
            {sortOptions.map((option) => (
              <Link
                key={option.value}
                href={`/news?region=${region}&sort=${option.value}`}
                className={`rounded-full px-3 py-2 text-xs transition ${
                  sort === option.value
                    ? "bg-[var(--accent)]/20 text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-white"
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-4">
          <p className="text-xs text-[var(--muted)]">태그 필터</p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {["금리", "반도체", "환율", "미국", "원자재", "성장"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/news?region=${region}&sort=${sort}&tag=${item}`}
                  className={`rounded-full px-3 py-2 transition ${
                    tag === item
                      ? "bg-white/10 text-white"
                      : "text-[var(--muted)] hover:text-white"
                  }`}
                >
                  #{item}
                </Link>
              ),
            )}
            {tag ? (
              <Link
                href={`/news?region=${region}&sort=${sort}`}
                className="rounded-full border border-white/10 px-3 py-2 text-[var(--muted)] hover:text-white"
              >
                필터 해제
              </Link>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item: NewsItem) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
