import { useEffect, useState } from "react";
import { Modal } from "../../components/modal";
import { PostModal } from "../post-view/post-modal";
import { EditPost } from "../post/edit-post";
import { useInView } from "react-intersection-observer";
import { useGetPosts } from "../../services/my-page";
import { Loading } from "../../components/loading";
import { Post, PostMobile } from "./post";

export const Gallery = () => {
  const [isPostOpen, openPost] = useState(false);
  const [postId, setPostId] = useState<string>("");
  const postLimit = 6;
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const [isEditOpen, OpenEdit] = useState(false);

  const {
    data: postPages,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
  } = useGetPosts(postLimit);

  useEffect(() => {
    if (
      hasNextPage &&
      isNearPostEnd &&
      !isFetching &&
      !isFetchingNextPostPage
    ) {
      fetchNextPosts();
    }
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);

  return (
    <div className="flex h-[430px] grow flex-row flex-wrap gap-5 overflow-y-scroll px-8 py-10">
      <Modal
        isOpen={isPostOpen}
        close={() => {
          openPost(false);
        }}
      >
        <PostModal
          postId={postId}
          close={() => openPost(false)}
          openEditPost={() => {
            openPost(false);
            OpenEdit(true);
          }}
        />
      </Modal>
      <Modal
        isOpen={isEditOpen}
        close={() => {
          OpenEdit(false);
        }}
      >
        <EditPost
          postId={postId}
          close={() => {
            OpenEdit(false);
          }}
        />
      </Modal>
      {postPages?.pages
        .flatMap((x) => x.posts)
        .map((post) => {
          return (
            <Post
              image={post.photoUrls[0]}
              onClick={() => {
                setPostId(post._id);
                openPost(true);
              }}
              key={post._id}
            />
          );
        })}

      <Loading
        isLoading={isFetching || isFetchingNextPostPage}
        ref={nearEndPostRef}
      />
    </div>
  );
};

export const GalleryMobile = () => {
  const postLimit = 6;
  const [nearEndPostRef, isNearPostEnd] = useInView();
  const {
    data: postPages,
    hasNextPage,
    isFetching,
    isFetchingNextPage: isFetchingNextPostPage,
    fetchNextPage: fetchNextPosts,
  } = useGetPosts(postLimit);

  useEffect(() => {
    if (
      hasNextPage &&
      isNearPostEnd &&
      !isFetching &&
      !isFetchingNextPostPage
    ) {
      fetchNextPosts();
    }
  }, [isNearPostEnd, isFetchingNextPostPage, hasNextPage]);

  return (
    <div className="absolute inset-x-0 mx-auto grid h-[500px] w-[19.4rem] grid-cols-2 gap-5 self-center overflow-y-scroll px-4 pt-3">
      {postPages?.pages
        .flatMap((x) => x.posts)
        .map((post) => {
          return (
            <PostMobile
              id={post._id}
              image={post.photoUrls[0]}
              key={post._id}
            />
          );
        })}
      <p className="mb-64" />
      <Loading
        isLoading={isFetching || isFetchingNextPostPage}
        ref={nearEndPostRef}
      />
    </div>
  );
};
