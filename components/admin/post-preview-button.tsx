"use client";

import { Eye, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

type PreviewState = {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  readingTime: string;
  publishedAt: string;
};

function value(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function createPreview(form: HTMLFormElement): PreviewState {
  const formData = new FormData(form);

  return {
    title: value(formData, "title"),
    excerpt: value(formData, "excerpt"),
    content: value(formData, "content"),
    author: value(formData, "author"),
    category: value(formData, "category"),
    readingTime: value(formData, "readingTime"),
    publishedAt: value(formData, "publishedAt"),
  };
}

export function PostPreviewButton() {
  const [preview, setPreview] = useState<PreviewState | null>(null);

  useEffect(() => {
    if (!preview) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreview(null);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [preview]);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="gap-2"
        onClick={(event) => {
          const form = event.currentTarget.form;
          if (form) {
            setPreview(createPreview(form));
          }
        }}
      >
        <Eye className="h-4 w-4" />
        文字预览
      </Button>

      {preview ? (
        <div className="fixed inset-0 z-50 bg-slate-950/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="文章文字预览">
          <div className="mx-auto flex h-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-sm font-medium text-slate-500">文章文字预览</p>
                <p className="mt-1 text-xs text-muted-foreground">根据当前编辑内容实时生成，关闭后可继续编辑。</p>
              </div>
              <Button type="button" variant="ghost" size="icon" aria-label="关闭预览" onClick={() => setPreview(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <article className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">
              <div className="mx-auto max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  {preview.category ? <span className="rounded-md bg-slate-100 px-2.5 py-1 text-slate-700">{preview.category}</span> : null}
                  {preview.author ? <span>{preview.author}</span> : null}
                  {preview.publishedAt ? <span>{preview.publishedAt}</span> : null}
                  {preview.readingTime ? <span>{preview.readingTime}</span> : null}
                </div>
                <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-normal text-note-ink sm:text-4xl">
                  {preview.title || "未填写文章标题"}
                </h1>
                {preview.excerpt ? <p className="mt-4 text-lg leading-8 text-slate-600">{preview.excerpt}</p> : null}
                <div
                  className="prose prose-slate mt-8 max-w-none prose-headings:tracking-normal prose-headings:text-note-ink prose-p:leading-8 prose-li:leading-8"
                  dangerouslySetInnerHTML={{ __html: preview.content || "<p>正文内容会显示在这里。</p>" }}
                />
              </div>
            </article>
          </div>
        </div>
      ) : null}
    </>
  );
}
