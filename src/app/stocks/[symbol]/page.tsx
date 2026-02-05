import Tabs from "@/components/Tabs";
import DiscussionList from "@/components/DiscussionList";
import NewsCard from "@/components/NewsCard";
import { getNewsBySymbol } from "@/lib/news";
import { getPostsBySymbol } from "@/lib/posts";

export default async function StockPage({
  params,
}: {
  params: { symbol: string };
}) {
  const symbol = decodeURIComponent(params.symbol);
  const [news, posts] = await Promise.all([
    getNewsBySymbol(symbol, 6),
    getPostsBySymbol(symbol),
  ]);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="rounded-3xl border border-white/10 bg-[var(--surface)] p-6">
        <p className="text-xs text-[var(--muted)]">종목</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-white">
          {symbol}
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          종목별 뉴스와 토론을 한 화면에서 확인합니다.
        </p>
      </div>

      <div className="mt-6">
        <Tabs
          items={[
            {
              id: "discussion",
              label: "토론",
              content: (
                <div className="space-y-4">
                  <p className="text-sm text-[var(--muted)]">
                    로그인 후 글/댓글/좋아요를 남길 수 있습니다.
                  </p>
                  <DiscussionList posts={posts} />
                </div>
              ),
            },
            {
              id: "related-news",
              label: "관련 뉴스",
              content: (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {news.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </div>
              ),
            },
            {
              id: "top-posts",
              label: "인기 글",
              content: (
                <div className="space-y-4">
                  <p className="text-sm text-[var(--muted)]">
                    좋아요가 많은 게시글을 강조 표시합니다.
                  </p>
                  <DiscussionList posts={posts} />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
