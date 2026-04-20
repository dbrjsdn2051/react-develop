import type { Post, UseMutationCallback } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePostLike } from "@/api/post.ts";
import { QUERY_KES } from "@/lib/constants.ts";

export default function useTogglePostLike(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: togglePostLike,
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KES.post.byId(postId)
      });

      const prevPost = queryClient.getQueryData<Post>(
        QUERY_KES.post.byId(postId)
      );

      queryClient.setQueryData<Post>(
        QUERY_KES.post.byId(postId),
        (post) => {
          if (!post) throw new Error("post not found");
          return {
            ...post,
            isLiked: !post.isLiked,
            like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1
          };
        }
      );
      return {
        prevPost,
      }
    },
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error, _, context) => {
      if(context && context.prevPost) {
        queryClient.setQueryData(
          QUERY_KES.post.byId(context.prevPost.id),
          context.prevPost,
        )
      }
      if (callbacks?.onError) callbacks.onError(error);
    }
  });
}