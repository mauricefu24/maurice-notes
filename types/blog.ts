export type Category = {
  slug: string;
  name: string;
  description: string;
  postCount: number;
  accent: string;
};

export type PostStatus = "published" | "draft" | "review";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: PostStatus;
  author: string;
  publishedAt: string;
  readingTime: string;
  views: string;
  comments: number;
  image: string;
  featured?: boolean;
};

export type Comment = {
  id: string;
  author: string;
  avatar?: string;
  postTitle: string;
  body: string;
  status: "pending" | "approved" | "spam" | "deleted";
  flagged?: boolean;
  createdAt: string;
};

export type SiteSettings = {
  siteName: string;
  siteDescription: string;
  siteDomain: string;
  timezone: string;
  language: string;
  footerDescription: string;
  icp: string;
  copyright: string;
  email: string;
  github: string;
  twitter: string;
  linkedin: string;
  wechat: string;
};
