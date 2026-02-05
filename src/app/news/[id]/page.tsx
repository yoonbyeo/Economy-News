import Link from "next/link";
import { notFound } from "next/navigation";
import TagChips from "@/components/TagChips";
import DiscussionList from "@/components/DiscussionList";
import { getNewsById } from "@/lib/news";
import { getPostsBySymbol } from "@/lib/posts";
import { formatDateLong } from "@/lib/utils";

export default async function NewsDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const news = await getNewsById(params.id);
  if (!news) return notFound();

  const relatedSymbol = news.symbolKeys?.[0] ?? "KRX:005930";
  const posts = await getPostsBySymbol(relatedSymbol);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-10">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
            {news.region === "KR" ? "한국" : "세계"}
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold text-white">
            {news.title}
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            {news.sourceName} · {formatDateLong(news.publishedAt)}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6">
          <p className="text-sm text-[var(--foreground)]">{news.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <a
              href={news.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[var(--accent)]/20 px-3 py-2 text-[var(--accent)]"
            >
              원문 보기
            </a>
            <span className="text-[var(--muted)]">
              원문 전문은 저장/노출하지 않습니다.
            </span>
          </div>
          <div className="mt-4">
            <TagChips tags={news.tags} />
          </div>
        </div>

        <section className="rounded-2xl border border-white/10 bg-[var(--surface)] p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold text-white">
              관련 종목
            </h2>
            <Link
              href={`/stocks/${relatedSymbol}`}
              className="text-xs text-[var(--accent)]"
            >
              종목 페이지로 이동
            </Link>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {news.symbolKeys?.map((symbol) => (
              <Link
                key={symbol}
                href={`/stocks/${symbol}`}
                className="rounded-full border border-white/10 px-3 py-2 text-xs text-[var(--muted)] hover:text-white"
              >
                {symbol}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-semibold text-white">
            관련 커뮤니티 글
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            로그인 후 글 작성 및 반응이 가능합니다.
          </p>
          <div className="mt-4">
            <DiscussionList posts={posts} />
          </div>
        </section>
      </div>
    </div>
  );
}
