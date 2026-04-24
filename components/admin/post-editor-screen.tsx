import { Calendar, Check, ChevronDown, Clock, History, ImageIcon, Link2, Save, Undo2 } from "lucide-react";
import Image from "next/image";

import { AdminCard, AdminPageTitle, EditorInput, ToggleRow } from "@/components/admin/admin-blocks";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editorCategories, featureToggles } from "@/lib/admin-data";
import type { Post } from "@/types/blog";

type PostEditorScreenProps = {
  mode: "new" | "edit";
  post?: Post;
};

export function PostEditorScreen({ mode, post }: PostEditorScreenProps) {
  const title = post?.title ?? "通过文字与代码，探索更大的世界";
  const excerpt =
    post?.excerpt ?? "这里是 Maurice 的数字花园，记录技术、产品、设计与生活中的思考与实践，期待与你一同探索更多可能。";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <AdminPageTitle
          title={mode === "new" ? "新建文章" : "编辑文章"}
          description={mode === "new" ? "文章管理 / 新建文章" : `文章管理 / ${title}`}
        />
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 text-sm text-note-teal">
            <Check className="h-4 w-4" />
            已自动保存 10:32:45
          </span>
          <Button variant="outline" className="gap-2"><History className="h-4 w-4" />版本历史</Button>
          <Button variant="outline" className="gap-2"><Save className="h-4 w-4" />保存草稿</Button>
          <Button variant="outline">预览</Button>
          <Button className="gap-2">发布 <ChevronDown className="h-4 w-4" /></Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="space-y-6">
          <AdminCard>
            <CardContent className="space-y-5 p-6">
              <EditorInput label="文章标题" required>
                <Input defaultValue={title} className="h-12 text-lg font-medium" />
              </EditorInput>
              <EditorInput label="副标题">
                <Input defaultValue={excerpt} className="h-12" />
              </EditorInput>
              <EditorInput label="内容" required>
                <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                  <div className="flex flex-wrap items-center gap-1 border-b bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    <Button variant="ghost" size="icon" aria-label="撤销"><Undo2 className="h-4 w-4" /></Button>
                    {["正文", "B", "I", "U", "S", "</>", "“”", "列表", "链接", "图片", "表格", "更多"].map((item) => (
                      <Button key={item} variant="ghost" size="sm">{item}</Button>
                    ))}
                  </div>
                  <div className="space-y-6 p-6">
                    <div className="relative h-[280px] overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={post?.image ?? "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="760px"
                      />
                    </div>
                    <p className="text-sm leading-7 text-slate-600">
                      在这个信息爆炸的时代，我们每天都会接触到大量的内容。但真正能够带来价值的，往往是那些经过思考、沉淀和实践的知识与经验。
                    </p>
                    <p className="text-sm leading-7 text-slate-600">
                      Maurice Notes 希望成为这样一个数字花园，记录我在技术、产品、设计与生活中的思考与实践，期待与你一同探索更多可能。
                    </p>
                    <h2 className="text-2xl font-semibold text-note-ink">为什么开始写作？</h2>
                    <p className="text-sm leading-7 text-slate-600">写作对我来说，不只是记录，更是思考的过程。通过输出，我可以：</p>
                    <div className="rounded-lg bg-slate-50 p-5 text-sm leading-8 text-slate-600">
                      <p>✓ 梳理复杂的想法，发现问题的本质</p>
                      <p>✓ 沉淀知识，形成可复用的体系</p>
                      <p>✓ 与更多同频的朋友交流，碰撞出新的火花</p>
                    </div>
                    <h2 className="text-2xl font-semibold text-note-ink">内容方向</h2>
                    <p className="text-sm leading-7 text-slate-600">我会围绕以下几个方向持续输出：</p>
                    <div className="grid gap-4 md:grid-cols-4">
                      {editorCategories.map((category) => (
                        <div key={category.title} className="rounded-lg border border-slate-100 p-4">
                          <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-note-mint text-note-teal">{category.icon}</div>
                          <p className="font-medium text-note-ink">{category.title}</p>
                          <p className="mt-1 text-xs leading-5 text-muted-foreground">{category.body}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center border-t pt-5">
                      <Button variant="outline" size="icon" aria-label="添加区块">+</Button>
                    </div>
                    <h2 className="text-2xl font-semibold text-note-ink">近期计划</h2>
                    <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-600">
                      <li>分享一个完整的个人博客系统搭建过程</li>
                      <li>探索设计系统在中小团队的落地实践</li>
                      <li>记录 AI 时代下产品与设计的变化与机会</li>
                    </ol>
                  </div>
                </div>
              </EditorInput>
              <div className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
                <span>字数统计：1,286 字　阅读时长：约 6 分钟</span>
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
                <Button variant="outline" className="h-11 w-full justify-between">技术 <ChevronDown className="h-4 w-4" /></Button>
              </EditorInput>
              <EditorInput label="标签">
                <div className="flex min-h-11 flex-wrap gap-2 rounded-md border border-slate-200 p-2">
                  {["个人博客", "设计", "前端"].map((tag) => (
                    <span key={tag} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">{tag} ×</span>
                  ))}
                </div>
              </EditorInput>
              <EditorInput label="封面图">
                <div className="space-y-3">
                  <div className="relative h-32 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <Image
                      src={post?.image ?? "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                  <Button variant="outline" className="w-full gap-2"><ImageIcon className="h-4 w-4" />更换图片</Button>
                  <p className="text-xs text-muted-foreground">推荐尺寸：1200x630px，JPG/PNG 格式</p>
                </div>
              </EditorInput>
              <EditorInput label="发布时间">
                <div className="space-y-3 text-sm">
                  <label className="flex items-center gap-2"><input type="radio" defaultChecked />立即发布</label>
                  <label className="flex items-center gap-2"><input type="radio" />定时发布</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-between"><Calendar className="h-4 w-4" />2024-05-16</Button>
                    <Button variant="outline" className="justify-between"><Clock className="h-4 w-4" />10:00</Button>
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
                <Input defaultValue={`${title} | Maurice Notes`} />
              </EditorInput>
              <EditorInput label="SEO 描述">
                <Textarea defaultValue={excerpt} />
              </EditorInput>
              <EditorInput label="URL 别名">
                <div className="flex items-center gap-2">
                  <Input defaultValue={post?.slug ?? "explore-larger-world-with-words-and-code"} />
                  <Link2 className="h-4 w-4 text-note-teal" />
                </div>
              </EditorInput>
            </CardContent>
          </AdminCard>

          <AdminCard>
            <CardHeader className="p-5">
              <CardTitle className="text-lg tracking-normal">更多设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-5 pt-0">
              {featureToggles.slice(0, 4).map((toggle) => (
                <ToggleRow key={toggle.label} {...toggle} />
              ))}
              <Button variant="outline" className="mt-3 w-full text-red-600">移至回收站</Button>
            </CardContent>
          </AdminCard>
        </aside>
      </div>
    </div>
  );
}
