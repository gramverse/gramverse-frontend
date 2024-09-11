import { useInView } from "react-intersection-observer";
import { useGetExplorePosts } from "../../services/explore";
import { useEffect } from "react";
import clsx from "clsx";
import {
  MentionEmptyGallery,
  MentionEmptyGalleryMobile,
} from "./mention-empty-gallery";
import { MentionedPost, MentionedPostMobile } from "./mentioned-post";

export const MentionPage = () => {
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const postLimit = 6;
  const {
    data: postPages,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
    refetch: refetchPosts,
  } = useGetExplorePosts(postLimit); //change to get mention posts
  //const galleryIsEmpty and nonEmpty get it from service
  const posts = postPages?.pages.flatMap((x) => x.postDtos) ?? [];

  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);

  return (
    <div className="mt-32 flex h-[830px] w-[64rem] flex-col gap-4">
      {posts.length === 0 && <MentionEmptyGallery />}
      {posts.length !== 0 && (
        <div className="w-full py-2 text-2xl font-bold">{"تگ‌‌شده‌ها"}</div>
      )}
      <div className="flex w-full grow flex-row flex-wrap gap-5 overflow-y-scroll">
        {posts.map((post) => {
          return (
            <MentionedPost
              key={post._id}
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
    </div>
  );
};
export const MentionPageMobile = () => {
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const postLimit = 6;
  const {
    data: postPages,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
  } = useGetExplorePosts(postLimit); //change to get mention posts

  const posts = postPages?.pages.flatMap((x) => x.postDtos) ?? [];
  //const galleryIsEmpty and nonEmpty

  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);

  return (
    <div className="flex grow flex-col items-center justify-start gap-4">
      {posts.length === 0 && <MentionEmptyGalleryMobile />}
      <div className="flex h-[500px] w-full grow flex-row flex-wrap gap-5 overflow-y-scroll">
        {posts.map((post) => {
          return <MentionedPostMobile key={post._id} post={post} />;
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
