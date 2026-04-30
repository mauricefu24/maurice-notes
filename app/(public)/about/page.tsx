import { ArrowRight, BookOpen, CalendarDays, FolderOpen, Mail, MapPin, NotebookPen, Search, Sparkles, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { SurfaceCard } from "@/components/public/page-blocks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { aboutContact } from "@/lib/public-page-data";
import { getBlogStats, getCategories, getPublishedPosts } from "@/services/blog-service";

const focusAreas = [
  { title: "产品与数字化", body: "业务判断、系统建设、协作流程", icon: FolderOpen },
  { title: "技术与工具", body: "工程实践、AI 工具、效率工作流", icon: Sparkles },
  { title: "复盘与生活", body: "长期观察、阅读、个人节奏", icon: NotebookPen },
];

const principles = [
  "真实项目",
  "持续记录",
  "按主题沉淀",
  "可回溯复盘",
];

export default async function AboutPage() {
  const [stats, categories, posts] = await Promise.all([
    getBlogStats(),
    getCategories(),
    getPublishedPosts(),
  ]);
  const latestPosts = posts.slice(0, 3);
  const primaryContact = aboutContact[0] ?? "hello@mauricenotes.com";
  const location = aboutContact.find((item) => item.includes("中国")) ?? "中国";
  const aboutStats = [
    { label: "已发布", value: `${stats.publishedPosts}` },
    { label: "分类", value: `${stats.totalCategories}` },
    { label: "累计阅读", value: stats.totalViewsLabel },
  ];

  return (
    <div className="page-shell space-y-10 py-8">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="grid min-h-[520px] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[300px] lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
            <div className="absolute inset-0 bg-slate-950/25" />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/20 bg-white/15 p-4 text-white backdrop-blur-md">
              <p className="text-sm text-white/72">Maurice Notes</p>
              <p className="mt-1 text-2xl font-semibold tracking-normal">Personal Knowledge Base</p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-md bg-note-mint px-3 py-1.5 text-sm font-medium text-note-teal">
                <BookOpen className="h-4 w-4" />
                个人记录平台
              </div>
              <div>
                <h1 className="text-4xl font-semibold leading-tight tracking-normal text-note-ink md:text-5xl">
                  Maurice
                </h1>
                <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                  用文章保存产品、技术、AI 工具和生活复盘，让碎片经验变成可检索的长期资产。
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {principles.map((item) => (
                  <span key={item} className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="rounded-lg bg-slate-50 p-4">
                  <p className="text-3xl font-semibold text-note-ink">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-11 gap-2 px-5">
                <Link href="/articles">浏览文章 <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" className="h-11 gap-2 px-5">
                <Link href="/archives"><Search className="h-4 w-4" />查看归档</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {focusAreas.map((item) => {
          const Icon = item.icon;
          return (
            <SurfaceCard key={item.title}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-normal text-note-ink">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
                  </div>
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-note-mint text-note-teal">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </SurfaceCard>
          );
        })}
      </section>

      <section className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="bg-note-ink p-6 text-white">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-note-mint">Content Index</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-normal">内容索引</h2>
              </div>
              <Button asChild variant="secondary" size="sm">
                <Link href="/categories">全部分类</Link>
              </Button>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/68">
              按主题进入记录，比按时间浏览更适合回查方法、工具和项目复盘。
            </p>
          </div>

          <div className="grid gap-0 divide-y divide-slate-100 md:grid-cols-2 md:divide-x md:divide-y-0">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/categories?category=${category.slug}`}
                className="group flex min-h-36 flex-col justify-between p-5 transition hover:bg-note-mint"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-slate-100 text-note-teal group-hover:bg-white">
                    <Tag className="h-5 w-5" />
                  </div>
                  <span className="text-3xl font-semibold text-slate-200 group-hover:text-note-teal/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold tracking-normal text-note-ink group-hover:text-note-teal">{category.name}</h3>
                    <span className="rounded-md bg-slate-50 px-2 py-1 text-xs text-muted-foreground">{category.postCount} 篇</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-sm font-medium text-note-teal">Contact</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-normal text-note-ink">联系</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-3 rounded-md bg-slate-50 p-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-note-mint text-note-teal">
                  <Mail className="h-4 w-4" />
                </span>
                <span className="min-w-0 break-all">{primaryContact}</span>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-slate-50 p-3">
                <span className="grid h-9 w-9 place-items-center rounded-md bg-note-mint text-note-teal">
                  <MapPin className="h-4 w-4" />
                </span>
                {location}
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-note-teal">Latest</p>
                <h2 className="mt-1 text-2xl font-semibold tracking-normal text-note-ink">最近更新</h2>
              </div>
              <Link href="/articles" className="text-sm font-medium text-note-teal">全部</Link>
            </div>
            <div className="space-y-2">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className="group block rounded-md p-3 transition hover:bg-slate-50">
                  <div className="flex items-center justify-between gap-3">
                    <Badge>{post.category}</Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {post.publishedAt}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-2 font-medium leading-6 text-note-ink group-hover:text-note-teal">{post.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
