import { Github, Rss, Twitter } from "lucide-react";
import Link from "next/link";

import { Brand } from "@/components/shared/brand";

const columns = [
  {
    title: "导航",
    links: [
      { label: "首页", href: "/" },
      { label: "文章", href: "/articles" },
      { label: "分类", href: "/categories" },
      { label: "归档", href: "/archives" },
      { label: "关于", href: "/about" },
    ],
  },
  {
    title: "内容",
    links: [
      { label: "技术", href: "/categories" },
      { label: "产品", href: "/categories" },
      { label: "设计", href: "/categories" },
      { label: "生活", href: "/categories" },
      { label: "AI", href: "/categories" },
    ],
  },
  {
    title: "联系",
    links: [
      { label: "Email", href: "/about" },
      { label: "GitHub", href: "/about" },
      { label: "知乎", href: "/about" },
      { label: "即刻", href: "/about" },
    ],
  },
];

export function PublicFooter() {
  return (
    <footer className="mt-8 border-t border-slate-100 bg-white">
      <div className="page-shell grid gap-10 py-10 md:grid-cols-[1.35fr_2fr]">
        <div className="space-y-4">
          <Brand />
          <p className="max-w-sm text-sm leading-6 text-slate-500">
            记录技术与产品的思考，分享设计与生活的灵感。保持好奇，持续创造。
          </p>
          <div className="flex gap-3 text-muted-foreground">
            <Github className="h-4 w-4" />
            <Twitter className="h-4 w-4" />
            <Rss className="h-4 w-4" />
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title} className="space-y-3">
              <h3 className="text-sm font-semibold text-note-ink">{column.title}</h3>
              <div className="space-y-2">
                {column.links.map((link) => (
                  <Link key={link.label} href={link.href} className="block text-sm text-slate-500 hover:text-note-teal">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
