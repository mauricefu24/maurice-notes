"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export type LikeFormState = {
  liked: boolean;
  likes: number;
  message: string;
};

export async function likeArticle(
  slug: string,
  state: LikeFormState,
): Promise<LikeFormState> {
  if (state.liked) {
    return state;
  }

  const post = await prisma.post.update({
    where: { slug },
    data: { likes: { increment: 1 } },
    select: { likes: true },
  });

  revalidatePath(`/articles/${slug}`);
  revalidatePath("/admin/dashboard");

  return { liked: true, likes: post.likes, message: "已点赞" };
}
