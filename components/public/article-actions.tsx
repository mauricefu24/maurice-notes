"use client";

import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ArticleActionsProps = {
  title: string;
  initialLikes?: number;
};

export function ArticleActions({ title, initialLikes = 0 }: ArticleActionsProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  async function shareArticle() {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ title, url });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Button
        type="button"
        variant="outline"
        className={cn("gap-2", liked && "border-note-teal bg-note-mint text-note-teal")}
        onClick={() => setLiked((value) => !value)}
      >
        <ThumbsUp className="h-4 w-4" />
        赞 {initialLikes + (liked ? 1 : 0)}
      </Button>
      <Button
        type="button"
        variant="outline"
        className={cn("gap-2", bookmarked && "border-note-teal bg-note-mint text-note-teal")}
        onClick={() => setBookmarked((value) => !value)}
      >
        <Bookmark className="h-4 w-4" />
        {bookmarked ? "已收藏" : "收藏"}
      </Button>
      <Button type="button" variant="outline" className="gap-2" onClick={shareArticle}>
        <Share2 className="h-4 w-4" />
        {copied ? "已复制链接" : "分享"}
      </Button>
    </div>
  );
}
