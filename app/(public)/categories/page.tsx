import { ArrowRight, BookOpen, Clock3, Code2, FileText, FolderOpen, Layers3, PenTool, Search, Sparkles } from "lucide-react";
import Link from "next/link";

import { BlockHeading, SidebarPanel, SurfaceCard } from "@/components/public/page-blocks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { getBlogStats, getCategories, getPublishedPosts } from "@/services/blog-service";
import type { Category, Post } from "@/types/blog";

type CategoriesPageProps = {
  searchParams?: Promise<{ category?: string; sort?: string }>;
};

const sortOptions = [
  { label: "最新", value: "latest" },
  { label: "阅读最多", value: "popular" },
  { label: "精选", value: "featured" },
];

const categoryIcons = [Code2, Layers3, PenTool, BookOpen, Sparkles];

function parseViews(value: string) {
  const normalized = value.trim().toUpperCase();

  if (normalized.endsWith("K")) {
    return Math.round(Number(normalized.slice(0, -1)) * 1000);
  }

  return Number(normalized.replace(/,/g, "")) || 0;
}

function hrefFor(categorySlug: string | undefined, sort: string) {
  const params = new URLSearchParams();
  if (categorySlug) params.set("category", categorySlug);
  if (sort !== "latest") params.set("sort", sort);
  const query = params.toString();
  return query ? `/categories?${query}` : "/categories";
}

