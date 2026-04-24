import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type StatCardProps = {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
};

export function StatCard({ label, value, delta, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-5 p-5">
        <div className="grid h-12 w-12 place-items-center rounded-md bg-note-mint text-note-teal">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold text-note-ink">{value}</p>
          <p className="text-xs font-medium text-emerald-600">{delta}</p>
        </div>
      </CardContent>
    </Card>
  );
}
