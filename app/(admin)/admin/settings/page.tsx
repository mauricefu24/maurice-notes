import { Github, Mail, Plus, RotateCcw, Save, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AdminCard, AdminPageTitle, EditorInput, ToggleRow } from "@/components/admin/admin-blocks";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { saveSiteSettings } from "@/app/(admin)/admin/settings/actions";
import { featureToggles, settingsTabs } from "@/lib/admin-data";
import { getSiteSettings } from "@/services/blog-service";

type AdminSettingsPageProps = {
  searchParams?: Promise<{ success?: string; error?: string }>;
};

export default async function AdminSettingsPage({ searchParams }: AdminSettingsPageProps) {
  const params = (await searchParams) ?? {};
  const settings = await getSiteSettings();

  return (
    <form action={saveSiteSettings} className="space-y-8">
      <AdminPageTitle title="系统设置" description="管理站点设置、外观和功能配置，打造属于你的品牌空间。" />

      {params.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{params.error}</div>
      ) : null}
      {params.success ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{params.success}</div>
      ) : null}

      <div className="flex gap-8 border-b border-slate-100">
        {settingsTabs.map((tab, index) => (
          <button
            type="button"
            key={tab}
            disabled={index !== 0}
            className={index === 0 ? "border-b-2 border-note-teal pb-4 text-sm font-medium text-note-teal" : "pb-4 text-sm font-medium text-muted-foreground"}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <AdminCard>
            <CardHeader className="p-5">
              <CardTitle className="text-lg tracking-normal">站点基本信息</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 p-5 pt-0 md:grid-cols-[120px_1fr]">
              <span className="pt-3 text-sm text-muted-foreground">站点名称</span>
              <Input name="siteName" defaultValue={settings.siteName} className="h-11" />
              <span className="pt-3 text-sm text-muted-foreground">站点 Logo</span>
              <div className="flex items-center gap-5">
                <div className="grid h-16 w-16 place-items-center rounded-lg border bg-note-mint text-3xl font-bold text-note-teal">M</div>
                <Button type="button" variant="outline" disabled>更换 Logo</Button>
                <Button type="button" variant="outline" className="text-red-600" disabled>移除</Button>
                <span className="text-xs text-muted-foreground">建议尺寸：512 × 512px，支持 PNG、JPG、SVG</span>
              </div>
              <span className="pt-3 text-sm text-muted-foreground">站点描述</span>
              <Textarea name="siteDescription" defaultValue={settings.siteDescription} />
              <span className="pt-3 text-sm text-muted-foreground">站点域名</span>
              <div className="flex items-center gap-3">
                <Input name="siteDomain" defaultValue={settings.siteDomain} className="h-11" />
                <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs text-emerald-700">已验证</span>
              </div>
              <span className="pt-3 text-sm text-muted-foreground">时区设置</span>
              <Input name="timezone" defaultValue={settings.timezone} className="h-11" />
              <span className="pt-3 text-sm text-muted-foreground">语言</span>
              <Input name="language" defaultValue={settings.language} className="h-11" />
            </CardContent>
          </AdminCard>

          <div className="grid gap-6 xl:grid-cols-2">
            <AdminCard>
              <CardHeader className="p-5">
                <CardTitle className="text-lg tracking-normal">社交媒体链接</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-5 pt-0">
                {[
                  { label: "GitHub", name: "github", value: settings.github, icon: Github },
                  { label: "Twitter / X", name: "twitter", value: settings.twitter, icon: Twitter },
                  { label: "LinkedIn", name: "linkedin", value: settings.linkedin, icon: Github },
                  { label: "微信公众号", name: "wechat", value: settings.wechat, icon: Mail },
                  { label: "Email", name: "email", value: settings.email, icon: Mail },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="grid grid-cols-[96px_1fr] items-center gap-3">
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Icon className="h-4 w-4" />{item.label}</span>
                      <Input name={item.name} defaultValue={item.value} className="h-10" />
                    </div>
                  );
                })}
                <Button type="button" variant="outline" className="w-full border-dashed" disabled><Plus className="mr-2 h-4 w-4" />添加链接</Button>
              </CardContent>
            </AdminCard>

            <AdminCard>
              <CardHeader className="p-5">
                <CardTitle className="text-lg tracking-normal">页脚信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-5 pt-0">
                <EditorInput label="页脚描述">
                  <Textarea name="footerDescription" defaultValue={settings.footerDescription} />
                </EditorInput>
                <Input name="icp" defaultValue={settings.icp} />
                <Input name="copyright" defaultValue={settings.copyright} />
                <div className="grid grid-cols-2 gap-3">
                  <Input defaultValue="关于我 /about" disabled />
                  <Input defaultValue="联系方式 /contact" disabled />
                </div>
                <Button type="button" variant="outline" className="border-dashed" disabled><Plus className="mr-2 h-4 w-4" />添加链接</Button>
              </CardContent>
            </AdminCard>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <AdminCard>
              <CardHeader className="p-5">
                <CardTitle className="text-lg tracking-normal">外观主题定制</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 p-5 pt-0">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-note-ink">主题颜色</p>
                  <div className="flex gap-3">
                    {["bg-note-teal", "bg-blue-500", "bg-violet-500", "bg-indigo-500", "bg-orange-400", "bg-red-500"].map((color) => (
                      <span key={color} className={`h-8 w-8 rounded-md ${color}`} />
                    ))}
                    <Button type="button" variant="outline" size="icon" disabled><Plus className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="grid grid-cols-[96px_1fr] items-center gap-3">
                  <span className="text-sm text-muted-foreground">字体设置</span>
                  <Input defaultValue="Inter / 系统字体" />
                </div>
                <div className="grid grid-cols-[96px_1fr] items-center gap-3">
                  <span className="text-sm text-muted-foreground">圆角大小</span>
                  <div className="grid grid-cols-4 overflow-hidden rounded-md border text-center text-sm">
                    {["无", "小", "中", "大"].map((item) => (
                      <span key={item} className={item === "中" ? "bg-note-mint py-2 text-note-teal" : "py-2"}>{item}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-3 text-sm text-muted-foreground">布局模式</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg border-2 border-note-teal p-3">
                      <div className="h-16 rounded bg-note-mint" />
                      <p className="mt-2 text-center text-sm text-note-teal">宽屏模式</p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="mx-auto h-16 w-2/3 rounded bg-slate-100" />
                      <p className="mt-2 text-center text-sm text-muted-foreground">盒装模式</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </AdminCard>

            <AdminCard>
              <CardHeader className="p-5">
                <CardTitle className="text-lg tracking-normal">主题预览</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-5 pt-0">
                <div className="overflow-hidden rounded-lg border">
                  <div className="space-y-3 p-5">
                    <p className="font-semibold text-note-ink">Maurice Notes</p>
                    <h3 className="text-2xl font-semibold">通过文字与代码探索<span className="text-note-teal">更大的世界</span></h3>
                    <p className="text-sm text-muted-foreground">这里是 Maurice 的数字花园，记录技术、产品、设计与生活中的思考。</p>
                    <Button asChild size="sm"><Link href="/articles">浏览最新文章</Link></Button>
                  </div>
                  <div className="relative h-28">
                    <Image
                      src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>
                </div>
              </CardContent>
            </AdminCard>
          </div>

          <AdminCard>
            <CardHeader className="p-5">
              <CardTitle className="text-lg tracking-normal">功能开关</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 p-5 pt-0 md:grid-cols-2">
              {featureToggles.map((toggle) => (
                <ToggleRow key={toggle.label} {...toggle} />
              ))}
            </CardContent>
          </AdminCard>
        </div>

        <aside className="space-y-6">
          <AdminCard>
            <CardHeader className="p-5">
              <CardTitle className="text-lg tracking-normal">站点预览</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="overflow-hidden rounded-lg border bg-white">
                <div className="flex items-center justify-between p-4">
                  <p className="font-semibold text-note-ink">Maurice Notes</p>
                  <span>☰</span>
                </div>
                <div className="space-y-3 p-4">
                  <p className="w-fit rounded-md bg-note-mint px-2 py-1 text-xs text-note-teal">分享思考 · 记录成长</p>
                  <h3 className="text-2xl font-semibold leading-tight">通过文字与代码探索<span className="text-note-teal">更大的世界</span></h3>
                  <p className="text-xs leading-5 text-muted-foreground">这里是 Maurice 的数字花园，记录技术、产品、设计与生活中的思考。</p>
                  <Button asChild size="sm"><Link href="/articles">浏览最新文章</Link></Button>
                </div>
                <div className="relative h-36">
                  <Image
                    src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
              </div>
            </CardContent>
          </AdminCard>

          <AdminCard>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-3 text-emerald-700">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50">✓</span>
                <div>
                  <p className="font-semibold">所有设置已保存</p>
                  <p className="text-xs text-muted-foreground">保存后会立即同步到前台页面</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">保存者：Maurice</p>
            </CardContent>
          </AdminCard>
        </aside>
      </div>

      <div className="flex justify-between border-t border-slate-100 pt-5">
        <Button type="reset" variant="outline" className="gap-2"><RotateCcw className="h-4 w-4" />重置设置</Button>
        <Button type="submit" className="gap-2 px-8"><Save className="h-4 w-4" />保存设置</Button>
      </div>
    </form>
  );
}
