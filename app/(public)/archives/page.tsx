import { Archive, BookOpen, CalendarDays, ChevronDown, Eye, Search, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { MetricTile, MiniArticleCard, SidebarPanel, SurfaceCard, TagPill } from "@/components/public/page-blocks";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { archiveStats, archiveYears, popularTags } from "@/lib/public-page-data";
import { getArchiveYears, getCategories, getPublishedPosts } from "@/services/blog-service";

export default function ArchivesPage() {
  const years = getArchiveYears();
  const categories = getCategories();
  const posts = getPublishedPosts();

  return (
    <div className="page-shell space-y-8 py-8">
      <section className="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 px-8 py-12 text-center">
        <Image
          src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80"
          alt=""
          fill
          priority
          className="object-cover opacity-25"
          sizes="1180px"
        />
        <div className="relative mx-auto max-w-3xl space-y-5">
          <h1 className="text-[42px] font-semibold tracking-normal text-note-ink">探索知识的足迹</h1>
          <p className="text-base text-muted-foreground">通过搜索与归档，发现有价值的内容和灵感</p>
          <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-lg border bg-white p-2 shadow-sm">
            <Search className="ml-3 h-5 w-5 text-muted-foreground" />
            <Input className="h-11 border-0 px-0 focus-visible:ring-0" placeholder="搜索文章、关键词、标签或内容..." />
            <Button className="h-11 px-8">搜索</Button>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-4 gap-4 pt-2">
            {archiveStats.map((stat) => (
              <div key={stat.label} className="border-r last:border-r-0">
                <p className="text-2xl font-semibold text-note-ink">{stat.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SurfaceCard>
        <CardContent className="flex flex-wrap items-center gap-4 p-4 text-sm">
          <span className="font-medium text-note-ink">筛选条件：</span>
          <Button variant="outline" className="gap-8">全部年份 <ChevronDown className="h-4 w-4" /></Button>
          <Button variant="outline" className="gap-8">全部分类 <ChevronDown className="h-4 w-4" /></Button>
          <Button variant="outline" className="gap-8">选择标签 <ChevronDown className="h-4 w-4" /></Button>
          <Button variant="outline" className="ml-auto">清空筛选</Button>
        </CardContent>
      </SurfaceCard>

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-8">
          <div className="relative space-y-8 border-l border-slate-200 pl-8">
            {years.map((year, yearIndex) => (
              <section key={year.year} className="relative space-y-5">
                <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-white bg-note-teal shadow" />
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-semibold text-note-ink">{year.year} 年</h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-muted-foreground">
                    {year.months.reduce((total, month) => total + month.posts.length, 0)} 篇文章
                  </span>
                  {yearIndex > 0 ? <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" /> : null}
                </div>
                {yearIndex === 0 ? (
                  <div className="space-y-6">
                    {year.months.map((month) => (
                      <div key={month.month} className="relative space-y-3">
                        <div className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-note-teal" />
                          <h3 className="text-lg font-semibold text-note-ink">{month.month}</h3>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-muted-foreground">{month.posts.length} 篇文章</span>
                        </div>
                        <div className="space-y-3">
                          {month.posts.map((post) => (
                            <SurfaceCard key={post.id} className="transition hover:shadow-soft">
                              <CardContent className="grid gap-5 p-4 sm:grid-cols-[190px_1fr_24px]">
                                <div className="relative h-24 overflow-hidden rounded-md bg-slate-100">
                                  <Image src={post.image} alt="" fill className="object-cover" sizes="190px" />
                                </div>
                                <div className="min-w-0 space-y-2">
                                  <Link href={`/articles/${post.slug}`} className="text-xl font-semibold text-note-ink hover:text-note-teal">
                                    {post.title}
                                  </Link>
                                  <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                                    <TagPill>{post.category}</TagPill>
                                    <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{post.publishedAt}</span>
                                    <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{post.views}</span>
                                  </div>
                                </div>
                                <BookOpen className="hidden h-4 w-4 self-center text-muted-foreground sm:block" />
                              </CardContent>
                            </SurfaceCard>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <SurfaceCard>
            <CardContent className="grid gap-8 p-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div className="flex items-center gap-5">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-note-mint text-note-teal">
                  <Search className="h-9 w-9" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-note-ink">找不到想要的内容？</h2>
                  <p className="mt-2 text-sm text-muted-foreground">试试使用更具体的关键词，或浏览分类与标签。</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href="/articles">浏览全部文章</Link>
                  </Button>
                </div>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-note-ink">搜索建议</p>
                <p>使用更具体的关键词，例如「性能优化」而非「优化」。</p>
                <p>尝试组合关键词，例如「设计系统 组件」。</p>
                <p>使用标签分类筛选，快速定位感兴趣的内容。</p>
              </div>
            </CardContent>
          </SurfaceCard>
        </main>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <SidebarPanel title="归档统计">
            <div className="space-y-4">
              <MetricTile value="128" label="全部文章" icon={<Archive className="h-5 w-5" />} />
              {categories.map((category) => (
                <div key={category.slug} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{category.name}</span>
                  <span className="font-medium text-note-ink">{category.postCount}</span>
                </div>
              ))}
            </div>
          </SidebarPanel>
          <SidebarPanel title="按年份浏览">
            <div className="space-y-3">
              {archiveYears.map((item) => (
                <div key={item.year} className="flex items-center justify-between rounded-md p-2 hover:bg-slate-50">
                  <span className="inline-flex items-center gap-2 text-sm text-slate-600">
                    <CalendarDays className="h-4 w-4" />
                    {item.year}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </SidebarPanel>
          <SidebarPanel title="热门关键词">
            <div className="flex flex-wrap gap-2">
              {popularTags.slice(0, 8).map((tag, index) => (
                <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-note-mint px-2.5 py-1 text-xs text-note-teal">
                  <Tag className="h-3 w-3" />
                  {tag} {index + 5}
                </span>
              ))}
            </div>
          </SidebarPanel>
          <SidebarPanel title="最近发布">
            <div className="space-y-2">
              {posts.slice(0, 3).map((post) => (
                <MiniArticleCard key={post.id} post={post} />
              ))}
            </div>
          </SidebarPanel>
        </aside>
      </div>
    </div>
  );
}
