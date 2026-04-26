import { CalendarDays, Eye, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Post } from "@/types/blog";
import { cn } from "@/lib/utils";

export function SurfaceCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <Card className={cn("border-slate-200/80 bg-white shadow-none", className)}>{children}</Card>;
}

export function BlockHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-normal text-note-ink">{title}</h2>
        {description ? <p className="text-sm leading-6 text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function TagPill({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-3 py-1.5 text-sm font-medium",
        active ? "bg-note-teal text-white" : "border border-slate-200 bg-white text-slate-600",
      )}
    >
      {children}
    </span>
  );
}

export function SidebarPanel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <SurfaceCard className={className}>
      <CardHeader className="p-5 pb-3">
        <CardTitle className="text-lg tracking-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0">{children}</CardContent>
    </SurfaceCard>
  );
}

export function MiniArticleCard({ post }: { post: Post }) {
  return (
    <Link href={`/articles/${post.slug}`} className="group grid grid-cols-[116px_1fr] gap-4 rounded-md p-2 transition hover:bg-slate-50">
      <div className="relative h-16 overflow-hidden rounded-md bg-slate-100">
        <Image src={post.image} alt="" fill className="object-cover transition group-hover:scale-105" sizes="116px" />
      </div>
      <div className="min-w-0 space-y-1">
        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-note-ink group-hover:text-note-teal">{post.title}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            {post.publishedAt}
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {post.views}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function AuthorMiniCard({
  name,
  role,
  count,
}: {
  name: string;
  role: string;
  count: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 p-3">
      <div className="flex items-center gap-3">
        <div className="relative h-11 w-11 overflow-hidden rounded-full bg-slate-100">
          <Image
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
            alt=""
            fill
            className="object-cover"
            sizes="44px"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-note-ink">{name}</p>
          <p className="text-xs text-muted-foreground">{role} · {count}</p>
        </div>
      </div>
      <Button asChild variant="outline" size="sm">
        <Link href="/about">查看</Link>
      </Button>
    </div>
  );
}

export function MetricTile({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {icon ? <div className="grid h-11 w-11 place-items-center rounded-lg bg-note-mint text-note-teal">{icon}</div> : null}
      <div>
        <p className="text-2xl font-semibold text-note-ink">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export function ContactLine({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <span className="grid h-7 w-7 place-items-center rounded-md bg-note-mint text-note-teal">
        {icon ?? <Mail className="h-3.5 w-3.5" />}
      </span>
      {text}
    </div>
  );
}

export const defaultContactIcons = {
  mail: <Mail className="h-3.5 w-3.5" />,
  location: <MapPin className="h-3.5 w-3.5" />,
};
