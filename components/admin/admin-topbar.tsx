import { Bell, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center gap-4 px-6 lg:px-8">
        <div className="ml-auto flex w-full max-w-md items-center gap-2 rounded-md border border-slate-200 bg-white px-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input className="h-10 border-0 px-0 focus-visible:ring-0" placeholder="搜索文章、页面、评论" />
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-muted-foreground">⌘K</span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="通知" disabled>
            <Bell className="h-4 w-4" />
          </Button>
          <Avatar>
            <AvatarFallback className="bg-note-ink text-white">M</AvatarFallback>
          </Avatar>
          <div className="hidden text-sm md:block">
            <p className="font-medium">Maurice</p>
            <p className="text-xs text-muted-foreground">管理员</p>
          </div>
        </div>
      </div>
    </header>
  );
}
