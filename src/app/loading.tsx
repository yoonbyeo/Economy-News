import SectionHeader from "@/components/SectionHeader";
import NewsCarousel from "@/components/NewsCarousel";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-3">
          <div className="skeleton h-4 w-24 rounded" />
          <div className="skeleton h-10 w-3/4 rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
        </div>
        <div className="skeleton h-40 rounded-3xl" />
      </div>

      <section className="mt-12 space-y-4">
        <SectionHeader title="한국 주요 뉴스" />
        <NewsCarousel items={[]} isLoading />
      </section>

      <section className="mt-12 space-y-4">
        <SectionHeader title="세계 주요 뉴스" />
        <NewsCarousel items={[]} isLoading />
      </section>
    </div>
  );
}
