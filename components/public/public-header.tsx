import { PenLine, Search } from "lucide-react";
import Link from "next/link";

import { Brand } from "@/components/shared/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/articles", label: "文章" },
  { href: "/categories", label: "分类" },
  { href: "/archives", label: "归档" },
  { href: "/about", label: "关于" },
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="page-shell flex h-[72px] items-center gap-8">
        <Brand />
        <nav className="hidden flex-1 items-center justify-center gap-9 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-note-teal">
              {item.label}
            </Link>
          ))}
        </nav>
        <form action="/archives" className="ml-auto hidden w-[260px] items-center gap-2 rounded-md border border-slate-200 bg-white px-3 xl:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input name="q" className="h-9 border-0 px-0 shadow-none focus-visible:ring-0" placeholder="搜索文章、分类或关键词" />
        </form>
        <Button asChild className="hidden h-10 gap-2 px-5 md:inline-flex">
          <Link href="/admin/posts/new">
            <PenLine className="h-4 w-4" />
            写文章
          </Link>
        </Button>
      </div>
    </header>
  );
}
