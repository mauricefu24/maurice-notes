"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import type { SiteSettings } from "@/types/blog";

function text(formData: FormData, name: keyof SiteSettings) {
  return String(formData.get(name) ?? "").trim();
}

export async function saveSiteSettings(formData: FormData) {
  const settings: SiteSettings = {
    siteName: text(formData, "siteName") || "Maurice Notes",
    siteDescription: text(formData, "siteDescription"),
    siteDomain: text(formData, "siteDomain"),
    timezone: text(formData, "timezone"),
    language: text(formData, "language") || "简体中文",
    footerDescription: text(formData, "footerDescription"),
    icp: text(formData, "icp"),
    copyright: text(formData, "copyright"),
    email: text(formData, "email"),
    github: text(formData, "github"),
    twitter: text(formData, "twitter"),
    linkedin: text(formData, "linkedin"),
    wechat: text(formData, "wechat"),
  };

  await prisma.siteSetting.upsert({
    where: { key: "site" },
    create: { key: "site", value: settings },
    update: { value: settings },
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/admin/settings");
}
