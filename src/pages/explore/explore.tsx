import { useEffect } from "react";
import { useGetExplorePosts } from "../../services/explore";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import { ExplorePost, ExplorePostMobile } from "./explore-post";
import { ExploreMessage } from "./explore-message";

const ExploreLayout = () => {
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const postLimit = 6;
  const {
    data: postPages,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
    isError: isPostError,
    error: postError,
    refetch: refetchPosts,
  } = useGetExplorePosts(postLimit);

  const posts = postPages?.pages.flatMap((x) => x.postDtos) ?? [];

  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);
  if (isPostError) {
    //use error handler
    console.log(postError);
  }

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
        <div
          ref={nearEndPostRef}
          className={clsx(
            "flex w-full items-center justify-center text-2xl",
            hasNextPage ? "h-[calc(11rem/3)]" : "",
          )}
        >
          {hasNextPage && isFetchingNextPostPage && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export const Explore = () => {
  return (
    <>
      <ExploreLayout />
    </>
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
    isError: isPostError,
    error: postError,
  } = useGetExplorePosts(postLimit);

  const posts = postPages?.pages.flatMap((x) => x.postDtos) ?? [];

  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);

  if (isPostError) {
    //use error handler
    console.log(postError);
  }

  return (
    <div className="flex grow flex-col items-center justify-start gap-4">
      <div className="flex h-[500px] w-full grow flex-row flex-wrap gap-5 overflow-y-scroll">
        {posts.map((post) => {
          return <ExplorePostMobile key={post._id} post={post} />;
        })}
        <div
          ref={nearEndPostRef}
          className={clsx(
            "flex w-full items-center justify-center text-2xl",
            hasNextPage ? "h-[calc(11rem/3)]" : "",
          )}
        >
          {hasNextPage && isFetchingNextPostPage && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
};
