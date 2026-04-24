import { Calendar, Clock, Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArticleActions } from "@/components/public/article-actions";
import { CommentComposer } from "@/components/public/comment-composer";
import { BlockHeading, MiniArticleCard, SidebarPanel, SurfaceCard, TagPill } from "@/components/public/page-blocks";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { codeSample, articleComments, tableOfContents } from "@/lib/public-page-data";
import { getPublishedPosts, getPostBySlug } from "@/services/blog-service";

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const related = getPublishedPosts().filter((item) => item.slug !== slug).slice(0, 3);

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <div className="page-shell py-8">
      <div className="mb-5 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-note-teal">首页</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-note-teal">文章</Link>
        <span>/</span>
        <span className="line-clamp-1 text-note-ink">{post.title}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <main className="min-w-0 space-y-8">
          <section className="space-y-5">
            <TagPill active>{post.category}</TagPill>
            <h1 className="max-w-4xl text-[42px] font-semibold leading-tight tracking-normal text-note-ink">{post.title}</h1>
            <p className="max-w-3xl text-base leading-8 text-muted-foreground">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-7 border-b pb-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <div className="relative h-11 w-11 overflow-hidden rounded-full border">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div>
                  <p className="font-medium text-note-ink">Maurice</p>
                  <p className="text-xs">产品设计师 & 独立开发者</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {post.publishedAt}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
              <span className="inline-flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {post.views} 阅读
              </span>
            </div>
            <ArticleActions title={post.title} />
          </section>

          <div className="relative h-[420px] overflow-hidden rounded-lg border border-slate-200">
            <Image src={post.image} alt="" fill className="object-cover" sizes="860px" priority />
          </div>

          <article className="prose prose-slate max-w-none prose-headings:tracking-normal prose-headings:text-note-ink prose-p:leading-8 prose-li:leading-8">
            <p>{post.content}</p>
            <h2 id="why-design-system">一、为什么需要设计系统？</h2>
            <p>
              随着产品规模扩大，界面、交互和开发实现会自然产生分叉。设计系统的价值不是限制创意，而是建立一套共同语言，让团队可以把注意力放在真正重要的问题上。
            </p>
            <ul>
              <li>降低重复决策，让设计和开发复用稳定模式。</li>
              <li>减少体验不一致，提升复杂产品中的可预测性。</li>
              <li>让新成员更快理解产品规则和协作方式。</li>
            </ul>
            <blockquote>
              <p>设计系统的目标不是限制创意，而是建立一致的基础，让团队专注于真正的创新。</p>
            </blockquote>
            <h2 id="core-steps">二、从 0 到 1：设计系统的核心步骤</h2>
            <h3>1. 需求调研与现状分析</h3>
            <p>先梳理现有界面、组件和样式差异，明确最常见、最影响效率的问题，再决定优先治理的范围。</p>
            <pre>
              <code>{codeSample}</code>
            </pre>
            <h3 id="language-definition">2. 设计语言定义</h3>
            <p>建立颜色、字体、间距、圆角、阴影等基础规范，并把它们沉淀为可复用 token。</p>
            <h3>3. 组件化设计与开发</h3>
            <p>从按钮、表单、卡片、导航等高频模块开始，让设计稿与代码组件保持同一套命名和状态模型。</p>
            <div className="rounded-lg border-l-4 border-note-teal bg-note-mint p-5 text-sm leading-7 text-slate-700">
              最佳实践：组件设计需要兼顾灵活性与一致性，提供必要的变体与配置选项，同时避免过度设计。
            </div>
            <h2 id="implementation">三、落地与持续迭代</h2>
            <p>设计系统不是一次性交付物，而是团队协作资产。真正的挑战在于版本管理、使用反馈和跨团队共识。</p>
          </article>

          <section id="comments" className="space-y-4">
            <BlockHeading title="相关文章" />
            <SurfaceCard>
              <CardContent className="grid gap-3 p-4 md:grid-cols-3">
                {related.map((item) => (
                  <MiniArticleCard key={item.id} post={item} />
                ))}
              </CardContent>
            </SurfaceCard>
          </section>

          <section className="space-y-4">
            <BlockHeading title={`评论（${articleComments.length}）`} />
            <SurfaceCard>
              <CardContent className="space-y-5 p-5">
                <CommentComposer />
                <div className="space-y-4">
                  {articleComments.map((comment) => (
                    <div key={comment.name} className="flex gap-3 border-t pt-4">
                      <div className="h-9 w-9 rounded-full bg-note-mint" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-medium text-note-ink">{comment.name}</p>
                          <p className="text-xs text-muted-foreground">{comment.time}</p>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{comment.body}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        {comment.likes}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </SurfaceCard>
          </section>
        </main>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <SidebarPanel title="文章目录">
            <nav className="space-y-3 text-sm">
              {tableOfContents.map((item, index) => (
                <a key={item.id} href={`#${item.id}`} className="flex gap-3 text-slate-600 hover:text-note-teal">
                  <span className="text-note-teal">{index + 1}.</span>
                  {item.title}
                </a>
              ))}
            </nav>
          </SidebarPanel>
          <SidebarPanel title="分享文章">
            <div className="grid grid-cols-4 gap-3 text-center text-xs text-muted-foreground">
              {["微信", "微博", "Twitter", "复制链接"].map((item) => (
                <div key={item} className="rounded-lg bg-slate-50 py-3">{item}</div>
              ))}
            </div>
          </SidebarPanel>
          <SidebarPanel title="文章信息">
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between"><span>分类</span><span className="text-note-teal">{post.category}</span></div>
              <div className="flex justify-between"><span>字数统计</span><span>2,845 字</span></div>
              <div className="flex justify-between"><span>阅读时长</span><span>{post.readingTime}</span></div>
              <div className="flex justify-between"><span>阅读次数</span><span>{post.views}</span></div>
            </div>
          </SidebarPanel>
          <SidebarPanel title="作者">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div>
                  <p className="font-semibold text-note-ink">Maurice</p>
                  <p className="text-xs text-muted-foreground">产品设计师 & 独立开发者</p>
                </div>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">关注技术、产品与设计的结合，持续探索更好的解决方案。</p>
              <Button asChild className="w-full">
                <Link href="/about">关注我</Link>
              </Button>
            </div>
          </SidebarPanel>
        </aside>
      </div>
    </div>
  );
}
