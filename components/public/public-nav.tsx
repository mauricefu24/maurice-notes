"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/articles", label: "文章" },
  { href: "/categories", label: "分类" },
  { href: "/archives", label: "归档" },
  { href: "/about", label: "关于" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function PublicDesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden flex-1 items-center justify-center gap-7 text-sm font-medium text-slate-600 lg:flex">
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-2 transition hover:bg-note-mint hover:text-note-teal",
              active && "bg-note-mint text-note-teal",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function PublicMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="page-shell flex gap-2 overflow-x-auto border-t border-slate-100 py-3 text-sm font-medium text-slate-600 lg:hidden">
      {navItems.map((item) => {
        const active = isActivePath(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-md px-3 py-1.5 transition hover:bg-note-mint hover:text-note-teal",
              active && "bg-note-mint text-note-teal",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
