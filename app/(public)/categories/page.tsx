import { ArrowRight, Box, Code2, PenTool } from "lucide-react";
import Link from "next/link";

import { ArticleCard } from "@/components/public/article-card";
import { AuthorMiniCard, BlockHeading, SidebarPanel, SurfaceCard, TagPill } from "@/components/public/page-blocks";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { categoryTabs, popularTags, recommendedAuthors } from "@/lib/public-page-data";
import { getCategories, getPublishedPosts } from "@/services/blog-service";

export default function CategoriesPage() {
  const categories = getCategories();
  const posts = getPublishedPosts();
  const featuredCategory = categories[1];

  return (
    <div className="page-shell space-y-8 py-8">
      <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="space-y-6">
          <div>
            <h1 className="text-[42px] font-semibold tracking-normal text-note-ink">分类与发现</h1>
            <p className="mt-3 text-base leading-7 text-muted-foreground">探索不同领域的精选内容，发现有价值的见解与灵感。</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {categoryTabs.map((tab, index) => (
              <TagPill key={tab} active={index === 0}>{tab}</TagPill>
            ))}
          </div>
        </div>

        <SurfaceCard className="overflow-hidden bg-gradient-to-br from-teal-50 via-white to-slate-50">
          <CardContent className="grid gap-6 p-8 md:grid-cols-[0.9fr_1fr] md:items-center">
            <div className="relative h-44 rounded-lg bg-note-mint">
              <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-note-teal text-white shadow-soft">
                <Box className="h-9 w-9" />
              </div>
              {["技术", "生活", "产品", "设计", "电商"].map((label, index) => (
                <span
                  key={label}
                  className="absolute rounded-md bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm"
                  style={{
                    left: `${18 + (index % 3) * 28}%`,
                    top: `${18 + Math.floor(index / 3) * 42}%`,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
            <div className="space-y-4">
              <TagPill>本周推荐分类</TagPill>
              <div>
                <h2 className="text-3xl font-semibold tracking-normal text-note-ink">{featuredCategory.name}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{featuredCategory.description}</p>
              </div>
              <div className="grid grid-cols-3 divide-x text-sm">
                <div><p className="text-xl font-semibold">{featuredCategory.postCount}</p><p className="text-muted-foreground">文章数</p></div>
                <div className="pl-4"><p className="text-xl font-semibold">12.8K</p><p className="text-muted-foreground">关注度</p></div>
                <div className="pl-4"><p className="text-xl font-semibold">18</p><p className="text-muted-foreground">作者</p></div>
              </div>
              <Button asChild className="gap-2">
                <Link href="/articles">探索产品分类 <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </CardContent>
        </SurfaceCard>
      </section>

      <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-9">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground">排序：</span>
            <TagPill active>最新</TagPill>
            <TagPill>最热</TagPill>
            <TagPill>推荐</TagPill>
            <span className="ml-auto text-muted-foreground">共 128 篇文章</span>
          </div>

          {categories.slice(0, 3).map((category, index) => {
            const Icon = index === 0 ? Code2 : index === 1 ? Box : PenTool;
            return (
              <section key={category.slug} className="space-y-5">
                <BlockHeading
                  title={category.name}
                  action={<Link href="/articles" className="text-sm font-medium text-note-teal">查看全部 →</Link>}
                />
                <div className="flex items-center gap-2 text-note-teal">
                  <Icon className="h-5 w-5" />
                  <span className="text-sm text-muted-foreground">{category.description}</span>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {posts.slice(index, index + 3).map((post) => (
                    <ArticleCard key={`${category.slug}-${post.id}`} post={{ ...post, category: category.name }} />
                  ))}
                </div>
              </section>
            );
          })}
        </main>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <SidebarPanel title="热门标签">
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, index) => (
                <span key={tag} className="rounded-md bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
                  {tag} <span className="ml-1 text-xs text-muted-foreground">{index % 2 ? "12.8K" : "20.6K"}</span>
                </span>
              ))}
            </div>
          </SidebarPanel>
          <SidebarPanel title="推荐作者">
            <div className="space-y-3">
              {recommendedAuthors.map((author) => (
                <AuthorMiniCard key={author.name} {...author} />
              ))}
            </div>
          </SidebarPanel>
          <SidebarPanel title="订阅精选内容">
            <div className="space-y-4">
              <p className="text-sm leading-6 text-muted-foreground">每周一封精选内容，发现和灵感不错过任何更新。</p>
              <Button className="w-full">立即订阅</Button>
            </div>
          </SidebarPanel>
        </aside>
      </div>
    </div>
  );
}
