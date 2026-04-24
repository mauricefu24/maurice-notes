import { AlertTriangle, Check, MessageSquare, Search, X } from "lucide-react";
import Image from "next/image";

import { AdminCard, AdminFilterBar, AdminPageTitle, AdminSearchInput, AdminStatusBadge, CommentActionButtons, SelectLike, SidePanel } from "@/components/admin/admin-blocks";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateCommentStatus } from "@/app/(admin)/admin/comments/actions";
import { commentOverview } from "@/lib/admin-data";
import { getCommentStatusLabel } from "@/lib/status-labels";
import { getComments } from "@/services/blog-service";

export default async function AdminCommentsPage() {
  const comments = await getComments();

  return (
    <div className="space-y-8">
      <AdminPageTitle title="评论管理" description="管理和审核网站上的评论，确保内容质量与社区友好。" />

      <Tabs defaultValue="all">
        <TabsList className="h-auto gap-7 border-b bg-transparent p-0">
          {["全部 1,245", "待审核 156", "已通过 982", "垃圾评论 67", "已删除 40"].map((tab, index) => (
            <TabsTrigger
              key={tab}
              value={`tab-${index}`}
              className="rounded-none border-b-2 border-transparent px-0 pb-4 data-[state=active]:border-note-teal data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <AdminFilterBar>
        <div className="flex min-w-[320px] flex-1 items-center gap-2 rounded-md border border-slate-200 px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <AdminSearchInput placeholder="搜索评论内容、用户或文章..." />
        </div>
        <SelectLike label="所有文章" />
        <SelectLike label="所有状态" />
        <SelectLike label="所有时间" />
        <SelectLike label="更多筛选" />
        <Button variant="outline">重置</Button>
      </AdminFilterBar>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <AdminCard>
          <CardContent className="space-y-4 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <input type="checkbox" aria-label="全选评论" />
                <span>已选择 0 项</span>
                <Button variant="outline" size="sm" className="text-emerald-700"><Check className="mr-1 h-4 w-4" />批量通过</Button>
                <Button variant="outline" size="sm" className="text-red-600"><X className="mr-1 h-4 w-4" />批量拒绝</Button>
                <SelectLike label="更多操作" />
              </div>
              <SelectLike label="最新评论" />
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
                <Button variant="outline" size="sm">上一页</Button>
                <Button size="sm">1</Button>
                <Button variant="ghost" size="sm">2</Button>
                <Button variant="ghost" size="sm">3</Button>
                <Button variant="ghost" size="sm">...</Button>
                <Button variant="ghost" size="sm">63</Button>
                <Button variant="outline" size="sm">下一页</Button>
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
          <SidePanel title="垃圾评论趋势">
            <div className="h-48 rounded-lg border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-4">
              <div className="flex h-full items-end gap-3">
                {[50, 38, 48, 34, 61, 49].map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-2">
                    <span className="w-3 rounded-t bg-rose-400" style={{ height: `${value * 1.9}px` }} />
                    <span className="text-xs text-muted-foreground">05-{index + 6}</span>
                  </div>
                ))}
              </div>
            </div>
          </SidePanel>
          <SidePanel title="评论回复率">
            <div className="text-center">
              <div className="mx-auto grid h-32 w-32 place-items-center rounded-full border-[18px] border-note-teal">
                <span className="text-3xl font-semibold text-note-ink">86%</span>
              </div>
              <p className="mt-3 text-sm text-emerald-600">较上周 ↑ 12%</p>
              <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between"><span>已回复评论</span><span>1,072</span></div>
                <div className="flex justify-between"><span>未回复评论</span><span>173</span></div>
                <div className="flex justify-between"><span>平均回复时间</span><span>4.2 小时</span></div>
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
