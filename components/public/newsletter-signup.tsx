"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function subscribe() {
    const value = email.trim();

    if (!emailPattern.test(value)) {
      setMessage("请输入有效的邮箱地址");
      return;
    }

    setEmail("");
    setMessage("订阅成功，感谢关注");
  }

  return (
    <div className="space-y-3">
      <Input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="输入你的邮箱地址"
        className="h-11"
      />
      <Button type="button" className="h-11 w-full" onClick={subscribe}>
        立即订阅
      </Button>
      {message ? <p className="text-xs leading-5 text-note-teal">{message}</p> : null}
    </div>
  );
}
