"use server";

import { redirect } from "next/navigation";

import { isAdminAuthConfigured, isValidAdminPassword, setAdminSession } from "@/lib/admin-auth";

export type AdminLoginState = {
  message: string;
};

export async function loginAdmin(_state: AdminLoginState, formData: FormData): Promise<AdminLoginState> {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin/dashboard");

  if (!isAdminAuthConfigured()) {
    return { message: "后台登录尚未配置 ADMIN_PASSWORD" };
  }

  if (!isValidAdminPassword(password)) {
    return { message: "密码不正确" };
  }

  await setAdminSession();
  redirect(next.startsWith("/admin") ? next : "/admin/dashboard");
}
