import { PostEditorScreen } from "@/components/admin/post-editor-screen";
import { createDraftPost, createPost, createPublishedPost } from "@/app/(admin)/admin/posts/actions";

export default function NewPostPage() {
  return <PostEditorScreen action={createPost} draftAction={createDraftPost} publishAction={createPublishedPost} mode="new" />;
}
