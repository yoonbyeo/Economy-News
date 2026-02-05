import Link from "next/link";
import Image from "next/image";
import { NewsItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <div className="group flex h-full w-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--card)] shadow-lg transition hover:border-[var(--accent)]/40 hover:shadow-[var(--glow)]">
      <div className="relative h-36 w-full overflow-hidden">
        {item.thumbnailUrl ? (
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 280px, 320px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#121a2b] text-xs text-[var(--muted)]">
            이미지 없음
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/news/${item.id}`} className="text-sm font-semibold text-white">
          {item.title}
        </Link>
        <p className="text-xs text-[var(--muted)] line-clamp-3">
          {item.summary}
        </p>
        <div className="mt-auto flex items-center justify-between text-[11px] text-[var(--muted)]">
          <span>{item.sourceName}</span>
          <span>{formatDate(item.publishedAt)}</span>
        </div>
        {item.symbolKeys?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {item.symbolKeys.slice(0, 3).map((symbol) => (
              <span
                key={symbol}
                className="rounded-full bg-[var(--chip)] px-2 py-1 text-[11px] text-[var(--accent)]"
              >
                {symbol}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
