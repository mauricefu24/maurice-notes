import { PostEditorScreen } from "@/components/admin/post-editor-screen";
import { createPost } from "@/app/(admin)/admin/posts/actions";

export default function NewPostPage() {
  return <PostEditorScreen action={createPost} mode="new" />;
}
