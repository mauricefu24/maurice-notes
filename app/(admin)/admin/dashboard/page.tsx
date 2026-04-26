import { Circle, Eye, FileCheck2, FileText, MessageSquare, Plus, Settings, Tags } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AdminCard, AdminPageTitle, AdminStatCard, QuickActionRow, SidePanel } from "@/components/admin/admin-blocks";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCommentStatusLabel, getPostStatusLabel } from "@/lib/status-labels";
import { getAllPosts, getBlogStats, getCategories, getComments } from "@/services/blog-service";

export default async function AdminDashboardPage() {
  const posts = await getAllPosts();
  const comments = await getComments();
  const categories = await getCategories();
  const stats = await getBlogStats();
  const dashboardMetrics = [
    { label: "总文章数", value: `${stats.totalPosts}`, delta: "实时数据", icon: FileText, tone: "bg-teal-50 text-teal-700" },
    { label: "已发布", value: `${stats.publishedPosts}`, delta: "实时数据", icon: FileCheck2, tone: "bg-emerald-50 text-emerald-700" },
    { label: "总浏览量", value: stats.totalViewsLabel, delta: "文章累计", icon: Eye, tone: "bg-blue-50 text-blue-700" },
    { label: "评论数", value: `${stats.totalComments}`, delta: `${stats.pendingComments} 待审核`, icon: MessageSquare, tone: "bg-orange-50 text-orange-700" },
  ];
  const categoryDistribution = categories.map((category, index) => ({
    label: category.name,
    value: category.postCount,
    percent: stats.totalPosts ? `${((category.postCount / stats.totalPosts) * 100).toFixed(1)}%` : "0%",
    color: ["bg-note-teal", "bg-blue-500", "bg-orange-400", "bg-amber-500", "bg-violet-500"][index % 5],
  }));
  const tasks = [
    { title: `审核 ${stats.pendingComments} 条待审评论`, due: `${stats.pendingComments}`, status: "待处理" },
    { title: `处理 ${stats.reviewPosts} 篇审核中文章`, due: `${stats.reviewPosts}`, status: "进行中" },
    { title: `维护 ${stats.totalCategories} 个内容分类`, due: `${stats.totalCategories}`, status: "计划中" },
  ];
  const activityBars = posts.slice(0, 7).map((post) => {
    const views = Number(post.views.replace(/[^\d.]/g, "")) || 0;
    return {
      label: post.publishedAt.slice(5),
      views: Math.max(8, Math.min(160, views)),
      comments: Math.max(6, Math.min(120, post.comments * 12)),
    };
  });
  const quickActions = [
    { label: "新建文章", icon: Plus, href: "/admin/posts/new" },
    { label: "管理文章", icon: FileText, href: "/admin/posts" },
    { label: "管理分类", icon: Tags, href: "/admin/categories" },
    { label: "审核评论", icon: MessageSquare, href: "/admin/comments" },
    { label: "系统设置", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <AdminPageTitle title="内容运营总览" description="欢迎回来，Maurice！以下是网站的整体运营情况。" />
        <Button variant="outline" disabled>实时数据</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <AdminStatCard key={metric.label} {...metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminCard>
          <CardHeader className="flex-row items-center justify-between p-5">
            <CardTitle className="text-lg tracking-normal">内容互动概览</CardTitle>
            <Button variant="outline" size="sm" disabled>按最新文章</Button>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="relative h-72 rounded-lg border border-slate-100 bg-gradient-to-b from-white to-slate-50 p-5">
              <div className="absolute left-5 top-5 flex gap-5 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2"><i className="h-1.5 w-5 rounded-full bg-note-teal" />浏览量</span>
                <span className="inline-flex items-center gap-2"><i className="h-1.5 w-5 rounded-full bg-blue-400" />访客数</span>
              </div>
              <div className="flex h-full items-end gap-6 pt-12">
                {activityBars.map((item) => (
                  <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
                    <div className="flex h-44 w-full items-end justify-center gap-2 border-b border-dashed border-slate-200">
                      <span className="w-3 rounded-t bg-note-teal" style={{ height: `${item.views}px` }} />
                      <span className="w-3 rounded-t bg-blue-400" style={{ height: `${item.comments}px` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                  </div>
                ))}
                {activityBars.length === 0 ? (
                  <div className="grid h-full flex-1 place-items-center text-sm text-muted-foreground">暂无文章数据</div>
                ) : null}
              </div>
            </div>
          </CardContent>
        </AdminCard>

        <AdminCard>
          <CardHeader className="p-5">
            <CardTitle className="text-lg tracking-normal">分类分布</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 p-5 pt-0 md:grid-cols-[160px_1fr] xl:grid-cols-1">
            <div className="mx-auto grid h-40 w-40 place-items-center rounded-full border-[28px] border-note-teal bg-white text-center">
              <div>
                <p className="text-3xl font-semibold text-note-ink">{stats.totalPosts}</p>
                <p className="text-xs text-muted-foreground">总文章</p>
              </div>
            </div>
            <div className="space-y-3">
              {categoryDistribution.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-2 text-slate-600">
                    <i className={`h-2 w-2 rounded-full ${item.color}`} />
                    {item.label}
                  </span>
                  <span className="text-muted-foreground">{item.value}（{item.percent}）</span>
                </div>
              ))}
            </div>
          </CardContent>
        </AdminCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.75fr]">
        <AdminCard>
          <CardHeader className="flex-row items-center justify-between p-5">
            <CardTitle className="text-lg tracking-normal">最近发布的文章</CardTitle>
            <Link href="/admin/posts" className="text-sm font-medium text-note-teal">查看全部文章 →</Link>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="overflow-hidden rounded-lg border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">标题</th>
                    <th className="px-4 py-3 font-medium">分类</th>
                    <th className="px-4 py-3 font-medium">状态</th>
                    <th className="px-4 py-3 font-medium">发布时间</th>
                    <th className="px-4 py-3 font-medium">浏览量</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {posts.slice(0, 5).map((post) => (
                    <tr key={post.id}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-16 overflow-hidden rounded-md">
                            <Image src={post.image} alt="" fill className="object-cover" sizes="64px" />
                          </div>
                          <span className="font-medium text-note-ink">{post.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{post.category}</td>
                      <td className="px-4 py-3"><span className="rounded-md bg-note-mint px-2 py-1 text-xs text-note-teal">{getPostStatusLabel(post.status)}</span></td>
                      <td className="px-4 py-3 text-muted-foreground">{post.publishedAt}</td>
                      <td className="px-4 py-3">{post.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </AdminCard>

        <SidePanel title="快速操作">
          <div className="space-y-3">
            {quickActions.map((action) => (
              <QuickActionRow key={action.label} {...action} />
            ))}
          </div>
        </SidePanel>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminCard>
          <CardHeader className="flex-row items-center justify-between p-5">
            <CardTitle className="text-lg tracking-normal">最新评论</CardTitle>
            <Link href="/admin/comments" className="text-sm font-medium text-note-teal">查看全部评论 →</Link>
          </CardHeader>
          <CardContent className="space-y-4 p-5 pt-0">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-center justify-between gap-4 rounded-lg border border-slate-100 p-3">
                <div className="min-w-0">
                  <p className="font-medium text-note-ink">{comment.author}</p>
                  <p className="line-clamp-1 text-sm text-muted-foreground">{comment.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">评论于：{comment.postTitle}</p>
                </div>
                <span className="rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700">{getCommentStatusLabel(comment.status)}</span>
              </div>
            ))}
          </CardContent>
        </AdminCard>

        <AdminCard>
          <CardHeader className="p-5">
            <CardTitle className="text-lg tracking-normal">待办任务</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 p-5 pt-0">
            {tasks.map((task) => (
              <div key={task.title} className="flex gap-3">
                <Circle className="mt-1 h-4 w-4 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-note-ink">{task.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">及时处理用户互动，维护社区氛围。</p>
                </div>
                <span className="h-fit rounded-md bg-slate-100 px-2 py-1 text-xs text-muted-foreground">{task.due}</span>
              </div>
            ))}
          </CardContent>
        </AdminCard>
      </div>
    </div>
  );
}
