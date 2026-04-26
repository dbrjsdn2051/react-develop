import type { UseMutationCallback } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "@/api/comment.ts";
import { QUERY_KES } from "@/lib/constants.ts";

export function useDeleteComment(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (deletedComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
      queryClient.setQueryData<Comment[]>(QUERY_KES.comment.post(deletedComment.post_id), (comments) => {
        if (!comments) throw new Error("Could not delete comment");
        return comments.filter(comment => comment.id !== deletedComment.id);
      });
    },
    onError: error => {
      if (callbacks?.onError) callbacks.onError(error);
    }
  });
}