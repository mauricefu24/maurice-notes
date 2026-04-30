import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

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
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2400&q=85')",
        }}
      />
      <div className="absolute inset-0 bg-slate-950/72" />
      <div className="absolute inset-x-0 top-0 h-32 bg-white/5" />

      <section className="relative z-10 grid min-h-screen px-6 py-8 lg:grid-cols-[minmax(0,1fr)_460px] lg:px-10">
        <div className="flex min-h-[44vh] flex-col justify-between py-4 lg:min-h-0 lg:py-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-white text-xl font-black text-note-teal">M</div>
            <div>
              <p className="text-lg font-semibold tracking-normal">Maurice Notes</p>
              <p className="text-xs text-white/60">Private content workspace</p>
            </div>
          </div>

          <div className="max-w-2xl pb-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-sm text-white/80 backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-note-mint" />
              管理员安全入口
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-normal md:text-5xl">进入内容管理后台</h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/72">
              管理文章、分类、评论和站点设置。这里是个人记录平台的控制台，只开放给站点管理员使用。
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <section className="w-full max-w-[420px] rounded-lg border border-white/15 bg-white/12 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-7 space-y-2">
              <p className="text-sm font-medium text-note-mint">Admin Console</p>
              <h2 className="text-2xl font-semibold tracking-normal">后台登录</h2>
              <p className="text-sm leading-6 text-white/64">请输入管理员密码后继续。</p>
            </div>
            <AdminLoginForm next={next} />
          </section>
        </div>
      </section>
    </main>
  );
}
