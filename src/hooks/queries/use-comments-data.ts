import { useQuery } from "@tanstack/react-query";
import { QUERY_KES } from "@/lib/constants.ts";
import { fetchComments } from "@/api/comment.ts";

export function useCommentsData(postId: number) {
  return useQuery({
    queryKey: QUERY_KES.comment.post(postId),
    queryFn: () => fetchComments(postId)
  });
}