import { categories, comments, posts, siteSettings } from "@/lib/mock-data";
import { prisma } from "@/lib/prisma";
import type { Category, Comment, Post, SiteSettings } from "@/types/blog";

type DbPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  author: string;
  publishedAt: Date;
  readingTime: string;
  views: string;
  comments: number;
  image: string;
  featured: boolean;
};

type DbCategory = {
  slug: string;
  name: string;
  description: string;
  accent: string;
};

type DbComment = {
  id: string;
  author: string;
  avatar: string | null;
  postTitle: string;
  body: string;
  status: string;
  flagged: boolean;
  createdAt: Date;
};

function toPost(post: DbPost): Post {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    status: post.status === "published" || post.status === "review" ? post.status : "draft",
    author: post.author,
    publishedAt: post.publishedAt.toISOString().slice(0, 10),
    readingTime: post.readingTime,
    views: post.views,
    comments: post.comments,
    image: post.image,
    featured: post.featured,
  };
}

function toCategory(category: DbCategory, postCount: number): Category {
  return {
    slug: category.slug,
    name: category.name,
    description: category.description,
    accent: category.accent,
    postCount,
  };
}

function toComment(comment: DbComment): Comment {
  return {
    id: comment.id,
    author: comment.author,
    avatar: comment.avatar ?? undefined,
    postTitle: comment.postTitle,
    body: comment.body,
    status:
      comment.status === "approved" || comment.status === "spam" || comment.status === "deleted"
        ? comment.status
        : "pending",
    flagged: comment.flagged,
    createdAt: comment.createdAt.toISOString().slice(0, 10),
  };
}

function parseDate(value: string) {
  return new Date(`${value}T00:00:00.000Z`);
}

function parseViews(value: string) {
  const normalized = value.trim().toUpperCase();

  if (normalized.endsWith("K")) {
    return Math.round(Number(normalized.slice(0, -1)) * 1000);
  }

  return Number(normalized.replace(/,/g, "")) || 0;
}

function formatCompactNumber(value: number) {
  if (value >= 1000) {
    const compact = value / 1000;
    return `${Number.isInteger(compact) ? compact.toFixed(0) : compact.toFixed(1)}K`;
  }

  return `${value}`;
}

async function seedPostsIfEmpty() {
  const count = await prisma.post.count();

  if (count > 0) {
    return;
  }

  await prisma.post.createMany({
    data: posts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content ?? post.excerpt,
      category: post.category,
      status: post.status,
      author: post.author,
      publishedAt: parseDate(post.publishedAt),
      readingTime: post.readingTime,
      views: post.views,
      comments: post.comments,
      image: post.image,
      featured: post.featured ?? false,
    })),
  });
}

async function seedCategoriesIfEmpty() {
  const count = await prisma.category.count();

  if (count > 0) {
    return;
  }

  await prisma.category.createMany({
    data: categories.map((category, index) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
      accent: category.accent,
      sortOrder: index,
    })),
  });
}

async function seedCommentsIfEmpty() {
  const count = await prisma.comment.count();

  if (count > 0) {
    return;
  }

  await prisma.comment.createMany({
    data: comments.map((comment, index) => ({
      id: comment.id,
      author: comment.author,
      postTitle: comment.postTitle,
      body: comment.body,
      status: comment.status,
      flagged: false,
      createdAt: index < 2 ? new Date() : parseDate("2024-04-20"),
    })),
  });
}

async function seedSettingsIfEmpty() {
  const setting = await prisma.siteSetting.findUnique({ where: { key: "site" } });

  if (setting) {
    return;
  }

  await prisma.siteSetting.create({
    data: {
      key: "site",
      value: siteSettings,
    },
  });
}

async function ensureSeedData() {
  await seedPostsIfEmpty();
  await seedCategoriesIfEmpty();
  await seedCommentsIfEmpty();
  await seedSettingsIfEmpty();
}

async function withMockFallback<T>(query: () => Promise<T>, fallback: T) {
  try {
    await ensureSeedData();
    return await query();
  } catch (error) {
    console.warn("Falling back to mock blog data:", error);
    return fallback;
  }
}

export async function getFeaturedPosts() {
  return withMockFallback(
    async () => {
      const dbPosts = await prisma.post.findMany({
        where: { featured: true, status: "published" },
        orderBy: { publishedAt: "desc" },
      });
      return dbPosts.map(toPost);
    },
    posts.filter((post) => post.featured && post.status === "published"),
  );
}

export async function getPublishedPosts() {
  return withMockFallback(
    async () => {
      const dbPosts = await prisma.post.findMany({
        where: { status: "published" },
        orderBy: { publishedAt: "desc" },
      });
      return dbPosts.map(toPost);
    },
    posts.filter((post) => post.status === "published"),
  );
}

