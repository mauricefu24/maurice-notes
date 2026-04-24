"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CommentComposer() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  function submitComment() {
    const content = value.trim();

    if (!content) {
      setMessage("请先写下评论内容");
      return;
    }

    setValue("");
    setMessage("评论已提交，等待审核");
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="写下你的评论..."
          className="h-11"
        />
        <Button type="button" className="h-11 px-6" onClick={submitComment}>
          发表评论
        </Button>
      </div>
      {message ? <p className="text-sm text-note-teal">{message}</p> : null}
    </div>
  );
}
