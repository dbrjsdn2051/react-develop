import type { UseMutationCallback } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "@/api/comment.ts";
import { QUERY_KES } from "@/lib/constants.ts";

export function useUpdateComment(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (updatedComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Comment[]>(
        QUERY_KES.comment.post(updatedComment.post_id),
        (comments) => {
          if (!comments) throw new Error("Failed to update comment");
          return comments.map((comment) => {
            if (comment.id === updatedComment.id) return { ...comment, ...updatedComment };
            return comment;
          });
        }
      );
    },
    onError: error => {
      if (callbacks?.onError) callbacks.onError(error);
    }
  });
}