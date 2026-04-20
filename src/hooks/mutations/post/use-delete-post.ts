import type { Post, UseMutationCallback } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/api/post.ts";
import { deleteImagesInPath } from "@/api/image.ts";
import { QUERY_KES } from "@/lib/constants.ts";

export function useDeletePost(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  return useMutation({
      mutationFn: deletePost,
      onSuccess: async (deletedPost) => {
        if (callbacks?.onSuccess) callbacks.onSuccess();
        if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
          await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
        }
        queryClient.resetQueries({
          queryKey: QUERY_KES.post.list
        });
      }, onError: error => {
        if (callbacks?.onError) callbacks.onError(error);
      }
    }
  );
}