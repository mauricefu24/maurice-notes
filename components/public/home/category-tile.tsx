import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { HomeCategory } from "@/lib/homepage-data";
import { cn } from "@/lib/utils";

type CategoryTileProps = {
  category: HomeCategory;
};

export function CategoryTile({ category }: CategoryTileProps) {
  const Icon = category.icon;

  return (
    <Card className="border-slate-200/80 shadow-none transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <Link href="/categories" className="block">
        <CardContent className="flex items-start gap-4 p-5">
          <div className={cn("grid h-12 w-12 shrink-0 place-items-center rounded-lg", category.tone)}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 space-y-1">
            <h3 className="font-semibold text-note-ink">{category.name}</h3>
            <p className="text-sm font-medium text-muted-foreground">{category.count} 篇文章</p>
            <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">{category.description}</p>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
