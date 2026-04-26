import { Calendar, Clock, Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { createArticleComment, likeArticle } from "@/app/(public)/articles/[slug]/actions";
import { ArticleActions } from "@/components/public/article-actions";
import { CommentComposer } from "@/components/public/comment-composer";
import { BlockHeading, MiniArticleCard, SidebarPanel, SurfaceCard, TagPill } from "@/components/public/page-blocks";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { getApprovedCommentsForPostTitle, getPublishedPosts, getPostBySlug } from "@/services/blog-service";

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function plainTextLength(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s/g, "").length;
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const related = (await getPublishedPosts()).filter((item) => item.slug !== slug).slice(0, 3);

  if (!post || post.status !== "published") {
    notFound();
  }

  const comments = await getApprovedCommentsForPostTitle(post.title);
  const commentAction = createArticleComment.bind(null, post.slug, post.title);
  const likeAction = likeArticle.bind(null, post.slug);
  const wordCount = plainTextLength(post.content);

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
            <ArticleActions title={post.title} initialLikes={post.likes} likeAction={likeAction} />
          </section>

          <div className="relative h-[420px] overflow-hidden rounded-lg border border-slate-200">
            <Image src={post.image} alt="" fill className="object-cover" sizes="860px" priority />
          </div>

          <article
            className="prose prose-slate max-w-none prose-headings:tracking-normal prose-headings:text-note-ink prose-p:leading-8 prose-li:leading-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <section className="space-y-4">
            <BlockHeading title="相关文章" />
            <SurfaceCard>
              <CardContent className="grid gap-3 p-4 md:grid-cols-3">
                {related.length ? (
                  related.map((item) => (
                    <MiniArticleCard key={item.id} post={item} />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">暂无相关文章。</p>
                )}
              </CardContent>
            </SurfaceCard>
          </section>

          <section id="comments" className="space-y-4">
            <BlockHeading title={`评论（${comments.length}）`} />
            <SurfaceCard>
              <CardContent className="space-y-5 p-5">
                <CommentComposer action={commentAction} />
                <div className="space-y-4">
                  {comments.length ? comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 border-t pt-4">
                      <div className="h-9 w-9 rounded-full bg-note-mint" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-medium text-note-ink">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">{comment.createdAt}</p>
                        </div>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{comment.body}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        0
                      </span>
                    </div>
                  )) : (
                    <p className="border-t pt-4 text-sm text-muted-foreground">暂无已通过评论，欢迎留下第一条评论。</p>
                  )}
                </div>
              </CardContent>
            </SurfaceCard>
          </section>
        </main>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <SidebarPanel title="文章目录">
            <nav className="space-y-3 text-sm">
              <a href="#comments" className="flex gap-3 text-slate-600 hover:text-note-teal">
                <span className="text-note-teal">1.</span>
                评论讨论
              </a>
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
              <div className="flex justify-between"><span>字数统计</span><span>{wordCount} 字</span></div>
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
