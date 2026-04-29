import { Github, Linkedin, Mail, RotateCcw, Save, Twitter } from "lucide-react";
import Link from "next/link";

import { saveSiteSettings } from "@/app/(admin)/admin/settings/actions";
import { AdminCard, AdminPageTitle, EditorInput, ToggleRow } from "@/components/admin/admin-blocks";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { featureToggles } from "@/lib/admin-data";
import { getSiteSettings } from "@/services/blog-service";

type AdminSettingsPageProps = {
  searchParams?: Promise<{ success?: string; error?: string }>;
};

export default async function AdminSettingsPage({ searchParams }: AdminSettingsPageProps) {
  const params = (await searchParams) ?? {};
  const settings = await getSiteSettings();

  return (
    <form action={saveSiteSettings} className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <AdminPageTitle title="系统设置" description="维护前台展示信息、联系方式与页脚内容；保存后会同步到公开页面。" />
        <Button asChild variant="outline">
          <Link href="/" target="_blank">查看前台</Link>
        </Button>
      </div>

      {params.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{params.error}</div>
      ) : null}
      {params.success ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{params.success}</div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <main className="space-y-6">
          <AdminCard>
            <CardHeader className="p-5">
              <CardTitle className="text-lg tracking-normal">站点基本信息</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-5 p-5 pt-0 md:grid-cols-[128px_1fr]">
              <span className="pt-3 text-sm text-muted-foreground">站点名称</span>
              <Input name="siteName" aria-label="站点名称" defaultValue={settings.siteName} className="h-11" required />

              <span className="pt-3 text-sm text-muted-foreground">站点标识</span>
              <div className="flex flex-wrap items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-lg border bg-note-mint text-2xl font-bold text-note-teal">
                  {settings.siteName?.[0] ?? "M"}
                </div>
                <p className="text-sm leading-6 text-muted-foreground">当前使用文字标识，避免上传文件存储和 CDN 配置不完整造成展示不稳定。</p>
              </div>

              <span className="pt-3 text-sm text-muted-foreground">站点描述</span>
              <Textarea name="siteDescription" aria-label="站点描述" defaultValue={settings.siteDescription} className="min-h-24" />

              <span className="pt-3 text-sm text-muted-foreground">站点域名</span>
              <Input name="siteDomain" aria-label="站点域名" defaultValue={settings.siteDomain} className="h-11" />

              <span className="pt-3 text-sm text-muted-foreground">时区</span>
              <Input name="timezone" aria-label="时区" defaultValue={settings.timezone} className="h-11" />

              <span className="pt-3 text-sm text-muted-foreground">语言</span>
              <Input name="language" aria-label="语言" defaultValue={settings.language} className="h-11" />
            </CardContent>
          </AdminCard>

          <div className="grid gap-6 xl:grid-cols-2">
            <AdminCard>
              <CardHeader className="p-5">
                <CardTitle className="text-lg tracking-normal">联系与社交链接</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-5 pt-0">
                {[
                  { label: "GitHub", name: "github", value: settings.github, icon: Github },
                  { label: "Twitter / X", name: "twitter", value: settings.twitter, icon: Twitter },
                  { label: "LinkedIn", name: "linkedin", value: settings.linkedin, icon: Linkedin },
                  { label: "微信公众号", name: "wechat", value: settings.wechat, icon: Mail },
                  { label: "Email", name: "email", value: settings.email, icon: Mail },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <label key={item.label} className="grid grid-cols-[112px_1fr] items-center gap-3">
                      <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Icon className="h-4 w-4" />{item.label}</span>
                      <Input name={item.name} defaultValue={item.value} className="h-10" />
                    </label>
                  );
                })}
              </CardContent>
            </AdminCard>

            <AdminCard>
              <CardHeader className="p-5">
                <CardTitle className="text-lg tracking-normal">页脚信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-5 pt-0">
                <EditorInput label="页脚描述">
                  <Textarea name="footerDescription" defaultValue={settings.footerDescription} className="min-h-24" />
                </EditorInput>
                <EditorInput label="备案信息">
                  <Input name="icp" defaultValue={settings.icp} />
                </EditorInput>
                <EditorInput label="版权信息">
                  <Input name="copyright" defaultValue={settings.copyright} />
                </EditorInput>
              </CardContent>
            </AdminCard>
          </div>
        </main>

        <aside className="space-y-6">
          <AdminCard>
            <CardHeader className="p-5">
              <CardTitle className="text-lg tracking-normal">公开页面预览</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="rounded-lg border bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-md bg-note-mint font-bold text-note-teal">{settings.siteName?.[0] ?? "M"}</div>
                  <p className="font-semibold text-note-ink">{settings.siteName}</p>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{settings.siteDescription}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {settings.email ? <span className="rounded-md bg-slate-50 px-2 py-1">{settings.email}</span> : null}
                  {settings.github ? <span className="rounded-md bg-slate-50 px-2 py-1">GitHub</span> : null}
                </div>
              </div>
            </CardContent>
          </AdminCard>

          <AdminCard>
            <CardHeader className="p-5">
              <CardTitle className="text-lg tracking-normal">功能状态</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-5 pt-0">
              {featureToggles.map((toggle) => (
                <ToggleRow key={toggle.label} {...toggle} />
              ))}
            </CardContent>
          </AdminCard>

          <AdminCard>
            <CardContent className="space-y-3 p-5">
              <p className="font-semibold text-note-ink">保存说明</p>
              <p className="text-sm leading-6 text-muted-foreground">当前页面只保留已接入数据库的设置项。主题、导航、上传等扩展能力后续接入存储后再开放。</p>
            </CardContent>
          </AdminCard>
        </aside>
      </div>

      <div className="flex justify-between border-t border-slate-100 pt-5">
        <Button type="reset" variant="outline" className="gap-2"><RotateCcw className="h-4 w-4" />重置本页</Button>
        <Button type="submit" className="gap-2 px-8"><Save className="h-4 w-4" />保存设置</Button>
      </div>
    </form>
  );
}
