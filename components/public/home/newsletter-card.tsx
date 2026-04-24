import { Mail } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { NewsletterSignup } from "@/components/public/newsletter-signup";

export function NewsletterCard() {
  return (
    <Card className="border-slate-200/80 shadow-none">
      <CardContent className="space-y-5 p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-note-teal" />
            <h2 className="text-xl font-semibold tracking-normal text-note-ink">订阅我的周刊</h2>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">每周一封邮件，分享我的思考、发现与工具。</p>
        </div>
        <NewsletterSignup />
        <p className="text-xs leading-5 text-muted-foreground">我尊重你的隐私，随时可以取消订阅。</p>
      </CardContent>
    </Card>
  );
}
