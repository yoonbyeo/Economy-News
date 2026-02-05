import { sampleKrNews } from "@/lib/sample-data";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleKrNews.slice(0, 6).map((item) => (
          <div
            key={item.id}
            className="flex h-[320px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--card)]"
          >
            <div className="skeleton h-36 w-full" />
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="skeleton h-4 w-4/5 rounded" />
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-11/12 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
