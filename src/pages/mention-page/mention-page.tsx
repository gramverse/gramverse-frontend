import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import {
  MentionEmptyGallery,
  MentionEmptyGalleryMobile,
} from "./mention-empty-gallery";
import { MentionedPost, MentionedPostMobile } from "./mentioned-post";
import { useGetMentionedPosts } from "../../services/mention-page";
import { Loading } from "../../components/loading";

export const MentionPage = () => {
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
  } = useGetMentionedPosts(postLimit);
  const posts = postPages?.pages.flatMap((x) => x.posts) ?? [];

  useEffect(() => {
    if (hasNextPage && isNearPostEnd && !isFetching) {
      fetchNextPosts();
    }
  }, [isNearPostEnd, hasNextPage, isFetching, fetchNextPosts]);

  return (
    <div className="mt-32 flex h-[830px] w-[64rem] flex-col gap-4">
      {isEmptyGallery && <MentionEmptyGallery />}
      {!isEmptyGallery && (
        <>
          <div className="w-full py-2 text-2xl font-bold">{"تگ‌‌شده‌ها"}</div>
          <div className="flex w-full grow flex-row flex-wrap gap-5 overflow-y-scroll">
            {posts.map((post) => {
              return (
                <MentionedPost
                  key={post.postId}
                  post={post}
                  closeModal={refetchPosts}
                />
              );
            })}
            <Loading
              isLoading={hasNextPage && isFetchingNextPostPage}
              ref={nearEndPostRef}
              className="w-full self-center text-center"
            />
          </div>
        </>
      )}
    </div>
  );
};
export const MentionPageMobile = () => {
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const postLimit = 6;
  const {
    data: postPages,
    isEmptyGallery,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
  } = useGetMentionedPosts(postLimit);

  const posts = postPages?.pages.flatMap((x) => x.posts) ?? [];

  useEffect(() => {
    if (hasNextPage && isNearPostEnd && !isFetching) {
      fetchNextPosts();
    }
  }, [isNearPostEnd, hasNextPage, isFetching, fetchNextPosts]);

  return (
    <div className="flex grow flex-col items-center justify-start gap-4">
      {isEmptyGallery && <MentionEmptyGalleryMobile />}
      {!isEmptyGallery && (
        <div className="flex h-[500px] w-full grow flex-row flex-wrap gap-5 overflow-y-scroll">
          {posts.map((post) => {
            return <MentionedPostMobile key={post.postId} post={post} />;
          })}
          <Loading
            isLoading={hasNextPage && isFetchingNextPostPage}
            ref={nearEndPostRef}
            className="w-full self-center text-center"
          />
        </div>
      )}
    </div>
  );
};
