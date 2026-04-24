import { Brand } from "@/components/shared/brand";
import { AdminLinkCard } from "@/components/admin/admin-blocks";
import { sidebarNav } from "@/lib/admin-data";

export function AdminSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-100 bg-white lg:flex lg:flex-col">
      <div className="border-b border-slate-100 px-7 py-6">
        <Brand />
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6">
        {sidebarNav.map((item) => (
          <AdminLinkCard key={item.label} {...item} />
        ))}
      </nav>
      <p className="px-4 pb-4 text-xs text-muted-foreground">© 2024 Maurice Notes. All rights reserved.</p>
    </aside>
  );
}
