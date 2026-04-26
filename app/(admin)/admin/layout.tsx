import { redirect } from "next/navigation";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminTopbar } from "@/components/admin/admin-topbar";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin-login?next=/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminTopbar />
        <main className="px-6 py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
