"use server";

import { revalidatePath } from "next/cache";

import { writeAuditLog } from "@/lib/audit-log";
import { prisma } from "@/lib/prisma";
import type { Comment } from "@/types/blog";

export async function updateCommentStatus(id: string, status: Comment["status"]) {
  const comment = await prisma.comment.update({
    where: { id },
    data: {
      status,
      flagged: status === "spam",
    },
  });
  await writeAuditLog({
    action: "comment_status_update",
    entityType: "comment",
    entityId: id,
    summary: `将 ${comment.author} 的评论标记为 ${status}`,
    metadata: { postTitle: comment.postTitle, status },
  });

  revalidatePath("/admin/comments");
  revalidatePath("/admin/dashboard");
}
