"use server";

import { revalidatePath } from "next/cache";

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

export async function createCategory(formData: FormData) {
  const name = text(formData, "name");
  const slug = slugify(text(formData, "slug") || name);

  if (!name || !slug) {
    throw new Error("分类名称和别名不能为空");
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
}

export async function deleteCategory(slug: string) {
  await prisma.category.delete({ where: { slug } });
  revalidateCategories();
}
