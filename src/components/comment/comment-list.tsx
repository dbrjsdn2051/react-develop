import CommentItem from "@/components/comment/comment-item";
import { useCommentsData } from "@/hooks/queries/use-comments-data.ts";
import Fallback from "@/components/fallback.tsx";
import Loader from "@/components/loader.tsx";
import type { Comment, NestedComment } from "@/types.ts";

function toNestedComments(comments: Comment[]): NestedComment[] {
  const map = new Map<number, NestedComment>();
  comments.forEach(comment => {
    map.set(comment.id, { ...comment, children: [] });
  });

  const result: NestedComment[] = [];
  comments.forEach(comment => {
    const node = map.get(comment.id)!;
    if (!comment.root_comment_id) {
      result.push(node);
    } else {
      const root = map.get(comment.root_comment_id);
      const parent = comment.parent_comment_id ? map.get(comment.parent_comment_id) : undefined;
      if (root) {
        node.parentComment = parent;
        root.children.push(node);
      }
    }
  });

  return result;
}

export default function CommentList({ postId }: { postId: number }) {
  const { data: comments, error: fetchCommentsError, isPending: isFetchCommentsPending } = useCommentsData(postId);

  if (fetchCommentsError) return <Fallback />;
  if (isFetchCommentsPending) return <Loader />;

  const nestedComments = toNestedComments(comments);

  return (
    <div className="flex flex-col gap-5">
      {nestedComments.map((comment) => <CommentItem key={comment.id} {...comment} />)}
    </div>
  );
}
