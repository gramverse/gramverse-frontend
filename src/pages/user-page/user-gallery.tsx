import { useInView } from "react-intersection-observer";
import { useGetUserPosts } from "../../services/user-page";
import { useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { UserPostModal } from "../post-view/user-post-modal";
import { Loading } from "../../components/loading";
import { Post, PostMobile } from "./post";

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
  } = useGetUserPosts(userName, isAllowedToViewPosts, postLimit);

  const userPosts = postPages?.pages.flatMap((x) => x.posts) ?? [];

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
  const [isPostOpen, openPost] = useState(false);
  const [postId, setPostId] = useState<string>("");

  return (
    <div className="flex h-[430px] grow flex-row flex-wrap gap-5 overflow-y-scroll px-8 py-10">
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
          <Post
            forCloseFriends={post.forCloseFriends ?? false}
            key={post._id}
            image={post.photoUrls[0]}
            onClick={() => {
              setPostId(post._id);
              openPost(true);
            }}
          />
        );
      })}
      <Loading
        isLoading={isFetching || isFetchingNextPostPage}
        className="mx-auto place-self-center"
        size="large"
        ref={nearEndPostRef}
      />
    </div>
  );
};

export const UserGalleryMobile = ({
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
  } = useGetUserPosts(userName, isAllowedToViewPosts, postLimit);

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
    <div className="absolute inset-x-0 mx-auto grid h-[500px] w-[19.4rem] grid-cols-2 gap-5 self-center overflow-y-scroll px-4 pt-3">
      {postPages?.pages
        .flatMap((x) => x.posts)
        .map((post) => {
          return (
            <PostMobile
              key={post._id}
              image={post.photoUrls[0]}
              forCloseFriends={post.forCloseFriends ?? false}
              id={post._id}
            />
          );
        })}

      <Loading
        isLoading={isFetching || isFetchingNextPostPage}
        className="place-self-center"
        ref={nearEndPostRef}
      />
      <p className="mb-20" />
    </div>
  );
};
