import { PostItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function DiscussionList({ posts }: { posts: PostItem[] }) {
  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-2xl border border-white/10 bg-[var(--surface)] p-4"
        >
          <div className="flex items-center justify-between text-xs text-[var(--muted)]">
            <span>{post.authorName}</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <h3 className="mt-2 text-sm font-semibold text-white">
            {post.title}
          </h3>
          <p className="mt-1 text-xs text-[var(--muted)] line-clamp-2">
            {post.content}
          </p>
          <div className="mt-3 text-xs text-[var(--muted)]">
            좋아요 {post.likeCount}
          </div>
        </div>
      ))}
    </div>
  );
}
