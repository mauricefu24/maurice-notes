import { Plus, Trash2 } from "lucide-react";

import { createCategory, deleteCategory } from "@/app/(admin)/admin/categories/actions";
import { AdminCard, AdminPageTitle } from "@/components/admin/admin-blocks";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getCategories } from "@/services/blog-service";

type AdminCategoriesPageProps = {
  searchParams?: Promise<{ error?: string; success?: string }>;
};

export default async function AdminCategoriesPage({ searchParams }: AdminCategoriesPageProps) {
  const params = (await searchParams) ?? {};
  const categories = await getCategories();

  return (
    <div className="space-y-8">
      <AdminPageTitle title="分类管理" description="维护文章分类、别名与展示说明，分类数据会同步影响前台导航与归档。" />

      {params.error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{params.error}</div>
      ) : null}
      {params.success ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{params.success}</div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <AdminCard>
          <CardContent className="p-5">
            <div className="overflow-hidden rounded-lg border border-slate-100">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">分类</th>
                    <th className="px-4 py-3 font-medium">URL 别名</th>
                    <th className="px-4 py-3 font-medium">文章数</th>
                    <th className="px-4 py-3 font-medium">描述</th>
                    <th className="px-4 py-3 font-medium">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {categories.map((category) => (
                    <tr key={category.slug}>
                      <td className="px-4 py-4">
                        <span className={`rounded-md px-2 py-1 text-xs font-medium ${category.accent}`}>{category.name}</span>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">{category.slug}</td>
                      <td className="px-4 py-4">{category.postCount}</td>
                      <td className="max-w-md px-4 py-4 text-muted-foreground">{category.description}</td>
                      <td className="px-4 py-4">
                        <form action={deleteCategory.bind(null, category.slug)}>
                          <ConfirmSubmitButton
                            message={`确认删除分类「${category.name}」吗？此操作不可撤销。`}
                            variant="ghost"
                            size="icon"
                            aria-label={category.postCount > 0 ? "分类下仍有文章，不能删除" : "删除分类"}
                            className="text-red-600"
                            disabled={category.postCount > 0}
                          >
                            <Trash2 className="h-4 w-4" />
                          </ConfirmSubmitButton>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </AdminCard>

        <AdminCard>
          <CardHeader className="p-5">
            <CardTitle className="text-lg tracking-normal">新增分类</CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <form action={createCategory} className="space-y-4">
              <Input name="name" placeholder="分类名称" required />
              <Input name="slug" placeholder="URL 别名，例如 product" />
              <Textarea name="description" placeholder="分类描述" />
              <Input name="accent" placeholder="Tailwind 色彩类，例如 bg-teal-50 text-teal-700" />
              <Button type="submit" className="w-full gap-2">
                <Plus className="h-4 w-4" />
                创建分类
              </Button>
            </form>
          </CardContent>
        </AdminCard>
      </div>
    </div>
  );
}
