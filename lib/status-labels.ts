import type { Comment, PostStatus } from "@/types/blog";

export function getPostStatusLabel(status: PostStatus) {
  const labels: Record<PostStatus, string> = {
    published: "已发布",
    draft: "草稿",
    review: "审核中",
  };

  return labels[status];
}

export function getCommentStatusLabel(status: Comment["status"]) {
  const labels: Record<Comment["status"], string> = {
    pending: "待审核",
    approved: "已通过",
  };

  return labels[status];
}
