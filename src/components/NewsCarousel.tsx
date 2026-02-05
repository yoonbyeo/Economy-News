"use client";

import { useMemo } from "react";
import NewsCard from "@/components/NewsCard";
import { NewsItem } from "@/lib/types";
import SkeletonCard from "@/components/SkeletonCard";

export default function NewsCarousel({
  items,
  isLoading,
}: {
  items: NewsItem[];
  isLoading?: boolean;
}) {
  const cards = useMemo(() => {
    if (isLoading) {
      return Array.from({ length: 5 }).map((_, index) => (
        <SkeletonCard key={index} />
      ));
    }

    return items.map((item) => <NewsCard key={item.id} item={item} />);
  }, [items, isLoading]);

  return (
    <div className="relative">
      <div className="scrollbar-hide flex gap-4 overflow-x-auto pb-2">
        {cards}
      </div>
    </div>
  );
}
