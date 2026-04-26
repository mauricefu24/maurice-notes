import { CalendarCheck, CheckCircle2, Edit3, Eye, FileCheck2, FilePenLine, FileText, MessageSquare, PencilLine, Plus, Search, Tags, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { deletePost, updatePostStatus } from "@/app/(admin)/admin/posts/actions";
import { AdminCard, AdminFilterBar, AdminPageTitle, AdminSearchInput, AdminStatCard, AdminStatusBadge, MiniPostRank, QuickActionRow, SidePanel } from "@/components/admin/admin-blocks";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPostStatusLabel } from "@/lib/status-labels";
import { getAllPosts, getBlogStats } from "@/services/blog-service";
import type { PostStatus } from "@/types/blog";

type AdminPostsPageProps = {
  searchParams?: Promise<{ status?: string; q?: string; category?: string; author?: string; date?: string }>;
};

const statusFilters: Array<{ label: string; value: "all" | PostStatus }> = [
  { label: "全部", value: "all" },
  { label: "已发布", value: "published" },
  { label: "草稿", value: "draft" },
  { label: "审核中", value: "review" },
];

export default async function AdminPostsPage({ searchParams }: AdminPostsPageProps) {
  const params = (await searchParams) ?? {};
  const activeStatus = statusFilters.some((item) => item.value === params.status) ? params.status : "all";
  const query = String(params.q ?? "").trim();
  const activeCategory = String(params.category ?? "").trim();
  const activeAuthor = String(params.author ?? "").trim();
  const activeDate = String(params.date ?? "").trim();
  const allPosts = await getAllPosts();
  const stats = await getBlogStats();
  const categories = Array.from(new Set(allPosts.map((post) => post.category))).sort();
  const authors = Array.from(new Set(allPosts.map((post) => post.author))).sort();
  const statusMatchedPosts = activeStatus === "all" ? allPosts : allPosts.filter((post) => post.status === activeStatus);
  const posts = statusMatchedPosts.filter((post) => {
    if (activeCategory && post.category !== activeCategory) {
      return false;
    }

    if (activeAuthor && post.author !== activeAuthor) {
      return false;
    }

    if (activeDate && post.publishedAt !== activeDate) {
      return false;
    }

    if (query) {
        const content = `${post.title} ${post.excerpt} ${post.content} ${post.category} ${post.author}`.toLowerCase();
        return content.includes(query.toLowerCase());
    }

    return true;
  });
  const preservedFilters = new URLSearchParams();

  if (query) preservedFilters.set("q", query);
  if (activeCategory) preservedFilters.set("category", activeCategory);
  if (activeAuthor) preservedFilters.set("author", activeAuthor);
  if (activeDate) preservedFilters.set("date", activeDate);
  const counts = {
    all: allPosts.length,
    published: allPosts.filter((post) => post.status === "published").length,
    draft: allPosts.filter((post) => post.status === "draft").length,
    review: allPosts.filter((post) => post.status === "review").length,
  };
  const adminMetrics = [
    { label: "全部文章", value: `${stats.totalPosts}`, delta: "实时数据", icon: FileText, tone: "bg-teal-50 text-teal-700" },
    { label: "已发布", value: `${stats.publishedPosts}`, delta: "实时数据", icon: FileCheck2, tone: "bg-emerald-50 text-emerald-700" },
    { label: "草稿", value: `${stats.draftPosts}`, delta: "实时数据", icon: PencilLine, tone: "bg-orange-50 text-orange-700" },
    { label: "审核中", value: `${stats.reviewPosts}`, delta: "实时数据", icon: CalendarCheck, tone: "bg-amber-50 text-amber-700" },
    { label: "总浏览量", value: stats.totalViewsLabel, delta: "文章累计", icon: Eye, tone: "bg-blue-50 text-blue-700" },
    { label: "总评论数", value: `${stats.totalComments}`, delta: `${stats.pendingComments} 待审核`, icon: MessageSquare, tone: "bg-violet-50 text-violet-700" },
  ];
  const averageComments = stats.totalPosts ? (stats.totalPostComments / stats.totalPosts).toFixed(1) : "0";
  const contentInsights = [
    { label: "平均评论数", value: averageComments, hint: "基于文章评论字段" },
    { label: "精选文章", value: `${allPosts.filter((post) => post.featured).length}`, hint: "当前已标记精选" },
    { label: "已发布占比", value: stats.totalPosts ? `${Math.round((stats.publishedPosts / stats.totalPosts) * 100)}%` : "0%", hint: "已发布 / 全部文章" },
  ];

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
        <form action="/admin/posts" className="flex min-w-[280px] flex-1 items-center gap-2 rounded-md border border-slate-200 px-3">
          {activeStatus !== "all" ? <input type="hidden" name="status" value={activeStatus} /> : null}
          <Search className="h-4 w-4 text-muted-foreground" />
          <AdminSearchInput name="q" defaultValue={query} placeholder="搜索文章标题、内容、分类或作者..." />
          <Button type="submit" size="sm">搜索</Button>
        </form>
        <form action="/admin/posts" className="flex flex-wrap items-center gap-2">
          {activeStatus !== "all" ? <input type="hidden" name="status" value={activeStatus} /> : null}
          {query ? <input type="hidden" name="q" value={query} /> : null}
          <select name="category" defaultValue={activeCategory} className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-muted-foreground">
            <option value="">所有分类</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select name="author" defaultValue={activeAuthor} className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-muted-foreground">
            <option value="">所有作者</option>
            {authors.map((author) => (
              <option key={author} value={author}>{author}</option>
            ))}
          </select>
          <input name="date" type="date" defaultValue={activeDate} className="h-11 rounded-md border border-slate-200 bg-white px-3 text-sm text-muted-foreground" />
          <Button type="submit" variant="outline" className="h-11">筛选</Button>
          {query || activeCategory || activeAuthor || activeDate ? (
            <Button asChild variant="ghost" className="h-11">
              <Link href={activeStatus === "all" ? "/admin/posts" : `/admin/posts?status=${activeStatus}`}>清除</Link>
            </Button>
          ) : null}
        </form>
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
            <Tabs value={activeStatus}>
              <TabsList className="bg-transparent p-0">
                {statusFilters.map((filter) => (
                  <TabsTrigger
                    key={filter.value}
                    value={filter.value}
                    asChild
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-note-teal data-[state=active]:shadow-none"
                  >
                    <Link
                      href={`${filter.value === "all" ? "/admin/posts" : `/admin/posts?status=${filter.value}`}${preservedFilters.toString() ? `${filter.value === "all" ? "?" : "&"}${preservedFilters.toString()}` : ""}`}
                    >
                      {filter.label} {counts[filter.value]}
                    </Link>
                  </TabsTrigger>
                ))}
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
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50/70">
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
                      <td className="px-4 py-4 text-muted-foreground">{post.publishedAt}</td>
                      <td className="px-4 py-4">{post.views}</td>
                      <td className="px-4 py-4">{post.comments || "-"}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="icon" aria-label="编辑">
                            <Link href={`/admin/posts/${post.id}/edit`}>
                              <Edit3 className="h-4 w-4" />
                            </Link>
                          </Button>
                          {post.status === "published" ? (
                            <Button asChild variant="outline" size="icon" aria-label="预览文章">
                              <Link href={`/articles/${post.slug}`} target="_blank">
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                          ) : (
                            <Button variant="outline" size="icon" aria-label="未发布文章不可预览" disabled>
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <form action={updatePostStatus.bind(null, post.id, post.status === "published" ? "draft" : "published")}>
                            <Button
                              type="submit"
                              variant="outline"
                              size="icon"
                              aria-label={post.status === "published" ? "设为草稿" : "发布文章"}
                            >
                              {post.status === "published" ? <FilePenLine className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                            </Button>
                          </form>
                          <form action={deletePost.bind(null, post.id)}>
                            <ConfirmSubmitButton
                              message={`确认删除《${post.title}》吗？此操作不可撤销。`}
                              variant="ghost"
                              size="icon"
                              aria-label="删除文章"
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </ConfirmSubmitButton>
                          </form>
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
                <Button variant="outline" size="sm" disabled>批量发布</Button>
                <Button variant="outline" size="sm" disabled>批量设为草稿</Button>
                <Button variant="outline" size="sm" disabled className="text-red-600"><Trash2 className="mr-1 h-4 w-4" />批量删除</Button>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">共 {posts.length} 条</span>
                <Button variant="outline" size="sm" disabled>10 条/页</Button>
                <Button size="sm">1</Button>
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
              {contentInsights.map((item) => (
                <div key={item.label} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <div className="mt-1 flex items-end justify-between">
                    <p className="text-2xl font-semibold text-note-ink">{item.value}</p>
                    <p className="text-xs font-medium text-emerald-600">{item.hint}</p>
                  </div>
                </div>
              ))}
            </div>
          </SidePanel>

          <SidePanel title="快速操作">
            <div className="space-y-3">
              <QuickActionRow label="新建文章" icon={Plus} href="/admin/posts/new" />
              <QuickActionRow label="文章分类" icon={Tags} href="/admin/categories" />
              <QuickActionRow label="草稿箱" icon={Edit3} href="/admin/posts?status=draft" />
              <QuickActionRow label="审核中" icon={CalendarCheck} href="/admin/posts?status=review" />
            </div>
          </SidePanel>
        </aside>
      </div>
    </div>
  );
}
