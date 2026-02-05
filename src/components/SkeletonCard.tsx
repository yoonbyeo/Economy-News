export default function SkeletonCard() {
  return (
    <div className="flex h-[320px] w-[280px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[var(--card)]">
      <div className="skeleton h-36 w-full" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="skeleton h-4 w-4/5 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-11/12 rounded" />
        <div className="mt-auto flex items-center justify-between">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-3 w-12 rounded" />
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-5 w-14 rounded-full" />
          <div className="skeleton h-5 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
