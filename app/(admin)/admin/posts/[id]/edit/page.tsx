import { PostEditorScreen } from "@/components/admin/post-editor-screen";
import { getAllPosts } from "@/services/blog-service";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = getAllPosts().find((item) => item.id === id) ?? getAllPosts()[0];

  return <PostEditorScreen mode="edit" post={post} />;
}
