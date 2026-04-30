"use client";

import { ArrowRight, LockKeyhole } from "lucide-react";
import { useActionState } from "react";

import { loginAdmin } from "@/app/admin-login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(loginAdmin, { message: "" });

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="next" value={next} />
      <label className="block space-y-2">
        <span className="text-sm font-medium text-white/78">管理员密码</span>
        <span className="relative block">
          <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/44" />
          <Input
            name="password"
            type="password"
            aria-label="管理员密码"
            placeholder="输入访问密码"
            className="h-12 border-white/15 bg-white/10 pl-10 text-white placeholder:text-white/36 focus-visible:ring-note-mint"
            required
          />
        </span>
      </label>
      <Button type="submit" aria-label="登录" className="h-12 w-full gap-2 bg-note-teal text-white hover:bg-teal-700" disabled={pending}>
        {pending ? "验证中" : "进入后台"}
        <ArrowRight className="h-4 w-4" />
      </Button>
      {state.message ? (
        <p className="rounded-md border border-red-300/30 bg-red-500/12 px-3 py-2 text-sm text-red-100">{state.message}</p>
      ) : null}
    </form>
  );
}
