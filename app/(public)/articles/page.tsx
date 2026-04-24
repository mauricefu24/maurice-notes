import { ArticleCard } from "@/components/public/article-card";
import { PageHeading } from "@/components/shared/page-heading";
import { getPublishedPosts } from "@/services/blog-service";

export default function ArticlesPage() {
  const posts = getPublishedPosts();

  return (
    <div className="page-shell space-y-10 py-12">
      <PageHeading
        eyebrow="文章"
        title="文章与实践笔记"
        description="这里收集 Maurice 关于技术、产品、设计、AI 与生活方式的长期记录。每一篇都来自真实项目、日常观察或阶段性复盘。"
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
