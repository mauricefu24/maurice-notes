import { PostEditorScreen } from "@/components/admin/post-editor-screen";
import { createDraftPost, createPost, createPublishedPost } from "@/app/(admin)/admin/posts/actions";

type NewPostPageProps = {
  searchParams?: Promise<{ error?: string; success?: string }>;
};

export default async function NewPostPage({ searchParams }: NewPostPageProps) {
  const params = (await searchParams) ?? {};

  return (
    <PostEditorScreen
      action={createPost}
      draftAction={createDraftPost}
      publishAction={createPublishedPost}
      mode="new"
      error={params.error}
      success={params.success}
    />
  );
}
