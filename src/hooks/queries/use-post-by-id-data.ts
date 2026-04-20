import { useQuery } from "@tanstack/react-query";
import { QUERY_KES } from "@/lib/constants.ts";
import { fetchPostById } from "@/api/post.ts";
import { useSession } from "@/store/session.ts";

export function usePostByIdData({ postId, type }: {
  postId: number; type: "FEED" | "DETAIL";
}) {
  const session = useSession();
  return useQuery({
    queryKey: QUERY_KES.post.byId(postId),
    queryFn: () => fetchPostById(postId, session.user.id),
    enabled: type !== "FEED"
  });
}