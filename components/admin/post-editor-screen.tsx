import { Calendar, Check, Clock, Link2, Save } from "lucide-react";
import Image from "next/image";

import { AdminCard, AdminPageTitle, EditorInput } from "@/components/admin/admin-blocks";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PostPreviewButton } from "@/components/admin/post-preview-button";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import type { Category, Post } from "@/types/blog";

type PostEditorScreenProps = {
  mode: "new" | "edit";
  post?: Post;
  error?: string;
  success?: string;
  action: (formData: FormData) => void | Promise<void>;
  draftAction: (formData: FormData) => void | Promise<void>;
  publishAction: (formData: FormData) => void | Promise<void>;
  categories: Category[];
};

function plainTextLength(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s/g, "").length;
}

export function PostEditorScreen({ mode, post, error, success, action, draftAction, publishAction, categories }: PostEditorScreenProps) {
  const title = post?.title ?? "";
  const excerpt = post?.excerpt ?? "";
  const content = post?.content ?? "";
  const image = post?.image ?? "";
  const publishedAt = post?.publishedAt ?? "";
  const readingTime = post?.readingTime ?? "";
  const wordCount = plainTextLength(content);

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
          <PostPreviewButton />
          <Button type="submit" formAction={draftAction} variant="outline" className="gap-2"><Save className="h-4 w-4" />保存草稿</Button>
          {post?.slug && post.status === "published" ? (
            <Button asChild variant="outline"><a href={`/articles/${post.slug}`} target="_blank">查看线上</a></Button>
          ) : null}
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
                <Input name="title" defaultValue={title} placeholder="输入文章标题" className="h-12 text-lg font-medium" required />
              </EditorInput>
              <EditorInput label="副标题">
                <Input name="excerpt" defaultValue={excerpt} placeholder="输入文章摘要或副标题" className="h-12" />
              </EditorInput>
              <EditorInput label="内容" required>
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <RichTextEditor name="content" defaultValue={content} />
                </div>
              </EditorInput>
              <div className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
                <span>字数统计：{wordCount} 字　阅读时长：{readingTime || "未填写"}</span>
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
                  defaultValue={post?.category ?? ""}
                  className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
                  required
                >
                  <option value="" disabled>请选择分类</option>
                  {categories.map((category) => (
                    <option key={category.slug} value={category.name}>{category.name}</option>
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
                  {image ? (
                    <div className="relative h-32 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                      <Image
                        src={image}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                  ) : (
                    <div className="grid h-32 place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-muted-foreground">
                      尚未设置封面图
                    </div>
                  )}
                  <Input name="image" defaultValue={image} placeholder="粘贴封面图 URL" />
                  <p className="text-xs text-muted-foreground">推荐尺寸：1200x630px，JPG/PNG 格式</p>
                </div>
              </EditorInput>
              <EditorInput label="发布时间">
                <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50/70 p-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <span className="text-xs font-medium text-slate-500">发布日期</span>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input name="publishedAt" type="date" defaultValue={publishedAt} className="h-11 bg-white pl-9" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-xs font-medium text-slate-500">阅读时长</span>
                      <div className="relative">
                        <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input name="readingTime" defaultValue={readingTime} placeholder="例如：6 分钟阅读" className="h-11 bg-white pl-9" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">留空时保存会使用当前日期，阅读时长会使用系统默认值。</p>
                </div>
              </EditorInput>
            </CardContent>
          </AdminCard>

          <AdminCard>
            <CardHeader className="p-5">
              <CardTitle className="text-lg tracking-normal">SEO 设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5 pt-0">
              <EditorInput label="SEO 标题">
                <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                  {title ? `${title} | Maurice Notes` : "填写标题后生成预览"}
                </div>
              </EditorInput>
              <EditorInput label="SEO 描述">
                <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-600">
                  {excerpt || "填写副标题后生成预览"}
                </div>
              </EditorInput>
              <EditorInput label="URL 别名">
                <div className="flex items-center gap-2">
                  <Input name="slug" defaultValue={post?.slug ?? ""} placeholder="输入文章 URL 别名" />
                  <Link2 className="h-4 w-4 text-note-teal" />
                </div>
              </EditorInput>
              <EditorInput label="作者">
                <Input name="author" defaultValue={post?.author ?? ""} placeholder="输入作者名称" />
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
                发布状态、精选标记和封面信息会随文章一起保存。
              </div>
              {mode === "edit" && post?.status === "published" ? (
                <Button type="submit" formAction={draftAction} variant="outline" className="mt-3 w-full text-red-600">移至草稿</Button>
              ) : null}
            </CardContent>
          </AdminCard>
        </aside>
      </div>
    </form>
  );
}
