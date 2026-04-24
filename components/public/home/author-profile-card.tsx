import { MapPin } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { StatMetric } from "./stat-metric";

type AuthorProfileCardProps = {
  stats: Array<{ label: string; value: string }>;
};

export function AuthorProfileCard({ stats }: AuthorProfileCardProps) {
  return (
    <Card className="border-slate-200/80 shadow-none">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border">
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80"
              alt="Maurice"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-normal text-note-ink">Maurice</h2>
            <p className="mt-1 text-sm text-muted-foreground">产品设计师 & 独立开发者</p>
          </div>
        </div>
        <p className="text-sm leading-7 text-muted-foreground">
          热爱创造与思考，关注技术、产品与设计的结合，持续探索更好的解决方案。
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          深圳
        </div>
        <div className="grid grid-cols-3 divide-x border-t pt-5">
          {stats.map((stat) => (
            <StatMetric key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
