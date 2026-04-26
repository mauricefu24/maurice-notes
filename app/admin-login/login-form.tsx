"use client";

import { useActionState } from "react";

import { loginAdmin } from "@/app/admin-login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(loginAdmin, { message: "" });

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <Input name="password" type="password" placeholder="管理员密码" className="h-11" required />
      <Button type="submit" className="h-11 w-full" disabled={pending}>
        {pending ? "登录中" : "登录后台"}
      </Button>
      {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}
    </form>
  );
}
