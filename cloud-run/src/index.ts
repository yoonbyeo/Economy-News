import express from "express";
import Parser from "rss-parser";
import crypto from "crypto";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const app = express();
app.use(express.json());

type RssItem = Parser.Item & {
  enclosure?: { url?: string };
  ["media:content"]?: { $?: { url?: string } };
  ["content:encoded"]?: string;
  content?: string;
};

const parser = new Parser({
  customFields: {
    item: ["media:content", "enclosure"],
  },
});

function ensureAdmin() {
  if (getApps().length) return;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin 환경 변수가 필요합니다.");
  }

  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

function stripHtml(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function summarize(text: string) {
  const cleaned = stripHtml(text);
  if (!cleaned) return "";
  const sentences = cleaned
    .split(/(?<=[.!?。！？])\s+/)
    .filter((sentence) => sentence.length > 10);
  const selected = sentences.slice(0, 3).join(" ");
  const trimmed = selected.length ? selected : cleaned;
  return trimmed.slice(0, 320);
}

function pickThumbnail(item: RssItem) {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item["media:content"]?.$?.url) return item["media:content"].$.url;
  const html = item.content ?? item["content:encoded"] ?? "";
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/ingest", async (req, res) => {
  const secret = process.env.INGEST_SECRET;
  if (secret) {
    const provided = req.headers["x-ingest-secret"] ?? req.query.secret;
    if (provided !== secret) {
      return res.status(403).json({ ok: false, message: "권한 없음" });
    }
  }

  ensureAdmin();
  const db = getFirestore();

  const feedsSnap = await db
    .collection("feeds")
    .where("isEnabled", "==", true)
    .get();

  let createdCount = 0;
  for (const doc of feedsSnap.docs) {
    const feedData = doc.data() as {
      url: string;
      region: "KR" | "GLOBAL";
      tags?: string[];
      name?: string;
    };
    const feedUrl = feedData.url;
    const feedRegion = feedData.region;
    const feedTags = feedData.tags ?? [];
    const feedName = feedData.name ?? "";

    const parsed = await parser.parseURL(feedUrl);
    const sourceName = parsed.title ?? feedName ?? "미상";

    for (const item of parsed.items) {
      const sourceUrl = item.link ?? "";
      if (!sourceUrl) continue;
      const docId = crypto.createHash("sha1").update(sourceUrl).digest("hex");
      const docRef = db.collection("news").doc(docId);
      const exists = await docRef.get();
      if (exists.exists) continue;

      const summaryBase = item.contentSnippet ?? item.content ?? "";
      const summary = summarize(summaryBase);
      if (!summary) continue;

      await docRef.set({
        title: item.title ?? "",
        summary,
        sourceName,
        sourceUrl,
        publishedAt: item.isoDate ? new Date(item.isoDate) : new Date(),
        thumbnailUrl: pickThumbnail(item),
        region: feedRegion,
        tags: feedTags,
        symbolKeys: [],
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      createdCount += 1;
    }
  }

  return res.json({ ok: true, created: createdCount });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`ingest server running on ${port}`);
});
