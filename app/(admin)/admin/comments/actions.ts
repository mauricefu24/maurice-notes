"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import type { Comment } from "@/types/blog";

export async function updateCommentStatus(id: string, status: Comment["status"]) {
  await prisma.comment.update({
    where: { id },
    data: {
      status,
      flagged: status === "spam",
    },
  });

  revalidatePath("/admin/comments");
  revalidatePath("/admin/dashboard");
}
