import { NewsItem, Region } from "@/lib/types";
import { sampleGlobalNews, sampleKrNews } from "@/lib/sample-data";
import { getAdminDb } from "@/lib/firebase/admin";
import type { DocumentData } from "firebase-admin/firestore";

const FALLBACK_NEWS = {
  KR: sampleKrNews,
  GLOBAL: sampleGlobalNews,
};

function toNewsItem(id: string, data: DocumentData): NewsItem {
  return {
    id,
    title: data.title ?? "",
    summary: data.summary ?? "",
    sourceName: data.sourceName ?? "",
    sourceUrl: data.sourceUrl ?? "",
    publishedAt: data.publishedAt?.toDate?.()?.toISOString?.() ?? data.publishedAt ?? "",
    thumbnailUrl: data.thumbnailUrl ?? null,
    region: data.region ?? "KR",
    tags: data.tags ?? [],
    symbolKeys: data.symbolKeys ?? [],
  };
}

export async function getNewsByRegion(region: Region, limit = 10) {
  const db = getAdminDb();
  if (!db) return FALLBACK_NEWS[region].slice(0, limit);

  const snapshot = await db
    .collection("news")
    .where("region", "==", region)
    .orderBy("publishedAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => toNewsItem(doc.id, doc.data()));
}

export async function getNewsList({
  region,
  tag,
  sort,
}: {
  region?: Region | "ALL";
  tag?: string;
  sort?: "latest" | "popular";
}) {
  const db = getAdminDb();
  if (!db) {
    const merged = [...sampleKrNews, ...sampleGlobalNews];
    return merged.filter((item) => {
      if (region && region !== "ALL" && item.region !== region) return false;
      if (tag && !item.tags?.includes(tag)) return false;
      return true;
    });
  }

  let query = db.collection("news");
  if (region && region !== "ALL") {
    query = query.where("region", "==", region);
  }
  if (tag) {
    query = query.where("tags", "array-contains", tag);
  }

  if (sort === "popular") {
    query = query.orderBy("popularityScore", "desc").orderBy("publishedAt", "desc");
  } else {
    query = query.orderBy("publishedAt", "desc");
  }

  const snapshot = await query.limit(30).get();
  return snapshot.docs.map((doc) => toNewsItem(doc.id, doc.data()));
}

export async function getNewsById(id: string) {
  const db = getAdminDb();
  if (!db) {
    const merged = [...sampleKrNews, ...sampleGlobalNews];
    return merged.find((item) => item.id === id) ?? null;
  }

  const doc = await db.collection("news").doc(id).get();
  if (!doc.exists) return null;
  return toNewsItem(doc.id, doc.data());
}

export async function getNewsBySymbol(symbol: string, limit = 6) {
  const db = getAdminDb();
  if (!db) {
    const merged = [...sampleKrNews, ...sampleGlobalNews];
    return merged.filter((item) => item.symbolKeys?.includes(symbol)).slice(0, limit);
  }

  const snapshot = await db
    .collection("news")
    .where("symbolKeys", "array-contains", symbol)
    .orderBy("publishedAt", "desc")
    .limit(limit)
    .get();

  return snapshot.docs.map((doc) => toNewsItem(doc.id, doc.data()));
}
