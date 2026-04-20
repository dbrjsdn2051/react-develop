import type { UseMutationCallback } from "@/types.ts";
import { useMutation } from "@tanstack/react-query";
import { deletePost } from "@/api/post.ts";
import { deleteImagesInPath } from "@/api/image.ts";

export function useDeletePost(callbacks?: UseMutationCallback) {
  return useMutation({
      mutationFn: deletePost,
      onSuccess: async (deletedPost) => {
        if (callbacks?.onSuccess) callbacks.onSuccess();
        if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
          await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
        }
      }, onError: error => {
        if (callbacks?.onError) callbacks.onError(error);
      }
    }
  );
}