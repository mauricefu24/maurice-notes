import type { Metadata } from "next";
import { Geist, Newsreader } from "next/font/google";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "Maurice Notes",
  description: "一个记录技术、产品、设计、生活与 AI 思考的高级个人博客。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${geist.variable} ${newsreader.variable}`}>{children}</body>
    </html>
  );
}
