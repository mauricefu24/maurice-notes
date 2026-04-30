import { redirect } from "next/navigation";
import Link from "next/link";

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

      <section className="relative z-10 grid min-h-screen place-items-center px-6 py-8">
        <div className="w-full max-w-[420px] rounded-lg border border-white/15 bg-white/12 p-7 shadow-2xl backdrop-blur-xl">
          <div className="mb-7 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-md bg-white text-xl font-black text-note-teal">M</div>
            <div>
              <h1 className="text-xl font-semibold tracking-normal">Maurice Notes</h1>
              <p className="text-sm text-white/60">后台登录</p>
            </div>
          </div>
          <AdminLoginForm next={next} />
          <div className="mt-5 border-t border-white/10 pt-5">
            <Link href="/" className="block text-center text-sm font-medium text-white/70 transition hover:text-white">
              返回首页
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
