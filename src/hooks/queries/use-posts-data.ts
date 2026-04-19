import { QUERY_KES } from "@/lib/constants.ts";
import { fetchPosts } from "@/api/post.ts";
import { useQuery } from "@tanstack/react-query";

export function usePostsData() {
  return useQuery({
    queryKe: QUERY_KES.post.list,
    queryFn: () => fetchPosts()
  });
}