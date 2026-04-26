"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

function text(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function revalidateCategories() {
  revalidatePath("/categories");
  revalidatePath("/archives");
  revalidatePath("/admin/categories");
}

function flashParam(kind: "success" | "error", message: string) {
  return `${kind}=${encodeURIComponent(message)}`;
}

export async function createCategory(formData: FormData) {
  const name = text(formData, "name");
  const slug = slugify(text(formData, "slug") || name);

  if (!name || !slug) {
    redirect(`/admin/categories?${flashParam("error", "分类名称不能为空")}`);
  }

  const existing = await prisma.category.findFirst({
    where: {
      OR: [{ slug }, { name }],
    },
  });

  if (existing) {
    redirect(`/admin/categories?${flashParam("error", "分类名称或 URL 别名已存在")}`);
  }

  await prisma.category.create({
    data: {
      name,
      slug,
      description: text(formData, "description") || `${name} 分类内容`,
      accent: text(formData, "accent") || "bg-teal-50 text-teal-700",
    },
  });

  revalidateCategories();
  redirect(`/admin/categories?${flashParam("success", "分类已创建")}`);
}

export async function deleteCategory(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    select: { name: true },
  });

  if (!category) {
    redirect(`/admin/categories?${flashParam("error", "分类不存在")}`);
  }

  const postsInCategory = await prisma.post.count({
    where: { category: category.name },
  });

  if (postsInCategory > 0) {
    redirect(`/admin/categories?${flashParam("error", "该分类下仍有文章，不能删除")}`);
  }

  await prisma.category.delete({ where: { slug } });
  revalidateCategories();
  redirect(`/admin/categories?${flashParam("success", "分类已删除")}`);
}
