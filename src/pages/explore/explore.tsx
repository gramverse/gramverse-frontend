import { useEffect } from "react";
import { useGetExplorePosts } from "../../services/explore";
import { useInView } from "react-intersection-observer";
import { ExplorePost, ExplorePostMobile } from "./explore-post";
import { ExploreMessage } from "./explore-message";
import { Loading } from "../../components/loading";

export const Explore = () => {
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const postLimit = 6;
  const {
    data: postPages,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
    refetch: refetchPosts,
  } = useGetExplorePosts(postLimit);

  const posts = postPages?.pages.flatMap((x) => x.postDtos) ?? [];

  useEffect(() => {
    if (
      hasNextPage &&
      isNearPostEnd &&
      !isFetching &&
      !isFetchingNextPostPage
    ) {
      fetchNextPosts();
    }
  }, [
    isNearPostEnd,
    isFetchingNextPostPage,
    hasNextPage,
    isFetching,
    fetchNextPosts,
  ]);

  return (
    <div className="mt-32 flex h-[830px] w-[64rem] flex-col gap-4">
      {posts.length === 0 && <ExploreMessage />}
      {posts.length !== 0 && (
        <div className="w-full py-2 text-2xl font-bold">{"اکسپلور"}</div>
      )}
      <div className="flex w-full grow flex-row flex-wrap gap-5 overflow-y-scroll">
        {posts.map((post) => {
          return (
            <ExplorePost key={post._id} post={post} closeModal={refetchPosts} />
          );
        })}
        <Loading
          isLoading={hasNextPage && isFetchingNextPostPage}
          className="mx-auto place-self-center"
          size="large"
          ref={nearEndPostRef}
        />
      </div>
    </div>
  );
};

export const ExploreMobile = () => {
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const postLimit = 3;
  const {
    data: postPages,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
  } = useGetExplorePosts(postLimit);

  const posts = postPages?.pages.flatMap((x) => x.postDtos) ?? [];

  useEffect(() => {
    if (
      hasNextPage &&
      isNearPostEnd &&
      !isFetching &&
      !isFetchingNextPostPage
    ) {
      fetchNextPosts();
    }
  }, [
    isNearPostEnd,
    isFetchingNextPostPage,
    hasNextPage,
    isFetching,
    fetchNextPosts,
  ]);

  return (
    <div className="flex grow flex-col items-center justify-start gap-4">
      <div className="flex h-[500px] w-full grow flex-row flex-wrap gap-5 overflow-y-scroll">
        {posts.map((post) => {
          return <ExplorePostMobile key={post._id} post={post} />;
        })}
        <Loading
          isLoading={hasNextPage && isFetchingNextPostPage}
          className="mx-auto place-self-center"
          ref={nearEndPostRef}
        />
      </div>
    </div>
  );
};
