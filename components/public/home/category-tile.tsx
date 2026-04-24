import Link from "next/link";
import { BookOpen, Box, Code2, Coffee, PenTool, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/types/blog";
import { cn } from "@/lib/utils";

type CategoryTileProps = {
  category: Category;
};

export function CategoryTile({ category }: CategoryTileProps) {
  const Icon =
    category.name === "技术" ? Code2 :
    category.name === "产品" ? Box :
    category.name === "设计" ? PenTool :
    category.name === "生活" ? Coffee :
    category.name === "AI" ? Sparkles :
    BookOpen;

  return (
    <Card className="border-slate-200/80 shadow-none transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link href="/categories" className="block">
        <CardContent className="flex items-start gap-4 p-5">
          <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-lg", category.accent)}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 space-y-1">
            <h3 className="font-semibold text-note-ink">{category.name}</h3>
            <p className="text-sm font-medium text-muted-foreground">{category.postCount} 篇文章</p>
            <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{category.description}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