function sortPosts(posts: Post[], sort: string) {
  const items = [...posts];

  if (sort === "popular") {
    return items.sort((a, b) => parseViews(b.views) - parseViews(a.views));
  }

  if (sort === "featured") {
    return items.sort((a, b) => Number(b.featured) - Number(a.featured) || b.publishedAt.localeCompare(a.publishedAt));
  }

  return items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

function CategorySummary({
  category,
  active,
  index,
  sort,
}: {
  category: Category;
  active: boolean;
  index: number;
  sort: string;
}) {
  const Icon = categoryIcons[index % categoryIcons.length];

  return (
    <Link
      href={hrefFor(category.slug, sort)}
      className={`group flex items-start gap-3 rounded-md border p-4 transition ${
        active ? "border-note-teal bg-note-mint/70" : "border-slate-200 bg-white hover:border-note-teal/40 hover:bg-slate-50"
      }`}
    >
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md ${active ? "bg-note-teal text-white" : "bg-slate-100 text-note-teal"}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center justify-between gap-3">
          <span className="font-semibold text-note-ink group-hover:text-note-teal">{category.name}</span>
          <span className="rounded-md bg-white px-2 py-0.5 text-xs text-muted-foreground">{category.postCount}</span>
        </span>
        <span className="mt-1 line-clamp-2 block text-sm leading-6 text-muted-foreground">{category.description}</span>
      </span>
    </Link>
  );
}

function ArticleRow({ post }: { post: Post }) {
  return (
    <Link href={`/articles/${post.slug}`} className="group block rounded-md border border-slate-200 bg-white p-5 transition hover:border-note-teal/40 hover:bg-slate-50">
      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <Badge>{post.category}</Badge>
        <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{post.publishedAt}</span>
        <span>{post.readingTime}</span>
        {post.featured ? <span className="rounded-md bg-amber-50 px-2 py-0.5 text-amber-700">精选</span> : null}
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-normal text-note-ink group-hover:text-note-teal">{post.title}</h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
        </div>
        <div className="flex gap-5 text-sm text-muted-foreground md:justify-end">
          <span>{post.views} 阅读</span>
          <span>{post.likes} 赞</span>
        </div>
      </div>
    </Link>
  );
}

export default async function CategoriesPage({ searchParams }: CategoriesPageProps) {
  const params = (await searchParams) ?? {};
  const categories = await getCategories();
  const posts = await getPublishedPosts();
  const stats = await getBlogStats();
  const activeCategory = categories.find((category) => category.slug === params.category);
  const activeSort = sortOptions.some((option) => option.value === params.sort) ? params.sort! : "latest";
  const scopedPosts = activeCategory ? posts.filter((post) => post.category === activeCategory.name) : posts;
  const visiblePosts = sortPosts(scopedPosts, activeSort);
  const latestPost = posts[0];

  return (
    <div className="page-shell py-8">
      <section className="border-b border-slate-200 pb-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-muted-foreground">
              <FolderOpen className="h-4 w-4 text-note-teal" />
              个人记录索引
            </div>
            <div>
              <h1 className="text-4xl font-semibold tracking-normal text-note-ink">分类</h1>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                按主题整理文章，快速回到技术、产品、设计、生活与 AI 相关的记录。
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <SurfaceCard>
                <CardContent className="p-4">
                  <p className="text-2xl font-semibold text-note-ink">{stats.totalCategories}</p>
                  <p className="mt-1 text-sm text-muted-foreground">分类</p>
                </CardContent>
              </SurfaceCard>
              <SurfaceCard>
                <CardContent className="p-4">
                  <p className="text-2xl font-semibold text-note-ink">{stats.publishedPosts}</p>
                  <p className="mt-1 text-sm text-muted-foreground">已发布文章</p>
                </CardContent>
              </SurfaceCard>
              <SurfaceCard>
                <CardContent className="p-4">
                  <p className="text-2xl font-semibold text-note-ink">{stats.totalViewsLabel}</p>
                  <p className="mt-1 text-sm text-muted-foreground">累计阅读</p>
                </CardContent>
              </SurfaceCard>
            </div>
          </div>

          <SurfaceCard>
            <CardContent className="space-y-4 p-5">
              <p className="text-sm font-medium text-muted-foreground">最近更新</p>
              {latestPost ? (
                <Link href={`/articles/${latestPost.slug}`} className="group block">
                  <Badge>{latestPost.category}</Badge>
                  <h2 className="mt-3 text-lg font-semibold tracking-normal text-note-ink group-hover:text-note-teal">{latestPost.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{latestPost.excerpt}</p>
                </Link>
              ) : (
                <p className="text-sm leading-6 text-muted-foreground">发布文章后，这里会显示最新记录。</p>
              )}
            </CardContent>
          </SurfaceCard>
        </div>
      </section>

      <section className="grid gap-7 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-7">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <BlockHeading
                title={activeCategory ? activeCategory.name : "全部分类"}
                description={activeCategory?.description ?? "选择一个分类，查看该主题下的全部记录。"}
              />
              <span className="text-sm text-muted-foreground">共 {visiblePosts.length} 篇</span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              <Link
                href={hrefFor(undefined, activeSort)}
                className={`rounded-md border p-4 text-sm font-medium transition ${
                  activeCategory ? "border-slate-200 bg-white text-slate-600 hover:border-note-teal/40" : "border-note-teal bg-note-teal text-white"
                }`}
              >
                全部分类
              </Link>
              {categories.map((category, index) => (
                <CategorySummary
                  key={category.slug}
                  category={category}
                  index={index}
                  active={category.slug === activeCategory?.slug}
                  sort={activeSort}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-y border-slate-200 py-4">
            <span className="mr-2 text-sm text-muted-foreground">排序</span>
            {sortOptions.map((option) => (
              <Link
                key={option.value}
                href={hrefFor(activeCategory?.slug, option.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  option.value === activeSort ? "bg-note-teal text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-note-teal/40"
                }`}
              >
                {option.label}
              </Link>
            ))}
          </div>

          <div className="space-y-4">
            {visiblePosts.length ? (
              visiblePosts.map((post) => <ArticleRow key={post.id} post={post} />)
            ) : (
              <SurfaceCard>
                <CardContent className="flex items-start gap-3 p-6">
                  <Search className="mt-1 h-5 w-5 text-note-teal" />
                  <div>
                    <p className="font-semibold text-note-ink">暂无文章</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">这个分类还没有已发布内容，可以先查看全部文章或归档。</p>
                  </div>
                </CardContent>
              </SurfaceCard>
            )}
          </div>
        </main>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <SidebarPanel title="分类概览">
            <div className="space-y-3">
              {categories.map((category) => (
                <Link key={category.slug} href={hrefFor(category.slug, activeSort)} className="flex items-center justify-between rounded-md px-2 py-2 text-sm transition hover:bg-slate-50">
                  <span className="text-note-ink">{category.name}</span>
                  <span className="text-muted-foreground">{category.postCount}</span>
                </Link>
              ))}
            </div>
          </SidebarPanel>

          <SidebarPanel title="继续浏览">
            <div className="space-y-3">
              <Button asChild className="w-full justify-between">
                <Link href="/archives">查看归档 <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-between">
                <Link href="/articles">全部文章 <FileText className="h-4 w-4" /></Link>
              </Button>
            </div>
          </SidebarPanel>
        </aside>
      </section>
    </div>
  );
}
