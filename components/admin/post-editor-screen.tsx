import { Calendar, Check, Clock, History, ImageIcon, Link2, Save } from "lucide-react";
import Image from "next/image";

import { AdminCard, AdminPageTitle, EditorInput } from "@/components/admin/admin-blocks";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { Post } from "@/types/blog";

type PostEditorScreenProps = {
  mode: "new" | "edit";
  post?: Post;
  error?: string;
  success?: string;
  action: (formData: FormData) => void | Promise<void>;
  draftAction: (formData: FormData) => void | Promise<void>;
  publishAction: (formData: FormData) => void | Promise<void>;
};

export function PostEditorScreen({ mode, post, error, success, action, draftAction, publishAction }: PostEditorScreenProps) {
  const title = post?.title ?? "通过文字与代码，探索更大的世界";
  const excerpt =
    post?.excerpt ?? "这里是 Maurice 的数字花园，记录技术、产品、设计与生活中的思考与实践，期待与你一同探索更多可能。";
  const content =
    post?.content ??
    "在这个信息爆炸的时代，我们每天都会接触到大量的内容。但真正能够带来价值的，往往是那些经过思考、沉淀和实践的知识与经验。";
  const image = post?.image ?? "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80";
  const publishedAt = post?.publishedAt ?? new Date().toISOString().slice(0, 10);
  const wordCount = content.replace(/\s/g, "").length;

  return (
    <form action={action} className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <AdminPageTitle
          title={mode === "new" ? "新建文章" : "编辑文章"}
          description={mode === "new" ? "文章管理 / 新建文章" : `文章管理 / ${title}`}
        />
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 text-sm text-note-teal">
            <Check className="h-4 w-4" />
            已连接数据库保存
          </span>
          <Button type="button" variant="outline" className="gap-2" disabled><History className="h-4 w-4" />版本历史</Button>
          <Button type="submit" formAction={draftAction} variant="outline" className="gap-2"><Save className="h-4 w-4" />保存草稿</Button>
          {post?.slug && post.status === "published" ? (
            <Button asChild variant="outline"><a href={`/articles/${post.slug}`} target="_blank">预览</a></Button>
          ) : (
            <Button type="button" variant="outline" disabled>预览</Button>
          )}
          <Button type="submit" formAction={publishAction} className="gap-2">发布</Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      ) : null}
      {success ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="space-y-6">
          <AdminCard>
            <CardContent className="space-y-5 p-6">
              <EditorInput label="文章标题" required>
                <Input name="title" defaultValue={title} className="h-12 text-lg font-medium" required />
              </EditorInput>
              <EditorInput label="副标题">
                <Input name="excerpt" defaultValue={excerpt} className="h-12" />
              </EditorInput>
              <EditorInput label="内容" required>
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <RichTextEditor name="content" defaultValue={content} />
                </div>
              </EditorInput>
              <div className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
                <span>字数统计：{wordCount} 字　阅读时长：{post?.readingTime ?? "约 6 分钟"}</span>
                <span>元素路径：p &gt; img</span>
              </div>
            </CardContent>
          </AdminCard>
        </main>

        <aside className="space-y-6">
          <AdminCard>
            <CardHeader className="p-5">
              <CardTitle className="text-lg tracking-normal">文章设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 p-5 pt-0">
              <EditorInput label="分类" required>
                <select
                  name="category"
                  defaultValue={post?.category ?? "技术"}
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                  required
                >
                  {["技术", "产品", "设计", "生活", "AI"].map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </EditorInput>
              <EditorInput label="标签">
                <Input
                  name="tags"
                  defaultValue={post?.tags?.join(", ") ?? ""}
                  placeholder="多个标签用逗号分隔，例如：前端, 设计系统"
                />
              </EditorInput>
              <EditorInput label="封面图">
                <div className="space-y-3">
                  <div className="relative h-32 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                  <Button type="button" variant="outline" className="w-full gap-2" disabled><ImageIcon className="h-4 w-4" />更换图片</Button>
                  <Input name="image" defaultValue={image} placeholder="封面图 URL" />
                  <p className="text-xs text-muted-foreground">推荐尺寸：1200x630px，JPG/PNG 格式</p>
                </div>
              </EditorInput>
              <EditorInput label="发布时间">
                <div className="space-y-3 text-sm">
                  <label className="flex items-center gap-2"><input type="radio" name="publishMode" defaultChecked />立即发布</label>
                  <label className="flex items-center gap-2 text-muted-foreground"><input type="radio" name="publishMode" disabled />定时发布</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative">
                      <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input name="publishedAt" type="date" defaultValue={publishedAt} className="pl-9" />
                    </div>
                    <div className="relative">
                      <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input name="readingTime" defaultValue={post?.readingTime ?? "6 分钟阅读"} className="pl-9" />
                    </div>
                  </div>
                </div>
              </EditorInput>
              <EditorInput label="摘要">
                <Textarea defaultValue={excerpt} className="min-h-24" />
              </EditorInput>
            </CardContent>
          </AdminCard>

          <AdminCard>
            <CardHeader className="p-5">
              <CardTitle className="text-lg tracking-normal">SEO 设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <EditorInput label="SEO 标题">
                <Input defaultValue={`${title} | Maurice Notes`} disabled />
              </EditorInput>
              <EditorInput label="SEO 描述">
                <Textarea defaultValue={excerpt} disabled />
              </EditorInput>
              <EditorInput label="URL 别名">
                <div className="flex items-center gap-2">
                  <Input name="slug" defaultValue={post?.slug ?? "explore-larger-world-with-words-and-code"} />
                  <Link2 className="h-4 w-4 text-note-teal" />
                </div>
              </EditorInput>
              <EditorInput label="作者">
                <Input name="author" defaultValue={post?.author ?? "Maurice"} />
              </EditorInput>
              <label className="flex items-center gap-2 text-sm text-note-ink">
                <input name="featured" type="checkbox" defaultChecked={post?.featured ?? false} />
                设为精选文章
              </label>
            </CardContent>
          </AdminCard>

          <AdminCard>
            <CardHeader className="p-5">
              <CardTitle className="text-lg tracking-normal">更多设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-5 pt-0">
              <div className="rounded-lg bg-slate-50 p-4 text-sm leading-6 text-muted-foreground">
                评论、隐私模式等站点级开关请在系统设置中统一管理。
              </div>
              <Button type="submit" formAction={draftAction} variant="outline" className="mt-3 w-full text-red-600">移至草稿</Button>
            </CardContent>
          </AdminCard>
        </aside>
      </div>
    </form>
  );
}
