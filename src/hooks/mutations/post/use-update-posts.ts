import type { UseMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";
import { updatePost } from "@/api/post.ts";

export function useUpdatePost(callbacks?: UseMutationCallback) {
  return useMutation({
      mutationFn: updatePost,
      onSuccess: () => {
        if (callbacks?.onSuccess) callbacks.onSuccess();
      }, onError: error => {
        if (callbacks?.onError) callbacks.onError(error);
      }
    }
  );
}