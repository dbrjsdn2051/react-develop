import Fallback from "@/components/fallback.tsx";
import Loader from "@/components/loader.tsx";
import PostItem from "@/components/post/post-item.tsx";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfinitePostsData } from "@/hooks/queries/use-infinite-posts-data.ts";

export default function PostFeed({ authorId }: { authorId?: string }) {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } = useInfinitePostsData(authorId);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return <div className={"flex flex-col gap-10"}>
    {
      data.pages.map((page) => page.map((postId) => <PostItem key={postId} postId={postId} />))
    }
    {isFetchingNextPage && <Loader />}
    <div ref={ref}></div>
  </div>;
}