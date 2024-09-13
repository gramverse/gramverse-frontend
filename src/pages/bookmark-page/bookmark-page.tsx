import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import clsx from "clsx";
import {
  BookmarkEmptyGallery,
  BookmarkEmptyGalleryMobile,
} from "./bookmark-empty-gallery";
import { BookmarkedPost, BookmarkedPostMobile } from "./bookmarked-post";
import { useGetBookmarkedPosts } from "../../services/bookmark-page";

export const BookmarkPage = () => {
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const postLimit = 6;
  const {
    data: postPages,
    isEmptyGallery,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
    refetch: refetchPosts,
  } = useGetBookmarkedPosts(postLimit);
  const posts = postPages?.pages.flatMap((x) => x.posts) ?? [];

  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);

  return (
    <div className="mt-32 flex h-[830px] w-[64rem] flex-col gap-4">
      {isEmptyGallery && <BookmarkEmptyGallery />}
      {!isEmptyGallery && (
        <>
          <div className="w-full py-2 text-2xl font-bold">{"ذخیره‌ها"}</div>
          <div className="flex w-full grow flex-row flex-wrap gap-5 overflow-y-scroll">
            {posts.map((post) => {
              return (
                <BookmarkedPost
                  key={post.postId}
                  post={post}
                  closeModal={refetchPosts}
                />
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
        </>
      )}
    </div>
  );
};
export const BookmarkPageMobile = () => {
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const postLimit = 6;
  const {
    data: postPages,
    isEmptyGallery,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
  } = useGetBookmarkedPosts(postLimit);

  const posts = postPages?.pages.flatMap((x) => x.posts) ?? [];
  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);

  return (
    <div className="flex grow flex-col items-center justify-start gap-4">
      {isEmptyGallery && <BookmarkEmptyGalleryMobile />}
      {!isEmptyGallery && (
        <div className="flex h-[500px] w-full grow flex-row flex-wrap gap-5 overflow-y-scroll">
          {posts.map((post) => {
            return <BookmarkedPostMobile key={post.postId} post={post} />;
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
      )}
    </div>
  );
};
