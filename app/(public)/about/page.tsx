import { ArrowRight, BookOpen, CalendarDays, FolderOpen, Mail, NotebookPen, Search, Tag, UserRound } from "lucide-react";
import Link from "next/link";

import { BlockHeading, SurfaceCard } from "@/components/public/page-blocks";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { aboutContact, aboutFaqs, values } from "@/lib/public-page-data";
import { getBlogStats, getCategories, getPublishedPosts } from "@/services/blog-service";

const writingPrinciples = [
  {
    title: "先记录，再整理",
    body: "把项目里的判断、工具使用、产品观察和生活经验先留下来，再逐步沉淀为可复用的文章。",
    icon: NotebookPen,
  },
  {
    title: "以主题组织内容",
    body: "文章会被放进清晰的分类和归档里，方便之后按主题、时间和关键词重新找到。",
    icon: FolderOpen,
  },
  {
    title: "保留真实上下文",
    body: "这里不追求包装成标准答案，更重视当时的问题、约束、取舍和复盘。",
    icon: BookOpen,
  },
];

export default async function AboutPage() {
  const [stats, categories, posts] = await Promise.all([
    getBlogStats(),
    getCategories(),
    getPublishedPosts(),
  ]);
  const latestPost = posts[0];
  const aboutStats = [
    { label: "已发布", value: `${stats.publishedPosts}` },
    { label: "分类", value: `${stats.totalCategories}` },
    { label: "累计阅读", value: stats.totalViewsLabel },
    { label: "评论", value: `${stats.totalComments}` },
  ];

  return (
    <div className="page-shell space-y-12 py-10">
      <section className="grid gap-10 border-b border-slate-100 pb-12 lg:grid-cols-[minmax(0,0.9fr)_360px] lg:items-start">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-md bg-note-mint px-3 py-1.5 text-sm font-medium text-note-teal">
            <UserRound className="h-4 w-4" />
            Maurice 的个人记录平台
          </div>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-[42px] font-semibold leading-tight tracking-normal text-note-ink md:text-[56px]">
              记录工作、工具、思考和生活里的长期线索
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600">
              Maurice Notes 是我用来保存想法和实践的地方。它不是作品集，也不是简历页，而是一个持续更新的个人知识库：记录数字化、产品、技术、AI 工具和日常复盘。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 gap-2 px-6">
              <Link href="/articles">浏览文章 <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 gap-2 px-6">
              <Link href="/archives"><Search className="h-4 w-4" />按归档查找</Link>
            </Button>
          </div>
        </div>

        <SurfaceCard>
          <CardContent className="space-y-5 p-6">
            <p className="text-sm font-medium text-muted-foreground">当前记录</p>
            <div className="grid grid-cols-2 gap-4">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="border-t border-slate-100 pt-4">
                  <p className="text-3xl font-semibold text-note-ink">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
            {latestPost ? (
              <div className="rounded-md bg-slate-50 p-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">最近更新</p>
                <Link href={`/articles/${latestPost.slug}`} className="font-medium leading-6 text-note-ink hover:text-note-teal">
                  {latestPost.title}
                </Link>
                <p className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {latestPost.publishedAt}
                </p>
              </div>
            ) : null}
          </CardContent>
        </SurfaceCard>
      </section>

      <section className="space-y-6">
        <BlockHeading title="我在这里记录什么" description="内容会围绕真实经历和长期关注的问题展开。" />
        <div className="grid gap-4 md:grid-cols-3">
          {writingPrinciples.map((item) => {
            const Icon = item.icon;
            return (
              <SurfaceCard key={item.title}>
                <CardContent className="space-y-4 p-5">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-note-mint text-note-teal">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-note-ink">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
                  </div>
                </CardContent>
              </SurfaceCard>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <SurfaceCard>
          <CardContent className="space-y-5 p-6">
            <BlockHeading title="内容分类" description="从分类进入，更适合按主题浏览。" />
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href="/categories"
                  className="flex items-center justify-between rounded-md border border-slate-100 px-4 py-3 text-sm transition hover:border-note-teal hover:bg-note-mint"
                >
                  <span className="inline-flex items-center gap-2 font-medium text-note-ink">
                    <Tag className="h-4 w-4 text-note-teal" />
                    {category.name}
                  </span>
                  <span className="text-muted-foreground">{category.postCount}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </SurfaceCard>

        <SurfaceCard>
          <CardContent className="space-y-5 p-6">
            <BlockHeading title="联系" description="如果某篇记录对你有帮助，欢迎交流。" />
            <div className="space-y-3 text-sm text-slate-600">
              {aboutContact.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-md bg-note-mint text-note-teal">
                    <Mail className="h-4 w-4" />
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </SurfaceCard>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <SurfaceCard>
          <CardContent className="space-y-5 p-6">
            <BlockHeading title="记录原则" />
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="flex gap-3 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-note-mint text-note-teal">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-note-ink">{value.title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{value.body}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </SurfaceCard>

        <SurfaceCard>
          <CardContent className="space-y-5 p-6">
            <BlockHeading title="常见问题" />
            {aboutFaqs.map((faq) => (
              <div key={faq.question} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                <p className="font-medium text-note-ink">{faq.question}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </CardContent>
        </SurfaceCard>
      </section>
    </div>
  );
}
