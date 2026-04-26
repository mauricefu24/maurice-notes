import { AlertTriangle, Bell, Check, FileCheck2, MessageSquare, Search, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AdminCard, AdminFilterBar, AdminPageTitle, AdminSearchInput, AdminStatusBadge, CommentActionButtons, SelectLike, SidePanel } from "@/components/admin/admin-blocks";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateCommentStatus } from "@/app/(admin)/admin/comments/actions";
import { getCommentStatusLabel } from "@/lib/status-labels";
import { getBlogStats, getComments } from "@/services/blog-service";
import type { Comment } from "@/types/blog";

type AdminCommentsPageProps = {
  searchParams?: Promise<{ status?: string; q?: string }>;
};

const statusTabs: Array<{ label: string; value: "all" | Comment["status"] }> = [
  { label: "全部", value: "all" },
  { label: "待审核", value: "pending" },
  { label: "已通过", value: "approved" },
  { label: "垃圾评论", value: "spam" },
  { label: "已删除", value: "deleted" },
];

export default async function AdminCommentsPage({ searchParams }: AdminCommentsPageProps) {
  const params = (await searchParams) ?? {};
  const activeStatus = statusTabs.some((item) => item.value === params.status) ? params.status : "all";
  const query = String(params.q ?? "").trim();
  const allComments = await getComments();
  const stats = await getBlogStats();
  const statusMatchedComments = activeStatus === "all" ? allComments : allComments.filter((comment) => comment.status === activeStatus);
  const comments = query
    ? statusMatchedComments.filter((comment) => {
        const content = `${comment.author} ${comment.body} ${comment.postTitle}`.toLowerCase();
        return content.includes(query.toLowerCase());
      })
    : statusMatchedComments;
  const counts = {
    all: stats.totalComments,
    pending: stats.pendingComments,
    approved: stats.approvedComments,
    spam: stats.spamComments,
    deleted: stats.deletedComments,
  };
  const commentOverview = [
    { label: "总评论数", value: `${stats.totalComments}`, icon: MessageSquare, tone: "bg-blue-50 text-blue-700" },
    { label: "待审核", value: `${stats.pendingComments}`, icon: Bell, tone: "bg-orange-50 text-orange-700" },
    { label: "已通过", value: `${stats.approvedComments}`, icon: FileCheck2, tone: "bg-emerald-50 text-emerald-700" },
    { label: "垃圾评论", value: `${stats.spamComments}`, icon: Trash2, tone: "bg-rose-50 text-rose-700" },
  ];

  return (
    <div className="space-y-8">
      <AdminPageTitle title="评论管理" description="管理和审核网站上的评论，确保内容质量与社区友好。" />

      <Tabs value={activeStatus}>
        <TabsList className="h-auto gap-7 border-b bg-transparent p-0">
          {statusTabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              asChild
              className="rounded-none border-b-2 border-transparent px-0 pb-4 data-[state=active]:border-note-teal data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Link href={`${tab.value === "all" ? "/admin/comments" : `/admin/comments?status=${tab.value}`}${query ? `${tab.value === "all" ? "?" : "&"}q=${encodeURIComponent(query)}` : ""}`}>
                {tab.label} {counts[tab.value]}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <AdminFilterBar>
        <form action="/admin/comments" className="flex min-w-[320px] flex-1 items-center gap-2 rounded-md border border-slate-200 px-3">
          {activeStatus !== "all" ? <input type="hidden" name="status" value={activeStatus} /> : null}
          <Search className="h-4 w-4 text-muted-foreground" />
          <AdminSearchInput name="q" defaultValue={query} placeholder="搜索评论内容、用户或文章..." />
          <Button type="submit" size="sm">搜索</Button>
          {query ? (
            <Button asChild variant="ghost" size="sm">
              <Link href={activeStatus === "all" ? "/admin/comments" : `/admin/comments?status=${activeStatus}`}>清除</Link>
            </Button>
          ) : null}
        </form>
        <SelectLike label="所有文章" />
        <SelectLike label="所有状态" />
        <SelectLike label="所有时间" />
        <SelectLike label="更多筛选" />
        <Button asChild variant="outline">
          <Link href="/admin/comments">重置</Link>
        </Button>
      </AdminFilterBar>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <AdminCard>
          <CardContent className="space-y-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <input type="checkbox" aria-label="全选评论" />
                <span>已选择 0 项</span>
                <Button variant="outline" size="sm" className="text-emerald-700" disabled><Check className="mr-1 h-4 w-4" />批量通过</Button>
                <Button variant="outline" size="sm" className="text-red-600" disabled><X className="mr-1 h-4 w-4" />批量拒绝</Button>
                <Button variant="outline" size="sm" disabled>更多操作</Button>
              </div>
              <Button variant="outline" size="sm" disabled>最新评论</Button>
            </div>

            <div className="divide-y divide-slate-100">
              {comments.map((comment) => (
                <div key={comment.id} className={comment.flagged ? "bg-rose-50/40 px-3 py-5" : "px-3 py-5"}>
                  <div className="grid gap-4 md:grid-cols-[24px_48px_1fr_auto]">
                    <input type="checkbox" aria-label={`选择 ${comment.author} 的评论`} className="mt-3" />
                    <div className="relative h-11 w-11 overflow-hidden rounded-full bg-slate-100">
                      {comment.avatar ? (
                        <Image src={comment.avatar} alt="" fill className="object-cover" sizes="44px" />
                      ) : (
                        <div className="grid h-full w-full place-items-center text-sm text-muted-foreground">?</div>
                      )}
                    </div>
                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-semibold text-note-ink">{comment.author}</p>
                        <span className="text-sm text-muted-foreground">{comment.createdAt}</span>
                        <AdminStatusBadge status={getCommentStatusLabel(comment.status)} />
                        {comment.flagged ? (
                          <span className="rounded-md bg-rose-100 px-2 py-1 text-xs text-rose-700">疑似垃圾内容</span>
                        ) : null}
                      </div>
                      <p className="max-w-3xl text-sm leading-7 text-slate-600">{comment.body}</p>
                      <p className="text-sm text-muted-foreground">评论于：《{comment.postTitle}》</p>
                    </div>
                    <CommentActionButtons commentId={comment.id} updateStatus={updateCommentStatus} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
              <span>共 {comments.length} 条评论</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>上一页</Button>
                <Button size="sm">1</Button>
                <Button variant="outline" size="sm" disabled>下一页</Button>
              </div>
            </div>
          </CardContent>
        </AdminCard>

        <aside className="space-y-5">
          <SidePanel title="评论概览">
            <div className="grid grid-cols-2 gap-3">
              {commentOverview.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-lg border border-slate-100 p-4">
                    <div className={`mb-3 grid h-9 w-9 place-items-center rounded-lg ${item.tone}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-2xl font-semibold text-note-ink">{item.value}</p>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </SidePanel>
          <SidePanel title="审核状态分布">
            <div className="space-y-3 text-sm">
              {[
                { label: "待审核", value: stats.pendingComments, tone: "bg-amber-400" },
                { label: "已通过", value: stats.approvedComments, tone: "bg-emerald-500" },
                { label: "垃圾评论", value: stats.spamComments, tone: "bg-rose-500" },
                { label: "已删除", value: stats.deletedComments, tone: "bg-slate-400" },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full ${item.tone}`}
                      style={{ width: `${stats.totalComments ? Math.round((item.value / stats.totalComments) * 100) : 0}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="rounded-lg bg-slate-50 p-3 text-xs leading-5 text-muted-foreground">
                当前系统尚未接入按天评论趋势埋点，这里仅展示数据库中的实时状态分布。
              </div>
            </div>
          </SidePanel>
          <SidePanel title="评论回复率">
            <div className="text-center">
              <div className="mx-auto grid h-32 w-32 place-items-center rounded-full border-[18px] border-note-teal">
                <span className="text-3xl font-semibold text-note-ink">{stats.totalComments ? Math.round((stats.approvedComments / stats.totalComments) * 100) : 0}%</span>
              </div>
              <p className="mt-3 text-sm text-emerald-600">基于当前评论数据</p>
              <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between"><span>已通过评论</span><span>{stats.approvedComments}</span></div>
                <div className="flex justify-between"><span>待审评论</span><span>{stats.pendingComments}</span></div>
                <div className="flex justify-between"><span>垃圾评论</span><span>{stats.spamComments}</span></div>
              </div>
            </div>
          </SidePanel>
          <SidePanel title="审核小贴士">
            <div className="space-y-4 text-sm leading-6 text-muted-foreground">
              <p className="flex gap-2"><MessageSquare className="mt-1 h-4 w-4 text-blue-500" />关注高频垃圾词，包含 “SEO”“外链” 等关键词的评论重点审核。</p>
              <p className="flex gap-2"><AlertTriangle className="mt-1 h-4 w-4 text-orange-500" />短时间内大量相似评论，建议标记为垃圾评论。</p>
              <p className="flex gap-2"><Check className="mt-1 h-4 w-4 text-emerald-600" />选择性回复优质评论，提升社区活跃度。</p>
            </div>
          </SidePanel>
        </aside>
      </div>
    </div>
  );
}
