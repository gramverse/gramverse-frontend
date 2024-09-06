import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useGetUserPosts } from "../../api-hooks/user-page";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Modal } from "../../reusable-components/modal";
import { UserPostModal } from "../post-view/user-post-modal";
import { Loading } from "../../reusable-components/loading";

type UserGalleryProps = {
  userName: string;
  isAllowedToViewPosts: boolean;
};
export const UserGallery = ({
  userName,
  isAllowedToViewPosts,
}: UserGalleryProps) => {
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
  } = useGetUserPosts(userName, isAllowedToViewPosts, postLimit);

  const userPosts = postPages?.pages.flatMap((x) => x.posts) ?? [];

  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);

  if (isPostError) {
    // user error handler
    console.log("just for build err", postError);
  }
  const [isPostOpen, openPost] = useState(false);
  const [postId, setPostId] = useState<string>("");

  return (
    <div className="flex grow flex-row flex-wrap gap-5 overflow-y-scroll">
      <Modal
        isOpen={isPostOpen}
        close={() => {
          openPost(false);
        }}
      >
        <UserPostModal
          postId={postId}
          userName={userName}
          close={() => openPost(false)}
        />
      </Modal>
      {userPosts.map((post) => {
        return (
          <div
            key={post._id}
            className={clsx(
              "h-[304px] w-[295px] overflow-hidden rounded-t-3xl bg-neutral-400",
              post.forCloseFriends
                ? "border-4 border-solid border-green-500"
                : "",
            )}
            onClick={() => {
              setPostId(post._id);
              openPost(true);
            }}
          >
            <img
              className="h-full w-full object-cover"
              src={post.photoUrls[0]}
            />
          </div>
        );
      })}
      <Loading
        isLoading={isFetching || isFetchingNextPostPage}
        ref={nearEndPostRef}
      />
    </div>
  );
};

export const UserGalleryMobile = ({
  userName,
  isAllowedToViewPosts,
}: UserGalleryProps) => {
  const navigate = useNavigate();
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
  } = useGetUserPosts(userName, isAllowedToViewPosts, postLimit);

  useEffect(() => {
    if (!hasNextPage || !isNearPostEnd || isFetching) return;
    fetchNextPosts();
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);

  if (isPostError) {
    // user error handler
    console.log("just for build err", postError);
  }

  return (
    <div className="absolute inset-x-0 mx-auto flex h-[500px] w-[20rem] flex-row flex-wrap gap-3 self-center overflow-y-scroll">
      {postPages?.pages
        .flatMap((x) => x.posts)
        .map((post) => {
          return (
            <div
              key={post._id}
              className={clsx(
                "box-border h-36 w-36 overflow-hidden rounded-3xl rounded-t-3xl bg-neutral-400",
                post.forCloseFriends
                  ? "border-4 border-solid border-green-500"
                  : "",
              )}
            >
              <img
                className="h-full w-full object-cover"
                onClick={() => {
                  navigate(`post/${post._id}`);
                }}
                src={post.photoUrls[0]}
              />
            </div>
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
  );
};