export async function getAllPosts() {
  return withMockFallback(
    async () => {
      const dbPosts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });
      return dbPosts.map(toPost);
    },
    posts,
  );
}

export async function getPostBySlug(slug: string) {
  return withMockFallback(
    async () => {
      const post = await prisma.post.findUnique({ where: { slug } });
      return post ? toPost(post) : undefined;
    },
    posts.find((post) => post.slug === slug),
  );
}

export async function getPostById(id: string) {
  return withMockFallback(
    async () => {
      const post = await prisma.post.findUnique({ where: { id } });
      return post ? toPost(post) : undefined;
    },
    posts.find((post) => post.id === id),
  );
}

export async function getCategories() {
  return withMockFallback(
    async () => {
      const [dbCategories, dbPosts] = await Promise.all([
        prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
        prisma.post.groupBy({
          by: ["category"],
          _count: { category: true },
        }),
      ]);
      const postCountByCategory = new Map(dbPosts.map((item) => [item.category, item._count.category]));

      return dbCategories.map((category) => toCategory(category, postCountByCategory.get(category.name) ?? 0));
    },
    categories,
  );
}

export async function getComments() {
  return withMockFallback(
    async () => {
      const dbComments = await prisma.comment.findMany({ orderBy: { createdAt: "desc" } });
      return dbComments.map(toComment);
    },
    comments,
  );
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return withMockFallback(
    async () => {
      const setting = await prisma.siteSetting.findUnique({ where: { key: "site" } });
      return (setting?.value as SiteSettings | undefined) ?? siteSettings;
    },
    siteSettings,
  );
}

export async function getBlogStats() {
  return withMockFallback(
    async () => {
      const [allPosts, dbCategories, dbComments] = await Promise.all([
        prisma.post.findMany({
          select: {
            status: true,
            views: true,
            comments: true,
          },
        }),
        prisma.category.findMany({ select: { slug: true } }),
        prisma.comment.findMany({ select: { status: true } }),
      ]);

      const publishedPosts = allPosts.filter((post) => post.status === "published");
      const draftPosts = allPosts.filter((post) => post.status === "draft");
      const reviewPosts = allPosts.filter((post) => post.status === "review");
      const totalViews = allPosts.reduce((total, post) => total + parseViews(post.views), 0);
      const totalPostComments = allPosts.reduce((total, post) => total + post.comments, 0);
      const pendingComments = dbComments.filter((comment) => comment.status === "pending");
      const approvedComments = dbComments.filter((comment) => comment.status === "approved");
      const spamComments = dbComments.filter((comment) => comment.status === "spam");
      const deletedComments = dbComments.filter((comment) => comment.status === "deleted");

      return {
        totalPosts: allPosts.length,
        publishedPosts: publishedPosts.length,
        draftPosts: draftPosts.length,
        reviewPosts: reviewPosts.length,
        totalViews,
        totalViewsLabel: formatCompactNumber(totalViews),
        totalPostComments,
        totalComments: dbComments.length,
        pendingComments: pendingComments.length,
        approvedComments: approvedComments.length,
        spamComments: spamComments.length,
        deletedComments: deletedComments.length,
        totalCategories: dbCategories.length,
      };
    },
    {
      totalPosts: posts.length,
      publishedPosts: posts.filter((post) => post.status === "published").length,
      draftPosts: posts.filter((post) => post.status === "draft").length,
      reviewPosts: posts.filter((post) => post.status === "review").length,
      totalViews: posts.reduce((total, post) => total + parseViews(post.views), 0),
      totalViewsLabel: formatCompactNumber(posts.reduce((total, post) => total + parseViews(post.views), 0)),
      totalPostComments: posts.reduce((total, post) => total + post.comments, 0),
      totalComments: comments.length,
      pendingComments: comments.filter((comment) => comment.status === "pending").length,
      approvedComments: comments.filter((comment) => comment.status === "approved").length,
      spamComments: 0,
      deletedComments: 0,
      totalCategories: categories.length,
    },
  );
}

export async function getArchiveYears() {
  const publishedPosts = await getPublishedPosts();
  const yearMap = new Map<string, Map<string, Post[]>>();

  for (const post of publishedPosts) {
    const [year, month] = post.publishedAt.split("-");
    const monthLabel = `${Number(month)} 月`;

    if (!yearMap.has(year)) {
      yearMap.set(year, new Map());
    }

    const monthMap = yearMap.get(year)!;
    monthMap.set(monthLabel, [...(monthMap.get(monthLabel) ?? []), post]);
  }

  return Array.from(yearMap.entries())
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
    .map(([year, monthMap]) => ({
      year,
      months: Array.from(monthMap.entries()).map(([month, monthPosts]) => ({ month, posts: monthPosts })),
    }));
}
