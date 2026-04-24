import { BarChart3, Edit3, MoreHorizontal, Plus, Search, Tags, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AdminCard, AdminFilterBar, AdminPageTitle, AdminSearchInput, AdminStatCard, AdminStatusBadge, MiniPostRank, QuickActionRow, SelectLike, SidePanel } from "@/components/admin/admin-blocks";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminMetrics, contentHealth } from "@/lib/admin-data";
import { getPostStatusLabel } from "@/lib/status-labels";
import { getAllPosts } from "@/services/blog-service";

export default function AdminPostsPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <AdminPageTitle title="文章管理" description="管理站点中的所有文章内容，支持发布、编辑和数据分析。" />
        <Button asChild className="h-11 gap-2 px-5">
          <Link href="/admin/posts/new">
            <Plus className="h-4 w-4" />
            新建文章
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {adminMetrics.map((metric) => (
          <AdminStatCard key={metric.label} {...metric} />
        ))}
      </div>

      <AdminFilterBar>
        <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-md border border-slate-200 px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <AdminSearchInput placeholder="搜索文章标题、内容或标签..." />
        </div>
        <SelectLike label="所有分类" />
        <SelectLike label="所有作者" />
        <SelectLike label="选择日期范围" />
        <Button asChild className="h-11 gap-2">
          <Link href="/admin/posts/new">
            <Plus className="h-4 w-4" />
            新建文章
          </Link>
        </Button>
      </AdminFilterBar>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <AdminCard>
          <CardContent className="space-y-5 p-5">
            <Tabs defaultValue="all">
              <TabsList className="bg-transparent p-0">
                <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-note-teal data-[state=active]:shadow-none">全部 128</TabsTrigger>
                <TabsTrigger value="published" className="rounded-none border-b-2 border-transparent data-[state=active]:border-note-teal data-[state=active]:shadow-none">已发布 96</TabsTrigger>
                <TabsTrigger value="draft" className="rounded-none border-b-2 border-transparent data-[state=active]:border-note-teal data-[state=active]:shadow-none">草稿 20</TabsTrigger>
                <TabsTrigger value="review" className="rounded-none border-b-2 border-transparent data-[state=active]:border-note-teal data-[state=active]:shadow-none">审核中 12</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="overflow-hidden rounded-lg border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-muted-foreground">
                  <tr>
                    <th className="w-10 px-4 py-3"><input type="checkbox" aria-label="全选文章" /></th>
                    <th className="px-4 py-3 font-medium">文章</th>
                    <th className="px-4 py-3 font-medium">作者</th>
                    <th className="px-4 py-3 font-medium">分类</th>
                    <th className="px-4 py-3 font-medium">状态</th>
                    <th className="px-4 py-3 font-medium">发布时间</th>
                    <th className="px-4 py-3 font-medium">浏览量</th>
                    <th className="px-4 py-3 font-medium">评论</th>
                    <th className="px-4 py-3 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {posts.concat(posts.slice(0, 4)).map((post, index) => (
                    <tr key={`${post.id}-${index}`} className="hover:bg-slate-50/70">
                      <td className="px-4 py-4"><input type="checkbox" aria-label={`选择 ${post.title}`} /></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-16 w-24 overflow-hidden rounded-md bg-slate-100">
                            <Image src={post.image} alt="" fill className="object-cover" sizes="88px" />
                          </div>
                          <div className="min-w-[210px]">
                            <p className="line-clamp-2 font-medium text-note-ink">{post.title}</p>
                            <p className="line-clamp-1 text-xs text-muted-foreground">{post.excerpt}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="relative h-7 w-7 overflow-hidden rounded-full">
                            <Image src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80" alt="" fill className="object-cover" sizes="28px" />
                          </div>
                          <span>Maurice</span>
                        </div>
                      </td>
                      <td className="px-4 py-4"><span className="rounded-md bg-note-mint px-2 py-1 text-xs text-note-teal">{post.category}</span></td>
                      <td className="px-4 py-4"><AdminStatusBadge status={getPostStatusLabel(post.status)} /></td>
                      <td className="px-4 py-4 text-muted-foreground">{post.publishedAt}<br /><span className="text-xs">10:30</span></td>
                      <td className="px-4 py-4">{post.views}</td>
                      <td className="px-4 py-4">{post.comments || "-"}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="icon" aria-label="编辑">
                            <Link href={`/admin/posts/${post.id}/edit`}>
                              <Edit3 className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" size="icon" aria-label="数据">
                            <BarChart3 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="更多">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>已选择 0 项</span>
                <Button variant="outline" size="sm">批量发布</Button>
                <Button variant="outline" size="sm">批量设为草稿</Button>
                <Button variant="outline" size="sm" className="text-red-600"><Trash2 className="mr-1 h-4 w-4" />批量删除</Button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">共 128 条</span>
                <Button variant="outline" size="sm">10 条/页</Button>
                <Button size="sm">1</Button>
                <Button variant="ghost" size="sm">2</Button>
                <Button variant="ghost" size="sm">3</Button>
                <Button variant="ghost" size="sm">...</Button>
                <Button variant="ghost" size="sm">13</Button>
              </div>
            </div>
          </CardContent>
        </AdminCard>

        <aside className="space-y-5">
          <SidePanel title="热门文章">
            <div className="space-y-4">
              {posts.slice(0, 5).map((post, index) => (
                <MiniPostRank key={post.id} rank={index + 1} title={post.title} image={post.image} views={post.views} />
              ))}
            </div>
          </SidePanel>

          <SidePanel title="内容洞察">
            <div className="space-y-5">
              {contentHealth.map((item) => (
                <div key={item.label} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <div className="mt-1 flex items-end justify-between">
                    <p className="text-2xl font-semibold text-note-ink">{item.value}</p>
                    <p className="text-xs font-medium text-emerald-600">较上周 {item.delta}</p>
                  </div>
                </div>
              ))}
            </div>
          </SidePanel>

          <SidePanel title="快速操作">
            <div className="space-y-3">
              <QuickActionRow label="新建文章" icon={Plus} href="/admin/posts/new" />
              <QuickActionRow label="文章分类" icon={Tags} href="/categories" />
              <QuickActionRow label="标签管理" icon={Tags} href="/categories" />
              <QuickActionRow label="草稿箱" icon={Edit3} href="/admin/posts" />
              <QuickActionRow label="回收站" icon={Trash2} href="/admin/posts" />
            </div>
          </SidePanel>
        </aside>
      </div>
    </div>
  );
}
