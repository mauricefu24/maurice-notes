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

function postPayload(formData: FormData) {
  const title = value(formData, "title");
  const excerpt = value(formData, "excerpt");
  const content = value(formData, "content");
  const rawSlug = value(formData, "slug");
  const slug = slugify(rawSlug || title);
  const status = value(formData, "status") || "draft";

  if (!title) {
    throw new Error("文章标题不能为空");
  }

  if (!slug) {
    throw new Error("URL 别名不能为空");
  }

  return {
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
    featured: formData.get("featured") === "on",
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
  const post = await prisma.post.create({
    data: postPayload(formData),
  });

  revalidateBlog();
  redirect(`/admin/posts/${post.id}/edit`);
}

export async function updatePost(id: string, formData: FormData) {
  const post = await prisma.post.update({
    where: { id },
    data: postPayload(formData),
  });

  revalidateBlog();
  revalidatePath(`/articles/${post.slug}`);
  redirect(`/admin/posts/${post.id}/edit`);
}
