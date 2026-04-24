import { Bookmark, CalendarDays, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { HomeArticle } from "@/lib/homepage-data";
import { HomeBadge } from "./home-badge";

type LatestArticleItemProps = {
  article: HomeArticle;
};

export function LatestArticleItem({ article }: LatestArticleItemProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group grid gap-4 rounded-lg py-4 transition hover:bg-slate-50 sm:grid-cols-[156px_1fr_24px] sm:px-3"
    >
      <div className="relative h-[92px] overflow-hidden rounded-md bg-slate-100">
        <Image src={article.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="156px" />
      </div>
      <div className="min-w-0 space-y-2">
        <h3 className="line-clamp-1 text-lg font-semibold tracking-normal text-note-ink group-hover:text-note-teal">{article.title}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <HomeBadge className="py-0.5">{article.category}</HomeBadge>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {article.publishedAt}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3.5 w-3.5" />
            {article.readingTime}
          </span>
        </div>
      </div>
      <div className="hidden items-center justify-center text-muted-foreground sm:flex">
        <Bookmark className="h-4 w-4" />
      </div>
    </Link>
  );
}
