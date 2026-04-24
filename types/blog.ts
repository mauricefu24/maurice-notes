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
  postTitle: string;
  body: string;
  status: "pending" | "approved";
  createdAt: string;
};
