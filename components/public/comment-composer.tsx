"use client";

import { useActionState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { CommentFormState } from "@/app/(public)/articles/[slug]/actions";

type CommentComposerProps = {
  action: (state: CommentFormState, formData: FormData) => Promise<CommentFormState>;
};

const initialState: CommentFormState = { ok: false, message: "" };

export function CommentComposer({ action }: CommentComposerProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
    }
  }, [state.ok]);

  return (
    <form ref={formRef} action={formAction} className="space-y-2">
      <div className="grid gap-3 sm:grid-cols-[180px_1fr_auto]">
        <Input
          name="author"
          placeholder="你的昵称"
          className="h-11"
          maxLength={40}
        />
        <Input
          name="body"
          placeholder="写下你的评论..."
          className="h-11"
          maxLength={1000}
          required
        />
        <Button type="submit" className="h-11 px-6" disabled={pending}>
          {pending ? "提交中" : "发表评论"}
        </Button>
      </div>
      {state.message ? (
        <p className={state.ok ? "text-sm text-note-teal" : "text-sm text-red-600"}>{state.message}</p>
      ) : null}
    </form>
  );
}
