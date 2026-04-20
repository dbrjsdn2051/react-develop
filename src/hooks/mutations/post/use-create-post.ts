import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, createPostWithImages } from "@/api/post.ts";
import type { UseMutationCallback } from "@/types.ts";
import { QUERY_KES } from "@/lib/constants.ts";

export function useCreatePost(callbacks?: UseMutationCallback) {

  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: createPostWithImages,
      onSuccess: () => {
        if (callbacks?.onSuccess) callbacks.onSuccess();

        queryClient.resetQueries({
          queryKey: QUERY_KES.post.list
        });
      }, onError: error => {
        if (callbacks?.onError) callbacks.onError(error);
      }
    }
  );
}