import { PostEditorScreen } from "@/components/admin/post-editor-screen";
import { publishPost, savePostDraft, updatePost } from "@/app/(admin)/admin/posts/actions";
import { getPostById } from "@/services/blog-service";
import { notFound } from "next/navigation";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ error?: string; success?: string }>;
};

export default async function EditPostPage({ params, searchParams }: EditPostPageProps) {
  const { id } = await params;
  const query = (await searchParams) ?? {};
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
      error={query.error}
      success={query.success}
    />
  );
}
