import type { PostStatus } from "@/types/blog";

export function getPostStatusLabel(status: PostStatus) {
  const labels: Record<PostStatus, string> = {
    published: "已发布",
    draft: "草稿",
    review: "审核中",
  };

  return labels[status];
}
