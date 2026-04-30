import { Activity, Database, UserRound } from "lucide-react";

import { AdminCard, AdminPageTitle, AdminStatusBadge } from "@/components/admin/admin-blocks";
import { CardContent } from "@/components/ui/card";
import { getAuditLogs } from "@/services/blog-service";

const actionLabels: Record<string, string> = {
  post_create: "创建文章",
  post_update: "更新文章",
  post_publish: "发布文章",
  post_draft: "保存草稿",
  post_status_update: "切换状态",
  post_delete: "删除文章",
  category_create: "创建分类",
  category_delete: "删除分类",
  settings_update: "保存设置",
};

export default async function AdminAuditLogsPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-8">
      <AdminPageTitle title="操作日志" description="追踪后台关键操作，帮助排查内容变更和管理行为。" />

      <AdminCard>
        <CardContent className="p-5">
          <div className="overflow-hidden rounded-lg border border-slate-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">时间</th>
                  <th className="px-4 py-3 font-medium">操作者</th>
                  <th className="px-4 py-3 font-medium">操作</th>
                  <th className="px-4 py-3 font-medium">对象</th>
                  <th className="px-4 py-3 font-medium">摘要</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {logs.length ? logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/70">
                    <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">{log.createdAt}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2">
                        <UserRound className="h-4 w-4 text-note-teal" />
                        {log.actor}
                      </span>
                    </td>
                    <td className="px-4 py-4"><AdminStatusBadge status={actionLabels[log.action] ?? log.action} /></td>
                    <td className="px-4 py-4 text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        {log.entityType} / {log.entityId}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-note-ink">{log.summary}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                      <Activity className="mx-auto mb-3 h-6 w-6" />
                      暂无操作日志。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </AdminCard>
    </div>
  );
}
