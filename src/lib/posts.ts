import { PostItem } from "@/lib/types";
import { samplePosts } from "@/lib/sample-data";
import { getAdminDb } from "@/lib/firebase/admin";
import type { DocumentData } from "firebase-admin/firestore";

function toPostItem(id: string, data: DocumentData): PostItem {
  return {
    id,
    title: data.title ?? "",
    content: data.content ?? "",
    authorName: data.authorName ?? "익명",
    createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? data.createdAt ?? "",
    likeCount: data.likeCount ?? 0,
  };
}

export async function getPostsBySymbol(symbol: string) {
  const db = getAdminDb();
  if (!db) return samplePosts;

  const snapshot = await db
    .collection("posts")
    .where("symbolKey", "==", symbol)
    .orderBy("createdAt", "desc")
    .limit(10)
    .get();

  return snapshot.docs.map((doc) => toPostItem(doc.id, doc.data()));
}
