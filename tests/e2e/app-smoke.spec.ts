import { expect, test } from "@playwright/test";
import fs from "node:fs";

const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

function readEnvValue(name: string) {
  const envPath = ".env";
  if (!fs.existsSync(envPath)) return "";
  const line = fs.readFileSync(envPath, "utf8").split(/\r?\n/).find((entry) => entry.startsWith(`${name}=`));
  return line ? line.slice(name.length + 1).replace(/^["']|["']$/g, "") : "";
}

test.describe.configure({ mode: "serial" });

test("public pages, navigation, article actions, and admin workflows", async ({ page, context }) => {
  test.setTimeout(120000);
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  for (const path of ["/", "/articles", "/categories", "/archives", "/about"]) {
    await page.goto(`${baseURL}${path}`);
    await expect(page.locator("body")).toBeVisible();
  }

  await page.goto(baseURL);
  await page.getByRole("link", { name: "文章" }).first().click();
  await expect(page).toHaveURL(/\/articles/);

  await page.goto(baseURL);
  await page.getByPlaceholder("搜索文章、分类或关键词").fill("产品");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/archives\?q=/);

  const password = readEnvValue("ADMIN_PASSWORD");
  expect(password, "ADMIN_PASSWORD must exist in .env for admin flow").toBeTruthy();

  await page.goto(`${baseURL}/admin/posts`);
  await expect(page).toHaveURL(/\/admin-login/);
  await page.getByLabel("管理员密码").fill(password);
  await page.getByRole("button", { name: "登录" }).click();
  await expect(page).toHaveURL(/\/admin\/dashboard/);

  for (const path of ["/admin/dashboard", "/admin/posts", "/admin/categories", "/admin/settings", "/admin/audit-logs"]) {
    await page.goto(`${baseURL}${path}`);
    await expect(page.locator("body")).toBeVisible();
  }

  await page.goto(`${baseURL}/admin/posts`);
  await page.getByPlaceholder("搜索文章标题、内容、分类或作者...").fill("产品");
  await page.getByRole("main").getByRole("button", { name: "搜索" }).click();
  await expect(page).toHaveURL(/\/admin\/posts\?q=/);
  await page.getByRole("link", { name: "清除" }).click();
  await expect(page).toHaveURL(/\/admin\/posts$/);
  await page.locator('a[href="/admin/posts?status=published"]').first().click();
  await expect(page).toHaveURL(/\/admin\/posts\?status=published$/);
  await page.locator('a[href="/admin/posts"]').filter({ hasText: "全部文章" }).first().click();
  await expect(page).toHaveURL(/\/admin\/posts$/);

  const id = Date.now();
  const title = `E2E 巡检文章 ${id}`;
  const slug = `e2e-check-${id}`;
  await page.getByRole("link", { name: /新建文章/ }).first().click();
  await expect(page).toHaveURL(/\/admin\/posts\/new/);
  await page.getByLabel("文章标题").fill(title);
  await page.getByLabel("URL 别名").fill(slug);
  await page.getByLabel("分类").selectOption({ index: 1 });
  await page.getByRole("button", { name: "文字预览" }).click();
  await expect(page.getByRole("dialog", { name: "文章文字预览" })).toBeVisible();
  await expect(page.getByRole("heading", { name: title })).toBeVisible();
  await page.getByRole("button", { name: "关闭预览" }).click();
  await page.getByRole("button", { name: /保存草稿/ }).first().click();
  await expect(page).toHaveURL(/\/admin\/posts\/.+\/edit\?success=/);
  await expect(page.getByText("草稿已保存")).toBeVisible();
  await page.getByRole("button", { name: "发布" }).click();
  await expect(page.getByText("文章已发布")).toBeVisible();
  const preview = page.getByRole("link", { name: "查看线上" });
  await expect(preview).toBeVisible();
  const popupPromise = context.waitForEvent("page");
  await preview.click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(new RegExp(`/articles/${slug}`));
  await popup.getByRole("button", { name: /赞/ }).click();
  await expect(popup.getByRole("button", { name: /赞/ })).toBeDisabled();
  await popup.close();

  await page.goto(`${baseURL}/admin/posts?q=${encodeURIComponent(title)}`);
  page.on("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "删除文章" }).first().click();
  await expect(page).toHaveURL(/\/admin\/posts\?success=/);

  const categoryName = `巡检分类 ${id}`;
  const categorySlug = `e2e-category-${id}`;
  await page.goto(`${baseURL}/admin/categories`);
  await page.getByLabel("分类名称").fill(categoryName);
  await page.getByLabel("URL 别名").fill(categorySlug);
  await page.getByLabel("分类描述").fill("浏览器自动化巡检后自动删除");
  await page.getByRole("button", { name: /创建分类/ }).click();
  await expect(page).toHaveURL(/\/admin\/categories\?success=/);
  await expect(page.getByText(categoryName)).toBeVisible();
  await page.getByRole("row", { name: new RegExp(categoryName) }).getByRole("button", { name: "删除分类" }).click();
  await expect(page).toHaveURL(/\/admin\/categories\?success=/);

  await page.goto(`${baseURL}/admin/settings`);
  await page.getByRole("button", { name: /保存设置/ }).click();
  await expect(page).toHaveURL(/\/admin\/settings\?success=/);

  await page.goto(`${baseURL}/admin/audit-logs`);
  await expect(page.getByRole("heading", { name: "操作日志" })).toBeVisible();
  await expect(page.getByText(/保存系统设置|删除分类|发布文章|保存草稿/).first()).toBeVisible();

  expect(consoleErrors.filter((text) => !text.includes("Failed to load resource"))).toEqual([]);
});
