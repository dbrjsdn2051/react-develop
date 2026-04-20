import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KES } from "@/lib/constants.ts";
import { fetchPosts } from "@/api/post.ts";

const PAGE_SIZE = 5;

export function useInfinitePostsData() {

  const queryClient = useQueryClient();

  return useInfiniteQuery({
    queryKey: QUERY_KES.post.list,
    queryFn: async ({ pageParam }) => {
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const posts =  await fetchPosts({ from, to });

      posts.forEach((post) => {
        queryClient.setQueryData(QUERY_KES.post.byId(post.id), post);
      })
      return posts.map((post) => post.id);
    },

    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) return undefined;
      return allPages.length;
    },

    staleTime: Infinity,
  });
}
