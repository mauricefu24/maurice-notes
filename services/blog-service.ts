import { categories, comments, posts } from "@/lib/mock-data";

export function getFeaturedPosts() {
  return posts.filter((post) => post.featured);
}

export function getPublishedPosts() {
  return posts.filter((post) => post.status === "published");
}

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function getCategories() {
  return categories;
}

export function getComments() {
  return comments;
}

export function getArchiveYears() {
  return [
    {
      year: "2024",
      months: [
        { month: "5 月", posts: posts.filter((post) => post.publishedAt.startsWith("2024-05")) },
        { month: "4 月", posts: posts.filter((post) => post.publishedAt.startsWith("2024-04")) },
      ],
    },
  ];
}
