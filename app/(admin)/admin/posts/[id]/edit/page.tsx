import { PostEditorScreen } from "@/components/admin/post-editor-screen";
import { publishPost, savePostDraft, updatePost } from "@/app/(admin)/admin/posts/actions";
import { getPostById } from "@/services/blog-service";
import { notFound } from "next/navigation";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <PostEditorScreen
      action={updatePost.bind(null, id)}
      draftAction={savePostDraft.bind(null, id)}
      publishAction={publishPost.bind(null, id)}
      mode="edit"
      post={post}
    />
  );
}
