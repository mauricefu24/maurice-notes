"use client";

import { MessageSquare, Share2, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import type { LikeFormState } from "@/app/(public)/articles/[slug]/actions";
import { cn } from "@/lib/utils";

type ArticleActionsProps = {
  title: string;
  initialLikes: number;
  likeAction: (state: LikeFormState) => Promise<LikeFormState>;
};

export function ArticleActions({ title, initialLikes, likeAction }: ArticleActionsProps) {
  const [likeState, formAction, pending] = useActionState(likeAction, {
    liked: false,
    likes: initialLikes,
    message: "",
  });
  const [copied, setCopied] = useState(false);

  async function shareArticle() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setCopied(false);
    }
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <form action={formAction}>
        <Button
          type="submit"
          variant="outline"
          className={cn("w-full gap-2", likeState.liked && "border-note-teal bg-note-mint text-note-teal")}
          disabled={pending || likeState.liked}
        >
          <ThumbsUp className="h-4 w-4" />
          赞 {likeState.likes}
        </Button>
      </form>
      <Button asChild variant="outline" className="gap-2">
        <Link href="#comments">
          <MessageSquare className="h-4 w-4" />
          评论
        </Link>
      </Button>
      <Button type="button" variant="outline" className="gap-2" onClick={shareArticle}>
        <Share2 className="h-4 w-4" />
        {copied ? "已复制链接" : "分享"}
      </Button>
    </div>
  );
}
