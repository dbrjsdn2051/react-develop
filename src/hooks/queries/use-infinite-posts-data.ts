import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KES } from "@/lib/constants.ts";
import { fetchPosts } from "@/api/post.ts";

const PAGE_SIZE = 5;

export function useInfinitePostsData() {
  return useInfiniteQuery({
    queryKey: QUERY_KES.post.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      return await fetchPosts({ from, to });
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    }
  });
}
