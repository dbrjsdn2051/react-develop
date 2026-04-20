import type { Post, UseMutationCallback } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/api/post.ts";
import { QUERY_KES } from "@/lib/constants.ts";

export function useUpdatePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: updatePost,
      onSuccess: (updatedPost) => {
        if (callbacks?.onSuccess) callbacks.onSuccess();
        queryClient.setQueryData<Post>(QUERY_KES.post.byId(updatedPost.id), (prevPost) => {
          if (!prevPost) throw new Error(`${updatedPost.id} not found`);
          return { ...prevPost, ...updatedPost };
        });

      }, onError: error => {
        if (callbacks?.onError) callbacks.onError(error);
      }
    }
  );
}