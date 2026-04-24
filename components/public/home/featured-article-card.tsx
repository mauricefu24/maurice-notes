import { CalendarDays, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { HomeArticle } from "@/lib/homepage-data";
import { HomeBadge } from "./home-badge";

type FeaturedArticleCardProps = {
  article: HomeArticle;
};

export function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
  return (
    <Card className="group overflow-hidden border-slate-200/80 shadow-none transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative h-[124px] overflow-hidden bg-slate-100">
          <Image
            src={article.image}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(min-width: 1024px) 360px, 100vw"
          />
          <div className="absolute left-4 top-4">
            <HomeBadge>{article.category}</HomeBadge>
          </div>
        </div>
        <CardContent className="space-y-4 p-5">
          <div className="space-y-2">
            <h3 className="line-clamp-2 text-lg font-semibold leading-7 tracking-normal text-note-ink group-hover:text-note-teal">
              {article.title}
            </h3>
            <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {article.publishedAt}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {article.readingTime}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
