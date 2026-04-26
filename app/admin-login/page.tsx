import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/app/admin-login/login-form";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type AdminLoginPageProps = {
  searchParams?: Promise<{ next?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = (await searchParams) ?? {};
  const next = params.next?.startsWith("/admin") ? params.next : "/admin/dashboard";

  if (await isAdminAuthenticated()) {
    redirect(next);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-6">
      <section className="w-full max-w-sm rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-2">
          <div className="grid h-11 w-11 place-items-center rounded-md bg-note-mint text-xl font-black text-note-teal">M</div>
          <h1 className="text-2xl font-semibold tracking-normal text-note-ink">后台登录</h1>
          <p className="text-sm leading-6 text-muted-foreground">请输入管理员密码后继续访问内容管理后台。</p>
        </div>
        <AdminLoginForm next={next} />
      </section>
    </main>
  );
}
