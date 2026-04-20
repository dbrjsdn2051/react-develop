import { useQuery } from "@tanstack/react-query";
import { QUERY_KES } from "@/lib/constants.ts";
import { fetchPostById } from "@/api/post.ts";

export function usePostByIdData({ postId, type }: {
  postId: number; type: "FEED" | "DETAIL";
}) {
  return useQuery({
    queryKey: QUERY_KES.post.byId(postId),
    queryFn: () => fetchPostById(postId),
    enabled: type !== "FEED"
  });
}