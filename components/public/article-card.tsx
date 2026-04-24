import { Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Post } from "@/types/blog";

type ArticleCardProps = {
  post: Post;
  compact?: boolean;
};

export function ArticleCard({ post, compact }: ArticleCardProps) {
  if (compact) {
    return (
      <Link href={`/articles/${post.slug}`} className="group grid grid-cols-[144px_1fr] gap-5 rounded-lg p-3 transition hover:bg-muted">
        <div className="relative h-24 overflow-hidden rounded-md">
          <Image src={post.image} alt="" fill className="object-cover transition group-hover:scale-105" sizes="144px" />
        </div>
        <div className="space-y-2">
          <h3 className="line-clamp-1 font-semibold text-note-ink group-hover:text-note-teal">{post.title}</h3>
          <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{post.publishedAt}</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-soft">
      <Link href={`/articles/${post.slug}`} className="group block">
        <div className="relative h-48">
          <Image src={post.image} alt="" fill className="object-cover transition group-hover:scale-105" sizes="(min-width: 1024px) 360px, 100vw" />
        </div>
        <CardContent className="space-y-4 p-5">
          <Badge>{post.category}</Badge>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-normal text-note-ink group-hover:text-note-teal">{post.title}</h3>
            <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {post.publishedAt}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime}
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
