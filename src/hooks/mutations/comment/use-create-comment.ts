import type { UseMutationCallback } from "@/types.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/api/comment.ts";
import { QUERY_KES } from "@/lib/constants.ts";
import { useSession } from "@/store/session.ts";
import { useProfileData } from "@/hooks/queries/use-profile-data.ts";

export function useCreateComment(callbacks?: UseMutationCallback) {
  const queryClient = useQueryClient();
  const session = useSession();
  const { data: profile } = useProfileData(session?.user.id);

  return useMutation({
    mutationFn: createComment,
    onSuccess: (newComment) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<Comment[]>(
        QUERY_KES.comment.post(newComment.post_id),
        (comments) => {
          if (!comments) throw new Error("Could not comment");
          if (!profile) throw new Error("Could not profile");
          return [...comments, { ...newComment, author: profile }];
        }
      );
    },
    onError: error => {
      if (callbacks?.onError) callbacks.onError(error);
    }
  });
}