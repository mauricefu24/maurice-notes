import { BookOpen, Box, Code2, Coffee, PenTool, Sparkles } from "lucide-react";

export type HomeArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  views?: string;
  image: string;
};

export type HomeCategory = {
  id: string;
  name: string;
  count: number;
  description: string;
  tone: string;
  icon: typeof BookOpen;
};

export const featuredArticles: HomeArticle[] = [
  {
    id: "featured-1",
    slug: "build-a-personal-blog-system",
    title: "从 0 到 1 搭建一个个人博客系统",
    excerpt: "分享我如何从需求分析、技术选型到页面上线，独立搭建这套博客系统的全过程与踩坑经验。",
    category: "技术",
    publishedAt: "2024-05-12",
    readingTime: "8 分钟阅读",
    views: "9.1K",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "featured-2",
    slug: "product-thinking-habits",
    title: "一个产品的 7 个习惯",
    excerpt: "从用户视角出发，我总结的产品设计与迭代中最重要的七个思维模型与实践方法。",
    category: "产品",
    publishedAt: "2024-05-05",
    readingTime: "6 分钟阅读",
    views: "5.6K",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "featured-3",
    slug: "visual-hierarchy-in-b2b-ui",
    title: "B 端设计中的信息层级与视觉秩序",
    excerpt: "透过实际案例，聊聊如何在复杂业务系统中建立清晰的信息层级与视觉秩序。",
    category: "设计",
    publishedAt: "2024-04-28",
    readingTime: "7 分钟阅读",
    views: "8.7K",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
  },
];

export const latestArticles: HomeArticle[] = [
  {
    id: "latest-1",
    slug: "frontend-performance-checklist",
    title: "2024 前端性能优化清单（实战版）",
    excerpt: "系统梳理前端性能优化的关键点与实战方法，涵盖加载、渲染、网络、资源等多个维度。",
    category: "技术",
    publishedAt: "2024-05-15",
    readingTime: "9 分钟阅读",
    views: "12.4K",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "latest-2",
    slug: "digital-garden-tools",
    title: "如何建立一个高质量的知识管理系统",
    excerpt: "分享我搭建个人知识库的流程与工具组合，帮助你更好地沉淀、组织与复用知识。",
    category: "产品",
    publishedAt: "2024-05-09",
    readingTime: "7 分钟阅读",
    views: "6.3K",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "latest-3",
    slug: "visual-hierarchy-in-b2b-ui",
    title: "设计系统落地的关键：从规则到组件",
    excerpt: "从设计系统的构建思路到组件化落地，拆解其中的关键策略与协作方法。",
    category: "设计",
    publishedAt: "2024-05-02",
    readingTime: "6 分钟阅读",
    views: "7.2K",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "latest-4",
    slug: "ai-workflow-review",
    title: "数字游民的效率工具箱（我的 12 个推荐）",
    excerpt: "作为一名数字游民，这些工具陪伴我完成了异时区协作、内容创作与生活管理。",
    category: "生活",
    publishedAt: "2024-04-30",
    readingTime: "5 分钟阅读",
    views: "4.8K",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80",
  },
];

export const homeCategories: HomeCategory[] = [
  {
    id: "tech",
    name: "技术",
    count: 56,
    description: "前端、后端、架构与开发实践",
    tone: "bg-teal-50 text-teal-700",
    icon: Code2,
  },
  {
    id: "product",
    name: "产品",
    count: 32,
    description: "产品思维、用户研究与增长实践",
    tone: "bg-cyan-50 text-cyan-700",
    icon: Box,
  },
  {
    id: "design",
    name: "设计",
    count: 28,
    description: "UI/UX、设计系统与设计方法",
    tone: "bg-sky-50 text-sky-700",
    icon: PenTool,
  },
  {
    id: "life",
    name: "生活",
    count: 24,
    description: "生活记录、故事工具与灵感感悟",
    tone: "bg-amber-50 text-amber-700",
    icon: Coffee,
  },
  {
    id: "ai",
    name: "AI",
    count: 18,
    description: "AI 工具、应用探索与未来思考",
    tone: "bg-violet-50 text-violet-700",
    icon: Sparkles,
  },
];

export const authorStats = [
  { label: "阅读总数", value: "128.6K" },
  { label: "文章总数", value: "158" },
  { label: "订阅人数", value: "3.2K" },
];
