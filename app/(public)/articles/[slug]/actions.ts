"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export type CommentFormState = {
  ok: boolean;
  message: string;
};

export type LikeFormState = {
  liked: boolean;
  likes: number;
  message: string;
};

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export async function createArticleComment(
  slug: string,
  postTitle: string,
  _state: CommentFormState,
  formData: FormData,
): Promise<CommentFormState> {
  const author = text(formData, "author") || "访客";
  const body = text(formData, "body");

  if (!body) {
    return { ok: false, message: "请先写下评论内容" };
  }

  if (body.length > 1000) {
    return { ok: false, message: "评论内容不能超过 1000 字" };
  }

  await prisma.$transaction([
    prisma.comment.create({
      data: {
        author: author.slice(0, 40),
        postTitle,
        body,
        status: "pending",
        flagged: /seo|外链|加我|流量|排名/i.test(body),
      },
    }),
    prisma.post.update({
      where: { slug },
      data: { comments: { increment: 1 } },
    }),
  ]);

  revalidatePath(`/articles/${slug}`);
  revalidatePath("/admin/comments");
  revalidatePath("/admin/dashboard");

  return { ok: true, message: "评论已提交，等待审核" };
}

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
