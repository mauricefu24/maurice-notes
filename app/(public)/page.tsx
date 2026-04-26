import { ArrowRight, UserRound } from "lucide-react";
import Link from "next/link";

import { AuthorProfileCard } from "@/components/public/home/author-profile-card";
import { CategoryTile } from "@/components/public/home/category-tile";
import { FeaturedArticleCard } from "@/components/public/home/featured-article-card";
import { HeroVisual } from "@/components/public/home/hero-visual";
import { HomeBadge } from "@/components/public/home/home-badge";
import { LatestArticleItem } from "@/components/public/home/latest-article-item";
import { SectionHeading } from "@/components/public/home/section-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBlogStats, getCategories, getFeaturedPosts, getPublishedPosts } from "@/services/blog-service";

export default async function HomePage() {
  const featuredArticles = await getFeaturedPosts();
  const latestArticles = (await getPublishedPosts()).slice(0, 4);
  const categories = await getCategories();
  const stats = await getBlogStats();
  const authorStats = [
    { label: "阅读总数", value: stats.totalViewsLabel },
    { label: "文章总数", value: `${stats.totalPosts}` },
    { label: "分类数量", value: `${stats.totalCategories}` },
  ];

  return (
    <div className="bg-white">
      <section className="page-shell grid gap-10 pb-12 pt-8 lg:grid-cols-[0.76fr_1fr] lg:items-center">
        <div className="space-y-7">
          <HomeBadge>分享思考 · 记录成长 · 设计更好的产品与生活</HomeBadge>
          <div className="space-y-5">
            <h1 className="text-[44px] font-semibold leading-[1.16] tracking-normal text-note-ink md:text-[56px]">
              通过文字与代码
              <br />
              探索<span className="text-note-teal">更大的世界</span>
            </h1>
            <p className="max-w-[560px] text-[15px] leading-8 text-slate-600">
              这里是 Maurice 的数字花园。我记录技术、产品、设计与生活中的思考与实践，希望与你一起学习与成长。
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="h-12 gap-2 px-6">
              <Link href="/articles">
                浏览最新文章
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 gap-2 px-6">
              <Link href="/about">
                <UserRound className="h-4 w-4" />
                关于我
              </Link>
            </Button>
          </div>
        </div>
        <HeroVisual />
      </section>

      <section className="page-shell space-y-6 py-6">
        <SectionHeading title="精选文章" href="/articles" action="查看全部" />
        <div className="grid gap-6 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <FeaturedArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="page-shell space-y-6 py-6">
        <SectionHeading title="分类导航" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {categories.map((category) => (
            <CategoryTile key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="page-shell grid gap-7 py-6 lg:grid-cols-[1.45fr_0.85fr]">
        <Card className="border-slate-200/80 shadow-none">
          <CardContent className="space-y-2 p-5">
            <SectionHeading title="最新文章" href="/articles" action="查看全部" />
            <div className="divide-y divide-slate-100">
              {latestArticles.map((article) => (
                <LatestArticleItem key={article.id} article={article} />
              ))}
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <AuthorProfileCard stats={authorStats} />
        </div>
      </section>
    </div>
  );
}
