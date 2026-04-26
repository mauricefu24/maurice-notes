"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

const defaultImage =
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80";

function value(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function tagList(input: string) {
  return input
    .split(/[,，\s]+/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 12);
}

function flashParam(kind: "success" | "error", message: string) {
  return `${kind}=${encodeURIComponent(message)}`;
}

function postPayload(formData: FormData, forcedStatus?: "published" | "draft" | "review") {
  const title = value(formData, "title");
  const excerpt = value(formData, "excerpt");
  const content = value(formData, "content");
  const rawSlug = value(formData, "slug");
  const slug = slugify(rawSlug || title);
  const status = forcedStatus ?? value(formData, "status") ?? "draft";

  if (!title) {
    return { error: "文章标题不能为空" };
  }

  if (!slug) {
    return { error: "URL 别名不能为空" };
  }

  return {
    data: {
      title,
      slug,
      excerpt: excerpt || title,
      content: content || excerpt || title,
      category: value(formData, "category") || "技术",
      status,
      author: value(formData, "author") || "Maurice",
      publishedAt: new Date(value(formData, "publishedAt") || new Date()),
      readingTime: value(formData, "readingTime") || "6 分钟阅读",
      image: value(formData, "image") || defaultImage,
      tags: tagList(value(formData, "tags")),
      featured: formData.get("featured") === "on",
    },
  };
}

function revalidateBlog() {
  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/archives");
  revalidatePath("/categories");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/posts");
}

export async function createPost(formData: FormData) {
  const payload = postPayload(formData);

  if (payload.error) {
    redirect(`/admin/posts/new?${flashParam("error", payload.error)}`);
  }

  const existing = await prisma.post.findUnique({ where: { slug: payload.data!.slug } });

  if (existing) {
    redirect(`/admin/posts/new?${flashParam("error", "URL 别名已存在，请换一个")}`);
  }

  const post = await prisma.post.create({
    data: payload.data!,
  });

  revalidateBlog();
  redirect(`/admin/posts/${post.id}/edit?${flashParam("success", "文章已保存")}`);
}

export async function createDraftPost(formData: FormData) {
  const payload = postPayload(formData, "draft");

  if (payload.error) {
    redirect(`/admin/posts/new?${flashParam("error", payload.error)}`);
  }

  const existing = await prisma.post.findUnique({ where: { slug: payload.data!.slug } });

  if (existing) {
    redirect(`/admin/posts/new?${flashParam("error", "URL 别名已存在，请换一个")}`);
  }

  const post = await prisma.post.create({
    data: payload.data!,
  });

  revalidateBlog();
  redirect(`/admin/posts/${post.id}/edit?${flashParam("success", "草稿已保存")}`);
}

export async function createPublishedPost(formData: FormData) {
  const payload = postPayload(formData, "published");

  if (payload.error) {
    redirect(`/admin/posts/new?${flashParam("error", payload.error)}`);
  }

  const existing = await prisma.post.findUnique({ where: { slug: payload.data!.slug } });

  if (existing) {
    redirect(`/admin/posts/new?${flashParam("error", "URL 别名已存在，请换一个")}`);
  }

  const post = await prisma.post.create({
    data: payload.data!,
  });

  revalidateBlog();
  revalidatePath(`/articles/${post.slug}`);
  redirect(`/admin/posts/${post.id}/edit?${flashParam("success", "文章已发布")}`);
}

export async function updatePost(id: string, formData: FormData) {
  const target = `/admin/posts/${id}/edit`;
  const payload = postPayload(formData);

  if (payload.error) {
    redirect(`${target}?${flashParam("error", payload.error)}`);
  }

  const existing = await prisma.post.findUnique({ where: { slug: payload.data!.slug } });

  if (existing && existing.id !== id) {
    redirect(`${target}?${flashParam("error", "URL 别名已被其他文章使用")}`);
  }

  const post = await prisma.post.update({
    where: { id },
    data: payload.data!,
  });

  revalidateBlog();
  revalidatePath(`/articles/${post.slug}`);
  redirect(`/admin/posts/${post.id}/edit?${flashParam("success", "文章已更新")}`);
}

export async function savePostDraft(id: string, formData: FormData) {
  const target = `/admin/posts/${id}/edit`;
  const payload = postPayload(formData, "draft");

  if (payload.error) {
    redirect(`${target}?${flashParam("error", payload.error)}`);
  }

  const existing = await prisma.post.findUnique({ where: { slug: payload.data!.slug } });

  if (existing && existing.id !== id) {
    redirect(`${target}?${flashParam("error", "URL 别名已被其他文章使用")}`);
  }

  const post = await prisma.post.update({
    where: { id },
    data: payload.data!,
  });

  revalidateBlog();
  revalidatePath(`/articles/${post.slug}`);
  redirect(`/admin/posts/${post.id}/edit?${flashParam("success", "草稿已保存")}`);
}

export async function publishPost(id: string, formData: FormData) {
  const target = `/admin/posts/${id}/edit`;
  const payload = postPayload(formData, "published");

  if (payload.error) {
    redirect(`${target}?${flashParam("error", payload.error)}`);
  }

  const existing = await prisma.post.findUnique({ where: { slug: payload.data!.slug } });

  if (existing && existing.id !== id) {
    redirect(`${target}?${flashParam("error", "URL 别名已被其他文章使用")}`);
  }

  const post = await prisma.post.update({
    where: { id },
    data: payload.data!,
  });

  revalidateBlog();
  revalidatePath(`/articles/${post.slug}`);
  redirect(`/admin/posts/${post.id}/edit?${flashParam("success", "文章已发布")}`);
}

export async function updatePostStatus(id: string, status: "published" | "draft" | "review") {
  const post = await prisma.post.update({
    where: { id },
    data: { status },
  });

  revalidateBlog();
  revalidatePath(`/articles/${post.slug}`);
}

export async function deletePost(id: string) {
  const post = await prisma.post.delete({
    where: { id },
    select: { slug: true },
  });

  revalidateBlog();
  revalidatePath(`/articles/${post.slug}`);
}
