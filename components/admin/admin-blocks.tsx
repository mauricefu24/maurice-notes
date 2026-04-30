import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { PostStatus } from "@/types/blog";

export function AdminPageTitle({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-normal text-note-ink">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function AdminCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Card className={cn("border-slate-200/80 bg-white shadow-none", className)}>{children}</Card>;
}

export function AdminStatCard({
  label,
  value,
  delta,
  icon: Icon,
  tone,
  href,
  active,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: LucideIcon;
  tone: string;
  href?: string;
  active?: boolean;
}) {
  const content = (
    <CardContent className="flex items-center gap-4 p-5">
      <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-lg", tone)}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-semibold tracking-normal text-note-ink">{value}</p>
        {delta ? <p className="mt-2 text-xs font-medium text-slate-500">{delta}</p> : null}
      </div>
    </CardContent>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group block rounded-lg border border-slate-200/80 bg-white shadow-none transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400",
          active && "border-slate-900 bg-slate-50 shadow-sm",
        )}
      >
        {content}
      </Link>
    );
  }

  return (
    <AdminCard>
      {content}
    </AdminCard>
  );
}

export function AdminStatusBadge({ status }: { status: PostStatus | string }) {
  const styles: Record<string, string> = {
    published: "bg-emerald-50 text-emerald-700",
    draft: "bg-blue-50 text-blue-700",
    review: "bg-amber-50 text-amber-700",
    已发布: "bg-emerald-50 text-emerald-700",
    草稿: "bg-blue-50 text-blue-700",
    审核中: "bg-amber-50 text-amber-700",
  };

  return (
    <span className={cn("inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium", styles[status] ?? "bg-slate-100 text-slate-600")}>
      {status}
    </span>
  );
}

export function AdminFilterBar({ children }: { children: React.ReactNode }) {
  return (
    <AdminCard>
      <CardContent className="flex flex-wrap items-center gap-3 p-4">{children}</CardContent>
    </AdminCard>
  );
}

export function AdminSearchInput({
  placeholder,
  name,
  defaultValue,
}: {
  placeholder: string;
  name?: string;
  defaultValue?: string;
}) {
  return (
    <div className="min-w-[280px] flex-1">
      <Input name={name} defaultValue={defaultValue} className="h-11" placeholder={placeholder} />
    </div>
  );
}

export function SidePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <AdminCard>
      <CardHeader className="p-5 pb-3">
        <CardTitle className="text-lg tracking-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0">{children}</CardContent>
    </AdminCard>
  );
}

export function QuickActionRow({ icon: Icon, label, href }: { icon: LucideIcon; label: string; href?: string }) {
  const className =
    "flex w-full items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-left text-sm transition hover:bg-note-mint hover:text-note-teal";
  const content = (
    <>
      <span className="inline-flex items-center gap-3">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <ChevronRight className="h-4 w-4" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      {content}
    </button>
  );
}

export function MiniPostRank({ rank, title, image, views }: { rank: number; title: string; image: string; views: string }) {
  return (
    <div className="grid grid-cols-[20px_58px_1fr] items-center gap-3">
      <span className="text-sm font-semibold text-orange-500">{rank}</span>
      <div className="relative h-12 overflow-hidden rounded-md bg-slate-100">
        <Image src={image} alt="" fill className="object-cover" sizes="58px" />
      </div>
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm font-medium leading-5 text-note-ink">{title}</p>
        <p className="text-xs text-muted-foreground">{views}</p>
      </div>
    </div>
  );
}

export function ToggleRow({ label, description, enabled }: { label: string; description: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg p-2">
      <div>
        <p className="text-sm font-medium text-note-ink">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <span className={cn("relative h-6 w-11 rounded-full transition", enabled ? "bg-note-teal" : "bg-slate-200")}>
        <span className={cn("absolute top-1 h-4 w-4 rounded-full bg-white transition", enabled ? "left-6" : "left-1")} />
      </span>
    </div>
  );
}

export function EditorInput({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-note-ink">
        {label}
        {required ? <span className="ml-1 text-red-500">*</span> : null}
      </span>
      {children}
    </label>
  );
}

export function AdminLinkCard({ href, label, icon: Icon }: { href: string; label: string; icon: LucideIcon }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-note-mint hover:text-note-teal">
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
